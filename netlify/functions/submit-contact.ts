import type { Config, Context } from "@netlify/functions";
import { db } from "../../db/index.js";
import { contacts } from "../../db/schema.js";
import nodemailer from "nodemailer";

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
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
          pass: process.env.EMAIL_PASSWORD || ''
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
        to: 'rubcosizweni.office@gmail.com',
        subject: 'New Contact Form Submission',
        html: emailHTML,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.warn("Could not send email:", emailError);
      // We still return success to the user since the data is stored in the database
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
