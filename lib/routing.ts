import type { Locale } from "@/types";

// Helpers only — real middleware lives in /middleware.ts.
export function localeFromPath(pathname: string): Locale | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "id" || seg === "en") return seg;
  return null;
}
