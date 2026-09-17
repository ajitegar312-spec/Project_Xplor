import type { Metadata } from "next";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";
import { siteConfig, waLink } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { faqs } from "@/content/site-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  return { title: "Contact", alternates: pageAlternates(lang, `/${lang}/contact`) };
}

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
            </ul>
          </div>
          <div className="lg:col-span-2">
            <ContactForm dict={dict} />
          </div>
        </Container>
      </section>

      <FAQ lang={lang} title={dict.contactPage.faqTitle} faqs={faqs} />
    </>
  );
}
