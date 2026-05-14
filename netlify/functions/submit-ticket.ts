import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { db } from "../../db/index.js";
import { tickets } from "../../db/schema.js";
import nodemailer from "nodemailer";

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
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
          pass: process.env.EMAIL_PASSWORD || ''
        }
      });

      const mailOptions: any = {
        from: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
        to: 'rubcosizweni.office@gmail.com',
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
    } catch (emailError) {
      console.warn("Could not send email:", emailError);
      // We don't fail the request if email sending fails, as long as it's saved to DB.
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
