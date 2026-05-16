import dotenv from 'dotenv';
import { generateEmailHtml, sendViaTogether } from '../netlify/lib/together';

dotenv.config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    console.error('TOGETHER_API_KEY not set in .env.local; aborting test.');
    process.exit(1);
  }

  const sample = {
    formName: 'gala_ticket',
    Full_Name: 'Test User',
    Email: 'test@example.com',
    Ticket_Type: 'VIP',
    Notes: 'Testing Together HTML generation',
  };

  try {
    console.log('Generating HTML via Together...');
    const html = await generateEmailHtml(apiKey, 'Test Submission', sample);
    console.log('Generated HTML:\n', html.slice(0, 2000));

    if ((process.env.TOGETHER_SEND_EMAIL || 'false').toLowerCase() === 'true') {
      console.log('Attempting to send via Together (will catch errors)...');
      try {
        const res = await sendViaTogether(apiKey, process.env.EMAIL_TO || 'rubcosizweni.office@gmail.com', process.env.EMAIL_FROM || 'no-reply@example.com', 'Test Submission', html);
        console.log('Together send response:', res);
      } catch (err: any) {
        console.error('Together send failed (this may be expected if your Together plan does not support /email/send):', err.message || err);
      }
    }
  } catch (err: any) {
    console.error('Test failed:', err.message || err);
    process.exit(1);
  }
}

run();
