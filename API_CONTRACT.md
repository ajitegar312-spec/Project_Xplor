# API Contract (frontend-ready, backend-pluggable)

All UI calls go through `lib/api-client.ts`. To attach a real backend, change only the client base URL / route handlers — no UI changes needed.

## POST /api/contact
Request:
```json
{ "name": "string (required)", "email": "string (required)", "company": "string?", "budget": "string?", "message": "string (required)" }
```
Response `200`: `{ "ok": true }`, `400`: `{ "ok": false, "error": "Invalid payload" }`

Future: forward to SMTP / CRM / WhatsApp Cloud API using server env (never expose secrets with `NEXT_PUBLIC_`).

## POST /api/newsletter
Request: `{ "email": "string" }` → `200 { "ok": true }`.

## Env (dummy for dev — replace before production)
```
NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_WA_NUMBER, NEXT_PUBLIC_DEFAULT_LANG
```
Source of truth in code: `lib/site-config.ts` only. No other file may hardcode email/WA.
