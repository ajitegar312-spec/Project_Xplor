"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "xplor-theme";

function isDarkMode(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function ThemeToggle({ label }: { label: string }) {
  // Lazy initializer reads the <html> class already set by the blocking
  // ThemeScript. On the server this is `false`; on the client the correct
  // value applies during hydration (covered by the ancestor
  // suppressHydrationWarning). No mount-sync effect is needed.
  const [dark, setDark] = useState<boolean>(() => isDarkMode());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;

      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        // Storage unavailable — still follow the OS setting below.
      }

      if (!stored) {
        document.documentElement.classList.toggle("dark", e.matches);
        setDark(e.matches);
      }
    };

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    return undefined;
  }, []);

  function toggle() {
    const next = !isDarkMode();

    document.documentElement.classList.toggle("dark", next);

    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Private mode etc. — theme still applies for this session.
    }

    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
