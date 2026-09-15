import type { Metadata } from "next";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { Stats } from "@/components/sections/Stats";
import { team } from "@/content/site-data";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="about-hero">
        <Container className="max-w-3xl">
          <h1 id="about-hero" className="text-3xl font-extrabold dark:text-white sm:text-4xl">{dict.nav.about}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {lang === "id" ? "Studio teknologi yang mengutamakan strategi, kualitas engineering, dan kemitraan jangka panjang." : "A technology studio focused on strategy, engineering quality, and long-term partnership."}
          </p>
        </Container>
      </section>

      <section className="mt-14" aria-labelledby="story">
        <Container className="max-w-3xl">
          <h2 id="story" className="text-2xl font-bold dark:text-white">{dict.about.storyTitle}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {lang === "id"
              ? "Xplor Digital bermula dari tim kecil engineer dan desainer (dummy). Kini kami melayani 20+ klien dengan 50+ proyek terkirim."
              : "Xplor Digital started as a small team of engineers and designers (dummy). Today we serve 20+ clients across 50+ shipped projects."}
          </p>
        </Container>
      </section>

      <section className="mt-14" aria-labelledby="mission">
        <Container className="grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 id="mission" className="text-xl font-bold dark:text-white">{dict.about.missionTitle}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {lang === "id" ? "Misi: membantu bisnis meluncurkan produk digital yang cepat dan terukur. Visi: menjadi partner transformasi digital paling dipercaya di Asia Tenggara." : "Mission: help businesses launch fast, measurable digital products. Vision: become Southeast Asia's most trusted digital transformation partner."}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="text-xl font-bold dark:text-white">{dict.about.valuesTitle}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>Strategy first</li>
              <li>Engineering excellence</li>
              <li>Transparency</li>
              <li>Long-term ownership</li>
            </ul>
          </div>
        </Container>
      </section>

      <Stats lang={lang} eyebrow={dict.sections.stats.eyebrow} title={dict.sections.stats.title} />

      <section className="mt-16" aria-labelledby="team">
        <Container>
          <h2 id="team" className="text-2xl font-bold dark:text-white">{dict.about.teamTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xl font-bold dark:bg-slate-800 dark:text-slate-100" aria-hidden="true">
                  {m.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </div>
                <p className="mt-3 font-bold dark:text-white">{m.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{pick(m.role, lang)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTA lang={lang} dict={dict} />
    </>
  );
}
