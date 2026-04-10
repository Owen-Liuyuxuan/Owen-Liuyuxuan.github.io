# 🤖 Agent Instruction Document: Owen's Pixel Portfolio Website

## 1. Project Overview

Build a **2D pixel-game-styled personal portfolio website** for Yuxuan Liu (Owen),
an AI/Robotics researcher and System Engineer at TIER IV, Tokyo.

**Live URL**: `https://owen-liuyuxuan.github.io/`
**Repository**: `Owen-Liuyuxuan/Owen-Liuyuxuan.github.io`

---

## 2. Design Philosophy

### 2.1 Visual Identity
- **Theme**: 2D pixel RPG game meets modern AI aesthetic
- **Palette**: Deep navy-black (#0a0e1a) background, electric cyan (#00d4ff) primary,
  white (#ffffff / #e0e7ff) text, electric violet (#7b2fff) accent
- **Typography**: `Press Start 2P` for headings/nav (pixel font), `JetBrains Mono` for
  body/code, `Inter` for long-form text
- **Cards**: Dark glass (bg #111827) with cyan border glow on hover
- **Animations**: Light micro-interactions only — hover glows, smooth tab transitions,
  typewriter text in narrator. NO sound effects. NO heavy particle systems.
- **Background**: Subtle CSS dot-grid pattern (radial gradient), optional faint scanlines

### 2.2 Game Metaphor Mapping
| Website Section | Game Metaphor | Tab Label |
|---|---|---|
| Home / Bio | Player Home Base | 🏠 BASE |
| Publications | Completed Quest Log | 📜 QUESTS |
| GitHub Repos | Equipment Inventory | 🛠️ ARSENAL |
| Daily AI Feed | Intelligence Radar | 📡 INTEL |
| Blog / Links | Field Notes / Journal | 🗺️ FIELD LOG |

### 2.3 Companion Narrator System (CRITICAL)
- A **pixel-art avatar** of Owen floats in the bottom-right corner (64x64 sprite)
- Above it: a **speech bubble** with contextual text
- Text updates when user **hovers** over any element with `data-narrator="..."` attribute
- Speech bubble has a **typewriter animation** (character by character reveal)
- When idle: shows default greeting
- **THIS IS NOT AN LLM CHATBOT** — all text is pre-authored:
  - Static hints: hardcoded in `data-narrator` attributes
  - Dynamic hints (for CI content): pre-generated during CI build by `scripts/generate_narrator_texts.mjs`
- The avatar has a subtle idle bobbing animation (y-axis oscillation, 3s loop)

---

## 3. Technical Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^14.2 |
| Language | TypeScript | ^5.4 |
| Styling | Tailwind CSS | ^3.4 |
| Animation | Framer Motion | ^11.0 |
| Deployment | GitHub Pages (static export) | — |
| CI | GitHub Actions | — |
| Fonts | Google Fonts (Press Start 2P, JetBrains Mono, Inter) | — |

### 3.1 Key Constraints
- `output: "export"` in next.config — **pure static HTML**, no server-side features
- `images.unoptimized: true` — required for static export
- All data is either static (TypeScript files) or CI-generated (JSON files)
- No runtime API calls from the browser (no CORS issues, no tokens exposed)
- Must work on GitHub Pages with root path deployment

---

## 4. File Structure

```
owen-liuyuxuan.github.io/
├── .github/workflows/
│   └── daily_update.yml        # Daily CI: fetch data → build → deploy
├── public/
│   ├── assets/
│   │   ├── sprites/
│   │   │   └── avatar-pixel.png  # AI-generated pixel avatar (see §8)
│   │   └── fonts/                # (if self-hosting fonts)
│   └── cv.pdf                    # Resume PDF
├── scripts/
│   ├── fetch_github_repos.mjs    # CI: GitHub API → repos.json
│   ├── fetch_intel_feed.mjs      # CI: everyday_my_arxiv → intel_feed.json
│   └── generate_narrator_texts.mjs  # CI: generate narrator hints for dynamic content
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, metadata, scanlines)
│   │   └── page.tsx              # Main SPA entry (tab state, narrator state)
│   ├── components/
│   │   ├── NavBar/NavBar.tsx
│   │   ├── HeroSection/HeroSection.tsx
│   │   ├── PaperCard/PaperCard.tsx
│   │   ├── RepoCard/RepoCard.tsx
│   │   ├── IntelFeed/IntelFeed.tsx
│   │   ├── FieldLog/FieldLog.tsx
│   │   ├── CompanionNarrator/CompanionNarrator.tsx
│   │   ├── SkillBars/SkillBars.tsx
│   │   ├── TabContainer/TabContainer.tsx
│   │   ├── PixelBackground/PixelBackground.tsx
│   │   └── Footer/Footer.tsx
│   ├── hooks/
│   │   └── useNarrator.ts
│   ├── data/
│   │   ├── profile.ts            # Static: personal info
│   │   ├── papers.ts             # Static: publications
│   │   ├── repos.json            # CI-generated: GitHub repos
│   │   └── intel_feed.json       # CI-generated: daily AI digest
│   ├── styles/
│   │   └── globals.css           # Tailwind + custom classes
│   └── utils/                    # Shared utility functions
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## 5. Component Specifications

### 5.1 NavBar
- Sticky top, dark glass background with backdrop blur
- 5 tabs with pixel font labels and emoji icons
- Active tab: glowing cyan underline (framer-motion layoutId animation)
- Mobile: show only emoji icons, hide text labels
- Each tab button has `data-narrator` for companion hints

### 5.2 HeroSection (BASE tab)
- Layout: Pixel avatar (left) + name/title/links (right), stacked on mobile
- Avatar: 128x128, `image-rendering: pixelated`, cyan border + glow
- Contact links: horizontal row of icon + label pairs
- About Me: game-card with paragraph text
- Education: vertical timeline with cyan dots
- Skill Bars: HP/MP-style animated bars (see SkillBars)

### 5.3 PaperCard (QUESTS tab)
- 2-column grid (1 column on mobile)
- Each card: venue badge (colored by venue), title, authors (owner highlighted),
  action links as tag pills
- "COMPLETED ✓" stamp in top-right corner
- Staggered entrance animation (delay per card)

### 5.4 RepoCard (ARSENAL tab)
- Grouped by category with collapsible sections
- Category headers: pixel font, click to expand/collapse
- Each repo card: name, description (2-line clamp), stats row (language dot, stars, forks),
  topic tags (max 4)
- Entire card is a link to the GitHub repo
- 3-column grid on desktop, 2 on tablet, 1 on mobile

### 5.5 IntelFeed (INTEL tab)
- "Radar terminal" aesthetic
- Header with blinking green dot + "Last updated: YYYY-MM-DD"
- Scrollable list (max 70vh), max 20 items
- Each item: source badge (arxiv=red, blog=green, news=yellow), title, 2-line summary
- Staggered entrance from right

### 5.6 FieldLog (FIELD LOG tab)
- Links to external project sites:
  - Paper Reading Blog: https://owen-liuyuxuan.github.io/papers_reading_sharing.github.io/
  - FSNet Project: https://sites.google.com/view/fsnet/
  - Hercules Video: https://www.youtube.com/watch?v=ggyQgRe9cds
  - Arxiv Word Cloud: link to arxiv_word_cloud repo/demo
- Each link is a game-card with a preview description and external link icon
- Can also include embedded iframe previews (optional, may have CORS issues)

### 5.7 CompanionNarrator
- Fixed position: bottom-right, z-50
- Speech bubble: dark glass card, max-width 320px
- Typewriter effect: 20ms per character
- Blinking pixel cursor `_` at end of text
- Avatar: 64x64 pixel sprite, subtle y-axis bobbing (3s infinite loop)
- `pointer-events: none` on the container (don't block clicks)

### 5.8 PixelBackground
- Fixed, full-screen, z-0
- CSS radial-gradient dot pattern (24px grid, cyan dots at 7% opacity)
- No JavaScript — pure CSS for performance

### 5.9 SkillBars
- Inside a game-card
- Each skill: label + level (0-100) + animated bar
- Bar: gradient from cyan to violet, grows from 0 to target width on mount
- Skills to show: Chinese (100), English (87), Japanese (90), Python (92), C++ (70), ROS2 (80)

---

## 6. Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Actions (Daily)                │
│                                                         │
│  fetch_github_repos.mjs ──→ src/data/repos.json         │
│  fetch_intel_feed.mjs   ──→ src/data/intel_feed.json    │
│  generate_narrator_texts.mjs ──→ (enriches JSON files)  │
│                                                         │
│  next build ──→ out/ (static HTML)                      │
│  deploy to gh-pages branch                              │
└─────────────────────────────────────────────────────────┘

Static data (manual edits):
  src/data/profile.ts  ──→ HeroSection
  src/data/papers.ts   ──→ PaperCard
```

---

## 7. Implementation Order (Recommended)

1. **Scaffold**: Initialize Next.js project, install deps, configure Tailwind + fonts
2. **Layout + Background**: layout.tsx, globals.css, PixelBackground
3. **NavBar + TabContainer**: Tab switching with framer-motion transitions
4. **HeroSection**: Avatar, bio, contact links, education timeline
5. **SkillBars**: Animated HP bars
6. **CompanionNarrator**: Typewriter hook, speech bubble, avatar sprite
7. **PaperCard**: Quest cards with static data
8. **RepoCard**: Inventory cards with placeholder JSON
9. **IntelFeed**: Terminal-style feed with placeholder JSON
10. **FieldLog**: External links panel
11. **Footer**: Minimal credits
12. **CI Scripts**: fetch_github_repos.mjs, fetch_intel_feed.mjs
13. **CI Workflow**: daily_update.yml
14. **Polish**: Responsive testing, performance, SEO meta tags, favicon

---

## 8. AI-Generated Assets Required

See the companion document `docs/ai-assets/ASSET_PROMPTS.md` for:
- Pixel avatar sprite
- Favicon / logo
- Optional: category icons, background tile

---

## 9. Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| < 640px (sm) | Single column, nav shows icons only, avatar stacks above text |
| 640-1024px (md) | 2-column grids, full nav labels |
| > 1024px (lg) | 3-column repo grid, max-width 6xl container |

---

## 10. Accessibility & Performance

- All images have `alt` text
- Color contrast: cyan on dark meets WCAG AA
- Animations respect `prefers-reduced-motion` (add Tailwind `motion-reduce:` variants)
- No heavy JS bundles — framer-motion is the largest dep (~30KB gzipped)
- Static export = instant TTFB from GitHub Pages CDN
- Lighthouse target: 95+ on all metrics

---

## 11. Future Extensions (Out of Scope for V1)

- [ ] Dark/light mode toggle (currently dark-only)
- [ ] i18n support (EN/CN/JP)
- [ ] Embedded arxiv_word_cloud visualization
- [ ] GitHub contribution heatmap (calendar grid)
- [ ] Blog post previews with MDX
- [ ] Analytics (Plausible or Umami, privacy-friendly)