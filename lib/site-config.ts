// Central site config. DUMMY contact values come ONLY from env.
// Do NOT hardcode email / WhatsApp anywhere else in source.
// Replace .env values before production.
export const siteConfig = {
  brand: "Xplor Digital",
  // DUMMY — development only
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@xplor.digital",
  // DUMMY — development only
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER ?? "+62 812-3456-7890",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // DUMMY address — do not use as a real person's address
  addressId: "Xplor Digital, Jl. Sudirman No. 123, Jakarta, Indonesia",
  addressEn: "Xplor Digital, 123 Sudirman St, Jakarta, Indonesia (dummy, dev only)",
};

export function waLink(message = "Hello Xplor Digital") {
  const digits = siteConfig.waNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
