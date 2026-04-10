"use client";

import React, { useState, useEffect } from "react";
import PixelBackground from "@/components/PixelBackground/PixelBackground";
import NavBar from "@/components/NavBar/NavBar";
import TabContainer from "@/components/TabContainer/TabContainer";
import CompanionNarrator from "@/components/CompanionNarrator/CompanionNarrator";
import Footer from "@/components/Footer/Footer";
import { useNarrator } from "@/hooks/useNarrator";
import type { TabId } from "@/components/NavBar/NavBar";

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
  const [activeTab, setActiveTab] = useState<TabId>("home");

  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash && HASH_TO_TAB[hash]) {
      setActiveTab(HASH_TO_TAB[hash]);
    }
  }, []);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
  };

  const { narratorText, handleMouseOver } = useNarrator(
    "Welcome, trailblazer. Hover over anything to learn more about me..."
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
