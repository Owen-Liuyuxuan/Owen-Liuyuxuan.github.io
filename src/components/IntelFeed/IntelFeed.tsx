"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import intelData from "@/data/intel_feed.json";

interface IntelItem {
  title: string;
  url: string;
  authors: string[];
  published: string;
  categories: string[];
  abstract: string;
  analysis: {
    summary?: string;
    method?: string;
    experiment?: string;
    impact?: string;
    related?: string;
    limitations?: string;
    [key: string]: string | undefined;
  };
  keyFindings: string[];
  links: { pdf: string; arxiv: string };
  source: "arxiv" | "blog" | "news";
  date: string;
  narratorHint: string;
}

const SOURCE_STYLE: Record<string, string> = {
  arxiv: "border-red-400 text-red-400",
  blog:  "border-green-400 text-green-400",
  news:  "border-yellow-400 text-yellow-400",
};

const CATEGORY_COLORS: Record<string, string> = {
  "cs.CV":  "bg-purple-500/20 text-purple-300",
  "cs.RO":  "bg-blue-500/20 text-blue-300",
  "cs.LG":  "bg-green-500/20 text-green-300",
  "cs.AI":  "bg-orange-500/20 text-orange-300",
  "cs.CL":  "bg-teal-500/20 text-teal-300",
  "cs.GR":  "bg-pink-500/20 text-pink-300",
  "default": "bg-gray-500/20 text-gray-300",
};

function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS["default"];
}

function shorten(text: string, maxLen: number): string {
  const clean = text.replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
  return clean.length > maxLen ? clean.slice(0, maxLen) + "…" : clean;
}

function truncate(text: string, maxLen: number): string {
  const clean = text.replace(/\*\*/g, "").replace(/\n/g, " ").trim();
  return clean.length > maxLen ? clean.slice(0, maxLen) + "…" : clean;
}

function InsightsBadge({ analysis }: { analysis: IntelItem["analysis"] }) {
  const items = [];
  if (analysis.summary) items.push("摘要");
  if (analysis.method) items.push("方法");
  if (analysis.experiment) items.push("实验");
  if (analysis.impact || analysis.related) items.push("应用");
  if (analysis.limitations) items.push("局限");
  if (items.length === 0) return null;
  return (
    <span className="text-[9px] text-cyan-400/50 border border-cyan-400/20 px-1.5 py-0.5 rounded font-mono">
      {items.join(" · ")}
    </span>
  );
}

function KeyFindingsList({ findings }: { findings: string[] }) {
  if (findings.length === 0) return null;
  return (
    <ul className="mt-2 space-y-1">
      {findings.slice(0, 3).map((f, i) => (
        <li key={i} className="text-xs text-white-soft/30 font-body flex gap-1.5 items-start">
          <span className="text-cyan-400/40 mt-0.5 shrink-0">▸</span>
          <span>{truncate(f, 120)}</span>
        </li>
      ))}
      {findings.length > 3 && (
        <li className="text-[10px] text-cyan-400/30 font-mono">+{findings.length - 3} more findings</li>
      )}
    </ul>
  );
}

export default function IntelFeed() {
  const items = (intelData as IntelItem[]).slice(0, 20);
  const lastUpdated = items[0]?.date ?? "Unknown";
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-pixel text-sm text-cyan-glow"
          data-narrator="Daily AI intelligence feed from Arxiv">
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
        {items.map((item, i) => {
          const isOpen = expanded.has(i);
          return (
            <motion.div
              key={`${item.title}-${i}`}
              className="game-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              {/* Header row — always visible */}
              <div className="flex items-start gap-3">
                <span
                  className={`tag-pill text-[9px] flex-shrink-0 ${SOURCE_STYLE[item.source] ?? ""}`}
                  data-narrator={`Source: ${item.source}.`}
                >
                  {item.source}
                </span>
                <div className="min-w-0 flex-1">
                  {/* Title + expand button */}
                  <div className="flex items-center gap-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-white-soft hover:text-cyan-400 transition-colors truncate flex-1"
                      data-narrator={item.narratorHint}
                    >
                      {item.title}
                    </a>
                    <button
                      onClick={() => toggle(i)}
                      className="text-[10px] text-white-soft/30 hover:text-cyan-400 transition-colors shrink-0"
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? "▲" : "▼"}
                    </button>
                  </div>

                  {/* Authors + date + categories */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    {item.authors.length > 0 && (
                      <span className="text-[10px] text-white-soft/30 font-body truncate max-w-[200px]">
                        {item.authors.slice(0, 3).join(", ")}
                        {item.authors.length > 3 && (
                          <span className="text-cyan-400/40"> +{item.authors.length - 3}</span>
                        )}
                      </span>
                    )}
                    {item.published && (
                      <span className="text-[9px] text-white-soft/20 font-mono">{item.published}</span>
                    )}
                    {item.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`text-[9px] px-1 py-0.5 rounded font-mono ${categoryColor(cat)}`}
                      >
                        {cat}
                      </span>
                    ))}
                    <InsightsBadge analysis={item.analysis} />
                  </div>

                  {/* Abstract preview */}
                  {item.abstract && (
                    <p className={`font-body text-xs mt-2 transition-all duration-200 ${isOpen ? "text-white-soft/50" : "text-white-soft/30 line-clamp-2"}`}>
                      {isOpen ? item.abstract.replace(/\*\*/g, "").replace(/\n+/g, " ").trim()
                               : shorten(item.abstract, 150)}
                    </p>
                  )}
                </div>
              </div>

              {/* Expanded: key findings + links */}
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-white-soft/10 pl-0">
                  <KeyFindingsList findings={item.keyFindings} />
                  <div className="flex gap-3 mt-3">
                    {item.links.pdf && (
                      <a
                        href={item.links.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-cyan-400/60 hover:text-cyan-400 transition-colors"
                      >
                        [PDF]
                      </a>
                    )}
                    {item.links.arxiv && (
                      <a
                        href={item.links.arxiv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-cyan-400/60 hover:text-cyan-400 transition-colors"
                      >
                        [arXiv]
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
