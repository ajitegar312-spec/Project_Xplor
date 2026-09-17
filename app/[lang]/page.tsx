import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { Stats } from "@/components/sections/Stats";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { works } from "@/content/works";
import { posts } from "@/content/insights";
import { testimonials, whyChooseUs } from "@/content/site-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  return {
    title: "Xplor Digital — Digital Transformation Partner",
    alternates: pageAlternates(lang, `/${lang}`),
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const featured = works.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white py-16 dark:from-slate-900 dark:to-slate-950 sm:py-24" aria-labelledby="home-hero">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(219,230,254,0.7),transparent)] dark:bg-[radial-gradient(closest-side,rgba(16,28,78,0.35),transparent)]" />
        <Container className="relative max-w-3xl text-center">
          <p className="inline-block rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-700 dark:border-slate-700 dark:text-brand-100">{dict.hero.badge}</p>
          <h1 id="home-hero" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">{dict.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">{dict.hero.subtitle}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href={`/${lang}/contact`} className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition-colors hover:bg-brand-700">{dict.hero.primary}</Link>
            <Link href={`/${lang}/work`} className="rounded-full border border-slate-200 bg-white/60 px-6 py-3 text-sm font-bold transition-colors hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-transparent dark:hover:border-slate-600 dark:hover:bg-slate-900">{dict.hero.secondary}</Link>
          </div>
        </Container>
      </section>

      {/* Company Introduction */}
      <section className="mt-16" aria-labelledby="intro">
        <Container className="max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{dict.sections.intro.eyebrow}</p>
          <h2 id="intro" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.intro.title}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {lang === "id"
              ? "Kami menggabungkan strategi, desain, dan engineering untuk meluncurkan produk yang cepat, aman, dan terukur."
              : "We combine strategy, design, and engineering to launch fast, secure, measurable products."}
          </p>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="mt-14" aria-label={dict.sections.trusted.title}>
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{dict.sections.trusted.eyebrow}</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-slate-500 dark:text-slate-400">
            {["Finova", "MedikaCare", "Arunika", "Karta", "Svara", "Wastu"].map((b) => <li key={b}>{b}</li>)}
          </ul>
        </Container>
      </section>

      {/* Services */}
      <section className="mt-20" aria-labelledby="home-services">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{dict.sections.services.eyebrow}</p>
            <h2 id="home-services" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.services.title}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.slug} className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                <Reveal delay={(i % 3) * 70}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-slate-800" aria-hidden="true">{s.icon}</span>
                  <h3 className="mt-3 font-bold"><Link href={`/${lang}/services/${s.slug}`} className="transition-colors hover:text-brand-700 dark:hover:text-brand-100">{pick(s.title, lang)}</Link></h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pick(s.excerpt, lang)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Featured Work */}
      <section className="mt-20" aria-labelledby="home-work">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{dict.sections.work.eyebrow}</p>
                <h2 id="home-work" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.work.title}</h2>
              </div>
              <Link href={`/${lang}/work`} className="text-sm font-bold text-brand-700 dark:text-brand-100">{dict.sections.work.all} →</Link>
            </div>
          </Reveal>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map((w, i) => (
              <li key={w.slug}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <Link href={`/${lang}/work/${w.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-brand-100 to-slate-100 text-4xl dark:from-slate-800 dark:to-slate-900" aria-hidden="true">◈</div>
                  <div className="flex flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-100">{w.category} · {w.client}</p>
                    <h3 className="mt-1 text-lg font-bold dark:text-white">{pick(w.title, lang)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pick(w.summary, lang)}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 dark:text-brand-100">
                      {dict.workPage.viewCaseStudy} <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="mt-20" aria-labelledby="home-why">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{dict.sections.why.eyebrow}</p>
          <h2 id="home-why" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.why.title}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {whyChooseUs.map((w) => (
              <li key={pick(w.title, lang)} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <h3 className="font-bold">✓ {pick(w.title, lang)}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pick(w.desc, lang)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessSteps lang={lang} eyebrow={dict.sections.process.eyebrow} title={dict.sections.process.title} />
      <Stats lang={lang} eyebrow={dict.sections.stats.eyebrow} title={dict.sections.stats.title} />

      {/* Testimonials */}
      <section className="mt-20" aria-labelledby="home-testimonials">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{dict.sections.testimonials.eyebrow}</p>
            <h2 id="home-testimonials" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.testimonials.title}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <li key={t.author} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <Reveal delay={(i % 3) * 70}>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{pick(t.quote, lang)}</p>
                  <p className="mt-4 text-sm font-bold dark:text-white">{t.author}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Insights */}
      <section className="mt-20" aria-labelledby="home-insights">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{dict.sections.insights.eyebrow}</p>
                <h2 id="home-insights" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.insights.title}</h2>
              </div>
              <Link href={`/${lang}/insights`} className="text-sm font-bold text-brand-700 dark:text-brand-100">{dict.sections.insights.all} →</Link>
            </div>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {latestPosts.map((p, i) => (
              <li key={p.slug} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                <Reveal delay={(i % 3) * 70}>
                  <p className="text-xs font-semibold uppercase text-brand-600 dark:text-brand-100">{p.category}</p>
                  <h3 className="mt-1 font-bold dark:text-white"><Link href={`/${lang}/insights/${p.slug}`}>{pick(p.title, lang)}</Link></h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pick(p.excerpt, lang)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-slate-50 p-6 dark:bg-slate-900">
            <h3 className="font-bold dark:text-white">{dict.newsletter.title}</h3>
            <div className="mt-3"><NewsletterForm dict={dict} /></div>
          </div>
        </Container>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
