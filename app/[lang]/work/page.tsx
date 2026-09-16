import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { works, workCategories } from "@/content/works";

export const metadata: Metadata = { title: "Work" };

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const featured = works[0];
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="work-hero">
        <Container className="max-w-3xl">
          <h1 id="work-hero" className="text-3xl font-extrabold dark:text-white sm:text-4xl">{dict.workPage.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{dict.workPage.subtitle}</p>
        </Container>
      </section>
      {featured && (
        <section aria-labelledby="featured-work" className="mt-12">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{dict.workPage.featured}</p>
            <Link
              href={`/${lang}/work/${featured.slug}`}
              className="group mt-4 grid overflow-hidden rounded-3xl border border-slate-200 bg-white hover:shadow-xl motion-safe:transition-all motion-safe:duration-200 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2"
            >
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-100">{featured.category} · {featured.client} · {featured.year}</p>
                <h2 id="featured-work" className="mt-3 text-3xl font-extrabold tracking-tight dark:text-white sm:text-4xl">{pick(featured.title, lang)}</h2>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{pick(featured.summary, lang)}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {featured.stack.map((t) => (
                    <li key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t}</li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 dark:text-brand-100">
                  {dict.workPage.viewCaseStudy} <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5">→</span>
                </span>
              </div>
              <ProjectVisual monogram={featured.client.charAt(0)} className="m-4 mt-0 min-h-60 md:m-6 md:ml-0 md:mt-6 md:min-h-[320px]" />
            </Link>
          </Container>
        </section>
      )}
      <section className="mt-12" aria-label="Projects">
        <Container>
          <WorkFilter lang={lang} categories={workCategories()} works={works} allLabel={dict.workPage.filterAll} viewLabel={dict.workPage.viewCaseStudy} />
        </Container>
      </section>
      <CTA lang={lang} dict={dict} />
    </>
  );
}
