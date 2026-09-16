// Shared validation for lead/newsletter forms (client + API routes).
// No dependencies — regex ringan, trim + length-cap konsisten.

export const MAX_LEN = {
  name: 100,
  email: 254,
  company: 120,
  budget: 40,
  message: 5000,
} as const;

export function trimCapped(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

export function isEmail(v: string): boolean {
  const email = v.trim();
  if (email.length < 3 || email.length > MAX_LEN.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type NormalizedLead = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
};

export function normalizeLead(body: Record<string, unknown>): NormalizedLead {
  const name = trimCapped(body.name, MAX_LEN.name);
  const email = trimCapped(body.email, MAX_LEN.email);
  const message = trimCapped(body.message, MAX_LEN.message);
  const companyRaw = trimCapped(body.company, MAX_LEN.company);
  const budgetRaw = trimCapped(body.budget, MAX_LEN.budget);
  return {
    name,
    email,
    message,
    ...(companyRaw ? { company: companyRaw } : {}),
    ...(budgetRaw ? { budget: budgetRaw } : {}),
  };
}

export function isValidLead(lead: NormalizedLead): boolean {
  return Boolean(lead.name) && isEmail(lead.email) && Boolean(lead.message);
}

export function normalizeEmail(v: unknown): string {
  return trimCapped(v, MAX_LEN.email);
}
