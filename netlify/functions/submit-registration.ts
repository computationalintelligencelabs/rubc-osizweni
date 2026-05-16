import type { Config, Context } from "@netlify/functions";
import dotenv from "dotenv";
import { db } from "../../db/index.js";
import { registrations } from "../../db/schema.js";
import nodemailer from "nodemailer";
import { getStore } from "@netlify/blobs";
import { generateEmailHtml, sendViaTogether } from "../lib/together";

dotenv.config({ path: ".env.local" });

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // support JSON or form data
    let body: any;
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const form = await req.formData();
      body = {} as any;

      // extract text fields and detect file
      let file: File | null = null;
      for (const [k, v] of form.entries()) {
        if (typeof v === "string") {
          body[k] = v;
        } else {
          // v can be a File
          try {
            const maybeFile = v as unknown as File;
            if (maybeFile && maybeFile.name) {
              file = maybeFile as File;
              body[k] = maybeFile.name;
            }
          } catch (e) {
            // ignore
          }
        }
      }

      // if file present, save to Netlify Blobs and create proof URL
      if (file) {
        const store = getStore("ticket-proofs");
        const extension = file.name.split('.').pop() || 'bin';
        const blobKey = `${Date.now()}-${Math.random().toString(36).substring(2,9)}.${extension}`;
        const arrayBuffer = await file.arrayBuffer();
        await store.set(blobKey, arrayBuffer, { metadata: { contentType: file.type, originalName: file.name } });
        const url = new URL(req.url);
        const proofUrl = `${url.origin}/api/blob/${blobKey}`;
        body.proofUrl = proofUrl;
      }
    }

    const formName = body.formName || body.form || "registration";

    // persist raw payload (including proofUrl if present)
    const [record] = await db.insert(registrations).values({
      formName,
      payload: JSON.stringify(body),
    }).returning();

    // Build email subject and generate HTML using Together
    const subject = `New Submission: ${formName}`;
    const apiKey = process.env.TOGETHER_API_KEY as string;
    const emailTo = process.env.EMAIL_TO as string;
    const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER || `no-reply@${(req.headers.get('host') ?? 'example.com')}`;

    const html = await generateEmailHtml(apiKey, subject, body);

    // Try Together send if enabled, otherwise fallback to SMTP
    if ((process.env.TOGETHER_SEND_EMAIL || "false").toLowerCase() === "true") {
      try {
        await sendViaTogether(apiKey, emailTo, emailFrom, subject, html);
      } catch (err: any) {
        console.error("Together send failed, will fallback to SMTP:", err.message || err);
        await sendViaSmtp(emailFrom, emailTo, subject, html);
      }
    } else {
      await sendViaSmtp(emailFrom, emailTo, subject, html);
    }

    return Response.json({ success: true, id: record.id });

  } catch (error: any) {
    console.error("submit-registration error:", error);
    return Response.json({ error: error.message || "Internal error" }, { status: 500 });
  }
};

async function sendViaSmtp(from: string, to: string, subject: string, html: string) {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPassword = process.env.EMAIL_PASSWORD?.replace(/\s+/g, "");

  if (!emailUser || !emailPassword) {
    throw new Error("SMTP credentials are not configured (EMAIL_USER / EMAIL_PASSWORD)");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_SMTP_PORT || 465),
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}

export const config: Config = {
  path: "/api/submit-registration",
};
