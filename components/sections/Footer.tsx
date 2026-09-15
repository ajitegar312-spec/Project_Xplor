import Link from "next/link";
import type { Locale } from "@/types";
import { Container } from "../ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Footer({ lang, dict }: { lang: Locale; dict: any }) {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-slate-50">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold">Xplor<span className="text-brand-600"> Digital</span></p>
          <p className="mt-2 text-sm text-slate-600">{dict.footer.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 text-sm font-semibold">Sitemap</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href={`/${lang}/about`}>{dict.nav.about}</Link></li>
            <li><Link href={`/${lang}/services`}>{dict.nav.services}</Link></li>
            <li><Link href={`/${lang}/work`}>{dict.nav.work}</Link></li>
            <li><Link href={`/${lang}/insights`}>{dict.nav.insights}</Link></li>
            <li><Link href={`/${lang}/contact`}>{dict.nav.contact}</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-sm font-semibold">{dict.contactPage.infoTitle}</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
            <li>{siteConfig.waNumber}</li>
            <li>{lang === "id" ? siteConfig.addressId : siteConfig.addressEn}</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Legal</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href={`/${lang}/contact`}>Privacy (dummy)</Link></li>
            <li><Link href={`/${lang}/contact`}>Terms (dummy)</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-slate-200">
        <Container className="flex flex-col gap-1 py-4 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <span>© 2026 {siteConfig.brand}. {dict.footer.rights}</span>
          <span>{dict.footer.dummy}</span>
        </Container>
      </div>
    </footer>
  );
}
