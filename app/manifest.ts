import type { MetadataRoute } from "next";

// Served as /manifest.webmanifest (auto-linked by Next.js).
// Metadata route only — does not add or change any app route.
// PNG icons are intentionally omitted: this project ships zero binary
// assets, so the manifest references the local SVG icon instead.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Xplor Digital — Digital Transformation Partner",
    short_name: "Xplor Digital",
    description: "Xplor Digital: web development, mobile apps, UI/UX, cloud & DevOps, IT consulting.",
    start_url: "/id",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
