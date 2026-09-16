// Central site config. DUMMY contact values come ONLY from env.
// Do NOT hardcode email / WhatsApp anywhere else in source.
// Replace .env values before production.
//
// Production safety: every value here is validated with a safe fallback so a
// missing or malformed env var can never crash `next build` prerendering
// (generateMetadata/sitemap/robots all run at build time on Vercel).

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.origin;
      }
    } catch {
      // Invalid URL — fall through to the fallbacks below.
    }
    console.warn(`[site-config] Invalid NEXT_PUBLIC_SITE_URL=${JSON.stringify(raw)} — using fallback`);
  }
  // On Vercel the deployment URL is always available at build + runtime.
  // Production builds prefer the stable production alias over the
  // per-deployment URL.
  if (process.env.VERCEL_ENV === "production") {
    const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/^https?:\/\//, "");
    if (prodHost) return `https://${prodHost}`;
  }
  const vercelHost = process.env.VERCEL_URL?.trim().replace(/^https?:\/\//, "");
  if (vercelHost) return `https://${vercelHost}`;
  return "http://localhost:3000";
}

// Normalize to international digits for wa.me (which rejects leading 0).
// "0857..." -> "62857...", "+62 812..." -> "62812...".
function normalizeWaNumber(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

const waNumberRaw =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "+62 812-3456-7890";

export const siteConfig = {
  brand: "Xplor Digital",
  // DUMMY — development only
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@xplor.digital",
  // DUMMY — development only, normalized to international format in waLink()
  waNumber: waNumberRaw,
  siteUrl: resolveSiteUrl(),
  // DUMMY address — do not use as a real person's address
  addressId: "Xplor Digital, Jl. Sudirman No. 123, Jakarta, Indonesia",
  addressEn: "Xplor Digital, 123 Sudirman St, Jakarta, Indonesia (dummy, dev only)",
};

export function waLink(message = "Hello Xplor Digital") {
  const digits = normalizeWaNumber(siteConfig.waNumber);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
