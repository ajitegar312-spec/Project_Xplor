import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Xplor Digital", template: "%s | Xplor Digital" },
  description: "Xplor Digital — web, mobile, UI/UX, cloud, consulting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
