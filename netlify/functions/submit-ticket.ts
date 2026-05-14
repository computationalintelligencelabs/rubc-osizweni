/**
 * DEPRECATED: This function is no longer the primary endpoint for ticket form submissions.
 * 
 * The ticket form now submits directly to Form Submit API:
 * - Endpoint: https://formsubmit.co/rubcosizweni.office@gmail.com
 * - Supports file attachments (proof of payment)
 * - See: FORM_SUBMISSION_SETUP.md for current integration details
 * 
 * This function is kept for reference and can be used for:
 * - Database storage (if re-enabled)
 * - Payment verification logic
 * - Ticket assignment
 * - Custom processing
 * 
 * To use this function again:
 * 1. Update the form action in /src/pages/TicketForm.tsx to "/api/submit-ticket"
 * 2. Ensure EMAIL_USER and EMAIL_PASSWORD are set in .env.local
 * 3. Ensure Netlify Blobs storage is configured
 */

import type { Config, Context } from "@netlify/functions";
import dotenv from "dotenv";
import { getStore } from "@netlify/blobs";
import { db } from "../../db/index.js";
import { tickets } from "../../db/schema.js";
import nodemailer from "nodemailer";

dotenv.config({ path: ".env.local" });

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const formData = await req.formData();
    const Full_Name = formData.get("Full_Name") as string;
    const Email = formData.get("Email") as string;
    const Ticket_Type = formData.get("Ticket_Type") as string;
    const proofOfPayment = formData.get("proofOfPayment") as File;

    if (!Full_Name || !Email || !Ticket_Type) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!proofOfPayment || typeof proofOfPayment === "string") {
      return Response.json({ error: "Proof of payment file is required" }, { status: 400 });
    }

    const priceMap: Record<string, number> = {
      General: 250,
      VIP: 500,
      VVIP: 750,
    };
    const price = priceMap[Ticket_Type] ?? 250;

    // Store in Netlify Blobs
    const store = getStore("ticket-proofs");
    const extension = proofOfPayment.name.split('.').pop() || 'bin';
    const blobKey = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extension}`;
    
    // We can extract an ArrayBuffer from the File
    const arrayBuffer = await proofOfPayment.arrayBuffer();
    
    await store.set(blobKey, arrayBuffer, {
      metadata: { 
        contentType: proofOfPayment.type,
        originalName: proofOfPayment.name 
      }
    });

    // We'll create a URL that points to another function to serve this blob
    // This allows the admin to view the file later.
    const url = new URL(req.url);
    const proofUrl = `${url.origin}/api/proof/${blobKey}`;

    // Store in Netlify Database
    const [ticketRecord] = await db.insert(tickets).values({
      fullName: Full_Name,
      email: Email,
      ticketType: Ticket_Type,
      price,
      proofOfPaymentUrl: proofUrl,
    }).returning();

    // Send email via nodemailer
    const emailHTML = `
      <h2>New Gala Dinner Ticket Registration</h2>
      <p><strong>Name:</strong> ${Full_Name}</p>
      <p><strong>Email:</strong> ${Email}</p>
      <p><strong>Ticket Type:</strong> ${Ticket_Type}</p>
      <p><strong>Price:</strong> R${price}</p>
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p><em>Proof of payment is available here: <a href="${proofUrl}">${proofUrl}</a></em></p>
    `;

    try {
      const emailUser = process.env.EMAIL_USER?.trim();
      const emailPassword = process.env.EMAIL_PASSWORD?.replace(/\s+/g, "");

      if (!emailUser || !emailPassword) {
        console.error("Email configuration missing for ticket submission");
        return Response.json({ error: "Email service is not configured. Please set EMAIL_USER and EMAIL_PASSWORD." }, { status: 500 });
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });

      const mailOptions: any = {
        from: emailUser,
        to: emailUser,
        subject: 'New Gala Dinner Ticket Registration',
        html: emailHTML,
        attachments: [
          {
            filename: proofOfPayment.name,
            content: Buffer.from(arrayBuffer),
            contentType: proofOfPayment.type,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError: any) {
      console.error("Ticket email delivery failed:", emailError);
      return Response.json({
        error: "Failed to send ticket email notification. Please try again later.",
        details: emailError.message,
      }, { status: 500 });
    }

    return Response.json({
      success: true,
      message: 'Ticket registration submitted successfully.',
      ticketId: ticketRecord.id,
    });
  } catch (error: any) {
    console.error('Error processing submission:', error);
    return Response.json({
      error: 'Failed to process ticket registration. Please try again.',
      details: error.message
    }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/submit-ticket",
};
