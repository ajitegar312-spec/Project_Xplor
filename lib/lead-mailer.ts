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

// Escape everything user-controlled before it touches HTML email.
// Prevents HTML injection / broken markup from names, messages, etc.
function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function submittedAt(): string {
  return new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC");
}

function infoRow(label: string, value: string): string {
  return (
    `<tr>` +
    `<td style="padding:8px 12px 8px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>` +
    `<td style="padding:8px 0;color:#0b1020;font-size:14px;word-break:break-word;">${escapeHtml(value)}</td>` +
    `</tr>`
  );
}

function sectionTitle(text: string): string {
  return `<div style="font-size:12px;font-weight:bold;letter-spacing:1.5px;color:#64748b;margin:0 0 8px;">${text}</div>`;
}

// Professional, email-client-safe HTML (tables + inline styles only —
// Gmail strips <style> blocks). Plain-text version is always sent alongside.
function leadHtml(lead: LeadInput): string {
  const message = lead.message.trim() ? escapeHtml(lead.message) : "No message provided.";
  const rows =
    infoRow("Name", lead.name) +
    infoRow("Email", lead.email) +
    (lead.company ? infoRow("Company", lead.company) : "") +
    (lead.budget ? infoRow("Budget", lead.budget) : "");
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;background-color:#f1f5f9;padding:24px;">` +
    `<div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;">` +
    `<div style="background-color:#1e46d6;padding:20px 24px;">` +
    `<div style="color:#ffffff;font-size:18px;font-weight:bold;">New Consultation Lead</div>` +
    `<div style="color:#dbe6fe;font-size:13px;margin-top:4px;">Xplor Digital website</div>` +
    `</div>` +
    `<div style="padding:24px;">` +
    sectionTitle("CONTACT INFORMATION") +
    `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows}</table>` +
    `<div style="margin-top:20px;">${sectionTitle("MESSAGE")}` +
    `<div style="color:#0b1020;font-size:14px;line-height:1.6;white-space:pre-wrap;word-break:break-word;">${message}</div></div>` +
    `<div style="margin-top:20px;">${sectionTitle("SUBMISSION")}` +
    `<div style="color:#64748b;font-size:13px;">Submitted: ${submittedAt()}</div></div>` +
    `</div>` +
    `<div style="padding:16px 24px;border-top:1px solid:#e2e8f0;color:#94a3b8;font-size:12px;">Sent automatically from the Xplor Digital contact form. Reply directly to respond to the sender.</div>` +
    `</div></div>`
  );
}

function sanitizeSubjectName(name: string): string {
  return name.replace(/[\r\n]+/g, " ").trim().slice(0, 100) || "lead";
}

async function sendViaResend(opts: { to: string; subject: string; text: string; html?: string; replyTo?: string }): Promise<void> {
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
      // Always send plain text; HTML is only added when pre-escaped by builders above.
      text: opts.text,
      ...(opts.html ? { html: opts.html } : {}),
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
    html: leadHtml(lead),
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
    html:
      `<div style="font-family:Arial,Helvetica,sans-serif;background-color:#f1f5f9;padding:24px;">` +
      `<div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;">` +
      `<div style="background-color:#1e46d6;padding:20px 24px;">` +
      `<div style="color:#ffffff;font-size:18px;font-weight:bold;">New Newsletter Subscriber</div>` +
      `<div style="color:#dbe6fe;font-size:13px;margin-top:4px;">Xplor Digital website</div>` +
      `</div>` +
      `<div style="padding:24px;color:#0b1020;font-size:14px;">New newsletter signup: ${escapeHtml(email)}</div>` +
      `</div></div>`,
  });
  return { delivered: true, mode: "resend" };
}
