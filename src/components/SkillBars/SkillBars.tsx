"use client";

import React from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { label: "Chinese", level: 100, color: "from-cyan-glow to-cyan-glow" },
  { label: "English", level: 87, color: "from-cyan-glow to-violet-glow" },
  { label: "Japanese", level: 90, color: "from-cyan-glow to-violet-glow" },
  { label: "Python", level: 92, color: "from-cyan-glow to-violet-glow" },
  { label: "C++", level: 70, color: "from-violet-glow to-violet-glow" },
  { label: "ROS2", level: 80, color: "from-violet-glow to-cyan-glow" },
];

export default function SkillBars() {
  return (
    <div className="space-y-3" data-narrator="Skills and proficiency levels — languages and technical skills.">
      {SKILLS.map((skill, i) => (
        <div key={skill.label} data-narrator={`${skill.label}: ${skill.level} percent proficiency.`}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs text-white-soft/70">
              {skill.label}
            </span>
            <span className="font-mono text-[10px] text-cyan-glow/60">
              {skill.level}
            </span>
          </div>
          <div className="relative h-2 bg-base-dark rounded-full overflow-hidden border border-cyan-muted/30">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
              style={{
                boxShadow: "0 0 6px rgba(0,212,255,0.4)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
