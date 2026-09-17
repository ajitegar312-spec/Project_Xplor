import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { pick, locales } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { getWork, workSlugs, works } from "@/content/works";

export function generateStaticParams() {
  return locales.flatMap((lang) => workSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const w = getWork(slug);
  if (!w) return { title: "Case Study" };
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  return { title: pick(w.title, lang), description: pick(w.summary, lang), alternates: pageAlternates(lang, `/${lang}/work/${slug}`) };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const related = works.filter((x) => x.slug !== w!.slug).slice(0, 2);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950 sm:py-20" aria-labelledby="cs-title">
        <Container className="max-w-3xl">
          <p><Link href={`/${lang}/work`} className="text-sm font-bold text-brand-700 dark:text-brand-100">← {dict.nav.work}</Link></p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{w!.category} · {w!.client}</p>
          <h1 id="cs-title" className="mt-3 text-3xl font-extrabold tracking-tight dark:text-white sm:text-5xl">{pick(w!.title, lang)}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{pick(w!.summary, lang)}</p>
          <div className="mt-8">
            <Link href={`/${lang}/contact`} className="inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition-colors hover:bg-brand-700">
              {dict.caseStudy.cta} →
            </Link>
          </div>
          <ProjectVisual monogram={w!.client.charAt(0)} className="mt-10 h-52 sm:h-72" />
        </Container>
      </section>

      <section className="mt-14" aria-label="Case detail">
        <Container className="grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800 sm:p-8">
            <h2 className="text-xl font-bold dark:text-white">{dict.caseStudy.challenge}</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{pick(w!.challenge, lang)}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800 sm:p-8">
            <h2 className="text-xl font-bold dark:text-white">{dict.caseStudy.solution}</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{pick(w!.solution, lang)}</p>
          </div>
        </Container>
      </section>

      <section className="mt-14" aria-labelledby="cs-features">
        <Container className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{w!.client}</p>
          <h2 id="cs-features" className="mt-2 text-2xl font-bold dark:text-white sm:text-3xl">{dict.caseStudy.features}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {w!.features.map((f) => (
              <li key={pick(f, lang)} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">✓</span>
                <span className="text-sm font-medium leading-relaxed dark:text-slate-200">{pick(f, lang)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="mt-14" aria-labelledby="cs-technology">
        <Container className="max-w-4xl">
          <h2 id="cs-technology" className="text-2xl font-bold dark:text-white sm:text-3xl">{dict.caseStudy.technology}</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {w!.stack.map((t) => (
              <li key={t} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">{t}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="mt-14" aria-labelledby="cs-outcome">
        <Container className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{w!.client}</p>
          <h2 id="cs-outcome" className="mt-2 text-2xl font-bold dark:text-white sm:text-3xl">{dict.caseStudy.outcome}</h2>
          <ul className="mt-6 space-y-3">
            {w!.outcomes.map((o) => (
              <li key={pick(o, lang)} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">✓</span>
                <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{pick(o, lang)}</span>
              </li>
            ))}
          </ul>
          {w!.quote && (
            <blockquote className="mt-6 rounded-2xl border-l-4 border-brand-600 bg-slate-50 p-6 dark:bg-slate-900 sm:p-8">
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">{pick(w!.quote, lang)}</p>
              {w!.quoteAuthor && <cite className="mt-2 block text-sm font-bold not-italic dark:text-white">— {w!.quoteAuthor}</cite>}
            </blockquote>
          )}
        </Container>
      </section>

      <section className="mt-14" aria-label={dict.caseStudy.related}>
        <Container className="max-w-4xl">
          <h2 className="text-xl font-bold dark:text-white">{dict.caseStudy.related}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <Link href={`/${lang}/work/${r.slug}`} className="font-bold dark:text-white">{pick(r.title, lang)}</Link>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pick(r.summary, lang)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
