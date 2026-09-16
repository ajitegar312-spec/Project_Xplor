# API Contract (frontend-ready, backend-pluggable)

All UI calls go through `lib/api-client.ts`. The frontend contract is frozen:
contact/newsletter forms need zero changes whatever the backend does.

## POST /api/contact
Request:
```json
{ "name": "string (required, max 100)", "email": "string (required, max 254)", "company": "string? (max 120)", "budget": "string? (max 40)", "message": "string (required, max 5000)" }
```
Response `200`: `{ "ok": true }`, `400`: `{ "ok": false, "error": "Invalid payload" }`,
`429`: `{ "ok": false, "error": "Too many requests" }` (+ `Retry-After` header),
`502`: `{ "ok": false, "error": "Delivery failed" }`.

Pipeline: per-IP sliding window (5 req / 10 min, in-memory; single-instance
semantics — use a shared store such as Upstash/Vercel KV when scaling to
multi-instance serverless) → validate + length-cap → deliver via Resend
(`lib/lead-mailer.ts`, plain-text email, user input never rendered as HTML).

## POST /api/newsletter
Request: `{ "email": "string (max 254)" }` → `200 { "ok": true }`.
Same error shapes as above. Throttle: 10 req / hour per IP. Subscriptions
are forwarded to the inbox as notifications (no mailing-list backend yet).

## Lead delivery setup (no new npm packages — global fetch only)
1. Create a free Resend account (resend.com) and copy an API key.
2. For testing without a domain, keep `LEAD_FROM_EMAIL=onboarding@resend.dev`
   (Resend only allows sending to the account owner's address in test mode).
   For production, verify your domain in Resend and set it here.
3. Set in the HOSTING env (Vercel dashboard / server `.env`), never commit:
   `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`.
4. Without these vars the routes run in mock mode (previous behavior).

## Env (dummy for dev — replace before production)
```
NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_WA_NUMBER, NEXT_PUBLIC_DEFAULT_LANG
RESEND_API_KEY (server-only), LEAD_TO_EMAIL (server-only), LEAD_FROM_EMAIL (server-only)
```
Source of truth in code: `lib/site-config.ts` for public contacts;
server secrets are read only inside `lib/lead-mailer.ts`. No other file may
hardcode email/WA, and secrets must never carry a `NEXT_PUBLIC_` prefix.
