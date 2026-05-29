"use client";

import React from "react";
import { Trophy } from "lucide-react";

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 border-b border-neutral-900 relative">
      <div className="absolute inset-0 cyber-grid-dots opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            KEY <span className="text-[#ff5353]">ACHIEVEMENTS</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Achievement Card Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-950/40 border border-neutral-900 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-[#ff5353]/20 transition-all duration-300 relative shadow-2xl overflow-hidden">
            
            {/* Top right corner indicator tag */}
            <div className="absolute top-0 right-0 font-sans text-[8px] bg-neutral-900/80 text-[#ff5353] border-l border-b border-neutral-800 px-3 py-1 rounded-bl">
              RECORD_ID: PW_2024
            </div>

            {/* Glowing left visual block */}
            <div className="p-5 rounded-full bg-[#ff5353]/5 border border-[#ff5353]/25 flex-shrink-0 relative group-hover:scale-105 group-hover:bg-[#ff5353]/10 transition-all duration-300 shadow-[0_0_20px_rgba(255,83,83,0.08)]">
              <Trophy className="w-12 h-12 text-[#ff5353] animate-pulse" />
              {/* Ping ring */}
              <div className="absolute -inset-1 border border-[#ff5353]/20 rounded-full animate-ping pointer-events-none" />
            </div>

            {/* Middle textual block */}
            <div className="space-y-4 flex-1 text-center md:text-left">
              <div>
                <span className="font-sans text-[10px] text-[#ff5353] font-bold bg-[#ff5353]/10 border border-[#ff5353]/20 px-2 py-0.5 rounded">
                  HACK2SKILL // PROMPTWARS GLOBAL
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white mt-2 tracking-tight group-hover:text-[#ff5353] transition-colors">
                  Ranked in Top 0.14% Globally
                </h3>
                <p className="text-neutral-400 text-xs md:text-sm mt-2 leading-relaxed">
                  Secured <span className="text-white font-bold">25th Position</span> out of <span className="text-white font-bold">17,501+ participants</span>. Designed optimized system prompt injection and defensive configurations, blocking leak attacks while outputting structured intelligence.
                </p>
              </div>

              {/* Stat breakdown boxes */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-900 font-sans text-center max-w-md mx-auto md:mx-0">
                <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-900">
                  <div className="text-[8px] text-neutral-500 font-bold">RANK</div>
                  <div className="text-sm font-black text-[#ff5353]">25</div>
                </div>
                <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-900">
                  <div className="text-[8px] text-neutral-500 font-bold">POOL</div>
                  <div className="text-sm font-black text-neutral-300">17,501</div>
                </div>
                <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-900">
                  <div className="text-[8px] text-neutral-500 font-bold">PERCENTILE</div>
                  <div className="text-sm font-black text-[#ff5353]">99.86%</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
