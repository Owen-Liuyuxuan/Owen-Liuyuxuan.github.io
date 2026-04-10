"use client";

import React, { useState } from "react";

const LANGS = [
  { lang: "Python",          pct: 71, color: "#3572A5" },
  { lang: "Jupyter Notebook", pct: 16, color: "#DA5B0B" },
  { lang: "C++",             pct:  3, color: "#f34b7d" },
  { lang: "Cuda",            pct:  3, color: "#76B900" },
  { lang: "TypeScript",      pct:  2, color: "#3178C6" },
  { lang: "JavaScript",      pct:  2, color: "#F1E05A" },
  { lang: "HTML",            pct:  1, color: "#E34C26" },
  { lang: "CMake",           pct:  1, color: "#DA3434" },
  { lang: "CSS",             pct:  1, color: "#563D7C" },
  { lang: "Shell",           pct:  0, color: "#89E051" },
];

const DISPLAY = LANGS.filter((l) => l.pct > 0);

const CX = 110;
const CY = 110;
const R  = 88;
const IR = 52; // inner radius — thicker ring = more visible color

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArcPath(cx: number, cy: number, or: number, ir: number, startAngle: number, endAngle: number) {
  const sa = endAngle - startAngle;
  if (sa >= 360) {
    // Full ring
    return `M ${cx} ${cy - or} A ${or} ${or} 0 1 1 ${cx - 0.001} ${cy - or} Z
            M ${cx} ${cy - ir} A ${ir} ${ir} 0 1 0 ${cx + 0.001} ${cy - ir} Z`;
  }
  const os = polarToCartesian(cx, cy, or, startAngle);
  const oe = polarToCartesian(cx, cy, or, endAngle);
  const is = polarToCartesian(cx, cy, ir, startAngle);
  const ie = polarToCartesian(cx, cy, ir, endAngle);
  const large = sa > 180 ? 1 : 0;
  return [
    `M ${os.x} ${os.y}`,
    `A ${or} ${or} 0 ${large} 1 ${oe.x} ${oe.y}`,
    `L ${ie.x} ${ie.y}`,
    `A ${ir} ${ir} 0 ${large} 0 ${is.x} ${is.y}`,
    "Z",
  ].join(" ");
}

function midAngle(start: number, end: number) {
  return start + (end - start) / 2;
}

function labelPosition(cx: number, cy: number, or: number, angleDeg: number) {
  const r = or + 8;
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SkillBars() {
  const [hovered, setHovered] = useState<string | null>(null);

  // Build segments and compute angles
  let current = 0;
  const segments = DISPLAY.map((item) => {
    const angle = (item.pct / 100) * 360;
    const start = current;
    const end   = current + angle;
    current = end;
    return { ...item, start, end };
  });

  const hoveredSeg = segments.find((s) => s.lang === hovered);

  return (
    <div
      className="space-y-4"
      data-narrator="Language breakdown across all my public repos."
    >
      <div className="font-mono text-[10px] text-white-soft/30 mb-3">
        * computed from 20 public repos · bytes of code
      </div>

      {/* ── Donut chart ── */}
      <div className="flex flex-col items-center">
        <svg
          viewBox="0 0 220 220"
          className="w-44 h-44 select-none"
          role="img"
          aria-label="Hover segments to explore"
        >
          <defs />

          {/* Dark background circle */}
          <circle cx={CX} cy={CY} r={R + 4} fill="#0a0e1a" />

          {segments.map((seg) => {
            const isHov = hovered === seg.lang;
            const isDim = hovered !== null && !isHov;

            // Explode: shift segment outward from its midpoint
            const mid = midAngle(seg.start, seg.end);
            const midRad = ((mid - 90) * Math.PI) / 180;
            const ox = isHov ? Math.cos(midRad) * 7 : 0;
            const oy = isHov ? Math.sin(midRad) * 7 : 0;

            const path = describeArcPath(
              CX + ox, CY + oy, R, IR, seg.start, seg.end
            );

            return (
              <path
                key={seg.lang}
                d={path}
                fill={seg.color}
                stroke="#0a0e1a"
                strokeWidth="1.5"
                opacity={isDim ? 0.3 : 1}
                style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
                onMouseEnter={() => setHovered(seg.lang)}
                onMouseLeave={() => setHovered(null)}
                data-narrator={`${seg.lang}: takes up ${seg.pct}% of my total code.`}
              />
            );
          })}

          {/* Percentage label on hovered segment */}
          {hoveredSeg && (() => {
            const mid = midAngle(hoveredSeg.start, hoveredSeg.end);
            const pos = labelPosition(CX, CY, (R + IR) / 2, mid);
            const angle = mid;
            const displayAngle = angle > 90 && angle < 270 ? angle + 180 : angle;
            return (
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                transform={`rotate(${displayAngle > 90 && displayAngle < 270 ? displayAngle + 180 : displayAngle}, ${pos.x}, ${pos.y})`}
                style={{ pointerEvents: "none", textShadow: "0 1px 4px #000" }}
              >
                {hoveredSeg.pct}%
              </text>
            );
          })()}

          {/* Center info */}
          <text
            x={CX}
            y={CY - 7}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={hoveredSeg ? "#fff" : "#00d4ff"}
            fontSize={hoveredSeg ? "11" : "13"}
            fontFamily="monospace"
            fontWeight="bold"
            style={{ transition: "all 0.2s ease", textShadow: "0 0 8px #00d4ff60" }}
          >
            {hoveredSeg ? hoveredSeg.lang : "Languages"}
          </text>
          <text
            x={CX}
            y={CY + 9}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize="18"
            fontFamily="monospace"
            fontWeight="bold"
            style={{ transition: "all 0.2s ease", textShadow: "0 1px 4px #000" }}
          >
            {hoveredSeg ? `${hoveredSeg.pct}%` : "Top-10"}
          </text>
        </svg>
      </div>

      {/* ── Legend list ── */}
      <div className="space-y-1.5">
        {segments.map((seg) => (
          <div
            key={seg.lang}
            className="flex items-center gap-2 group cursor-pointer"
            onMouseEnter={() => setHovered(seg.lang)}
            onMouseLeave={() => setHovered(null)}
            data-narrator={`${seg.lang}: ${seg.pct}% of my total code.`}
          >
            <span
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0 transition-all duration-200"
              style={{
                backgroundColor: seg.color,
                boxShadow: hovered === seg.lang ? `0 0 8px ${seg.color}` : `0 0 3px ${seg.color}60`,
                transform: hovered === seg.lang ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className="font-mono text-xs flex-1 leading-none transition-colors duration-200"
              style={{ color: hovered === seg.lang ? seg.color : "rgba(200,220,240,0.7)" }}
            >
              {seg.lang}
            </span>
            <span
              className="font-mono text-[10px] font-bold tabular-nums transition-all duration-200"
              style={{ color: seg.color }}
            >
              {seg.pct}%
            </span>
            <div className="w-16 h-1 bg-base-dark rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${seg.pct}%`,
                  backgroundColor: seg.color,
                  opacity: hovered !== null && hovered !== seg.lang ? 0.3 : 1,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Chips ── */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {segments.slice(0, 5).map((seg) => (
          <span
            key={seg.lang}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-mono transition-all duration-200"
            style={{
              borderColor: hovered === seg.lang ? `${seg.color}aa` : `${seg.color}33`,
              color: hovered === seg.lang ? seg.color : `${seg.color}88`,
              boxShadow: hovered === seg.lang ? `0 0 6px ${seg.color}50` : "none",
            }}
            onMouseEnter={() => setHovered(seg.lang)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            {seg.lang}
          </span>
        ))}
      </div>
    </div>
  );
}
