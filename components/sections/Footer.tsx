import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "../ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold dark:text-white">Xplor<span className="text-brand-600 dark:text-brand-100"> Digital</span></p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{dict.footer.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Sitemap</p>
          <ul className="space-y-2.5 text-sm text-slate-600 transition-colors dark:text-slate-300 [&_a:hover]:text-ink dark:[&_a:hover]:text-white">
            <li><Link href={`/${lang}/about`}>{dict.nav.about}</Link></li>
            <li><Link href={`/${lang}/services`}>{dict.nav.services}</Link></li>
            <li><Link href={`/${lang}/work`}>{dict.nav.work}</Link></li>
            <li><Link href={`/${lang}/insights`}>{dict.nav.insights}</Link></li>
            <li><Link href={`/${lang}/contact`}>{dict.nav.contact}</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{dict.contactPage.infoTitle}</p>
          <ul className="space-y-2.5 text-sm text-slate-600 transition-colors dark:text-slate-300 [&_a:hover]:text-ink dark:[&_a:hover]:text-white">
            <li><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
            <li>{siteConfig.waNumber}</li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Legal</p>
          <ul className="space-y-2.5 text-sm text-slate-600 transition-colors dark:text-slate-300 [&_a:hover]:text-ink dark:[&_a:hover]:text-white">
            <li><Link href={`/${lang}/privacy`}>Privacy</Link></li>
            <li><Link href={`/${lang}/terms`}>Terms</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <Container className="flex flex-col gap-1 py-4 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:justify-between">
          <span>© 2026 {siteConfig.brand}. {dict.footer.rights}</span>
        </Container>
      </div>
    </footer>
  );
}
