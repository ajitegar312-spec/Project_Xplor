import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates, pageSocial } from "@/lib/metadata";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { services } from "@/content/services";
import { techStack } from "@/content/site-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const title = "Services";
  const description = dict.servicesPage.subtitle;
  return {
    title,
    description,
    alternates: pageAlternates(lang, `/${lang}/services`),
    ...pageSocial(lang, { title, description, pathname: `/${lang}/services` }),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="services-hero">
        <Container className="max-w-3xl">
          <h1 id="services-hero" className="text-3xl font-extrabold dark:text-white sm:text-4xl">{dict.servicesPage.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{dict.servicesPage.subtitle}</p>
        </Container>
      </section>

      <section className="mt-12" aria-label="Service Categories">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.slug} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <Reveal delay={(i % 3) * 70}>
                  <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                  <h2 className="mt-2 text-lg font-bold dark:text-white"><Link href={`/${lang}/services/${s.slug}`}>{pick(s.title, lang)}</Link></h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pick(s.excerpt, lang)}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.stack.map((t) => <li key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs dark:bg-slate-800 dark:text-slate-200">{t}</li>)}
                  </ul>
                  <Link href={`/${lang}/services/${s.slug}`} className="mt-4 inline-block text-sm font-bold text-brand-700 dark:text-brand-100">{dict.sections.services.more} →</Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="mt-16" aria-label="Technology">
        <Container>
          <h2 className="text-2xl font-bold dark:text-white">Technology</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {techStack.map((t) => <li key={t} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium dark:border-slate-700 dark:text-slate-200">{t}</li>)}
          </ul>
        </Container>
      </section>

      <ProcessSteps lang={lang} eyebrow={dict.sections.process.eyebrow} title={dict.sections.process.title} />
      <CTA lang={lang} dict={dict} />
    </>
  );
}
