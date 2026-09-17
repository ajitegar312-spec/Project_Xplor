import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import type { LegalDoc } from "@/content/legal";
import { Container } from "../ui/Container";

// Shared, server-only renderer for long legal documents.
// No client JavaScript, no animations — plain semantic, readable typography.
export function LegalDoc({
  lang,
  doc,
  contactHref,
  contactLabel,
}: {
  lang: Locale;
  doc: LegalDoc;
  contactHref: string;
  contactLabel: string;
}) {
  return (
    <article aria-labelledby="legal-title">
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="legal-title">
        <Container className="max-w-3xl">
          <h1 id="legal-title" className="text-3xl font-extrabold tracking-tight dark:text-white sm:text-4xl">
            {pick(doc.title, lang)}
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {pick(doc.updatedLabel, lang)}: {pick(doc.updatedDate, lang)}
          </p>
          {doc.intro.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              {pick(p, lang)}
            </p>
          ))}
        </Container>
      </section>
      <Container className="mt-10 max-w-3xl">
        {doc.sections.map((s) => (
          <section key={pick(s.heading, lang)} aria-label={pick(s.heading, lang)} className="mt-10">
            <h2 className="text-xl font-bold dark:text-white sm:text-2xl">{pick(s.heading, lang)}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {pick(p, lang)}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-slate-600 dark:text-slate-300">
                {s.bullets.map((b, i) => (
                  <li key={i}>{pick(b, lang)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <div className="mt-10 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pick(doc.closingNote, lang)}</p>
          <p className="mt-4">
            <Link
              href={contactHref}
              className="inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
            >
              {contactLabel}
            </Link>
          </p>
        </div>
      </Container>
    </article>
  );
}
