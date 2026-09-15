import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/ui/ThemeScript";

export const metadata: Metadata = {
  title: { default: "Xplor Digital", template: "%s | Xplor Digital" },
  description: "Xplor Digital — web, mobile, UI/UX, cloud, consulting.",
};

// Browser chrome matches the page background in each color scheme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
