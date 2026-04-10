"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export type TabId = "home" | "quests" | "arsenal" | "intel" | "fieldlog";

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const ICON_PATHS: Record<TabId, string> = {
  home:     "/assets/sprites/icon-home.png",
  quests:   "/assets/sprites/icon-quests.png",
  arsenal:  "/assets/sprites/icon-arsenal.png",
  intel:    "/assets/sprites/icon-intel.png",
  fieldlog: "/assets/sprites/icon-fieldlog.png",
};

const TABS: { id: TabId; label: string }[] = [
  { id: "home",     label: "BASE" },
  { id: "quests",   label: "QUESTS" },
  { id: "arsenal",  label: "ARSENAL" },
  { id: "intel",   label: "INTEL" },
  { id: "fieldlog", label: "FIELD LOG" },
];

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <nav
      className="sticky top-0 z-40 bg-card-dark/80 backdrop-blur-md border-b border-cyan-muted"
      data-narrator="Where is the next stop?"
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
                data-narrator={`${getTabNarrator(tab.id)}`}
              >
                <span className="w-5 h-5 relative flex-shrink-0 pixel-render">
                  <Image
                    src={ICON_PATHS[tab.id]}
                    alt={tab.label}
                    fill
                    sizes="20px"
                    className="object-contain"
                  />
                </span>
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
    home: "Home, sweet home",
    quests: "Paper quests. Are you still reading papers?",
    arsenal: "Tool inventories. Let's coding",
    intel: "Daily AI intel feed. One paper a day, keep the Dr. away!",
    fieldlog: "External field links. What you gonna checkout next?",
  };
  return hints[tabId];
}
