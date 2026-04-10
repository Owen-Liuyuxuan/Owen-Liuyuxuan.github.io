"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CompanionNarratorProps {
  text: string;
}

function useTypewriter(fullText: string, speed: number = 25): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayed(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [fullText, speed]);

  return displayed;
}

export default function CompanionNarrator({ text }: CompanionNarratorProps) {
  const displayedText = useTypewriter(text, 20);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 max-w-xs pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-card-dark/95 backdrop-blur-sm border border-cyan-muted rounded-lg px-3 py-2 shadow-glow-cyan"
        >
          <p className="font-mono text-xs text-white-soft/90 leading-relaxed">
            {displayedText}
            <span className="animate-pixel-blink text-cyan-glow">_</span>
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="w-16 h-16 rounded-lg border border-cyan-muted shadow-glow-cyan overflow-hidden"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <AvatarPlaceholder />
      </motion.div>
    </div>
  );
}

function AvatarPlaceholder() {
  return (
    <div
      className="w-full h-full pixel-render"
      style={{
        background: "linear-gradient(135deg, #111827 0%, #0a0e1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title="Avatar placeholder — replace with your pixel sprite"
    >
      <span className="font-pixel text-[8px] text-cyan-glow/50 text-center leading-tight px-1">
        AVATAR
        <br />
        <span className="text-[6px] opacity-60">TODO</span>
      </span>
    </div>
  );
}
