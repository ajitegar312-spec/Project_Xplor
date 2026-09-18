/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Conservative: disable device/payment features this site never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()" },
  // Honored by browsers only over HTTPS, so local http:// dev is unaffected.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];
// NOTE: no Content-Security-Policy yet. A strict CSP would break the blocking
// ThemeScript inline script, next/og image routes, and metadata images unless
// paired with nonce infrastructure — intentionally deferred (use Report-Only first).
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
