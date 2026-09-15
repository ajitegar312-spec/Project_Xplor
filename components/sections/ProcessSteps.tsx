import type { Locale } from "@/types";
import { pick } from "@/types";
import { processSteps } from "@/content/site-data";
import { Container } from "../ui/Container";

export function ProcessSteps({ lang, eyebrow, title }: { lang: Locale; eyebrow: string; title: string }) {
  return (
    <section aria-label={title} className="mt-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={pick(s.title, lang)} className="rounded-2xl border p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 font-bold">{pick(s.title, lang)}</h3>
              <p className="mt-1 text-sm text-slate-600">{pick(s.desc, lang)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
