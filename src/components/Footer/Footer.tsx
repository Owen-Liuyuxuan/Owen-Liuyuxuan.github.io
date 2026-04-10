import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-muted py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-pixel text-[8px] text-white-soft/30">
          © {new Date().getFullYear()} YUXUAN LIU — PIXEL LAB
        </p>
        <p className="font-mono text-[10px] text-white-soft/20">
          Built with Next.js · Styled with Tailwind · Powered by GitHub CI
        </p>
      </div>
    </footer>
  );
}
