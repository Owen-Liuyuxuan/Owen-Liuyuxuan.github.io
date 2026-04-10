"use client";

import React from "react";
import { motion } from "framer-motion";

const FIELD_LINKS = [
  {
    title: "Paper Reading Blog",
    description:
      "My personal blog where I share paper reading notes and insights on computer vision, autonomous driving, and AI.",
    url: "https://owen-liuyuxuan.github.io/papers_reading_sharing.github.io/",
    emoji: "📖",
    narratorHint:
      "My paper reading blog — community notes on CV, autonomous driving, and AI papers. Join the discussion!",
  },
  {
    title: "FSNet Project Page",
    description:
      "Full-Scale Self-Supervised Monocular Depth Prediction — project page with demos, video, and benchmark results.",
    url: "https://sites.google.com/view/fsnet/",
    emoji: "🌐",
    narratorHint:
      "FSNet demos and video results — watch full-scale depth estimation in action.",
  },
  {
    title: "Hercules Autonomous Vehicle",
    description:
      "Watch the first commercial autonomous logistic vehicle Hercules in action — deployed during my Ph.D. at HKUST.",
    url: "https://www.youtube.com/watch?v=ggyQgRe9cds",
    emoji: "🚛",
    narratorHint:
      "Hercules, the first commercial autonomous logistics vehicle — I helped deploy it during my Ph.D.!",
  },
  {
    title: "ArXiv Word Cloud",
    description:
      "Visualization of papers I read daily — an interactive word cloud of trending topics in AI and robotics.",
    url: "https://github.com/Owen-Liuyuxuan/arxiv_word_cloud",
    emoji: "☁️",
    narratorHint:
      "ArXiv word cloud — see what topics are dominating my daily reading habit.",
  },
];

export default function FieldLog() {
  return (
    <section>
      <h2
        className="font-pixel text-sm text-cyan-glow mb-6"
        data-narrator="Field log — a collection of projects and resources outside the main site. Check them out!"
      >
        🗺️ FIELD LOG — EXTERNAL LINKS
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELD_LINKS.map((link, i) => (
          <motion.a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="game-card block cursor-pointer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            data-narrator={link.narratorHint}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{link.emoji}</span>
              <div className="min-w-0">
                <h3 className="font-mono text-sm font-semibold text-white-soft mb-1">
                  {link.title}
                </h3>
                <p className="font-body text-xs text-white-soft/50 mb-3 line-clamp-2">
                  {link.description}
                </p>
                <span className="tag-pill text-[9px]">
                  ↗ Open in new tab
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
