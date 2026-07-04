---
name: Gemini API key model quota is per-model, not per-key
description: A Gemini API key can return 429 with limit:0 for one specific model while other models on the same key work fine.
---

If Gemini calls fail with a 429 `Quota exceeded ... limit: 0` for a specific model (e.g. `gemini-2.0-flash`), this is not necessarily a rate-limit-and-retry situation — the key's project may simply have zero free-tier allocation for that exact model.

**Why:** Free-tier quota is allocated per (project, model) pair, not per API key generally. Retrying after the suggested delay does not help if the limit is a hard 0.

**How to apply:**
- Diagnose with `curl "https://generativelanguage.googleapis.com/v1beta/models?key=$KEY"` to list models the key can actually access.
- Try swapping to another available model from that list (e.g. `gemini-2.5-flash` instead of `gemini-2.0-flash`) — often resolves it immediately since quota differs per model.
- Don't assume the integration code is broken just because one specific model name 429s; verify against the models list first.
