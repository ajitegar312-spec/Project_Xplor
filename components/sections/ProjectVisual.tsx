// Pure-CSS project visual — no external images.
// Decorative browser-frame mockup with a client monogram. Always aria-hidden.
export function ProjectVisual({ monogram, className = "" }: { monogram: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-900 via-ink to-slate-900 dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-2 h-5 flex-1 rounded-full bg-white/10" />
      </div>
      <div className="relative flex h-full items-center justify-center pt-10">
        <span className="text-7xl font-extrabold tracking-tight text-white/90 sm:text-8xl">{monogram}</span>
      </div>
    </div>
  );
}
