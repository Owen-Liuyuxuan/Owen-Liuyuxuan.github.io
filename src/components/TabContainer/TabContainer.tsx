"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection/HeroSection";
import PaperCard from "@/components/PaperCard/PaperCard";
import RepoCard from "@/components/RepoCard/RepoCard";
import IntelFeed from "@/components/IntelFeed/IntelFeed";
import FieldLog from "@/components/FieldLog/FieldLog";
import type { TabId } from "@/components/NavBar/NavBar";

interface TabContainerProps {
  activeTab: TabId;
}

export default function TabContainer({ activeTab }: TabContainerProps) {
  return (
    <div className="min-h-[60vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "home"     && <HeroSection />}
          {activeTab === "quests"   && <PaperCard />}
          {activeTab === "arsenal"  && <RepoCard />}
          {activeTab === "intel"    && <IntelFeed />}
          {activeTab === "fieldlog" && <FieldLog />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
