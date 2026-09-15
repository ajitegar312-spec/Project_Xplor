"use client";
import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

export function InsightsList({ lang, dict, categories, posts }: {
  lang: Locale;
  dict: any;
  categories: string[];
  posts: { slug: string; category: string; date: string; author: string; title: { id: string; en: string }; excerpt: { id: string; en: string } }[];
}) {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const featured = posts[0];
  return (
    <>
      {featured && (
        <section aria-label="Featured" className="mt-8">
          <Container>
            <Link href={`/${lang}/insights/${featured.slug}`} className="block rounded-3xl bg-ink p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">{featured.category} · Featured</p>
              <h2 className="mt-2 text-2xl font-bold">{pick(featured.title, lang)}</h2>
              <p className="mt-2 text-slate-300">{pick(featured.excerpt, lang)}</p>
            </Link>
          </Container>
        </section>
      )}
      <section className="mt-10" aria-label="Articles">
        <Container>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Categories">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${cat === c ? "bg-ink text-white" : "text-slate-600"}`}>{c}</button>
            ))}
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {list.map((p) => (
              <li key={p.slug} className="rounded-2xl border p-6">
                <p className="text-xs font-semibold uppercase text-brand-600">{p.category} · {p.date} · {p.author}</p>
                <h3 className="mt-1 font-bold"><Link href={`/${lang}/insights/${p.slug}`}>{pick(p.title, lang)}</Link></h3>
                <p className="mt-1 text-sm text-slate-600">{pick(p.excerpt, lang)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-slate-50 p-6">
            <h3 className="font-bold">{dict.newsletter.title}</h3>
            <div className="mt-3"><NewsletterForm dict={dict} /></div>
          </div>
        </Container>
      </section>
    </>
  );
}
