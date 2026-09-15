import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { pick, locales } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { getService, serviceSlugs } from "@/content/services";

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const s = getService(params.slug);
  if (!s) return { title: "Service" };
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  return { title: pick(s.title, lang), description: pick(s.excerpt, lang) };
}

export default async function ServiceDetail({ params }: { params: { lang: string; slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14" aria-labelledby="svc-title">
        <Container className="max-w-3xl">
          <p><Link href={`/${lang}/services`} className="text-sm font-bold text-brand-700">← {dict.nav.services}</Link></p>
          <h1 id="svc-title" className="mt-2 text-3xl font-extrabold sm:text-4xl">{pick(s!.title, lang)} {s!.icon}</h1>
          <p className="mt-3 text-slate-600">{pick(s!.body, lang)}</p>
        </Container>
      </section>
      <section className="mt-12" aria-label="Deliverables">
        <Container className="grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h2 className="font-bold">Deliverables</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {s!.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border p-6">
            <h2 className="font-bold">Technology</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {s!.stack.map((t) => <li key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">{t}</li>)}
            </ul>
          </div>
        </Container>
      </section>
      <ProcessSteps lang={lang} eyebrow={dict.sections.process.eyebrow} title={dict.sections.process.title} />
      <CTA lang={lang} dict={dict} />
    </>
  );
}
