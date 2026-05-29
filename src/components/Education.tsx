"use client";

import React from "react";
import { GraduationCap, BookOpen, Calendar, Milestone, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Education() {
  const coreSyllabus = [
    "Computer Networks & TCP/IP",
    "Cryptography & Information Security",
    "Database Management Systems (SQL)",
    "Operating Systems & Linux Shell",
    "Object-Oriented Programming (C++)",
    "Data Structures & Algorithms"
  ];

  return (
    <section id="education" className="py-24 border-b border-slate-900/80 relative">
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <div className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase mb-1">
            // ACADEMIC_REGISTRY.LOG
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            EDUCATION
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mt-2" />
        </div>

        {/* Academic Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/45 border border-slate-900 rounded p-6 md:p-8 flex flex-col md:flex-row items-stretch gap-8 group hover:border-purple-500/25 transition-all duration-300 relative shadow-2xl overflow-hidden">
            
            {/* Corner styling */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-purple-500/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-500/30" />

            {/* Left graduation icon visual */}
            <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-slate-950/60 border border-slate-900 rounded relative">
              <div className="p-4 rounded-full bg-purple-500/5 border border-purple-500/20 mb-3 shadow-[0_0_15px_rgba(189,0,255,0.05)]">
                <GraduationCap className="w-10 h-10 text-purple-400" />
              </div>
              <div className="text-center font-mono space-y-1">
                <div className="text-xs text-slate-500 font-bold">GPA METRIC</div>
                <div className="text-2xl font-black text-white text-glow-purple">7.27 / 10</div>
                <div className="text-[8px] text-purple-400 font-semibold tracking-widest uppercase mt-2">PARUL UNIVERSITY</div>
              </div>
            </div>

            {/* Right course description details */}
            <div className="md:w-2/3 flex flex-col justify-between space-y-6">
              
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[9px]">
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    DURATION: 07/2023 – 05/2027 (EXPECTED)
                  </span>
                  <span className="text-slate-500 font-bold">DEGREE: B.TECH</span>
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors">
                  Bachelor of Technology in Computer Science
                </h3>
                
                <p className="text-slate-400 text-xs leading-relaxed">
                  Enrolled in the department of Computer Science & Engineering. Combining software engineering foundations with active self-study in cybersecurity operations, network topologies, intrusion detection, and automation.
                </p>
              </div>

              {/* Core courses modules */}
              <div className="border-t border-slate-900 pt-5 space-y-3">
                <h4 className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> CORE ACADEMIC MODULES
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono">
                  {coreSyllabus.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950/40 p-2 rounded border border-slate-900/60 hover:border-slate-800 transition-colors">
                      <Milestone className="w-3 h-3 text-cyan-500" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
