import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const TOGETHER_BASE = process.env.TOGETHER_API_BASE ?? 'https://api.together.ai/v1';
const apiKey = process.env.TOGETHER_API_KEY;

if (!apiKey) {
  console.error('TOGETHER_API_KEY not set in .env.local');
  process.exit(1);
}

async function run() {
  const url = `${TOGETHER_BASE}/inference`;
  console.log('Requesting', url);

  const body = {
    model: process.env.TOGETHER_MODEL ?? 'gpt-4o-mini',
    input: 'Say hello',
    max_tokens: 10,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Response body (first 4000 chars):\n', text.slice(0, 4000));
  } catch (err: any) {
    console.error('Fetch failed:', err.message || err);
  }
}

run();
