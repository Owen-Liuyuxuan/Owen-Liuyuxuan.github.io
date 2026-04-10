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

const ANALYSIS_FIELD_META: { key: string; label: string; icon: string }[] = [
  { key: "method",      label: "方法",  icon: "⚙️" },
  { key: "experiment", label: "实验",  icon: "🔬" },
  { key: "impact",     label: "应用",  icon: "🚀" },
  { key: "limitations", label: "局限",  icon: "⚠️" },
  { key: "related",     label: "相关",  icon: "🔗" },
  { key: "summary",     label: "摘要",  icon: "📋" },
];

function KeyFindingsList({ findings }: { findings: string[] }) {
  if (findings.length === 0) return null;
  return (
    <ul className="mt-2 space-y-1">
      {findings.map((f, i) => (
        <li key={i} className="text-xs text-white-soft/30 font-body flex gap-1.5 items-start">
          <span className="text-cyan-400/40 mt-0.5 shrink-0">▸</span>
          <span>{f.replace(/\*\*/g, "").replace(/\n/g, " ").trim()}</span>
        </li>
      ))}
    </ul>
  );
}

function cleanAnalysisText(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/^[\*\-]+\s*/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderBulletList(text: string): React.ReactNode {
  const lines = text.split("\n").filter((l) => l.trim());
  const bulletRe = /^[\-\*]\s+/;
  const result: React.ReactNode[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length === 0) return;
    result.push(
      <li key={`buf-${result.length}`} className="text-xs text-white-soft/40 font-body leading-relaxed pl-2">
        {buffer.join(" ")}
      </li>
    );
    buffer = [];
  };

  for (const line of lines) {
    if (bulletRe.test(line) || line.match(/^\d+\.\s/)) {
      flush();
      const content = line.replace(bulletRe, "").replace(/^\d+\.\s/, "");
      result.push(
        <li key={`bullet-${result.length}`} className="text-xs text-white-soft/40 font-body leading-relaxed pl-2 before:content-['▸_'] before:text-cyan-400/30">
          {content}
        </li>
      );
    } else {
      buffer.push(line.trim());
    }
  }
  flush();
  return result.length > 0 ? <ul className="mt-1 space-y-0.5">{result}</ul> : null;
}

function AnalysisSection({ text }: { text: string }) {
  if (!text) return null;
  const cleaned = cleanAnalysisText(text);
  const bullets = renderBulletList(cleaned);
  return (
    <div className="mt-3">
      {bullets ?? (
        <p className="text-xs text-white-soft/40 font-body leading-relaxed">{cleaned}</p>
      )}
    </div>
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

          const presentAnalysisFields = ANALYSIS_FIELD_META.filter(
            ({ key }) => item.analysis[key]
          );

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
                  </div>

                  {/* Abstract preview */}
                  {item.abstract && (
                    <p className={`font-body text-xs mt-2 transition-all duration-200 ${isOpen ? "text-white-soft/50" : "text-white-soft/30 line-clamp-2"}`}>
                      {isOpen
                        ? item.abstract.replace(/\*\*/g, "").replace(/\n+/g, " ").trim()
                        : shorten(item.abstract, 150)}
                    </p>
                  )}
                </div>
              </div>

              {/* Expanded: analysis + key findings */}
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-white-soft/10 pl-0">
                  {presentAnalysisFields.length > 0 && (
                    presentAnalysisFields.map(({ key }) => (
                      <AnalysisSection key={key} text={item.analysis[key] ?? ""} />
                    ))
                  )}

                  {item.keyFindings.length > 0 && (
                    <KeyFindingsList findings={item.keyFindings} />
                  )}

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
