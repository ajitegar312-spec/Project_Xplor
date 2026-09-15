import type { Faq, Locale } from "@/types";
import { pick } from "@/types";
import { Container } from "../ui/Container";

export function FAQ({ lang, title, faqs }: { lang: Locale; title: string; faqs: Faq[] }) {
  return (
    <section aria-label={title} className="mt-20">
      <Container className="max-w-3xl">
        <h2 className="text-2xl font-bold dark:text-white sm:text-3xl">{title}</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={pick(f.q, lang)} className="group rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <summary className="cursor-pointer font-semibold dark:text-slate-100">{pick(f.q, lang)}</summary>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pick(f.a, lang)}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
