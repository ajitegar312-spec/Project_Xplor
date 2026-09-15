"use client";
import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";

export function WorkFilter({ lang, categories, works, allLabel, viewLabel }: {
  lang: Locale;
  categories: string[];
  works: { slug: string; category: string; title: { id: string; en: string }; summary: { id: string; en: string }; client: string }[];
  allLabel: string;
  viewLabel?: string;
}) {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? works : works.filter((w) => w.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${cat === c ? "bg-ink text-white" : "text-slate-600"}`}
          >
            {c === "All" ? allLabel : c}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {list.map((w) => (
          <li key={w.slug} className="overflow-hidden rounded-2xl border">
            <div className="flex h-36 items-center justify-center bg-gradient-to-br from-brand-100 to-slate-100 text-4xl" aria-hidden="true">◈</div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{w.category} · {w.client}</p>
              <h3 className="mt-1 font-bold"><Link href={`/${lang}/work/${w.slug}`}>{pick(w.title, lang)}</Link></h3>
              <p className="mt-1 text-sm text-slate-600">{pick(w.summary, lang)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
