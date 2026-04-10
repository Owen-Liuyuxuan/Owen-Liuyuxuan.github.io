"use client";

import React from "react";

export default function PixelBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(0, 212, 255, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
      aria-hidden="true"
    />
  );
}
