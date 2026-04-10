Continuing from where the Asset Prompts document was cut off, and then I'll provide the remaining critical files: `globals.css`, `tailwind.config.ts`, `next.config.mjs`, `page.tsx` (root), `layout.tsx`, `package.json`, and the `generate_narrator_texts.mjs` script.

---

### `docs/ai-assets/ASSET_PROMPTS.md` (continued)

````artifact
id: asset-prompts
name: ASSET_PROMPTS.md
type: markdown
content: |-
  # 🎨 AI Asset Generation Prompts

  This document contains prompts and reference descriptions for generating
  the visual assets needed for the website. Use your preferred AI image
  generation tool (Midjourney, DALL-E 3, Stable Diffusion, etc.).

  ---

  ## Asset 1: Pixel Avatar Sprite (REQUIRED)

  **File**: `public/assets/sprites/avatar-pixel.png`
  **Size**: 128×128 px (will also be displayed at 64×64 for companion)
  **Format**: PNG with transparent background

  ### Prompt:
  ```
  Pixel art portrait of a young Asian male researcher/engineer,
  short black hair, wearing a dark hoodie with a small cyan circuit-board
  pattern on the chest, friendly smile, slightly turned to the right,
  clean pixel art style, 128x128 pixels, transparent background,
  16-bit retro game character sprite, electric cyan and white highlights
  on dark navy background accents, no anti-aliasing, crisp pixel edges
  ```

  ### Reference Style:
  - Think "Stardew Valley" character portrait meets cyberpunk color scheme
  - The character should feel approachable and nerdy
  - Cyan glow highlights on hair edges or hoodie details
  - Expression: confident, slightly smiling

  ### Variants Needed:
  1. **Default** — neutral/smiling (used for hero + companion idle)
  2. **Thinking** — hand on chin (optional, for narrator "loading" state)

  ---

  ## Asset 2: Favicon / Logo (REQUIRED)

  **File**: `public/favicon.ico` + `public/favicon-32x32.png`
  **Size**: 32×32 px and 16×16 px
  **Format**: ICO + PNG

  ### Prompt:
  ```
  Pixel art icon, 32x32 pixels, letter "O" or "YL" monogram,
  electric cyan color on transparent background, retro game style,
  clean pixel edges, glowing effect, suitable for browser favicon
  ```

  ### Alternative approach:
  - Use a mini version of the avatar sprite (just the head, 32×32)
  - Or a pixel-art robot/AI head icon in cyan

  ---

  ## Asset 3: Tab Category Icons (OPTIONAL)

  **File**: `public/assets/sprites/icon-{name}.png`
  **Size**: 32×32 px each
  **Format**: PNG with transparent background

  If you want custom pixel icons instead of emoji for the nav tabs:

  ### Prompts per icon:
  ```
  Pixel art icon, 32x32 pixels, transparent background, clean edges,
  electric cyan and white palette, retro 16-bit game style:

  - icon-home.png:     "A small pixel house/base with a glowing cyan door"
  - icon-quests.png:   "A pixel scroll/parchment with a checkmark seal"
  - icon-arsenal.png:  "A pixel wrench crossed with a sword, cyan glow"
  - icon-intel.png:    "A pixel radar dish with radiating signal waves"
  - icon-fieldlog.png: "A pixel open book with a compass on top"
  ```

  ---

  ## Asset 4: Card Background Texture (OPTIONAL)

  **File**: `public/assets/textures/card-noise.png`
  **Size**: 256×256 px, tileable
  **Format**: PNG

  ### Prompt:
  ```
  Seamless tileable texture, very subtle noise/grain pattern,
  dark navy blue (#111827), barely visible pixel grid lines in
  cyan (#00d4ff) at 3% opacity, suitable for card background overlay,
  256x256 pixels
  ```

  ### Alternative:
  - Can be generated purely in CSS with a repeating radial-gradient
  - Skip this asset if CSS-only background is sufficient

  ---

  ## Asset 5: Hero Banner / Scene Background (OPTIONAL — for extra flair)

  **File**: `public/assets/scenes/hero-bg.png`
  **Size**: 1920×400 px (or SVG)
  **Format**: PNG with transparency or SVG

  ### Prompt:
  ```
  Pixel art wide panoramic scene, 16-bit retro game style,
  a futuristic cityscape at night with glowing cyan windows,
  a small autonomous vehicle driving on the road,
  dark navy sky with subtle stars, electric cyan and violet neon lights,
  parallax-ready layered composition (foreground road, mid buildings, far sky),
  1920x400 pixels, semi-transparent bottom edge fading to black
  ```

  ### Usage:
  - Placed behind the HeroSection as a decorative banner
  - Could implement subtle CSS parallax scroll effect
  - If too complex, skip — the dot-grid background is sufficient

  ---

  ## Asset 6: Companion Speech Bubble Frame (OPTIONAL)

  **File**: `public/assets/sprites/speech-bubble.png`
  **Size**: 320×120 px (9-slice scalable)
  **Format**: PNG with transparency

  ### Prompt:
  ```
  Pixel art speech bubble frame, retro RPG dialog box style,
  dark navy interior (#111827), cyan pixel border (#00d4ff),
  small triangle pointer at bottom-right pointing down,
  320x120 pixels, transparent outside, suitable for 9-slice scaling,
  clean pixel edges, 2px border width
  ```

  ### Alternative:
  - Can be implemented purely in CSS with border + pseudo-element triangle
  - Pixel art version gives more authentic game feel

  ---

  ## Generation Tips

  ### For Midjourney:
  - Add `--ar 1:1` for square assets, `--ar 16:3` for banner
  - Add `--style raw` for cleaner pixel art
  - Add `--no blur, anti-aliasing, smooth` to keep pixel edges crisp
  - Upscale with nearest-neighbor (NOT bilinear) to maintain pixel sharpness

  ### For DALL-E 3:
  - Be explicit about "no anti-aliasing, crisp pixel edges"
  - Request transparent background explicitly
  - May need post-processing to clean up edges

  ### For Stable Diffusion:
  - Use a pixel-art LoRA/checkpoint (e.g., "pixel-art-xl")
  - Set output resolution to exact target size
  - Use img2img with a rough sketch for better control

  ### Post-Processing (all tools):
  1. Open in any image editor (GIMP, Photoshop, Aseprite)
  2. Scale down to target size using **nearest-neighbor** interpolation
  3. Clean up any anti-aliased edges manually if needed
  4. Export as PNG with transparency
  5. Optimize with `pngquant` or `optipng` for smaller file size

  ---

  ## Asset Checklist

  | # | Asset | Priority | Status |
  |---|---|---|---|
  | 1 | Pixel Avatar (default) | 🔴 Required | ⬜ TODO |
  | 1b | Pixel Avatar (thinking) | 🟡 Nice-to-have | ⬜ TODO |
  | 2 | Favicon | 🔴 Required | ⬜ TODO |
  | 3 | Tab Icons (×5) | 🟢 Optional | ⬜ TODO |
  | 4 | Card Texture | 🟢 Optional (CSS fallback) | ⬜ TODO |
  | 5 | Hero Banner Scene | 🟢 Optional | ⬜ TODO |
  | 6 | Speech Bubble Frame | 🟢 Optional (CSS fallback) | ⬜ TODO |
````

---

Now let me write the remaining critical framework files:

### `src/app/page.tsx` — Root Page (SPA Entry)

````artifact
id: root-page
name: page.tsx
type: code.tsx
content: |-
  /**
   * @file page.tsx
   * @description Root page — single-page app entry point.
   *
   * Responsibilities:
   *   1. Manage active tab state (TabId)
   *   2. Manage narrator text state via useNarrator hook
   *   3. Wire onMouseOver to the main content container
   *   4. Render: PixelBackground → NavBar → TabContainer → CompanionNarrator → Footer
   *
   * URL hash routing (optional enhancement):
   *   - On tab change, update window.location.hash (e.g., #arsenal)
   *   - On page load, read hash to restore tab
   *   - This allows direct linking to tabs (e.g., owen-liuyuxuan.github.io/#quests)
   */

  "use client";

  import React, { useState, useEffect } from "react";
  import PixelBackground from "@/components/PixelBackground/PixelBackground";
  import NavBar from "@/components/NavBar/NavBar";
  import TabContainer from "@/components/TabContainer/TabContainer";
  import CompanionNarrator from "@/components/CompanionNarrator/CompanionNarrator";
  import Footer from "@/components/Footer/Footer";
  import { useNarrator } from "@/hooks/useNarrator";

  /** All valid tab IDs. Exported for use by NavBar and TabContainer. */
  export type TabId = "home" | "quests" | "arsenal" | "intel" | "fieldlog";

  /** Map hash fragments to tab IDs */
  const HASH_TO_TAB: Record<string, TabId> = {
    "#home": "home",
    "#base": "home",
    "#quests": "quests",
    "#papers": "quests",
    "#arsenal": "arsenal",
    "#repos": "arsenal",
    "#intel": "intel",
    "#feed": "intel",
    "#fieldlog": "fieldlog",
    "#blog": "fieldlog",
  };

  export default function HomePage() {
    // ── Tab State ──
    const [activeTab, setActiveTab] = useState<TabId>("home");

    // Read hash on mount to support direct linking
    useEffect(() => {
      const hash = window.location.hash.toLowerCase();
      if (hash && HASH_TO_TAB[hash]) {
        setActiveTab(HASH_TO_TAB[hash]);
      }
    }, []);

    // Update hash when tab changes
    const handleTabChange = (tab: TabId) => {
      setActiveTab(tab);
      window.location.hash = `#${tab}`;
    };

    // ── Narrator State ──
    const { narratorText, handleMouseOver } = useNarrator(
      "Welcome, traveler. Hover over anything to learn more about my work..."
    );

    return (
      <>
        <PixelBackground />

        <div
          className="relative z-10 min-h-screen flex flex-col"
          onMouseOver={handleMouseOver}
        >
          <NavBar activeTab={activeTab} onTabChange={handleTabChange} />

          <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
            <TabContainer activeTab={activeTab} />
          </main>

          <Footer />
        </div>

        <CompanionNarrator text={narratorText} />
      </>
    );
  }
````

---

### `src/app/layout.tsx` — Root Layout

````artifact
id: root-layout
name: layout.tsx
type: code.tsx
content: |-
  /**
   * @file layout.tsx
   * @description Root layout — fonts, metadata, global providers.
   *
   * Fonts loaded:
   *   - Press Start 2P (pixel headings) — variable: --font-pixel
   *   - JetBrains Mono (code/body) — variable: --font-mono
   *   - Inter (long-form text) — variable: --font-body
   *
   * Metadata:
   *   - Title, description, Open Graph, Twitter Card
   *   - Favicon references
   */

  import type { Metadata } from "next";
  import { Press_Start_2P, JetBrains_Mono, Inter } from "next/font/google";
  import "@/styles/globals.css";

  const pixelFont = Press_Start_2P({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-pixel",
    display: "swap",
  });

  const monoFont = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
  });

  const bodyFont = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
  });

  export const metadata: Metadata = {
    title: "Yuxuan Liu — Pixel Lab",
    description:
      "Personal portfolio of Yuxuan Liu (刘宇轩) — AI/Robotics researcher, " +
      "System Engineer at TIER IV. Publications, open-source projects, and daily AI intel.",
    openGraph: {
      title: "Yuxuan Liu — Pixel Lab",
      description: "AI/Robotics researcher & engineer. Publications, projects, and more.",
      url: "https://owen-liuyuxuan.github.io",
      siteName: "Pixel Lab",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Yuxuan Liu — Pixel Lab",
      description: "AI/Robotics researcher & engineer.",
    },
    icons: {
      icon: "/favicon-32x32.png",
      shortcut: "/favicon.ico",
    },
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html
        lang="en"
        className={`${pixelFont.variable} ${monoFont.variable} ${bodyFont.variable}`}
      >
        <body className="bg-base-dark text-white-soft antialiased">
          {children}
        </body>
      </html>
    );
  }
````

---

### `src/styles/globals.css` — Tailwind + Custom Classes

````artifact
id: globals-css
name: globals.css
type: code.css
content: |-
  /**
   * @file globals.css
   * @description Global styles — Tailwind directives + custom utility classes.
   *
   * Custom classes defined here:
   *   .game-card      — Dark glass card with cyan border glow on hover
   *   .tag-pill        — Small rounded tag/badge
   *   .pixel-render    — Forces pixelated image rendering
   *   .shadow-glow-cyan — Cyan box-shadow glow
   *   .scrollbar-thin  — Thin styled scrollbar for feed panels
   *   .animate-pixel-blink — Blinking cursor animation
   */

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* ── Base Layer Overrides ── */
  @layer base {
    html {
      scroll-behavior: smooth;
    }

    /* Respect reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Selection color */
    ::selection {
      background-color: rgba(0, 212, 255, 0.3);
      color: #ffffff;
    }
  }

  /* ── Component Layer ── */
  @layer components {
    /**
     * .game-card — Primary card component.
     * Dark glass background, subtle border, cyan glow on hover.
     */
    .game-card {
      @apply bg-card-dark/80 backdrop-blur-sm
             border border-cyan-muted rounded-lg
             px-4 py-4
             transition-all duration-300 ease-out;
    }
    .game-card:hover {
      @apply border-cyan-glow/50;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.1),
                  0 0 30px rgba(0, 212, 255, 0.05);
    }

    /**
     * .tag-pill — Small rounded tag for topics, venues, links.
     */
    .tag-pill {
      @apply inline-block text-[10px] font-mono
             px-2 py-0.5 rounded-full
             border border-cyan-muted text-cyan-glow/70;
    }

    /**
     * .pixel-render — Force nearest-neighbor rendering for pixel art.
     */
    .pixel-render {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }

    /**
     * .shadow-glow-cyan — Cyan glow box-shadow.
     */
    .shadow-glow-cyan {
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.3),
                  0 0 20px rgba(0, 212, 255, 0.1);
    }
  }

  /* ── Utility Layer ── */
  @layer utilities {
    /**
     * .scrollbar-thin — Thin, styled scrollbar for dark theme.
     */
    .scrollbar-thin {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 212, 255, 0.2) transparent;
    }
    .scrollbar-thin::-webkit-scrollbar {
      width: 6px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: rgba(0, 212, 255, 0.2);
      border-radius: 3px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 212, 255, 0.4);
    }
  }

  /* ── Keyframe Animations ── */
  @keyframes pixel-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  .animate-pixel-blink {
    animation: pixel-blink 0.8s step-end infinite;
  }
````

---

### `tailwind.config.ts`

````artifact
id: tailwind-config
name: tailwind.config.ts
type: code.ts
content: |-
  /**
   * @file tailwind.config.ts
   * @description Tailwind CSS configuration with custom theme extensions.
   *
   * Custom colors, fonts, and utilities for the pixel-game aesthetic.
   */

  import type { Config } from "tailwindcss";

  const config: Config = {
    content: [
      "./src/**/*.{ts,tsx,js,jsx,mdx}",
    ],
    theme: {
      extend: {
        /* ── Custom Colors ── */
        colors: {
          "base-dark":   "#0a0e1a",     // Deep navy-black background
          "card-dark":   "#111827",     // Card/panel background
          "cyan-glow":   "#00d4ff",     // Primary electric cyan
          "cyan-muted":  "rgba(0, 212, 255, 0.15)", // Translucent cyan for borders
          "violet-glow": "#7b2fff",     // Accent electric violet
          "white-soft":  "#e0e7ff",     // Soft white for text
        },

        /* ── Custom Font Families ── */
        fontFamily: {
          pixel: ["var(--font-pixel)", "monospace"],
          mono:  ["var(--font-mono)", "monospace"],
          body:  ["var(--font-body)", "sans-serif"],
        },

        /* ── Custom Animations ── */
        animation: {
          "pixel-blink": "pixel-blink 0.8s step-end infinite",
        },
        keyframes: {
          "pixel-blink": {
            "0%, 49%":   { opacity: "1" },
            "50%, 100%": { opacity: "0" },
          },
        },
      },
    },
    plugins: [],
  };

  export default config;
````

---

### `next.config.mjs`

````artifact
id: next-config
name: next.config.mjs
type: code.javascript
content: |-
  /**
   * @file next.config.mjs
   * @description Next.js configuration for static export to GitHub Pages.
   *
   * Key settings:
   *   - output: "export" — generates static HTML in /out
   *   - images.unoptimized: true — required for static export
   *   - basePath: "" — root deployment (owen-liuyuxuan.github.io)
   */

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    output: "export",

    images: {
      unoptimized: true,
    },

    // If deploying to a subpath (e.g., /portfolio), set basePath here.
    // For root GitHub Pages (username.github.io), leave empty.
    basePath: "",

    // Trailing slash for GitHub Pages compatibility
    trailingSlash: true,
  };

  export default nextConfig;
````

---

### `package.json`

````artifact
id: package-json
name: package.json
type: code.json
content: |-
  {
    "name": "owen-pixel-lab",
    "version": "1.0.0",
    "private": true,
    "description": "Yuxuan Liu's pixel-game-styled personal portfolio website",
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "fetch:repos": "node scripts/fetch_github_repos.mjs",
      "fetch:intel": "node scripts/fetch_intel_feed.mjs",
      "generate:narrator": "node scripts/generate_narrator_texts.mjs",
      "prebuild:ci": "npm run fetch:repos && npm run fetch:intel && npm run generate:narrator"
    },
    "dependencies": {
      "next": "^14.2.0",
      "react": "^18.3.0",
      "react-dom": "^18.3.0",
      "framer-motion": "^11.0.0"
    },
    "devDependencies": {
      "@types/node": "^20.0.0",
      "@types/react": "^18.3.0",
      "@types/react-dom": "^18.3.0",
      "autoprefixer": "^10.4.0",
      "postcss": "^8.4.0",
      "tailwindcss": "^3.4.0",
      "typescript": "^5.4.0",
      "eslint": "^8.57.0",
      "eslint-config-next": "^14.2.0"
    }
  }
````

---

### `scripts/generate_narrator_texts.mjs`

````artifact
id: generate-narrator
name: generate_narrator_texts.mjs
type: code.javascript
content: |-
  #!/usr/bin/env node
  /**
   * @file generate_narrator_texts.mjs
   * @description CI script — enriches dynamic JSON data files with narrator hints.
   *
   * This script runs AFTER fetch_github_repos.mjs and fetch_intel_feed.mjs,
   * and BEFORE the Next.js build step.
   *
   * What it does:
   *   1. Reads src/data/repos.json — ensures every repo has a narratorHint.
   *      If missing, generates one from the repo's name + description + stats.
   *   2. Reads src/data/intel_feed.json — ensures every item has a narratorHint.
   *      If missing, generates one from the title + summary.
   *   3. Writes the enriched files back in place.
   *
   * This is a PURE TEXT TRANSFORMATION — no LLM calls.
   * If you want LLM-generated narrator hints, you can extend this script
   * to call an API (but be mindful of costs and rate limits in CI).
   *
   * Usage:
   *   node scripts/generate_narrator_texts.mjs
   */

  import { readFileSync, writeFileSync } from "node:fs";
  import { resolve, dirname } from "node:path";
  import { fileURLToPath } from "node:url";

  const __dirname = dirname(fileURLToPath(import.meta.url));

  // ── Repos ──
  function enrichRepos() {
    const path = resolve(__dirname, "../src/data/repos.json");
    let repos;
    try {
      repos = JSON.parse(readFileSync(path, "utf-8"));
    } catch {
      console.warn("repos.json not found or invalid. Skipping.");
      return;
    }

    let enriched = 0;
    for (const repo of repos) {
      if (!repo.narratorHint || repo.narratorHint.trim() === "") {
        const parts = [];
        parts.push(repo.name);
        if (repo.description) parts.push(`— ${repo.description}`);
        if (repo.stars > 0) parts.push(`⭐ ${repo.stars} stars.`);
        if (repo.language) parts.push(`Written in ${repo.language}.`);
        repo.narratorHint = parts.join(" ");
        enriched++;
      }
    }

    writeFileSync(path, JSON.stringify(repos, null, 2) + "\n");
    console.log(`Repos: enriched ${enriched} narrator hints (${repos.length} total).`);
  }

  // ── Intel Feed ──
  function enrichIntelFeed() {
    const path = resolve(__dirname, "../src/data/intel_feed.json");
    let items;
    try {
      items = JSON.parse(readFileSync(path, "utf-8"));
    } catch {
      console.warn("intel_feed.json not found or invalid. Skipping.");
      return;
    }

    let enriched = 0;
    for (const item of items) {
      if (!item.narratorHint || item.narratorHint.trim() === "") {
        const hint = item.summary
          ? `${item.title} — ${item.summary.slice(0, 120)}${item.summary.length > 120 ? "..." : ""}`
          : item.title;
        item.narratorHint = hint;
        enriched++;
      }
    }

    writeFileSync(path, JSON.stringify(items, null, 2) + "\n");
    console.log(`Intel feed: enriched ${enriched} narrator hints (${items.length} total).`);
  }

  // ── Main ──
  enrichRepos();
  enrichIntelFeed();
  console.log("Narrator text generation complete.");
````

---

### `postcss.config.mjs`

````artifact
id: postcss-config
name: postcss.config.mjs
type: code.javascript
content: |-
  /** @type {import('postcss-load-config').Config} */
  const config = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };

  export default config;
````

---

### `tsconfig.json`

````artifact
id: tsconfig
name: tsconfig.json
type: code.json
content: |-
  {
    "compilerOptions": {
      "target": "ES2017",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [{ "name": "next" }],
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }
````

---

Now let me generate the SVG layout reference for the AI-generated pixel avatar:

````artifact
id: avatar-layout-ref
name: Avatar Layout Reference
type: svg
content: |-
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="600" height="400" fill="#0a0e1a"/>
    
    <!-- Grid dots -->
    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="0.8" fill="#00d4ff" opacity="0.07"/>
    </pattern>
    <rect width="600" height="400" fill="url(#dots)"/>
    
    <!-- Title -->
    <text x="300" y="30" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="14" font-weight="bold">PIXEL AVATAR — LAYOUT REFERENCE</text>
    
    <!-- ═══ Asset 1: Main Avatar (128×128) ═══ -->
    <rect x="40" y="60" width="128" height="128" fill="#111827" stroke="#00d4ff" stroke-width="2" rx="8" filter="url(#glow)"/>
    <!-- Pixel grid inside -->
    <line x1="40" y1="92" x2="168" y2="92" stroke="#00d4ff" stroke-width="0.3" opacity="0.2"/>
    <line x1="40" y1="124" x2="168" y2="124" stroke="#00d4ff" stroke-width="0.3" opacity="0.2"/>
    <line x1="40" y1="156" x2="168" y2="156" stroke="#00d4ff" stroke-width="0.3" opacity="0.2"/>
    <line x1="72" y1="60" x2="72" y2="188" stroke="#00d4ff" stroke-width="0.3" opacity="0.2"/>
    <line x1="104" y1="60" x2="104" y2="188" stroke="#00d4ff" stroke-width="0.3" opacity="0.2"/>
    <line x1="136" y1="60" x2="136" y2="188" stroke="#00d4ff" stroke-width="0.3" opacity="0.2"/>
    <!-- Placeholder figure -->
    <rect x="84" y="72" width="40" height="40" fill="#00d4ff" opacity="0.3" rx="4"/>
    <text x="104" y="96" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="10">HEAD</text>
    <rect x="80" y="116" width="48" height="52" fill="#7b2fff" opacity="0.3" rx="4"/>
    <text x="104" y="146" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="10">BODY</text>
    <!-- Label -->
    <text x="104" y="210" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="11">128×128 Hero Avatar</text>
    <text x="104" y="225" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="9" opacity="0.5">avatar-pixel.png</text>
    
    <!-- ═══ Asset 1b: Companion (64×64) ═══ -->
    <rect x="220" y="92" width="64" height="64" fill="#111827" stroke="#00d4ff" stroke-width="2" rx="6" filter="url(#glow)"/>
    <rect x="238" y="100" width="28" height="28" fill="#00d4ff" opacity="0.3" rx="3"/>
    <text x="252" y="118" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="8">HD</text>
    <rect x="236" y="130" width="32" height="22" fill="#7b2fff" opacity="0.3" rx="3"/>
    <text x="252" y="144" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="7">BODY</text>
    <text x="252" y="178" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="11">64×64 Companion</text>
    <text x="252" y="193" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="9" opacity="0.5">Same file, scaled</text>
    
    <!-- ═══ Companion Widget Layout ═══ -->
    <text x="430" y="55" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="12" font-weight="bold">COMPANION WIDGET</text>
    
    <!-- Speech bubble -->
    <rect x="340" y="70" width="180" height="70" fill="#111827" stroke="#00d4ff" stroke-width="1.5" rx="8"/>
    <!-- Bubble pointer -->
    <polygon points="490,140 500,155 480,140" fill="#111827" stroke="#00d4ff" stroke-width="1.5"/>
    <!-- Text inside bubble -->
    <text x="355" y="92" fill="#e0e7ff" font-family="monospace" font-size="9">Welcome, traveler.</text>
    <text x="355" y="106" fill="#e0e7ff" font-family="monospace" font-size="9">Hover over anything</text>
    <text x="355" y="120" fill="#e0e7ff" font-family="monospace" font-size="9">to learn more...</text>
    <rect x="440" y="118" width="8" height="12" fill="#00d4ff" opacity="0.7"/>
    <text x="450" y="128" fill="#00d4ff" font-family="monospace" font-size="8">← cursor</text>
    
    <!-- Mini avatar under bubble -->
    <rect x="468" y="160" width="48" height="48" fill="#111827" stroke="#00d4ff" stroke-width="1.5" rx="6"/>
    <text x="492" y="188" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="8">🤖</text>
    <!-- Bobbing arrow -->
    <text x="492" y="225" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="9" opacity="0.5">↕ subtle bob</text>
    
    <!-- Position label -->
    <text x="430" y="250" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="9" opacity="0.5">Fixed: bottom-right, z-50</text>
    
    <!-- ═══ Color Palette Reference ═══ -->
    <text x="80" y="275" fill="#00d4ff" font-family="monospace" font-size="12" font-weight="bold">COLOR PALETTE</text>
    
    <rect x="40" y="290" width="30" height="20" fill="#0a0e1a" stroke="#e0e7ff" stroke-width="0.5"/>
    <text x="78" y="304" fill="#e0e7ff" font-family="monospace" font-size="9">#0a0e1a — base-dark</text>
    
    <rect x="40" y="315" width="30" height="20" fill="#111827" stroke="#e0e7ff" stroke-width="0.5"/>
    <text x="78" y="329" fill="#e0e7ff" font-family="monospace" font-size="9">#111827 — card-dark</text>
    
    <rect x="40" y="340" width="30" height="20" fill="#00d4ff"/>
    <text x="78" y="354" fill="#e0e7ff" font-family="monospace" font-size="9">#00d4ff — cyan-glow (primary)</text>
    
    <rect x="40" y="365" width="30" height="20" fill="#7b2fff"/>
    <text x="78" y="379" fill="#e0e7ff" font-family="monospace" font-size="9">#7b2fff — violet-glow (accent)</text>
    
    <rect x="300" y="290" width="30" height="20" fill="#e0e7ff"/>
    <text x="338" y="304" fill="#e0e7ff" font-family="monospace" font-size="9">#e0e7ff — white-soft (text)</text>
    
    <rect x="300" y="315" width="30" height="20" fill="#00d4ff" opacity="0.15" stroke="#00d4ff" stroke-width="0.5"/>
    <text x="338" y="329" fill="#e0e7ff" font-family="monospace" font-size="9">cyan-muted (borders, 15%)</text>
    
    <!-- ═══ Font Reference ═══ -->
    <text x="300" y="354" fill="#00d4ff" font-family="monospace" font-size="9" font-weight="bold">FONTS:</text>
    <text x="300" y="370" fill="#e0e7ff" font-family="monospace" font-size="9">Press Start 2P → headings, nav</text>
    <text x="300" y="384" fill="#e0e7ff" font-family="monospace" font-size="9">JetBrains Mono → code, labels</text>
  </svg>
````

---

Now let me also generate the full page layout reference SVG:

````artifact
id: page-layout-ref
name: Full Page Layout Reference
type: svg
content: |-
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="800" height="1200">
    <defs>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="1200" fill="#0a0e1a"/>
    <pattern id="dots2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="0.6" fill="#00d4ff" opacity="0.05"/>
    </pattern>
    <rect width="800" height="1200" fill="url(#dots2)"/>
    
    <!-- ═══ NAVBAR ═══ -->
    <rect x="0" y="0" width="800" height="50" fill="#111827" opacity="0.9"/>
    <line x1="0" y1="50" x2="800" y2="50" stroke="#00d4ff" stroke-width="1" opacity="0.15"/>
    
    <text x="120" y="32" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="11" font-weight="bold">🏠 BASE</text>
    <line x1="95" y1="42" x2="145" y2="42" stroke="#00d4ff" stroke-width="2" filter="url(#glow2)"/>
    
    <text x="260" y="32" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="11" opacity="0.5">📜 QUESTS</text>
    <text x="400" y="32" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="11" opacity="0.5">🛠️ ARSENAL</text>
    <text x="540" y="32" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="11" opacity="0.5">📡 INTEL</text>
    <text x="680" y="32" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="11" opacity="0.5">🗺️ FIELD LOG</text>
    
    <!-- Label -->
    <text x="790" y="32" text-anchor="end" fill="#00d4ff" font-family="monospace" font-size="8" opacity="0.3">sticky top</text>
    
    <!-- ═══ HERO SECTION (BASE TAB) ═══ -->
    <text x="30" y="80" fill="#00d4ff" font-family="monospace" font-size="13" font-weight="bold">BASE TAB — HeroSection</text>
    
    <!-- Avatar + Identity Row -->
    <rect x="30" y="95" width="740" height="130" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    
    <!-- Avatar placeholder -->
    <rect x="50" y="110" width="100" height="100" fill="#111827" stroke="#00d4ff" stroke-width="2" rx="8"/>
    <text x="100" y="155" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="9">PIXEL</text>
    <text x="100" y="168" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="9">AVATAR</text>
    <text x="100" y="181" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="8">128×128</text>
    
    <!-- Name + links -->
    <text x="175" y="125" fill="#00d4ff" font-family="monospace" font-size="16" font-weight="bold">Yuxuan Liu</text>
    <text x="175" y="143" fill="#7b2fff" font-family="monospace" font-size="10">刘宇轩</text>
    <text x="175" y="162" fill="#e0e7ff" font-family="monospace" font-size="10" opacity="0.7">Ph.D. in ECE · System Engineer @ TIER IV · Tokyo</text>
    
    <!-- Contact links row -->
    <rect x="175" y="175" width="50" height="18" fill="#111827" stroke="#00d4ff" stroke-width="0.5" rx="9"/>
    <text x="200" y="188" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="8">✉️ Email</text>
    <rect x="232" y="175" width="55" height="18" fill="#111827" stroke="#00d4ff" stroke-width="0.5" rx="9"/>
    <text x="259" y="188" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="8">🐙 GitHub</text>
    <rect x="294" y="175" width="58" height="18" fill="#111827" stroke="#00d4ff" stroke-width="0.5" rx="9"/>
    <text x="323" y="188" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="8">🎓 Scholar</text>
    <rect x="359" y="175" width="60" height="18" fill="#111827" stroke="#00d4ff" stroke-width="0.5" rx="9"/>
    <text x="389" y="188" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="8">💼 LinkedIn</text>
    <rect x="426" y="175" width="58" height="18" fill="#111827" stroke="#00d4ff" stroke-width="0.5" rx="9"/>
    <text x="455" y="188" text-anchor="middle" fill="#e0e7ff" font-family="monospace" font-size="8">📄 Resume</text>
    
    <!-- About Me Card -->
    <rect x="30" y="240" width="740" height="80" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <text x="50" y="262" fill="#00d4ff" font-family="monospace" font-size="11" font-weight="bold">ABOUT ME</text>
    <text x="50" y="280" fill="#e0e7ff" font-family="monospace" font-size="9" opacity="0.7">I am Yuxuan Liu, holding a Ph.D. from HKUST ECE, supervised by Prof. Ming Liu.</text>
    <text x="50" y="294" fill="#e0e7ff" font-family="monospace" font-size="9" opacity="0.7">Now a System Engineer at TIER IV. Research: 3D perception, depth, autonomous driving...</text>
    
    <!-- Education Timeline -->
    <rect x="30" y="335" width="355" height="100" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <text x="50" y="357" fill="#00d4ff" font-family="monospace" font-size="11" font-weight="bold">EDUCATION</text>
    <circle cx="52" cy="378" r="4" fill="#00d4ff" filter="url(#glow2)"/>
    <text x="65" y="378" fill="#e0e7ff" font-family="monospace" font-size="9">Ph.D. ECE — HKUST (2019-2024)</text>
    <line x1="52" y1="382" x2="52" y2="400" stroke="#00d4ff" stroke-width="1" opacity="0.3"/>
    <circle cx="52" cy="408" r="4" fill="#00d4ff" filter="url(#glow2)"/>
    <text x="65" y="408" fill="#e0e7ff" font-family="monospace" font-size="9">B.Sc. Mechatronics — ZJU (2015-2019)</text>
    
    <!-- Skill Bars -->
    <rect x="415" y="335" width="355" height="100" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <text x="435" y="357" fill="#00d4ff" font-family="monospace" font-size="11" font-weight="bold">STATS</text>
    
    <text x="435" y="375" fill="#e0e7ff" font-family="monospace" font-size="8">Chinese</text>
    <rect x="500" y="367" width="240" height="10" fill="#0a0e1a" rx="5" stroke="#00d4ff" stroke-width="0.3"/>
    <rect x="500" y="367" width="240" height="10" fill="#00d4ff" rx="5" opacity="0.7"/>
    <text x="748" y="375" fill="#e0e7ff" font-family="monospace" font-size="7">100</text>
    
    <text x="435" y="393" fill="#e0e7ff" font-family="monospace" font-size="8">Python</text>
    <rect x="500" y="385" width="240" height="10" fill="#0a0e1a" rx="5" stroke="#00d4ff" stroke-width="0.3"/>
    <rect x="500" y="385" width="221" height="10" fill="url(#grad1)" rx="5" opacity="0.7"/>
    <text x="730" y="393" fill="#e0e7ff" font-family="monospace" font-size="7">92</text>
    
    <text x="435" y="411" fill="#e0e7ff" font-family="monospace" font-size="8">Japanese</text>
    <rect x="500" y="403" width="240" height="10" fill="#0a0e1a" rx="5" stroke="#00d4ff" stroke-width="0.3"/>
    <rect x="500" y="403" width="216" height="10" fill="#00d4ff" rx="5" opacity="0.7"/>
    <text x="724" y="411" fill="#e0e7ff" font-family="monospace" font-size="7">90</text>
    
    <text x="435" y="429" fill="#e0e7ff" font-family="monospace" font-size="8">C++</text>
    <rect x="500" y="421" width="240" height="10" fill="#0a0e1a" rx="5" stroke="#00d4ff" stroke-width="0.3"/>
    <rect x="500" y="421" width="168" height="10" fill="#7b2fff" rx="5" opacity="0.7"/>
    <text x="676" y="429" fill="#e0e7ff" font-family="monospace" font-size="7">70</text>
    
    <!-- ═══ QUESTS TAB PREVIEW ═══ -->
    <text x="30" y="475" fill="#00d4ff" font-family="monospace" font-size="13" font-weight="bold">QUESTS TAB — PaperCard (2-col grid)</text>
    
    <!-- Paper card 1 -->
    <rect x="30" y="490" width="355" height="120" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <rect x="45" y="502" width="50" height="16" fill="transparent" stroke="#f97316" stroke-width="1" rx="8"/>
    <text x="70" y="514" text-anchor="middle" fill="#f97316" font-family="monospace" font-size="8">T-ASE 2023</text>
    <text x="340" y="514" text-anchor="end" fill="#22c55e" font-family="monospace" font-size="7" opacity="0.5">COMPLETED ✓</text>
    <text x="45" y="535" fill="#e0e7ff" font-family="monospace" font-size="9" font-weight="bold">FSNet: Redesign Self-Supervised</text>
    <text x="45" y="548" fill="#e0e7ff" font-family="monospace" font-size="9" font-weight="bold">MonoDepth for Full-Scale Depth...</text>
    <text x="45" y="565" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4"><tspan fill="#00d4ff">Yuxuan Liu</tspan>, Z. Xu, H. Huang, L. Wang, M. Liu</text>
    <rect x="45" y="578" width="35" height="16" fill="transparent" stroke="#00d4ff" stroke-width="0.5" rx="8"/>
    <text x="62" y="590" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="8">arXiv</text>
    <rect x="87" y="578" width="35" height="16" fill="transparent" stroke="#00d4ff" stroke-width="0.5" rx="8"/>
    <text x="104" y="590" text-anchor="middle" fill="#00d4ff" font-family="monospace" font-size="8">Code</text>
    
    <!-- Paper card 2 -->
    <rect x="415" y="490" width="355" height="120" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <rect x="430" y="502" width="50" height="16" fill="transparent" stroke="#eab308" stroke-width="1" rx="8"/>
    <text x="455" y="514" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="8">ICRA 2021</text>
    <text x="725" y="514" text-anchor="end" fill="#22c55e" font-family="monospace" font-size="7" opacity="0.5">COMPLETED ✓</text>
    <text x="430" y="535" fill="#e0e7ff" font-family="monospace" font-size="9" font-weight="bold">YOLOStereo3D: A Step Back to 2D</text>
    <text x="430" y="548" fill="#e0e7ff" font-family="monospace" font-size="9" font-weight="bold">for Efficient Stereo 3D Detection</text>
    <text x="430" y="565" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4"><tspan fill="#00d4ff">Yuxuan Liu</tspan>, L. Wang, M. Liu</text>
    
    <!-- ═══ ARSENAL TAB PREVIEW ═══ -->
    <text x="30" y="650" fill="#00d4ff" font-family="monospace" font-size="13" font-weight="bold">ARSENAL TAB — RepoCard (collapsible groups, 3-col)</text>
    
    <!-- Category header -->
    <text x="45" y="675" fill="#e0e7ff" font-family="monospace" font-size="11">🔬 CORE RESEARCH <tspan fill="#e0e7ff" opacity="0.3">(3)</tspan> <tspan fill="#00d4ff" font-size="9">▼</tspan></text>
    
    <!-- 3 repo cards -->
    <rect x="30" y="685" width="235" height="90" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <text x="45" y="705" fill="#e0e7ff" font-family="monospace" font-size="10" font-weight="bold">visualDet3D</text>
    <text x="45" y="720" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Ground-aware Monocular 3D</text>
    <text x="45" y="733" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Object Detection...</text>
    <circle cx="50" cy="755" r="4" fill="#3b82f6"/>
    <text x="60" y="758" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Python  ⭐ 398  🍴 78</text>
    
    <rect x="282" y="685" width="235" height="90" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <text x="297" y="705" fill="#e0e7ff" font-family="monospace" font-size="10" font-weight="bold">FSNet</text>
    <text x="297" y="720" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Full Scale Monocular Depth</text>
    <text x="297" y="733" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Prediction...</text>
    <circle cx="302" cy="755" r="4" fill="#3b82f6"/>
    <text x="312" y="758" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Python  ⭐ 63  🍴 6</text>
    
    <rect x="534" y="685" width="235" height="90" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <text x="549" y="705" fill="#e0e7ff" font-family="monospace" font-size="10" font-weight="bold">visionfactory</text>
    <text x="549" y="720" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Open source training framework</text>
    <text x="549" y="733" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">for vision tasks...</text>
    <circle cx="554" cy="755" r="4" fill="#3b82f6"/>
    <text x="564" y="758" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Python  ⭐ 43  🍴 6</text>
    
    <!-- Collapsed category -->
    <text x="45" y="805" fill="#e0e7ff" font-family="monospace" font-size="11" opacity="0.5">🤖 ROS / ROBOTICS <tspan opacity="0.3">(7)</tspan> <tspan fill="#00d4ff" font-size="9">▶</tspan></text>
    <text x="45" y="825" fill="#e0e7ff" font-family="monospace" font-size="11" opacity="0.5">🧠 AI TOOLS / LLM <tspan opacity="0.3">(8)</tspan> <tspan fill="#00d4ff" font-size="9">▶</tspan></text>
    
    <!-- ═══ INTEL TAB PREVIEW ═══ -->
    <text x="30" y="870" fill="#00d4ff" font-family="monospace" font-size="13" font-weight="bold">INTEL TAB — IntelFeed (scrollable list)</text>
    
    <!-- Status bar -->
    <circle cx="45" cy="893" r="4" fill="#22c55e">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <text x="55" y="897" fill="#e0e7ff" font-family="monospace" font-size="9" opacity="0.4">Last updated: 2026-04-09</text>
    
    <!-- Feed items -->
    <rect x="30" y="905" width="740" height="50" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <rect x="45" y="916" width="35" height="14" fill="transparent" stroke="#ef4444" stroke-width="0.5" rx="7"/>
    <text x="62" y="926" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="7">arxiv</text>
    <text x="90" y="926" fill="#e0e7ff" font-family="monospace" font-size="9">Scaling Vision Transformers to 22B Parameters</text>
    <text x="90" y="942" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">Google explores scaling ViT to 22 billion parameters with improved training...</text>
    
    <rect x="30" y="960" width="740" height="50" fill="#111827" stroke="#00d4ff" stroke-width="1" rx="8" opacity="0.6"/>
    <rect x="45" y="971" width="35" height="14" fill="transparent" stroke="#22c55e" stroke-width="0.5" rx="7"/>
    <text x="62" y="981" text-anchor="middle" fill="#22c55e" font-family="monospace" font-size="7">blog</text>
    <text x="90" y="981" fill="#e0e7ff" font-family="monospace" font-size="9">Understanding MoE Dispatch in DeepSeek-V3</text>
    <text x="90" y="997" fill="#e0e7ff" font-family="monospace" font-size="8" opacity="0.4">A deep dive into the auxiliary-loss-free load balancing strategy...</text>
    
    <!-- ═══ COMPANION (floating) ═══ -->
    <rect x="610" y="1060" width="160" height="55" fill="#111827" stroke="#00d4ff" stroke-width="1.5" rx="8"/>
    <polygon points="740,1115 750,1130 730,1115" fill="#111827" stroke="#00d4ff" stroke-width="1.5"/>
    <text x="625" y="1080" fill="#e0e7ff" font-family="monospace" font-size="8">FSNet — full-scale</text>
    <text x="625