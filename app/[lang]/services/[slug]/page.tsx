import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { pick, locales } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates, pageSocial } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { getService, serviceSlugs } from "@/content/services";

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service" };
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const title = pick(s.title, lang);
  const description = pick(s.excerpt, lang);
  const pathname = `/${lang}/services/${slug}`;
  return { title, description, alternates: pageAlternates(lang, pathname), ...pageSocial(lang, { title, description, pathname }) };
}

export default async function ServiceDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${siteConfig.siteUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: dict.nav.services, item: `${siteConfig.siteUrl}/${lang}/services` },
      { "@type": "ListItem", position: 3, name: pick(s!.title, lang) },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="svc-title">
        <Container className="max-w-3xl">
          <p><Link href={`/${lang}/services`} className="text-sm font-bold text-brand-700 dark:text-brand-100">← {dict.nav.services}</Link></p>
          <h1 id="svc-title" className="mt-2 text-3xl font-extrabold dark:text-white sm:text-4xl">{pick(s!.title, lang)} {s!.icon}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{pick(s!.body, lang)}</p>
        </Container>
      </section>
      <section className="mt-12" aria-label="Deliverables">
        <Container className="grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="font-bold dark:text-white">Deliverables</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
              {s!.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="font-bold dark:text-white">Technology</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {s!.stack.map((t) => <li key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800 dark:text-slate-200">{t}</li>)}
            </ul>
          </div>
        </Container>
      </section>
      <ProcessSteps lang={lang} eyebrow={dict.sections.process.eyebrow} title={dict.sections.process.title} />
      <CTA lang={lang} dict={dict} />
    </>
  );
}
