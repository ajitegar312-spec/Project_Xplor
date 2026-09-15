import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { services } from "@/content/services";
import { techStack } from "@/content/site-data";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14" aria-labelledby="services-hero">
        <Container className="max-w-3xl">
          <h1 id="services-hero" className="text-3xl font-extrabold sm:text-4xl">{dict.servicesPage.title}</h1>
          <p className="mt-3 text-slate-600">{dict.servicesPage.subtitle}</p>
        </Container>
      </section>

      <section className="mt-12" aria-label="Service Categories">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="rounded-2xl border p-6">
                <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                <h2 className="mt-2 text-lg font-bold"><Link href={`/${lang}/services/${s.slug}`}>{pick(s.title, lang)}</Link></h2>
                <p className="mt-1 text-sm text-slate-600">{pick(s.excerpt, lang)}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.stack.map((t) => <li key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs">{t}</li>)}
                </ul>
                <Link href={`/${lang}/services/${s.slug}`} className="mt-4 inline-block text-sm font-bold text-brand-700">{dict.sections.services.more} →</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="mt-16" aria-label="Technology">
        <Container>
          <h2 className="text-2xl font-bold">Technology</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {techStack.map((t) => <li key={t} className="rounded-full border px-4 py-1.5 text-sm font-medium">{t}</li>)}
          </ul>
        </Container>
      </section>

      <ProcessSteps lang={lang} eyebrow={dict.sections.process.eyebrow} title={dict.sections.process.title} />
      <CTA lang={lang} dict={dict} />
    </>
  );
}
