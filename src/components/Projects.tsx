"use client";

import React, { useState } from "react";
import { Terminal, ExternalLink, ShieldCheck, Database, GitBranch, ArrowUpRight, X } from "lucide-react";
import { Github } from "./BrandIcons";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  features: string[];
  desc: string;
  github: string;
  detailedDesc: string;
  architecture: string[];
  samplePayload?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "threatforge",
      title: "ThreatForge",
      subtitle: "Full-Scale Threat Intelligence Platform",
      tech: ["Node.js", "Express.js", "React.js", "MongoDB", "VirusTotal API", "AlienVault OTX", "Shodan", "AbuseIPDB"],
      features: [
        "Indicators of Compromise (IOC) enrichment",
        "MITRE ATT&CK adversary mapping",
        "Adaptive severity vulnerability scoring",
        "SOC analytical investigation workflows",
        "Real-time interactive statistics dashboards",
        "Exportable PDF threat analysis summaries"
      ],
      desc: "An enterprise-grade threat intelligence and investigation workspace designed for SOC analysts. It aggregates reputation score lookups, port scans, and malware reports across open-source databases into a single interface.",
      github: "https://github.com/Sridharsri67/Threat-Forge",
      detailedDesc: "ThreatForge empowers SecOps professionals by automating manual threat research processes. The core engine links IP addresses, domains, and file hashes to threat actors, active CVE vulnerability campaigns, and geographical locations. It processes indicators concurrently, saving SOC analysts up to 40% of standard investigation triage time.",
      architecture: [
        "React UI Dashboard displaying threat heatmaps and MITRE matrices",
        "Express REST Controller querying endpoints in parallel",
        "Enrichment adapters caching API responses in MongoDB to respect rate limits",
        "Scoring compiler assigning normalized risk ratings between 0 and 100"
      ],
      samplePayload: `{
  "ioc": "185.220.101.4",
  "type": "IP",
  "verdict": "MALICIOUS",
  "score": 92,
  "sources": {
    "virustotal": "14/72 detections",
    "abuseipdb": "Confidence score: 85%",
    "alienvault": "Threat feed: active botnet"
  },
  "mitre_mapping": ["T1584.005 - Resource Development: Botnets"]
}`
    },
    {
      id: "threatintel-auto",
      title: "Threat Intel Automation Tool",
      subtitle: "Adversary Indicator Extraction Shell",
      tech: ["Bash Scripting", "VirusTotal API", "AlienVault OTX API", "JSON parsing"],
      features: [
        "Automated IOC log extraction",
        "Concurrently enriches IP, domain, & URLs",
        "Command-line risk scoring",
        "Automated SOC alert triage helper",
        "Structured text reports & CSV logs export"
      ],
      desc: "A high-performance command-line threat analysis engine written in Bash. It processes system, firewalls, and proxy log files, extracts potential IOCs, and verifies their integrity against intelligence APIs.",
      github: "https://github.com/Sridharsri67/Threat-Intel",
      detailedDesc: "This tool targets automation-focused SOC analysts. It processes text files matching IP, URL, or hash regular expressions, schedules API queries, and generates instant security briefings directly inside the terminal. It is built to run natively in lightweight Linux threat analysis sandboxes or during live-response incident investigations.",
      architecture: [
        "POSIX-compliant regex scanner extracting files IOC lines",
        "Curl pipeline communicating securely with VirusTotal and OTX API targets",
        "JQ processor parsing and sorting json payloads at shell speed",
        "Structured report generator flagging triggers exceeding critical rating thresholds"
      ],
      samplePayload: `#!/bin/bash
# Threat Intelligence Automation Core Hook
extract_iocs() {
  grep -oE "[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}" "$1" | sort -u
}
query_virustotal() {
  curl -s --request GET \\\\
    --url "https://www.virustotal.com/api/v3/ip_addresses/$1" \\\\
    --header "x-apikey: $VT_API_KEY" | jq '.data.attributes.last_analysis_stats'
}`
    }
  ];

  return (
    <section id="projects" className="py-24 border-b border-neutral-900 relative">
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            FEATURED <span className="text-[#ff5353]">PROJECTS</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-black/40 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between group hover:border-[#ff5353]/25 transition-all duration-300 relative shadow-xl overflow-hidden"
            >
              {/* Tilted glow hover background effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff5353]/0 via-[#ff5353]/5 to-[#ff5353]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />

              <div className="space-y-4 relative z-10">
                {/* Tech logo / tags */}
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#ff5353] animate-pulse" />
                    <span className="font-sans text-[10px] text-[#ff5353] font-bold uppercase tracking-wider">
                      {proj.title} // REPO
                    </span>
                  </div>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 border border-neutral-800 rounded-lg bg-neutral-950/60 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-300"
                    title="View Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-[#ff5353] transition-colors">
                    {proj.title}
                  </h3>
                  <div className="font-sans text-[10px] text-neutral-500 font-bold tracking-wider mt-0.5">
                    {proj.subtitle}
                  </div>
                </div>

                <p className="text-neutral-400 text-xs leading-relaxed">
                  {proj.desc}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tech.slice(0, 5).map((t) => (
                    <span key={t} className="font-sans text-[8px] bg-neutral-900/60 text-neutral-400 border border-neutral-900 px-2 py-0.5 rounded font-medium">
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 5 && (
                    <span className="font-sans text-[8px] text-[#ff5353] font-semibold px-2 py-0.5">
                      +{proj.tech.length - 5} MORE
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-neutral-900/60 relative z-10">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="text-xs font-sans font-bold text-neutral-400 hover:text-[#ff5353] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  VIEW DETAILS
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] font-bold bg-[#ff5353]/10 text-[#ff5353] border border-[#ff5353]/20 px-3 py-1.5 rounded hover:bg-[#ff5353] hover:text-white hover:border-[#ff5353] cursor-pointer transition-all duration-300"
                >
                  CLONE REPO
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Details modal popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl max-h-[85vh] bg-black border border-[#ff5353]/30 rounded shadow-[0_0_50px_rgba(255,83,83,0.08)] flex flex-col overflow-hidden"
            >
              {/* Modal header */}
              <div className="bg-neutral-950 px-5 py-4 border-b border-neutral-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#ff5353] animate-pulse" />
                  <span className="font-sans text-xs font-bold text-neutral-400 tracking-wider">
                    INVESTIGATION // REPORT: {selectedProject.title.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded hover:bg-neutral-900 text-neutral-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal body scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                
                {/* Intro summary */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">{selectedProject.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">{selectedProject.detailedDesc}</p>
                </div>

                {/* Grid pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Features list */}
                  <div className="space-y-3">
                    <h4 className="font-sans text-[10px] text-[#ff5353] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" /> KEY FEATURES
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-300 pl-4 list-disc marker:text-[#ff5353] leading-relaxed">
                      {selectedProject.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-sans text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" /> SYSTEM ARCHITECTURE
                    </h4>
                    <ul className="space-y-2 text-xs text-neutral-300 pl-4 list-disc marker:text-neutral-500 leading-relaxed">
                      {selectedProject.architecture.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Tech stack */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-900">
                  <h4 className="font-sans text-[10px] text-neutral-500 font-bold tracking-wider">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="font-sans text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-300 px-2.5 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Console Payload code preview */}
                {selectedProject.samplePayload && (
                  <div className="space-y-2.5 pt-4 border-t border-neutral-900">
                    <h4 className="font-sans text-[10px] text-[#ff5353] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> STRUCTURED DATA PAYLOAD
                    </h4>
                    <pre className="p-4 bg-neutral-950 border border-neutral-900 rounded font-mono text-[9.5px] leading-relaxed text-neutral-300 overflow-x-auto scrollbar-thin max-h-48 whitespace-pre">
                      {selectedProject.samplePayload}
                    </pre>
                  </div>
                )}

              </div>

              {/* Modal footer Actions */}
              <div className="bg-neutral-950 px-6 py-4 border-t border-neutral-900 flex items-center justify-between">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-bold text-[#ff5353] hover:text-white transition-colors flex items-center gap-1"
                >
                  <Github className="w-4 h-4 animate-pulse" />
                  EXPLORE GITHUB
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded text-xs font-sans font-semibold hover:bg-neutral-800 hover:text-white cursor-pointer transition-colors"
                >
                  CLOSE
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
