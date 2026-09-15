import { Container } from "./Container";

export function SectionHeading({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return (
    <Container className="mb-10 max-w-3xl !px-0 sm:!px-0">
      <div className="px-4 sm:px-6 lg:px-8">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>}
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {desc && <p className="mt-3 text-slate-600">{desc}</p>}
      </div>
    </Container>
  );
}
