"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reposData from "@/data/repos.json";

interface Repo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  category: string;
  topics: string[];
  updatedAt: string;
  narratorHint: string;
}

const CATEGORIES: { key: string; label: string; icon: string }[] = [
  { key: "research",   label: "CORE RESEARCH",  icon: "🔬" },
  { key: "ros",        label: "ROS / ROBOTICS", icon: "🤖" },
  { key: "ai-tools",   label: "AI TOOLS / LLM", icon: "🧠" },
  { key: "data-viz",   label: "DATA / VIZ",     icon: "📊" },
  { key: "early-work", label: "EARLY WORK",     icon: "🏫" },
];

const LANG_COLORS: Record<string, string> = {
  Python:     "bg-blue-400",
  TypeScript: "bg-blue-600",
  JavaScript: "bg-yellow-400",
  "C++":      "bg-pink-400",
  HTML:       "bg-orange-400",
  CSS:        "bg-purple-400",
  Shell:      "bg-green-400",
  C:          "bg-gray-400",
};

function RepoItemCard({ repo, index }: { repo: Repo; index: number }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="game-card block cursor-pointer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-narrator={repo.narratorHint}
    >
      <h3 className="font-mono text-sm font-semibold text-white-soft mb-1">
        {repo.name}
      </h3>
      <p className="font-body text-xs text-white-soft/50 mb-3 line-clamp-2">
        {repo.description}
      </p>
      <div className="flex items-center gap-4 text-xs font-mono text-white-soft/40">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${LANG_COLORS[repo.language] ?? "bg-gray-500"}`} />
            {repo.language}
          </span>
        )}
        <span>⭐ {repo.stars}</span>
        {repo.forks > 0 && <span>🍴 {repo.forks}</span>}
      </div>
      {repo.topics.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-2">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="tag-pill text-[9px]">{t}</span>
          ))}
        </div>
      )}
    </motion.a>
  );
}

export default function RepoCard() {
  const repos = reposData as Repo[];
  const [expandedCat, setExpandedCat] = useState<string | null>("research");

  return (
    <section>
      <h2 className="font-pixel text-sm text-cyan-glow mb-6"
        data-narrator="My GitHub repos — tools, research code, and side projects. Auto-updated daily.">
        🛠️ ARSENAL — REPOSITORIES
      </h2>

      <div className="space-y-6">
        {CATEGORIES.map((cat) => {
          const catRepos = repos.filter((r) => r.category === cat.key);
          if (catRepos.length === 0) return null;
          const isOpen = expandedCat === cat.key;

          return (
            <div key={cat.key}>
              <button
                onClick={() => setExpandedCat(isOpen ? null : cat.key)}
                className="font-pixel text-xs text-white-soft/80 hover:text-cyan-glow transition-colors mb-3 flex items-center gap-2"
                data-narrator={`${cat.label} category — ${catRepos.length} repositories. Click to expand or collapse.`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-white-soft/30">({catRepos.length})</span>
                <span className="text-[10px]">{isOpen ? "▼" : "▶"}</span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden"
                  >
                    {catRepos.map((repo, i) => (
                      <RepoItemCard key={repo.name} repo={repo} index={i} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
