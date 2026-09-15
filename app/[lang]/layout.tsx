import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const title = "Xplor Digital — Digital Transformation Partner";
  const description =
    lang === "id"
      ? "Xplor Digital: web development, mobile apps, UI/UX, cloud & DevOps, IT consulting."
      : "Xplor Digital: web development, mobile apps, UI/UX, cloud & DevOps, IT consulting.";
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: title, template: "%s | Xplor Digital" },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { id: "/id", en: "/en", "x-default": "/id" },
    },
    openGraph: {
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? ["en_US"] : ["id_ID"],
      url: `${siteConfig.siteUrl}/${lang}`,
      siteName: "Xplor Digital",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Xplor Digital",
    url: `${siteConfig.siteUrl}/${lang}`,
    email: siteConfig.contactEmail,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Navbar lang={lang} dict={dict} />
      <main id="main">{children}</main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
