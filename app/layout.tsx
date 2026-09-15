import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/ui/ThemeScript";

export const metadata: Metadata = {
  title: { default: "Xplor Digital", template: "%s | Xplor Digital" },
  description: "Xplor Digital — web, mobile, UI/UX, cloud, consulting.",
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
