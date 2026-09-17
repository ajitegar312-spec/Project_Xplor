import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { locales, pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";
import { privacyDoc } from "@/content/legal";
import { LegalDoc } from "@/components/sections/LegalDoc";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  return {
    title: pick(privacyDoc.title, lang),
    description: pick(privacyDoc.description, lang),
    alternates: pageAlternates(lang, `/${lang}/privacy`),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  return <LegalDoc lang={lang} doc={privacyDoc} contactHref={`/${lang}/contact`} contactLabel={dict.nav.contact} />;
}
