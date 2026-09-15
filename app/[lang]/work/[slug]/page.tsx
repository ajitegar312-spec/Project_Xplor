import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { pick, locales } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { getWork, workSlugs, works } from "@/content/works";
import { techStack } from "@/content/site-data";

export function generateStaticParams() {
  return locales.flatMap((lang) => workSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const w = getWork(slug);
  if (!w) return { title: "Case Study" };
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  return { title: pick(w.title, lang), description: pick(w.summary, lang) };
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
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="cs-title">
        <Container className="max-w-3xl">
          <p><Link href={`/${lang}/work`} className="text-sm font-bold text-brand-700 dark:text-brand-100">← {dict.nav.work}</Link></p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-100">{w!.category} · {w!.client} · {w!.year}</p>
          <h1 id="cs-title" className="mt-2 text-3xl font-extrabold dark:text-white sm:text-4xl">{pick(w!.title, lang)}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{pick(w!.summary, lang)}</p>
          <div className="mt-6 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-slate-100 text-5xl dark:from-slate-800 dark:to-slate-900" role="img" aria-label={`${w!.client} cover (dummy)`}>◈</div>
        </Container>
      </section>

      <section className="mt-12" aria-label="Case detail">
        <Container className="grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><h2 className="font-bold dark:text-white">Challenge</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pick(w!.challenge, lang)}</p></div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><h2 className="font-bold dark:text-white">Solution</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pick(w!.solution, lang)}</p></div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><h2 className="font-bold dark:text-white">Process</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Discover → Strategize → Build → Launch.</p></div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="font-bold dark:text-white">Technology</h2>
            <ul className="mt-2 flex flex-wrap gap-2">{w!.stack.map((t) => <li key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800 dark:text-slate-200">{t}</li>)}</ul>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Full stack reference: {techStack.slice(0, 6).join(", ")}…</p>
          </div>
        </Container>
      </section>

      <section className="mt-12" aria-label="Result">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-bold dark:text-white">Result</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            {w!.metrics.map((m) => (
              <div key={m.value} className="rounded-2xl bg-ink p-6 text-white dark:border dark:border-slate-800 dark:bg-slate-900">
                <dd className="text-3xl font-extrabold">{m.value}</dd>
                <dt className="mt-1 text-sm text-slate-300">{pick(m.label, lang)}</dt>
              </div>
            ))}
          </dl>
          {w!.quote && (
            <blockquote className="mt-6 rounded-2xl border-l-4 border-brand-600 bg-slate-50 p-6 dark:bg-slate-900">
              <p className="text-slate-700 dark:text-slate-200">{pick(w!.quote, lang)}</p>
              {w!.quoteAuthor && <cite className="mt-2 block text-sm font-bold not-italic dark:text-white">— {w!.quoteAuthor}</cite>}
            </blockquote>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Gallery (dummy)">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex h-32 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">Gallery {i} (dummy)</div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-12" aria-label="Related work">
        <Container className="max-w-4xl">
          <h2 className="text-xl font-bold dark:text-white">Related Work</h2>
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
