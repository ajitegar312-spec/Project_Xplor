import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

// Fallback for URLs without a locale prefix (e.g. /unknown).
// Offers both locales explicitly — no guessing, no redirects.
export default function GlobalNotFound() {
  return (
    <section aria-labelledby="notfound-title" id="main" className="py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        <p aria-hidden="true" className="text-7xl font-extrabold tracking-tight text-brand-600 dark:text-brand-100 sm:text-8xl">
          404
        </p>
        <h1 id="notfound-title" className="mt-4 text-2xl font-extrabold dark:text-white sm:text-4xl">
          Page Not Found · Halaman Tidak Ditemukan
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          The page you are looking for does not exist. / Halaman yang Anda cari tidak tersedia.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/id"
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700"
          >
            Beranda (ID)
          </Link>
          <Link
            href="/en"
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold dark:border-slate-700"
          >
            Home (EN)
          </Link>
        </div>
      </Container>
    </section>
  );
}
