"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROFILE } from "@/data/profile";
import SkillBars from "@/components/SkillBars/SkillBars";

export default function HeroSection() {
  const { name, nameCN, title, aboutMe, links, education } = PROFILE;

  return (
    <section className="space-y-6">
      {/* Avatar + Identity */}
      <div
        className="game-card flex flex-col sm:flex-row gap-6 items-start"
        data-narrator="That's me — pixelated, but still me."
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src="/assets/sprites/avatar-pixel.png"
            alt="Yuxuan Liu — pixel avatar"
            className="w-32 h-32 rounded-lg border-2 border-cyan-muted shadow-glow-cyan pixel-render object-cover"
          />
        </div>

        {/* Identity */}
        <div className="flex-1 min-w-0">
          <h1
            className="font-pixel text-lg text-cyan-glow leading-tight mb-1"
            data-narrator="Ph.D. researcher and system engineer. Making autonomous vehicles smarter, one pixel at a time."
          >
            {name}
          </h1>
          <p
            className="font-pixel text-sm text-violet-glow mb-2"
            data-narrator="刘宇轩 — my Chinese name."
          >
            {nameCN}
          </p>
          <p
            className="font-body text-sm text-white-soft/60 mb-4 leading-relaxed"
            data-narrator="Currently working in Tokyo at TIER IV as a system engineer."
          >
            {title}
          </p>

          {/* Contact links */}
          <div
            className="flex flex-wrap gap-2"
            data-narrator="Contact links — email, GitHub, Google Scholar, LinkedIn, and resume download."
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono border border-cyan-muted text-cyan-glow/80 hover:text-cyan-glow hover:border-cyan-glow/50 transition-colors"
                data-narrator={link.narratorHint}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* About Me */}
      <div
        className="game-card"
        data-narrator="Ask me anything."
      >
        <h2
          className="font-pixel text-xs text-cyan-glow mb-3"
          data-narrator="Ask me anything"
        >
          ABOUT ME
        </h2>
        <p
          className="font-body text-sm text-white-soft/70 leading-relaxed"
          data-narrator="Ph.D. in ECE at HKUST. Focuses on 3D perception, depth estimation, and autonomous driving."
        >
          {aboutMe}
        </p>
      </div>

      {/* Education + Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Education Timeline */}
        <div
          className="game-card"
          data-narrator="The journey so far"
        >
          <h2
            className="font-pixel text-xs text-cyan-glow mb-4"
            data-narrator="The journey so far"
          >
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                className="relative pl-5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                data-narrator={edu.narratorHint}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-glow"
                  style={{ boxShadow: "0 0 6px rgba(0,212,255,0.6)" }} />
                {/* Timeline line */}
                {i < education.length - 1 && (
                  <div className="absolute left-[4px] top-5 bottom-0 w-px bg-cyan-muted" />
                )}
                <div>
                  <p className="font-mono text-xs text-white-soft font-semibold leading-tight">
                    {edu.degree}
                  </p>
                  <p className="font-mono text-[10px] text-white-soft/50 mt-0.5">
                    {edu.school}
                  </p>
                  <p className="font-mono text-[10px] text-cyan-glow/60 mt-0.5">
                    {edu.period}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Bars */}
        <div className="game-card">
          <h2 className="font-pixel text-xs text-cyan-glow mb-4">STATS</h2>
          <SkillBars />
        </div>
      </div>
    </section>
  );
}
