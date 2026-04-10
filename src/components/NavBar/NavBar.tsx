"use client";

import React from "react";
import { motion } from "framer-motion";

export type TabId = "home" | "quests" | "arsenal" | "intel" | "fieldlog";

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; emoji: string; label: string }[] = [
  { id: "home",     emoji: "🏠", label: "BASE" },
  { id: "quests",   emoji: "📜", label: "QUESTS" },
  { id: "arsenal",  emoji: "🛠️", label: "ARSENAL" },
  { id: "intel",   emoji: "📡", label: "INTEL" },
  { id: "fieldlog", emoji: "🗺️", label: "FIELD LOG" },
];

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <nav
      className="sticky top-0 z-40 bg-card-dark/80 backdrop-blur-md border-b border-cyan-muted"
      data-narrator="Navigation — choose a section to explore."
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-12 gap-1 overflow-x-auto scrollbar-thin">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative flex items-center gap-1.5 px-3 py-1.5 rounded
                  text-[10px] font-pixel whitespace-nowrap
                  transition-colors duration-200 flex-shrink-0
                  ${isActive
                    ? "text-cyan-glow"
                    : "text-white-soft/50 hover:text-white-soft"
                  }
                `}
                data-narrator={`Switch to ${tab.label} — ${getTabNarrator(tab.id)}`}
              >
                <span className="text-sm">{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-glow rounded-full"
                    style={{ boxShadow: "0 0 8px rgba(0, 212, 255, 0.6)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function getTabNarrator(tabId: TabId): string {
  const hints: Record<TabId, string> = {
    home: "Your home base — bio, education, and skills.",
    quests: "Published papers — completed research quests.",
    arsenal: "GitHub repositories — your tool inventory.",
    intel: "Daily AI intel feed — latest papers and news.",
    fieldlog: "External projects and links — field notes.",
  };
  return hints[tabId];
}
