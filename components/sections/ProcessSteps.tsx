import type { Locale } from "@/types";
import { pick } from "@/types";
import { processSteps } from "@/content/site-data";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function ProcessSteps({ lang, eyebrow, title }: { lang: Locale; eyebrow: string; title: string }) {
  return (
    <section aria-label={title} className="mt-20">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-100">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold dark:text-white sm:text-3xl">{title}</h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={pick(s.title, lang)}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                  <h3 className="mt-3 font-bold dark:text-white">{pick(s.title, lang)}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{pick(s.desc, lang)}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
