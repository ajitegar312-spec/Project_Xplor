import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { locales } from "@/types";
import { serviceSlugs } from "@/content/services";
import { workSlugs } from "@/content/works";
import { postSlugs } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const urls: MetadataRoute.Sitemap = [];
  for (const lang of locales) {
    urls.push({ url: `${base}/${lang}`, lastModified: new Date() });
    for (const p of ["about", "services", "work", "insights", "contact"]) {
      urls.push({ url: `${base}/${lang}/${p}`, lastModified: new Date() });
    }
    for (const s of serviceSlugs()) urls.push({ url: `${base}/${lang}/services/${s}`, lastModified: new Date() });
    for (const s of workSlugs()) urls.push({ url: `${base}/${lang}/work/${s}`, lastModified: new Date() });
    for (const s of postSlugs()) urls.push({ url: `${base}/${lang}/insights/${s}`, lastModified: new Date() });
  }
  return urls;
}
