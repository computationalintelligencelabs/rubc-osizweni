import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const TOGETHER_BASE = process.env.TOGETHER_API_BASE ?? "https://api.together.ai/v1";

export async function generateEmailHtml(apiKey: string, subject: string, payload: any) {
  const prompt = `You are an assistant that converts a form submission into a concise, professional HTML email.\nSubject: ${subject}\n\nData:\n${JSON.stringify(payload, null, 2)}\n\nProduce a standalone HTML fragment suitable for use as the email body.`;

  const body = {
    model: process.env.TOGETHER_MODEL ?? "gpt-4o-mini",
    input: prompt,
    max_tokens: 800,
  };

  try {
    const res = await fetch(`${TOGETHER_BASE}/inference`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn("Together inference returned non-OK status; falling back. status=", res.status, text.slice(0, 400));
      return fallbackHtml(subject, payload);
    }

    // Try to parse JSON; if parsing fails, fallback
    let data: any;
    try {
      data = await res.json();
    } catch (err) {
      const text = await res.text();
      console.warn("Together returned non-JSON response; falling back. snippet=", text.slice(0, 400));
      return fallbackHtml(subject, payload);
    }

    // Try a few common locations for generated text
    const possible = data?.output ?? data?.result ?? data;
    let html = "";
    if (Array.isArray(possible)) {
      html = possible.map((p: any) => typeof p === "string" ? p : p?.content ?? "").join("\n");
    } else if (typeof possible === "string") {
      html = possible;
    } else if (possible && typeof possible === "object") {
      html = possible[0]?.content ?? possible.output?.[0]?.content ?? JSON.stringify(possible);
    }

    return html || fallbackHtml(subject, payload);
  } catch (err) {
    console.error("Together inference failed, falling back:", err);
    return fallbackHtml(subject, payload);
  }
}

export async function sendViaTogether(apiKey: string, to: string, from: string, subject: string, html: string) {
  // Together may offer different email endpoints; attempt a generic email send path.
  // This will work if your Together account supports an email/send endpoint with this shape.
  const url = `${TOGETHER_BASE}/email/send`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      from,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Together send failed: ${res.status} ${txt}`);
  }

  return res.json();
}

function fallbackHtml(subject: string, payload: any) {
  const rows = Object.entries(payload).map(([k, v]) => `<tr><td style="padding:4px 8px;font-weight:600;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:4px 8px;">${escapeHtml(String(v))}</td></tr>`).join('\n');
  return `<!doctype html><html><body><h2>${escapeHtml(subject)}</h2><table style="border-collapse:collapse;">${rows}</table><p style="color:#666;font-size:12px;margin-top:12px;">Submitted at ${new Date().toLocaleString()}</p></body></html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"} as any)[c]);
}

export default { generateEmailHtml, sendViaTogether };
