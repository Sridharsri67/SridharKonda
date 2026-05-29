"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent py-8 relative overflow-hidden font-sans select-none z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="w-full bg-[#07070f]/90 backdrop-blur-md border border-neutral-900/80 rounded-2xl sm:rounded-full py-4 sm:py-3.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-center sm:text-left">
          
          {/* Left Side: Copyright */}
          <div className="text-[13px] text-neutral-400">
             <span className="font-bold text-white">Sridhar Konda</span>
          </div>

          {/* Right Side: Professional Label */}
          <div className="text-[12px] text-neutral-500 font-mono tracking-wider uppercase">
            SecOps & Cybersecurity Engineer
          </div>

        </div>
      </div>
    </footer>
  );
}
