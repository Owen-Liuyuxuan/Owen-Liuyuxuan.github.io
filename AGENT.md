# AGENT.md — Working on this repository

This file orients coding agents and automation to **Owen’s Pixel Lab** portfolio: a **Next.js 15** App Router site with **static export** to GitHub Pages. It is **not** the old Jekyll “online-cv” project; there is no `_data/data.yml`, no Docker Jekyll preview, and no theme vendor README path.

## Goals and constraints

- **Single-page tabbed UI** with hash sync (`src/app/page.tsx`). Tab ids: `home`, `quests`, `arsenal`, `intel`, `fieldlog`. Legacy hash aliases exist for bookmarks.
- **Static hosting only:** `next.config.mjs` sets `output: "export"`, `images.unoptimized: true`, and `trailingSlash: true`. Do not add server-only Next features (SSR routes, server actions, dynamic APIs that need a Node server).
- **No runtime data fetching in the browser** for GitHub or feeds; lists are produced at build time from `src/data/*` and CI scripts.
- **Companion narrator is not an LLM.** Copy comes from `data-narrator` attributes, TypeScript data (`narratorHint`), or CI-generated hints. `useNarrator` + `CompanionNarrator` implement hover-driven, typewriter-style UI only.

## Tech map

| Area | Location / notes |
| --- | --- |
| Entry + tab state | `src/app/page.tsx`, `src/components/TabContainer/TabContainer.tsx` |
| Metadata / fonts | `src/app/layout.tsx` (Google: Press Start 2P, JetBrains Mono, Inter) |
| Global styles + Tailwind tokens | `src/styles/globals.css`, `tailwind.config.ts` |
| Profile / papers | `src/data/profile.ts`, `src/data/papers.ts` |
| CI-backed JSON | `src/data/repos.json`, `src/data/intel_feed.json` (merged by scripts; preserve manual fields per docs) |
| CI scripts | `scripts/fetch_github_repos.mjs`, `scripts/fetch_intel_feed.mjs`, `scripts/generate_narrator_texts.mjs` |
| Daily pipeline | `.github/workflows/daily_update.yml` (`prebuild:ci` then `build`, deploy `out/`) |

## Commands agents should use

- **Dev:** `npm run dev`
- **Lint:** `npm run lint`
- **Production export:** `npm run build` (after `npm ci` or `npm install`)
- **Simulate CI data step:** `npm run prebuild:ci`

Prefer **`npm ci`** in CI-faithful contexts when `package-lock.json` is present.

## Content and copy ownership

Before bulk-editing JSON or “fixing” merged files, read **`.cursor/docs/content-maintenance.md`**. It defines:

- Which fields CI overwrites vs merges
- How `narratorHint` is preserved
- How to add manual intel items
- Where section titles and nav labels live in components

## Design expectations (do not regress casually)

- Pixel / RPG metaphor: BASE (home), QUESTS (papers), ARSENAL (repos), INTEL (feed), FIELD LOG (external links).
- Dark theme, cyan accents, restrained motion; narrator speech bubble and avatar are part of the identity.
- **Accessibility:** meaningful `alt` text, contrast, and respect for `prefers-reduced-motion` when adding animations.

## Out of scope unless requested

- Turning the narrator into a chatbot or adding API keys to the client bundle
- Server-side rendering or non-static hosting assumptions without changing `next.config.mjs` and deployment docs together
- Large unrelated refactors; keep changes scoped to the task

## Related prompts in `.cursor/`

The repo may contain additional author notes under `.cursor/instructions/`. Treat them as supplementary; if they conflict with **committed code** or **this AGENT.md**, prefer the repository source of truth and update documentation in the same change when appropriate.
