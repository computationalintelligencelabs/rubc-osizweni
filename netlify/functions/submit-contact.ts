import type { Config, Context } from "@netlify/functions";
import dotenv from "dotenv";
import { db } from "../../db/index.js";
import { contacts } from "../../db/schema.js";
import nodemailer from "nodemailer";

dotenv.config({ path: ".env.local" });

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const formData = await req.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!firstName || !lastName || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store in Netlify Database
    await db.insert(contacts).values({
      firstName,
      lastName,
      email,
      message,
    });

    // Send email via nodemailer
    const emailHTML = `
      <h2>New Contact Form Submission</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
    `;

    try {
      const emailUser = process.env.EMAIL_USER?.trim();
      const emailPassword = process.env.EMAIL_PASSWORD?.replace(/\s+/g, "");

      if (!emailUser || !emailPassword) {
        console.error("Email configuration missing for contact submission");
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

      const mailOptions = {
        from: emailUser,
        to: emailUser,
        subject: 'New Contact Form Submission',
        html: emailHTML,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError: any) {
      console.error("Contact email delivery failed:", emailError);
      return Response.json({ error: "Failed to send contact email notification. Please try again later.", details: emailError.message }, { status: 500 });
    }

    // Redirect or return success based on how it's called
    const referer = req.headers.get("referer");
    if (referer) {
      const redirectUrl = new URL(referer);
      redirectUrl.searchParams.set("contact_success", "true");
      return Response.redirect(redirectUrl.toString(), 303);
    }

    return Response.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/submit-contact",
};
