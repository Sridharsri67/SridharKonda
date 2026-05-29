"use client";

import React from "react";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent py-8 relative overflow-hidden font-sans select-none z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="w-full bg-[#07070f]/90 backdrop-blur-md border border-neutral-900/80 rounded-2xl sm:rounded-full py-4 sm:py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          {/* Left Side: Built info */}
          <div className="flex items-center gap-2 text-[13px] text-neutral-400 text-center sm:text-left">
            <span>Built by</span>
            <span className="font-bold text-white">Sridhar Konda</span>
            <span className="text-neutral-700 font-light">|</span>
            <span className="text-[#ff5353] font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(255,83,83,0.3)]">
              SecOps Engineer
            </span>
          </div>

          {/* Right Side: Round social link cards */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/sridhar-konda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-neutral-950/80 border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#ff5353]/40 hover:bg-[#ff5353]/10 transition-all duration-300 shadow-md"
              title="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://github.com/Sridharsri67"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-neutral-950/80 border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#ff5353]/40 hover:bg-[#ff5353]/10 transition-all duration-300 shadow-md"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:sridharsri5959@gmail.com"
              className="w-8 h-8 rounded-full bg-neutral-950/80 border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#ff5353]/40 hover:bg-[#ff5353]/10 transition-all duration-300 shadow-md"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
