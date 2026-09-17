import type { Metadata } from "next";
import type { Locale } from "@/types";

type Alternates = NonNullable<Metadata["alternates"]>;

// Self-referencing alternates for any page: canonical points to the page
// itself, and each hreflang points to the same page in that locale.
// `pathname` must be the page's own path, e.g. `/${lang}/work/${slug}`.
export function pageAlternates(lang: Locale, pathname: string): Alternates {
  const other: Locale = lang === "id" ? "en" : "id";
  const inLocale = (target: Locale): string =>
    pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${target}`);
  return {
    canonical: pathname,
    languages: {
      [lang]: pathname,
      [other]: inLocale(other),
      "x-default": inLocale("id"),
    },
  };
}
