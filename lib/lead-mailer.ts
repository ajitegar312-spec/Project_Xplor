// Lead delivery without new dependencies (global fetch only).
//
// Primary channel: Resend HTTP API (free tier is enough for a corporate
// contact form). Configure via SERVER-ONLY env (never NEXT_PUBLIC_):
//   RESEND_API_KEY   — secret API key
//   LEAD_TO_EMAIL    — inbox that receives leads
//   LEAD_FROM_EMAIL  — sender identity (your verified domain, or
//                      onboarding@resend.dev for testing without a domain)
//
// When unconfigured, behaves exactly like the previous mock (logs receipt,
// delivers nothing) so local dev works with zero setup and the frontend
// contract never changes.

export type LeadInput = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
};

function leadText(lead: LeadInput): string {
  const lines: string[] = [`Name: ${lead.name}`, `Email: ${lead.email}`];
  if (lead.company) lines.push(`Company: ${lead.company}`);
  if (lead.budget) lines.push(`Budget: ${lead.budget}`);
  lines.push("", lead.message);
  return lines.join("\n");
}

function sanitizeSubjectName(name: string): string {
  return name.replace(/[\r\n]+/g, " ").trim().slice(0, 100) || "lead";
}

async function sendViaResend(opts: { to: string; subject: string; text: string; replyTo?: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev";
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Xplor Digital <${from}>`,
        to: [opts.to],
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        subject: opts.subject,
        // Plain text only — user input is never rendered as HTML.
        text: opts.text,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    // Never log the API key — only status + truncated provider message.
    console.error("[lead] provider error", res.status, detail.slice(0, 200));
    throw new Error(`Email provider error: ${res.status}`);
  }
}

export async function sendLeadEmail(lead: LeadInput): Promise<{ delivered: boolean; mode: "resend" | "mock" }> {
  const to = process.env.LEAD_TO_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) {
    // Never fake a successful delivery in production: the route turns this
    // into an honest 502 instead of a false "message sent" confirmation.
    if (process.env.NODE_ENV === "production") {
      console.error("[lead] NOT DELIVERED — lead delivery is not configured (missing RESEND_API_KEY/LEAD_TO_EMAIL)");
      throw new Error("Lead delivery is not configured");
    }
    console.log("[lead] received (mock mode — RESEND_API_KEY/LEAD_TO_EMAIL unset)");
    return { delivered: false, mode: "mock" };
  }
  await sendViaResend({
    to,
    subject: `New consultation lead: ${sanitizeSubjectName(lead.name)}`,
    text: leadText(lead),
    replyTo: lead.email,
  });
  return { delivered: true, mode: "resend" };
}

export async function sendSubscribeNotice(email: string): Promise<{ delivered: boolean; mode: "resend" | "mock" }> {
  const to = process.env.LEAD_TO_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) {
    // Same honesty rule as leads: no fake success in production.
    if (process.env.NODE_ENV === "production") {
      console.error("[lead] NOT DELIVERED — newsletter delivery is not configured (missing RESEND_API_KEY/LEAD_TO_EMAIL)");
      throw new Error("Newsletter delivery is not configured");
    }
    console.log("[lead] newsletter signup (mock mode — RESEND_API_KEY/LEAD_TO_EMAIL unset)");
    return { delivered: false, mode: "mock" };
  }
  await sendViaResend({
    to,
    subject: "New newsletter subscriber",
    text: `New newsletter signup: ${email}`,
  });
  return { delivered: true, mode: "resend" };
}
