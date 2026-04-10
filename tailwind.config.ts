import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-dark":   "#0a0e1a",
        "card-dark":   "#111827",
        "cyan-glow":   "#00d4ff",
        "cyan-muted":  "rgba(0, 212, 255, 0.15)",
        "violet-glow": "#7b2fff",
        "white-soft":  "#e0e7ff",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        mono:  ["var(--font-mono)", "monospace"],
        body:  ["var(--font-body)", "sans-serif"],
      },
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
