"use client";

import React from "react";
import { motion } from "framer-motion";
import { PAPERS, type Paper } from "@/data/papers";

const VENUE_COLORS: Record<string, string> = {
  "RA-L":  "border-green-400 text-green-400",
  "ICRA":  "border-yellow-400 text-yellow-400",
  "T-ASE": "border-orange-400 text-orange-400",
  "TGRS":  "border-blue-400 text-blue-400",
  "ECCV":  "border-pink-400 text-pink-400",
};

function QuestCard({ paper, index }: { paper: Paper; index: number }) {
  const venueStyle = VENUE_COLORS[paper.venueShort] ?? "border-cyan-glow text-cyan-glow";

  return (
    <motion.div
      className="game-card relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      data-narrator={paper.narratorHint}
    >
      {/* Completed stamp */}
      <div className="absolute top-3 right-3 font-pixel text-[8px] text-green-400/60">
        COMPLETED ✓
      </div>

      {/* Venue badge */}
      <span
        className={`inline-block text-[10px] font-pixel px-2 py-0.5 rounded border mb-2 ${venueStyle}`}
      >
        {paper.venueShort} {paper.year}
      </span>

      {/* Title */}
      <h3
        className="font-mono text-sm font-semibold text-white-soft leading-snug mb-2 pr-12"
      >
        {paper.title}
      </h3>

      {/* Authors */}
      <p className="font-body text-xs text-white-soft/50 mb-3">
        {paper.authors.map((a, i) => (
          <span key={i}>
            {i > 0 && ", "}
            <span className={a.isOwner ? "text-cyan-glow font-semibold" : ""}>
              {a.name}
            </span>
          </span>
        ))}
      </p>

      {/* Action links */}
      <div className="flex gap-2 flex-wrap" data-narrator="Tap to open the paper links.">
        {paper.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tag-pill hover:bg-cyan-glow/20 transition-colors"
            data-narrator={`Open ${link.label}.`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function PaperCard() {
  return (
    <section>
      <h2 className="font-pixel text-sm text-cyan-glow mb-6"
        data-narrator="Publications — memories from my school days. Click to explore each paper.">
        📜 QUESTS — PUBLICATIONS
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {PAPERS.map((paper, i) => (
          <QuestCard key={paper.title} paper={paper} index={i} />
        ))}
      </div>
    </section>
  );
}
