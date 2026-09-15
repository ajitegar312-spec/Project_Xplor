import type { LeadPayload } from "@/types";

// Frontend talks ONLY to this client. Swap baseUrl to a real backend later
// without touching any UI component. See API_CONTRACT.md.
const base = "";

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const apiClient = {
  sendLead: (payload: LeadPayload) => post<{ ok: true }>("/api/contact", payload),
  subscribe: (email: string) => post<{ ok: true }>("/api/newsletter", { email }),
};
