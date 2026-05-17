# Pixel Lab — Personal portfolio

Static, pixel–game–inspired portfolio site for **Yuxuan Liu (刘宇轩)** — AI and robotics research, Autoware-related engineering, publications, GitHub work, and a daily “intel” feed. It replaces the previous Jekyll “online-cv” template entirely.

**Live site:** [owen-liuyuxuan.github.io](https://owen-liuyuxuan.github.io/)

## Stack

- **Next.js** 15 (App Router), **React** 18, **TypeScript**
- **Tailwind CSS** 3, **Framer Motion** for light UI motion
- **Static export** (`output: "export"`) → plain HTML/CSS/JS in `out/`, suitable for **GitHub Pages**
- No server runtime, no client-side calls to GitHub or other APIs (data is baked in at build time)

## Local development

```bash
npm ci
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:3000`). The app uses hash routes for deep links (for example `#home`, `#quests`, `#arsenal`, `#intel`, `#fieldlog`); legacy hashes like `#papers` or `#repos` are mapped to the same tabs.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production static export to `./out` |
| `npm run lint` | ESLint (Next.js config) |
| `npm run fetch:repos` | Refresh `src/data/repos.json` from the GitHub API (CI / local) |
| `npm run fetch:intel` | Refresh `src/data/intel_feed.json` from the configured release feed (CI / local) |
| `npm run generate:narrator` | Fill missing `narratorHint` fields in repo data (CI / local) |
| `npm run prebuild:ci` | Runs `fetch:repos`, `fetch:intel`, and `generate:narrator` in sequence |

For a full CI-like build locally:

```bash
npm run prebuild:ci
npm run build
```

## Deployment and CI

GitHub Actions workflow [`.github/workflows/daily_update.yml`](.github/workflows/daily_update.yml) runs on a schedule (daily at **04:00 UTC**) and on **workflow_dispatch**. It installs dependencies, runs `prebuild:ci`, runs `next build`, then publishes `./out` to GitHub Pages (via `peaceiris/actions-gh-pages`).

Secrets: the fetch scripts use `GITHUB_TOKEN` in Actions when available; unauthenticated runs are subject to stricter API rate limits.

## Project layout (short)

- `src/app/` — Root layout (fonts, metadata) and main page (`page.tsx` tab shell + narrator wiring)
- `src/components/` — UI sections (nav, hero, papers, repos, intel feed, field log, companion narrator, background, footer)
- `src/data/` — `profile.ts`, `papers.ts`, and JSON files updated or merged by scripts
- `scripts/` — Node ESM scripts for repo list, intel feed, and narrator hint generation
- `public/` — Static assets (favicon, CV PDF path as referenced in profile, pixel sprites under `public/assets/`)

## Editing content

Human-editable copy and the split between “hand-maintained” and “CI-merged” fields are documented in **`.cursor/docs/content-maintenance.md`** (Chinese, detailed). Use that guide when updating bio, papers, `narratorHint` values, or CI behavior.

## Agent / automation notes

For AI assistants and automation working on this repository, see **[`AGENT.md`](AGENT.md)** in the repo root.

## License

Project-specific license is not set in this README; refer to repository metadata or add a `LICENSE` file if you need an explicit terms file.
