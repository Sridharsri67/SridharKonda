"use client";

import React, { useState } from "react";
import { Terminal, Shield, Network, Globe, Code2, Search, Cpu, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  level: number; // 0-100
  category: "soc" | "intel" | "web" | "network" | "prog" | "malware" | "forensics";
}

export default function Skills() {
  const [filter, setFilter] = useState<"all" | "soc_intel" | "offensive" | "network_forensic" | "automation">("all");

  const skillCategories = [
    { id: "all", name: "ALL CAPABILITIES" },
    { id: "soc_intel", name: "SIEM, SOC & THREAT INTEL" },
    { id: "offensive", name: "OFFENSIVE & WEB SECURITY" },
    { id: "network_forensic", name: "NETWORK & DIGITAL FORENSICS" },
    { id: "automation", name: "PROGRAMMING & AUTOMATION" }
  ];

  const skills: SkillItem[] = [
    // SIEM & SOC Operations
    { name: "Splunk (SIEM)", level: 85, category: "soc" },
    { name: "Threat Detection", level: 80, category: "soc" },
    { name: "Security Monitoring", level: 85, category: "soc" },
    
    // Threat Intelligence
    { name: "VirusTotal API", level: 80, category: "intel" },
    { name: "AlienVault OTX", level: 78, category: "intel" },
    { name: "IOC Analysis & Enrichment", level: 82, category: "intel" },
    { name: "OSINT Frameworks", level: 80, category: "intel" },
    
    // Web Security & VA
    { name: "Burp Suite", level: 75, category: "web" },
    { name: "Nessus Manager", level: 80, category: "web" },
    { name: "Metasploit Framework", level: 70, category: "web" },
    { name: "OWASP Top 10 Flaws", level: 82, category: "web" },
    
    // Network Security
    { name: "Wireshark Packet Analysis", level: 82, category: "network" },
    { name: "Nmap Network Mapping", level: 85, category: "network" },
    { name: "TCP/IP & Network Protocols", level: 80, category: "network" },
    { name: "Snort IDS Rules", level: 72, category: "network" },
    
    // Programming & Automation
    { name: "Bash Shell Scripting", level: 88, category: "prog" },
    { name: "Go (Golang)", level: 70, category: "prog" },
    { name: "C++ Programming", level: 75, category: "prog" },
    
    // Malware Analysis
    { name: "Static Malware Analysis", level: 68, category: "malware" },
    { name: "Dynamic Malware Analysis", level: 65, category: "malware" },
    
    // Digital Forensics
    { name: "Autopsy Forensic Suite", level: 72, category: "forensics" },
    { name: "FTK Imager", level: 75, category: "forensics" }
  ];

  const filteredSkills = skills.filter((skill) => {
    if (filter === "all") return true;
    if (filter === "soc_intel") return skill.category === "soc" || skill.category === "intel";
    if (filter === "offensive") return skill.category === "web";
    if (filter === "network_forensic") return skill.category === "network" || skill.category === "forensics" || skill.category === "malware";
    if (filter === "automation") return skill.category === "prog";
    return true;
  });

  const getCategoryIcon = (category: string) => {
    const iconClass = "w-4 h-4 text-[#ff5353]";
    switch (category) {
      case "soc":
        return <Shield className={iconClass} />;
      case "intel":
        return <Globe className={iconClass} />;
      case "web":
        return <Search className={iconClass} />;
      case "network":
        return <Network className={iconClass} />;
      case "prog":
        return <Code2 className={iconClass} />;
      case "malware":
        return <Cpu className={iconClass} />;
      case "forensics":
        return <FileCheck className={iconClass} />;
      default:
        return <Terminal className={iconClass} />;
    }
  };

  return (
    <section id="skills" className="py-24 border-b border-neutral-900 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="font-sans text-xs font-semibold text-[#ff5353] tracking-widest uppercase mb-1">
            Technical Arsenal
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            TECHNICAL <span className="text-[#ff5353]">SKILLS</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-10 border-b border-neutral-900 pb-6 font-sans text-[10px]">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 border rounded-full cursor-pointer transition-all duration-300 font-bold tracking-widest text-[9px]
                ${
                  filter === cat.id
                    ? "bg-[#ff5353]/15 text-[#ff5353] border-[#ff5353]/30"
                    : "bg-transparent text-neutral-500 border-neutral-900 hover:border-neutral-800 hover:text-neutral-300"
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Skills Display */}
        <div
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.015, ease: "easeOut" }}
              className="bg-neutral-950/20 border border-neutral-900 rounded-xl p-4 flex flex-col gap-3 group hover:border-[#ff5353]/20 hover:bg-neutral-950/40 transition-all duration-300 shadow-sm"
            >
              {/* Skill Title & Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 border border-neutral-900 rounded-lg bg-neutral-950">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <span className="text-neutral-300 group-hover:text-white transition-colors text-xs font-bold tracking-wider">
                    {skill.name}
                  </span>
                </div>
                <span className="font-sans text-[10px] text-[#ff5353] font-bold bg-[#ff5353]/10 px-2.5 py-0.5 rounded-full">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-neutral-950 border border-neutral-900 p-[1.5px] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-1 bg-[#ff5353] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
