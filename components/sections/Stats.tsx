import type { Locale } from "@/types";
import { pick } from "@/types";
import { stats } from "@/content/site-data";
import { Container } from "../ui/Container";

export function Stats({ lang, eyebrow, title }: { lang: Locale; eyebrow: string; title: string }) {
  return (
    <section aria-label={title} className="mt-20 bg-slate-50 py-14">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        <dl className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value + pick(s.label, lang)} className="rounded-2xl border bg-white p-6">
              <dt className="order-2 mt-1 text-sm text-slate-600">{pick(s.label, lang)}</dt>
              <dd className="order-1 text-3xl font-extrabold text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
