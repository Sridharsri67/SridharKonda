"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden bg-[#000000] select-none"
    >
      {/* Subtle background glow to keep it clean and premium */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#ff5353]/5 blur-[150px] pointer-events-none z-0" />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Intro Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start text-left space-y-7 max-w-3xl"
        >
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-[#ff5353] uppercase">
            SecOps & Cybersecurity Engineer
          </span>
          
          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight">
            Sridhar Konda 
          </h1>
          
          <div className="h-[2px] w-24 bg-[#ff5353] my-1" />
          
          <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Dedicated to protecting digital frontiers and optimizing threat detection. Experienced in SIEM operations (Splunk), threat intelligence, and secure systems monitoring.
          </p>
          
          {/* PromptWars Global Rank Achievement Card */}
          <div className="w-full border border-neutral-900/80 bg-neutral-950/40 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-[#ff5353]/30 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {/* Achievements Tag */}
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-neutral-950 border border-neutral-900 rounded-md text-[10px] font-bold tracking-wider text-[#ff5353]">
              Achievements
            </div>

            {/* Glowing Trophy Container */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-neutral-900 bg-neutral-950 flex items-center justify-center relative shrink-0 shadow-[0_0_20px_rgba(255,83,83,0.12)]">
              <Trophy className="w-6 h-6 md:w-7 md:h-7 text-[#ff5353]" />
            </div>

            {/* Card Content details */}
            <div className="flex-1 flex flex-col justify-center">
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded bg-[#ff5353]/10 border border-[#ff5353]/20 text-[#ff5353] text-[9px] font-bold tracking-widest uppercase mb-3">
                  HACK2SKILL // PROMPTWARS GLOBAL
                </div>
                <h3 className="font-sans text-lg md:text-xl font-extrabold text-white tracking-wide">
                  Ranked in Top 0.14% Globally
                </h3>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mt-2">
                  Secured <strong className="text-white">25th Position</strong> out of <strong className="text-white">17,501+ participants</strong>. Designed optimized system prompt injection and defensive configurations, blocking leak attacks while outputting structured intelligence.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#ff5353] hover:bg-[#ff6868] text-white font-sans text-xs font-bold tracking-widest rounded-none transition-all duration-300 hover:scale-105 shadow-[0_6px_20px_rgba(255,83,83,0.3)]"
            >
              GET STARTED
            </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
