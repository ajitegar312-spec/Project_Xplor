import type { Metadata } from "next";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { siteConfig, waLink } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { faqs } from "@/content/site-data";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="contact-hero">
        <Container className="max-w-3xl">
          <h1 id="contact-hero" className="text-3xl font-extrabold dark:text-white sm:text-4xl">{dict.contactPage.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{dict.contactPage.subtitle}</p>
        </Container>
      </section>

      <section className="mt-12" aria-label={dict.contactPage.infoTitle}>
        <Container className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="font-bold dark:text-white">{dict.contactPage.infoTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><span className="font-medium dark:text-slate-200">Email: </span><a className="text-brand-700 underline dark:text-brand-100" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
              <li><span className="font-medium dark:text-slate-200">WhatsApp: </span><a className="text-brand-700 underline dark:text-brand-100" href={waLink()}>{siteConfig.waNumber}</a></li>
              <li className="text-slate-600 dark:text-slate-300"><span className="font-medium dark:text-slate-200">Address (dummy): </span>{lang === "id" ? siteConfig.addressId : siteConfig.addressEn}</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{dict.footer.dummy}</p>
          </div>
          <div className="lg:col-span-2">
            <ContactForm dict={dict} />
          </div>
        </Container>
      </section>

      <FAQ lang={lang} title={dict.contactPage.faqTitle} faqs={faqs} />

      <section className="mt-16" aria-labelledby="map">
        <Container className="max-w-4xl">
          <h2 id="map" className="text-2xl font-bold dark:text-white">{dict.contactPage.mapTitle}</h2>
          {/* Dummy static map — dev only, no real embed */}
          <div className="mt-4 flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl" aria-hidden="true">🗺️</p>
            <p className="text-sm font-medium dark:text-slate-200">Jakarta, Indonesia — dummy location for development</p>
            <a className="text-sm font-bold text-brand-700 underline dark:text-brand-100" href="https://maps.google.com/?q=Jakarta" target="_blank" rel="noreferrer">Open in Google Maps</a>
          </div>
        </Container>
      </section>
    </>
  );
}
