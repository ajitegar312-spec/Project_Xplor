import { ImageResponse } from "next/og";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { OgCard } from "@/components/sections/OgCard";

// Served at /[lang]/opengraph-image (1200x630 PNG), inherited by all
// child routes unless they define their own. No external assets.
export const alt = "Xplor Digital — Digital Transformation Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return new ImageResponse(
    <OgCard locale={lang} title="Xplor Digital" tagline={dict.footer.tagline} />,
    { ...size }
  );
}
