"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLinkItem = { href: string; label: string };

function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  // Section index stays highlighted on nested pages
  // (e.g. /id/services/x → Services). Home matches exactly only.
  if (href.split("/").filter(Boolean).length <= 1) return false;
  return pathname.startsWith(`${href}/`);
}

export function NavLinks({ links }: { links: NavLinkItem[] }) {
  // usePathname() can be null during prerender — fall back to "" so
  // no link is marked active instead of throwing.
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium md:flex">
      {links.map((l) => {
        const active = isActive(pathname, l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`relative py-1 transition-colors ${
              active
                ? "text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-brand-600 dark:text-white dark:after:bg-brand-100"
                : "text-slate-600 hover:text-ink dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
