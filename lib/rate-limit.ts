// In-memory sliding-window rate limiter. Zero dependencies.
//
// Single-instance semantics: each server instance tracks its own counters.
// Good enough for VPS/single-instance and local dev. For multi-instance or
// serverless scale, replace the Map with a shared store (e.g. Upstash /
// Vercel KV) behind this same function signature.

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();
const MAX_BUCKETS = 2000;

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Lazy prune so a flood of distinct keys cannot grow memory unbounded.
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, v] of buckets) {
      if (v.resetAt <= now) buckets.delete(k);
      if (buckets.size <= MAX_BUCKETS / 2) break;
    }
  }

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  if (current.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }
  current.count += 1;
  return { ok: true, retryAfterSec: 0 };
}

// Best-effort client identity for throttling abuse-prone endpoints.
// Trusts x-forwarded-for (set by Vercel/proxies); never used for auth.
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 64);
  return "unknown";
}
