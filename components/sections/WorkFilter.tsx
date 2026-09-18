"use client";
import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/types";
import { pick } from "@/types";
import { Reveal } from "../ui/Reveal";

export function WorkFilter({ lang, categories, works, allLabel, viewLabel, filterLabel }: {
  lang: Locale;
  categories: string[];
  works: { slug: string; category: string; title: { id: string; en: string }; summary: { id: string; en: string }; stack: string[]; client: string }[];
  allLabel: string;
  viewLabel?: string;
  filterLabel: string;
}) {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? works : works.filter((w) => w.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={filterLabel}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? "bg-ink text-white dark:bg-slate-100 dark:text-slate-950" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-ink dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"}`}
          >
            {c === "All" ? allLabel : c}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w, i) => (
          <li key={w.slug}>
            <Reveal delay={(i % 3) * 70} className="h-full">
              <Link
              href={`/${lang}/work/${w.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left hover:border-brand-100 hover:shadow-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-100">{w.category} · {w.client}</p>
              <h3 className="mt-2 text-xl font-bold dark:text-white">{pick(w.title, lang)}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pick(w.summary, lang)}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {w.stack.slice(0, 4).map((t) => (
                  <li key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t}</li>
                ))}
                {w.stack.length > 4 && (
                  <li className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">+{w.stack.length - 4}</li>
                )}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 dark:text-brand-100">
                {viewLabel ?? "View Case Study"} <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
