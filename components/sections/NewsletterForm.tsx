"use client";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import type { Dictionary } from "@/lib/i18n";
import { MAX_LEN, isEmail, normalizeEmail } from "@/lib/validate";

export function NewsletterForm({ dict }: { dict: Dictionary }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = normalizeEmail(new FormData(e.currentTarget).get("email"));
    if (!isEmail(email)) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      await apiClient.subscribe(email);
      setState("done");
    } catch {
      setState("error");
    }
  }
  if (state === "done") return <p role="status" className="text-sm font-medium">{dict.newsletter.done}</p>;
  return (
    <div>
      <form onSubmit={onSubmit} className="flex max-w-md gap-2" aria-label={dict.newsletter.title}>
        <label htmlFor="nl-email" className="sr-only">{dict.newsletter.placeholder}</label>
        <input id="nl-email" name="email" type="email" required maxLength={MAX_LEN.email} placeholder={dict.newsletter.placeholder} className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        <button disabled={state === "sending"} className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white">
          {state === "sending" ? dict.newsletter.sending : dict.newsletter.button}
        </button>
      </form>
      {state === "error" && <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-400">{dict.newsletter.error}</p>}
    </div>
  );
}
