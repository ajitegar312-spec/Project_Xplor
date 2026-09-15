# Xplor Digital — Corporate Website

Next.js 15 App Router + TypeScript + Tailwind. Bilingual `/id` (default) + `/en`. All content dummy & typed for easy replacement.

## Quickstart
```bash
cp .env.example .env   # dummy contacts only — replace before production
npm install
npm run dev            # http://localhost:3000/id
npm run build && npm start
```

## Structure
- `app/[lang]/` — 7 pages: Home, About, Services, Work, Case Study (`work/[slug]`), Insights, Contact
- `content/` — `services.ts`, `works.ts`, `insights.ts`, `site-data.ts` (stats, why, process, tech, team, testimonials, faqs)
- `dictionaries/` — UI strings id/en
- `lib/site-config.ts` — ONLY place reading contact email/WA from env
- `lib/api-client.ts` — frontend API abstraction (see `API_CONTRACT.md`)

## Notes
- Contacts, address (`Jl. Sudirman No.123`), and map are **dummy for development**.
- `npm run typecheck` should pass; target Lighthouse Perf ≥90, others ≥95.
