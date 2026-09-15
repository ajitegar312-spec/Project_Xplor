"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";

const copy = {
  id: {
    title: "Halaman Tidak Ditemukan",
    desc: "Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.",
    home: "Kembali ke Beranda",
    contact: "Hubungi Kami",
  },
  en: {
    title: "Page Not Found",
    desc: "Sorry, the page you are looking for does not exist or has been moved.",
    home: "Back to Home",
    contact: "Contact Us",
  },
} as const;

// Rendered inside app/[lang]/layout.tsx, so Navbar, <main id="main">,
// Footer, and Dark/Light Theme already apply. Locale is derived from
// the unknown URL itself — no hardcoded locale, no routing hacks.
export default function LocaleNotFound() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] === "en" ? "en" : "id";
  const t = copy[lang];
  return (
    <section aria-labelledby="notfound-title" className="py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        <p aria-hidden="true" className="text-7xl font-extrabold tracking-tight text-brand-600 dark:text-brand-100 sm:text-8xl">
          404
        </p>
        <h1 id="notfound-title" className="mt-4 text-2xl font-extrabold dark:text-white sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t.desc}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/${lang}`}
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700"
          >
            {t.home}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold dark:border-slate-700"
          >
            {t.contact}
          </Link>
        </div>
      </Container>
    </section>
  );
}
