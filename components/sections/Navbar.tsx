import Link from "next/link";
import type { Locale } from "@/types";
import { Container } from "../ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Navbar({ lang, dict }: { lang: Locale; dict: any }) {
  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/work`, label: dict.nav.work },
    { href: `/${lang}/insights`, label: dict.nav.insights },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];
  const other: Locale = lang === "id" ? "en" : "id";
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={`/${lang}`} className="text-lg font-extrabold tracking-tight text-ink" aria-label={siteConfig.brand}>
          Xplor<span className="text-brand-600"> Digital</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-slate-600 hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <nav aria-label="Language" className="flex overflow-hidden rounded-full border text-xs font-semibold">
            {(["id", "en"] as Locale[]).map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`px-3 py-1.5 uppercase ${l === lang ? "bg-ink text-white" : "text-slate-600"}`}
              >
                {l}
              </Link>
            ))}
          </nav>
          <Link
            href={`/${lang}/contact`}
            className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 sm:inline-block"
          >
            {dict.nav.cta}
          </Link>
          <details className="relative md:hidden">
            <summary className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold" aria-label="Menu">
              ☰
            </summary>
            <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-white p-2 shadow-lg">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">
                  {l.label}
                </Link>
              ))}
              <Link href={`/${lang}/contact`} className="mt-1 block rounded-lg bg-brand-600 px-3 py-2 text-center text-sm font-semibold text-white">
                {dict.nav.cta}
              </Link>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
