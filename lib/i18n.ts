import { Locale, defaultLocale, locales } from "@/types";
import idDict from "@/dictionaries/id.json";
import enDict from "@/dictionaries/en.json";

export function isLocale(v: string): v is Locale {
  return (locales as string[]).includes(v);
}

export function getLocale(params?: { lang?: string }): Locale {
  if (params?.lang && isLocale(params.lang)) return params.lang;
  return defaultLocale;
}

export async function getDictionary(lang: Locale) {
  return lang === "en" ? enDict : idDict;
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
