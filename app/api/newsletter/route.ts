import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendSubscribeNotice } from "@/lib/lead-mailer";
import { isEmail, normalizeEmail } from "@/lib/validate";

// Contract: POST { email } -> 200 { ok: true }
// Errors: 400 invalid, 429 throttled, 502 delivery failed.
export async function POST(request: Request) {
  const throttle = rateLimit(`newsletter:${clientIp(request)}`, 10, 60 * 60 * 1000);
  if (!throttle.ok) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, {
      status: 429,
      headers: { "Retry-After": String(throttle.retryAfterSec) },
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const email = normalizeEmail((raw as Record<string, unknown> | null)?.email);
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  try {
    await sendSubscribeNotice(email);
  } catch {
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
