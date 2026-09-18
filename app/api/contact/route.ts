import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/lead-mailer";
import { isValidLead, normalizeLead } from "@/lib/validate";

// Contract: POST { name, email, company?, budget?, message } -> 200 { ok: true }
// Errors: 400 invalid payload, 413 oversized, 429 throttled, 502 delivery failed.
// The frontend treats any non-ok as its generic error state — no UI change needed.

// Reject absurd bodies before parsing: legitimate payloads stay far below this.
const MAX_BODY_BYTES = 64 * 1024;

export async function POST(request: Request) {
  const throttle = rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!throttle.ok) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, {
      status: 429,
      headers: { "Retry-After": String(throttle.retryAfterSec) },
    });
  }

  let raw: unknown;
  try {
    const len = request.headers.get("content-length");
    if (len && Number(len) > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
    }
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const body = (raw ?? {}) as Record<string, unknown>;
  const lead = normalizeLead(body);
  if (!isValidLead(lead)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  try {
    await sendLeadEmail(lead);
  } catch {
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
