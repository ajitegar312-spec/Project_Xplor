export type Locale = "id" | "en";
export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "id";

export type Localized = { id: string; en: string };
export const pick = (v: Localized, lang: Locale): string => v[lang];

export type Stat = { value: string; label: Localized };
export type WhyItem = { title: Localized; desc: Localized };
export type ProcessStep = { title: Localized; desc: Localized };
export type Faq = { q: Localized; a: Localized };

export type Service = {
  slug: string;
  icon: string;
  title: Localized;
  excerpt: Localized;
  body: Localized;
  deliverables: string[];
  stack: string[];
};

export type WorkMetric = { value: string; label: Localized };
export type Work = {
  slug: string;
  client: string;
  year: string;
  category: string;
  title: Localized;
  summary: Localized;
  challenge: Localized;
  solution: Localized;
  stack: string[];
  metrics: WorkMetric[];
  quote?: Localized;
  quoteAuthor?: string;
};

export type Post = {
  slug: string;
  category: string;
  date: string;
  author: string;
  readMinutes: number;
  title: Localized;
  excerpt: Localized;
  body: Localized;
};

export type TeamMember = { name: string; role: Localized };
export type Testimonial = { quote: Localized; author: string; role: string };

export type LeadPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
};
