# Xplor Digital — Corporate Website

Next.js 16 App Router + TypeScript + Tailwind. Bilingual `/id` (default) + `/en`. All content dummy & typed for easy replacement.

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
- Public contacts come from env (`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WA_NUMBER`); checked-in fallbacks are obvious placeholders.
- `npm run typecheck` should pass; target Lighthouse Perf ≥90, others ≥95.

## Custom Domain Readiness
Code is domain-agnostic: canonical, sitemap, robots, OG/Twitter URLs, and
metadata images all derive from `NEXT_PUBLIC_SITE_URL` (validated in
`lib/site-config.ts`, with Vercel URL fallback). No deployment URL is hardcoded.
User steps to go live on a custom domain:
1. Vercel dashboard → Project → Settings → Domains → Add domain.
2. Add the DNS records Vercel shows at your registrar (A/CNAME).
3. Wait for HTTPS certificate (automatic).
4. Set `NEXT_PUBLIC_SITE_URL=https://your-domain` in Vercel Production env.
5. Redeploy, then verify canonical/OG URLs serve the custom domain.
