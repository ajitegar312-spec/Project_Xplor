import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { pick, locales } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { getPost, postSlugs, posts } from "@/content/insights";

export function generateStaticParams() {
  return locales.flatMap((lang) => postSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const p = getPost(params.slug);
  if (!p) return { title: "Article" };
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  return { title: pick(p.title, lang), description: pick(p.excerpt, lang) };
}

export default async function PostDetail({ params }: { params: { lang: string; slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const lang = (params.lang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const related = posts.filter((x) => x.slug !== p!.slug).slice(0, 2);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pick(p!.title, lang),
    author: p!.author,
    datePublished: p!.date,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article aria-labelledby="post-title">
        <section className="bg-gradient-to-b from-brand-50 to-white py-14">
          <Container className="max-w-3xl">
            <p><Link href={`/${lang}/insights`} className="text-sm font-bold text-brand-700">← {dict.nav.insights}</Link></p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-600">{p!.category} · {p!.date} · {p!.readMinutes} min · {p!.author}</p>
            <h1 id="post-title" className="mt-2 text-3xl font-extrabold sm:text-4xl">{pick(p!.title, lang)}</h1>
            <p className="mt-3 text-slate-600">{pick(p!.excerpt, lang)}</p>
          </Container>
        </section>
        <Container className="mt-8 max-w-3xl">
          <p className="leading-relaxed text-slate-700">{pick(p!.body, lang)}</p>
          <p className="mt-4 leading-relaxed text-slate-700">
            {lang === "id" ? "Paragraf dummy kedua untuk menguji tipografi dan ritme baca. Ganti dengan konten CMS nanti." : "Second dummy paragraph to test typography and reading rhythm. Replace with CMS content later."}
          </p>
          <h2 className="mt-8 text-xl font-bold">Related</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="rounded-2xl border p-5">
                <Link href={`/${lang}/insights/${r.slug}`} className="font-bold">{pick(r.title, lang)}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </article>
    </>
  );
}
