import type { Metadata } from "next";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { InsightsList } from "@/components/sections/InsightsList";
import { posts, postCategories } from "@/content/insights";

export const metadata: Metadata = { title: "Insights" };

export default async function InsightsPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-14" aria-labelledby="insights-hero">
        <Container className="max-w-3xl">
          <h1 id="insights-hero" className="text-3xl font-extrabold sm:text-4xl">{dict.insightsPage.title}</h1>
          <p className="mt-3 text-slate-600">{dict.insightsPage.subtitle}</p>
        </Container>
      </section>
      <InsightsList lang={lang} dict={dict} categories={postCategories()} posts={posts} />
    </>
  );
}
