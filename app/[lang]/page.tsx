import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { Stats } from "@/components/sections/Stats";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { services } from "@/content/services";
import { works } from "@/content/works";
import { posts } from "@/content/insights";
import { testimonials, whyChooseUs } from "@/content/site-data";

export const metadata: Metadata = { title: "Xplor Digital — Digital Transformation Partner" };

export default async function HomePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const featured = works.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-24" aria-labelledby="home-hero">
        <Container className="max-w-3xl text-center">
          <p className="inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-700">{dict.hero.badge}</p>
          <h1 id="home-hero" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">{dict.hero.title}</h1>
          <p className="mt-4 text-slate-600">{dict.hero.subtitle}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href={`/${lang}/contact`} className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white">{dict.hero.primary}</Link>
            <Link href={`/${lang}/work`} className="rounded-full border px-6 py-3 text-sm font-bold">{dict.hero.secondary}</Link>
          </div>
        </Container>
      </section>

      {/* Company Introduction */}
      <section className="mt-16" aria-labelledby="intro">
        <Container className="max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{dict.sections.intro.eyebrow}</p>
          <h2 id="intro" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.intro.title}</h2>
          <p className="mt-3 text-slate-600">
            {lang === "id"
              ? "Kami menggabungkan strategi, desain, dan engineering untuk meluncurkan produk yang cepat, aman, dan terukur."
              : "We combine strategy, design, and engineering to launch fast, secure, measurable products."}
          </p>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="mt-14" aria-label={dict.sections.trusted.title}>
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{dict.sections.trusted.eyebrow}</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-slate-400">
            {["Finova", "MedikaCare", "Arunika", "Karta", "Svara", "Wastu"].map((b) => <li key={b}>{b}</li>)}
          </ul>
        </Container>
      </section>

      {/* Services */}
      <section className="mt-20" aria-labelledby="home-services">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{dict.sections.services.eyebrow}</p>
          <h2 id="home-services" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.services.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="rounded-2xl border p-6">
                <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                <h3 className="mt-2 font-bold"><Link href={`/${lang}/services/${s.slug}`}>{pick(s.title, lang)}</Link></h3>
                <p className="mt-1 text-sm text-slate-600">{pick(s.excerpt, lang)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Featured Work */}
      <section className="mt-20" aria-labelledby="home-work">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{dict.sections.work.eyebrow}</p>
              <h2 id="home-work" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.work.title}</h2>
            </div>
            <Link href={`/${lang}/work`} className="text-sm font-bold text-brand-700">{dict.sections.work.all} →</Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map((w) => (
              <li key={w.slug} className="overflow-hidden rounded-2xl border">
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-brand-100 to-slate-100 text-4xl" aria-hidden="true">◈</div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{w.category} · {w.client}</p>
                  <h3 className="mt-1 font-bold"><Link href={`/${lang}/work/${w.slug}`}>{pick(w.title, lang)}</Link></h3>
                  <p className="mt-1 text-sm text-slate-600">{pick(w.summary, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="mt-20" aria-labelledby="home-why">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{dict.sections.why.eyebrow}</p>
          <h2 id="home-why" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.why.title}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {whyChooseUs.map((w) => (
              <li key={pick(w.title, lang)} className="rounded-2xl border p-6">
                <h3 className="font-bold">✓ {pick(w.title, lang)}</h3>
                <p className="mt-1 text-sm text-slate-600">{pick(w.desc, lang)}</p>
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{dict.sections.testimonials.eyebrow}</p>
          <h2 id="home-testimonials" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.testimonials.title}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.author} className="rounded-2xl border p-6">
                <p className="text-sm text-slate-700">{pick(t.quote, lang)}</p>
                <p className="mt-4 text-sm font-bold">{t.author}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Insights */}
      <section className="mt-20" aria-labelledby="home-insights">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{dict.sections.insights.eyebrow}</p>
              <h2 id="home-insights" className="mt-2 text-2xl font-bold sm:text-3xl">{dict.sections.insights.title}</h2>
            </div>
            <Link href={`/${lang}/insights`} className="text-sm font-bold text-brand-700">{dict.sections.insights.all} →</Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {latestPosts.map((p) => (
              <li key={p.slug} className="rounded-2xl border p-6">
                <p className="text-xs font-semibold uppercase text-brand-600">{p.category}</p>
                <h3 className="mt-1 font-bold"><Link href={`/${lang}/insights/${p.slug}`}>{pick(p.title, lang)}</Link></h3>
                <p className="mt-1 text-sm text-slate-600">{pick(p.excerpt, lang)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-slate-50 p-6">
            <h3 className="font-bold">{dict.newsletter.title}</h3>
            <div className="mt-3"><NewsletterForm dict={dict} /></div>
          </div>
        </Container>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
