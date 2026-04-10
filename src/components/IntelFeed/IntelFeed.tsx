"use client";

import React from "react";
import { motion } from "framer-motion";
import intelData from "@/data/intel_feed.json";

interface IntelItem {
  title: string;
  summary: string;
  url: string;
  source: "arxiv" | "blog" | "news";
  date: string;
  narratorHint: string;
}

const SOURCE_STYLE: Record<string, string> = {
  arxiv: "border-red-400 text-red-400",
  blog:  "border-green-400 text-green-400",
  news:  "border-yellow-400 text-yellow-400",
};

export default function IntelFeed() {
  const items = (intelData as IntelItem[]).slice(0, 20);
  const lastUpdated = items[0]?.date ?? "Unknown";

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-pixel text-sm text-cyan-glow"
          data-narrator="Daily AI intelligence feed — latest papers, blog posts, and news in AI and robotics. Auto-updated daily.">
          📡 INTEL FEED
        </h2>
        <span
          className="flex items-center gap-1 text-xs font-mono text-white-soft/40"
          data-narrator={`Last updated on ${lastUpdated}. Data fetched from everyday_my_arxiv.`}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Last updated: {lastUpdated}
        </span>
      </div>

      <div
        className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin"
        data-narrator="Intelligence feed items — scroll to see all recent papers and posts."
      >
        {items.map((item, i) => (
          <motion.a
            key={`${item.title}-${i}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="game-card block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            data-narrator={item.narratorHint}
          >
            <div className="flex items-start gap-3">
              <span
                className={`tag-pill text-[9px] flex-shrink-0 ${SOURCE_STYLE[item.source] ?? ""}`}
                data-narrator={`Source: ${item.source}.`}
              >
                {item.source}
              </span>
              <div className="min-w-0">
                <h3 className="font-mono text-sm text-white-soft truncate">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-white-soft/40 mt-1 line-clamp-2">
                  {item.summary}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
