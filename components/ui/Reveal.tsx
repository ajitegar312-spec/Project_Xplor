"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Scroll reveal wrapper. Reuses the existing `.reveal` / `.is-visible`
// classes from globals.css (transform + opacity only, 0.5s).
//
// Safety properties (required):
// - The hidden state is added client-side AFTER mount, so server-rendered
//   HTML (and no-JS browsers) always show content.
// - `prefers-reduced-motion` skips the hidden state entirely (plus the CSS
//   guard), so content is instantly visible.
// - The observer disconnects per element after reveal; no scroll listeners,
//   no loops, no layout-affecting properties (transform/opacity only).
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Stagger delay in ms for items inside a group. Keep small (0–150). */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 96px 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
