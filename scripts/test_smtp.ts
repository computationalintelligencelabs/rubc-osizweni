import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: '.env.local' });

async function run() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const to = process.env.EMAIL_TO || 'rubcosizweni.office@gmail.com';
  const from = process.env.EMAIL_FROM || user;
  const host = process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_SMTP_PORT || 465);

  if (!user || !pass) {
    console.error('EMAIL_USER or EMAIL_PASSWORD not set in .env.local; aborting.');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    console.log(`Sending test email from ${from} to ${to} via ${host}:${port}...`);
    const info = await transporter.sendMail({
      from,
      to,
      subject: 'SMTP Test — rubc-osizweni',
      html: `<p>This is a test email from the rubc-osizweni project at ${new Date().toISOString()}.</p>`,
    });
    console.log('Send successful:', info?.messageId ?? info);
  } catch (err: any) {
    console.error('SMTP send failed:', err.message || err);
    process.exit(1);
  }
}

run();
