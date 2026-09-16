import Link from "next/link";
import type { Locale } from "@/types";
import { Container } from "../ui/Container";

export function CTA({ lang, dict }: { lang: Locale; dict: any }) {
  return (
    <section aria-labelledby="cta-title" className="mt-20">
      <Container>
        <div className="rounded-3xl bg-ink px-6 py-14 text-center text-white shadow-xl shadow-slate-900/10 dark:border dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:px-12 sm:py-16">
          <h2 id="cta-title" className="mx-auto max-w-2xl text-2xl font-extrabold tracking-tight sm:text-4xl">{dict.sections.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">{dict.sections.cta.subtitle}</p>
          <Link href={`/${lang}/contact`} className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-brand-50">
            {dict.sections.cta.button}
          </Link>
        </div>
      </Container>
    </section>
  );
}
