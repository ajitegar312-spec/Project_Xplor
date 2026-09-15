"use client";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

export function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      budget: String(fd.get("budget") || ""),
      message: String(fd.get("message") || ""),
    };
    if (!payload.name || !payload.email.includes("@") || !payload.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await apiClient.sendLead(payload);
      setStatus("done");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 p-6 dark:border-slate-800" aria-label={dict.contactPage.formTitle}>
      <h2 className="text-xl font-bold dark:text-white">{dict.contactPage.formTitle}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1 block text-sm font-medium">{dict.contactPage.name}</label>
          <input id="cf-name" name="name" required autoComplete="name" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1 block text-sm font-medium">{dict.contactPage.email}</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-company" className="mb-1 block text-sm font-medium">{dict.contactPage.company}</label>
          <input id="cf-company" name="company" autoComplete="organization" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </div>
        <div>
          <label htmlFor="cf-budget" className="mb-1 block text-sm font-medium">{dict.contactPage.budget}</label>
          <select id="cf-budget" name="budget" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <option value="">—</option>
            <option>&lt; $5k</option>
            <option>$5k – $15k</option>
            <option>$15k – $50k</option>
            <option>$50k+</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1 block text-sm font-medium">{dict.contactPage.message}</label>
        <textarea id="cf-message" name="message" required rows={5} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
      </div>
      <button disabled={status === "sending"} className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
        {status === "sending" ? dict.contactPage.sending : dict.contactPage.submit}
      </button>
      {status === "done" && <p role="status" className="text-sm text-green-700 dark:text-green-400">{dict.contactPage.success}</p>}
      {status === "error" && <p role="alert" className="text-sm text-red-700 dark:text-red-400">{dict.contactPage.error}</p>}
    </form>
  );
}
