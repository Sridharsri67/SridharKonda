"use client";

import React, { useState, useEffect } from "react";
import { Shield, Eye, ShieldAlert, Key, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const [scansCount, setScansCount] = useState(0);
  const [threatsChecked, setThreatsChecked] = useState(0);
  const [ctfSolved, setCtfSolved] = useState(0);

  // Animated counters trigger on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const scansInterval = setInterval(() => {
        setScansCount((prev) => {
          if (prev >= 412) {
            clearInterval(scansInterval);
            return 412;
          }
          return prev + 12;
        });
      }, 30);

      const threatsInterval = setInterval(() => {
        setThreatsChecked((prev) => {
          if (prev >= 9820) {
            clearInterval(threatsInterval);
            return 9820;
          }
          return prev + 250;
        });
      }, 30);

      const ctfInterval = setInterval(() => {
        setCtfSolved((prev) => {
          if (prev >= 84) {
            clearInterval(ctfInterval);
            return 84;
          }
          return prev + 2;
        });
      }, 30);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const specializations = [
    {
      icon: <Shield className="w-5 h-5 text-[#ff5353]" />,
      title: "SIEM & SOC Operations",
      desc: "Analyzing security event streams on Splunk, triaging alerts, and constructing custom correlation rules to detect threat patterns."
    },
    {
      icon: <Eye className="w-5 h-5 text-[#ff5353]" />,
      title: "Threat Intelligence",
      desc: "Enriching indicators of compromise (IOCs) using AlienVault OTX, VirusTotal, and OSINT frameworks to map cyber adversary TTPs."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#ff5353]" />,
      title: "Vulnerability Management",
      desc: "Running vulnerability assessments via Nessus and Burp Suite to identify vulnerabilities listed under the OWASP Top 10."
    }
  ];

  return (
    <section id="about" className="py-24 border-b border-neutral-900 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <div className="font-sans text-xs font-semibold text-[#ff5353] tracking-widest uppercase mb-1">
            Profile Summary
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            ABOUT <span className="text-[#ff5353]">ME</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Bio + Animated counters */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-neutral-900 bg-neutral-950/30 shadow-lg relative">
              <p className="text-neutral-300 leading-relaxed text-sm md:text-base font-medium">
                “Aspiring SecOps Engineer with hands-on experience in SIEM (Splunk), threat detection, incident response, and security monitoring. Skilled in log analysis, IOC investigation, and threat intelligence. Motivated to optimize detection pipelines and protect enterprise networks against emerging threat vectors.”
              </p>
            </div>

            {/* Counters grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              
              <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-4 relative group hover:border-[#ff5353]/30 transition-colors">
                <div className="text-xs text-neutral-400 mb-1 flex items-center justify-center gap-1 font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-[#ff5353]" /> SCANS
                </div>
                <div className="text-xl md:text-2xl font-bold text-white tracking-wider">
                  {scansCount}+
                </div>
                <div className="text-[9px] text-neutral-500 mt-1 uppercase font-semibold">Vulnerability Scans</div>
              </div>

              <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-4 relative group hover:border-[#ff5353]/30 transition-colors">
                <div className="text-xs text-neutral-400 mb-1 flex items-center justify-center gap-1 font-semibold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-[#ff5353]" /> IOCs
                </div>
                <div className="text-xl md:text-2xl font-bold text-white tracking-wider">
                  {threatsChecked.toLocaleString()}+
                </div>
                <div className="text-[9px] text-neutral-500 mt-1 uppercase font-semibold">Reputation sweeps</div>
              </div>

              <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-4 relative group hover:border-[#ff5353]/30 transition-colors">
                <div className="text-xs text-neutral-400 mb-1 flex items-center justify-center gap-1 font-semibold uppercase tracking-wider">
                  <Key className="w-3.5 h-3.5 text-[#ff5353]" /> CTFs
                </div>
                <div className="text-xl md:text-2xl font-bold text-white tracking-wider">
                  {ctfSolved}+
                </div>
                <div className="text-[9px] text-neutral-500 mt-1 uppercase font-semibold">Flags Decrypted</div>
              </div>

            </div>
          </div>

          {/* Core specializations */}
          <div className="space-y-4">
            <h3 className="font-sans text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">
              TECHNICAL CORE PILLARS
            </h3>

            {specializations.map((spec, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 border border-neutral-900 bg-neutral-950/20 rounded-xl hover:border-neutral-800 hover:bg-neutral-900/10 transition-all duration-300 group"
              >
                <div className="p-2 border border-neutral-900 rounded-lg bg-neutral-950/60 h-fit self-start group-hover:border-[#ff5353]/30 group-hover:scale-105 transition-all">
                  {spec.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-white group-hover:text-[#ff5353] transition-colors text-sm">
                    {spec.title}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
