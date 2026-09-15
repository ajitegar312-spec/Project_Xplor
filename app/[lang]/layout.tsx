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

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: "Xplor Digital — Digital Transformation Partner", template: "%s | Xplor Digital" },
    description:
      lang === "id"
        ? "Xplor Digital: web development, mobile apps, UI/UX, cloud & DevOps, IT consulting."
        : "Xplor Digital: web development, mobile apps, UI/UX, cloud & DevOps, IT consulting.",
    alternates: {
      canonical: `/${lang}`,
      languages: { id: "/id", en: "/en", "x-default": "/id" },
    },
    openGraph: { type: "website", locale: lang === "id" ? "id_ID" : "en_US", siteName: "Xplor Digital" },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!locales.includes(params.lang as Locale)) notFound();
  const lang = params.lang as Locale;
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
