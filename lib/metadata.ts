import type { Metadata } from "next";
import type { Locale } from "@/types";
import { siteConfig } from "@/lib/site-config";

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

// Per-page social metadata. Without this, detail pages inherit the lang
// home's OG url/title — wrong previews and duplicate signals. `pathname`
// must be the page's own path. Images are inherited from the nearest
// opengraph-image/twitter-image convention files.
export function pageSocial(
  lang: Locale,
  opts: { title: string; description: string; pathname: string }
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? ["en_US"] : ["id_ID"],
      url: `${siteConfig.siteUrl}${opts.pathname}`,
      siteName: "Xplor Digital",
      title: opts.title,
      description: opts.description,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
