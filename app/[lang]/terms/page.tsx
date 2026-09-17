import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { locales, pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";
import { termsDoc } from "@/content/legal";
import { LegalDoc } from "@/components/sections/LegalDoc";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  return {
    title: pick(termsDoc.title, lang),
    description: pick(termsDoc.description, lang),
    alternates: pageAlternates(lang, `/${lang}/terms`),
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  return <LegalDoc lang={lang} doc={termsDoc} contactHref={`/${lang}/contact`} contactLabel={dict.nav.contact} />;
}
