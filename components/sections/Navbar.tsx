import Link from "next/link";
import type { Locale } from "@/types";
import { Container } from "../ui/Container";
import { ThemeToggle } from "../ui/ThemeToggle";
import { siteConfig } from "@/lib/site-config";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Navbar({ lang, dict }: { lang: Locale; dict: any }) {
  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/work`, label: dict.nav.work },
    { href: `/${lang}/insights`, label: dict.nav.insights },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Link href={`/${lang}`} className="shrink-0 text-base font-extrabold tracking-tight text-ink dark:text-white sm:text-lg" aria-label={siteConfig.brand}>
          Xplor<span className="text-brand-600 dark:text-brand-100"> Digital</span>
        </Link>
        <NavLinks links={links} />
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle label={dict.theme.toggle} />
          <nav aria-label="Language" className="flex overflow-hidden rounded-full border border-slate-200 text-xs font-semibold dark:border-slate-700">
            {(["id", "en"] as Locale[]).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`px-2 py-1.5 uppercase sm:px-3 ${l === lang ? "bg-ink text-white" : "text-slate-600 dark:text-slate-300"}`}
              >
                {l}
              </Link>
            ))}
          </nav>
          <Link
            href={`/${lang}/contact`}
            className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-block"
          >
            {dict.nav.cta}
          </Link>
          <MobileMenu
            links={links}
            ctaHref={`/${lang}/contact`}
            ctaLabel={dict.nav.cta}
            openLabel={dict.menu.open}
            closeLabel={dict.menu.close}
          />
        </div>
      </Container>
    </header>
  );
}
