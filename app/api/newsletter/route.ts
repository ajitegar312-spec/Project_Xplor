import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendSubscribeNotice } from "@/lib/lead-mailer";
import { isEmail, normalizeEmail } from "@/lib/validate";

// Contract: POST { email } -> 200 { ok: true }
// Errors: 400 invalid, 413 oversized, 429 throttled, 502 delivery failed.
// Duplicate suppression: re-submitting the same address within 24h returns
// success without notifying the inbox again (best-effort, single-instance,
// like rate limiting — this is not a mailing-list backend, see API_CONTRACT.md).
const MAX_BODY_BYTES = 4 * 1024;
const seenRecently = new Map<string, number>();
const SEEN_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_SEEN = 2000;

function isDuplicate(email: string): boolean {
  const now = Date.now();
  if (seenRecently.size > MAX_SEEN) {
    for (const [k, v] of seenRecently) {
      if (v <= now) seenRecently.delete(k);
      if (seenRecently.size <= MAX_SEEN / 2) break;
    }
  }
  const key = email.toLowerCase();
  if ((seenRecently.get(key) ?? 0) > now) return true;
  seenRecently.set(key, now + SEEN_TTL_MS);
  return false;
}

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
    const len = request.headers.get("content-length");
    if (len && Number(len) > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
    }
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const email = normalizeEmail((raw as Record<string, unknown> | null)?.email);
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  if (isDuplicate(email)) {
    console.log("[lead] duplicate newsletter signup suppressed");
    return NextResponse.json({ ok: true });
  }

  try {
    await sendSubscribeNotice(email);
  } catch {
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
