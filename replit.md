# Dharma.ai

An Indian legal literacy and AI lawyer-matchmaking platform: citizens ask plain-language legal questions and get real Gemini-powered answers grounded in Indian statutes, browse a verified bar directory, and get AI-ranked lawyer matches for their specific case.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/api-server run seed` — seed MongoDB with sample lawyer data (run once, or after wiping the collection)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `GEMINI_API_KEY` (AI chat/matching), `MONGODB_URI` (lawyer data)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: MongoDB (lawyer directory) — chosen over the default Postgres/Drizzle per explicit user request
- AI: Google Gemini (`gemini-2.5-flash`) for chat answers and AI lawyer-match ranking
- Validation: Zod (`zod/v4`)
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (ESM bundle)

## Where things live

- `artifacts/api-server/src/lib/mongo.ts` — MongoDB client + `getLawyersCollection`
- `artifacts/api-server/src/lib/gemini.ts` — Gemini client wrapper (`getGeminiModel`)
- `artifacts/api-server/src/data/citations.ts` — statute citation records used to ground chat answers
- `artifacts/api-server/src/data/lawyerSeed.ts` + `src/scripts/seedLawyers.ts` — seed data/script for the lawyer directory
- `artifacts/api-server/src/routes/chat.ts` — `POST /chat`, real Gemini answer to the actual question asked
- `artifacts/api-server/src/routes/lawyers.ts` — `GET /lawyers`, `GET /lawyers/:id`, `POST /match` (Mongo filter + Gemini ranking)
- `artifacts/dharma-ai/src` — React/Vite frontend, all pages wired to real API hooks (no mocks for lawyers/chat)
- `lib/api-spec/openapi.yaml` — source of truth for generated types/hooks

## Architecture decisions

- Lawyer data lives in MongoDB (not the workspace default Postgres/Drizzle) per explicit user request.
- Chat and match both use Gemini directly per-request (no caching/precomputed answers) so responses always reflect the actual question/case text — this was the fix for the original bug where the frontend called hardcoded mock functions.
- `gemini-2.5-flash` is used instead of `gemini-2.0-flash`; some API keys have zero free-tier quota for `gemini-2.0-flash` specifically even though other models work — see `.agents/memory/gemini-model-quota.md`.

## Product

- **AI Consult**: plain-language chat that answers real Indian legal questions, grounded with statute citations, with suggested follow-ups.
- **Lawyer Directory**: browsable/filterable list of verified lawyers (practice area, city, language, experience, fee) backed by MongoDB.
- **AI Match Wizard**: describe a case in plain English and get a Gemini-ranked shortlist of best-fit lawyers with per-lawyer match scores and reasoning.

## User preferences

- Use MongoDB for lawyer data and Gemini for AI chat/matching (not the workspace's default Postgres/Drizzle stack).

## Gotchas

- If Gemini calls 429 with `limit: 0` for a given model, it's a per-model quota issue on that key, not a code bug — check `GET /v1beta/models?key=...` for which models the key actually has quota for before debugging further.
- Run `pnpm --filter @workspace/api-server run seed` once against a fresh MongoDB instance before testing the Directory/Match pages — they show empty state otherwise.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
