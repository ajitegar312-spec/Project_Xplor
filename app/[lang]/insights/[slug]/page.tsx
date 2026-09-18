import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { pick, locales } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { pageAlternates, pageSocial } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { getPost, postSlugs, posts } from "@/content/insights";

export function generateStaticParams() {
  return locales.flatMap((lang) => postSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Article" };
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const title = pick(p.title, lang);
  const description = pick(p.excerpt, lang);
  const pathname = `/${lang}/insights/${slug}`;
  return { title, description, alternates: pageAlternates(lang, pathname), ...pageSocial(lang, { title, description, pathname }) };
}

export default async function PostDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const lang = (rawLang === "en" ? "en" : "id") as Locale;
  const dict = await getDictionary(lang);
  const related = posts.filter((x) => x.slug !== p!.slug).slice(0, 2);
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${siteConfig.siteUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: dict.nav.insights, item: `${siteConfig.siteUrl}/${lang}/insights` },
      { "@type": "ListItem", position: 3, name: pick(p!.title, lang) },
    ],
  };
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article aria-labelledby="post-title">
        <section className="bg-gradient-to-b from-brand-50 to-white py-14 dark:from-slate-900 dark:to-slate-950">
          <Container className="max-w-3xl">
            <p><Link href={`/${lang}/insights`} className="text-sm font-bold text-brand-700 dark:text-brand-100">← {dict.nav.insights}</Link></p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-100">{p!.category} · {p!.date} · {p!.readMinutes} min · {p!.author}</p>
            <h1 id="post-title" className="mt-2 text-3xl font-extrabold dark:text-white sm:text-4xl">{pick(p!.title, lang)}</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{pick(p!.excerpt, lang)}</p>
          </Container>
        </section>
        <Container className="mt-8 max-w-3xl">
          {pick(p!.body, lang)
            .split("\n\n")
            .map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-slate-700 first:mt-0 dark:text-slate-200">
                {para}
              </p>
            ))}
          <h2 className="mt-8 text-xl font-bold dark:text-white">Related</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <Link href={`/${lang}/insights/${r.slug}`} className="font-bold dark:text-white">{pick(r.title, lang)}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </article>
    </>
  );
}
