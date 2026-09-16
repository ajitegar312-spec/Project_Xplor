"use client";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

export function NewsletterForm({ dict }: { dict: any }) {
  const [state, setState] = useState<"idle" | "done">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "");
    if (!email.includes("@")) return;
    try {
      await apiClient.subscribe(email);
      setState("done");
    } catch {
      setState("done");
    }
  }
  if (state === "done") return <p role="status" className="text-sm font-medium">{dict.newsletter.done}</p>;
  return (
    <form onSubmit={onSubmit} className="flex max-w-md gap-2" aria-label={dict.newsletter.title}>
      <label htmlFor="nl-email" className="sr-only">{dict.newsletter.placeholder}</label>
      <input id="nl-email" name="email" type="email" required placeholder={dict.newsletter.placeholder} className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
      <button className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white">{dict.newsletter.button}</button>
    </form>
  );
}
