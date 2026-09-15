import type { Metadata } from "next";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { works, workCategories } from "@/content/works";

export const metadata: Metadata = { title: "Work" };

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14" aria-labelledby="work-hero">
        <Container className="max-w-3xl">
          <h1 id="work-hero" className="text-3xl font-extrabold sm:text-4xl">{dict.workPage.title}</h1>
          <p className="mt-3 text-slate-600">{dict.workPage.subtitle}</p>
        </Container>
      </section>
      <section className="mt-12" aria-label="Projects">
        <Container>
          <WorkFilter lang={lang} categories={workCategories()} works={works} allLabel={dict.workPage.filterAll} />
        </Container>
      </section>
      <CTA lang={lang} dict={dict} />
    </>
  );
}
