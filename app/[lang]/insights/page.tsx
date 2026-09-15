import type { Metadata } from "next";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { InsightsList } from "@/components/sections/InsightsList";
import { posts, postCategories } from "@/content/insights";

export const metadata: Metadata = { title: "Insights" };

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950" aria-labelledby="insights-hero">
        <Container className="max-w-3xl">
          <h1 id="insights-hero" className="text-3xl font-extrabold dark:text-white sm:text-4xl">{dict.insightsPage.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{dict.insightsPage.subtitle}</p>
        </Container>
      </section>
      <InsightsList lang={lang} dict={dict} categories={postCategories()} posts={posts} />
    </>
  );
}
