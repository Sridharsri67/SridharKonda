"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TermIcon, X, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface TerminalEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogLine {
  text: string;
  isCmd?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export default function TerminalEasterEgg({ isOpen, onClose }: TerminalEasterEggProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogLine[]>([
    { text: "PORTAL TERMINAL v1.0.0 — ESTABLISHING CONSOLE SESSION" },
    { text: "DECRYPTING NODE CREDENTIALS..." },
    { text: "SESSION VERIFIED. ACCESS LEVEL: OPERATOR" },
    { text: "TYPE 'help' FOR A LIST OF AVAILABLE CORE COMMANDS." },
    { text: "" }
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { text: cmdStr, isCmd: true }];

    if (trimmed === "") {
      setHistory(newHistory);
      return;
    }

    const command = trimmed.split(" ")[0];

    switch (command) {
      case "help":
        setHistory([
          ...newHistory,
          { text: "AVAILABLE UTILITIES:" },
          { text: "  about     - Output resume summary & objective" },
          { text: "  skills    - List core cyber and development toolkits" },
          { text: "  projects  - Show featured portfolios projects & repos" },
          { text: "  contact   - Display email, linkedin and github endpoints" },
          { text: "  scan      - Execute real-time network assessment sweep" },
          { text: "  decrypt   - Decipher confidential SOC payload message" },
          { text: "  clear     - Wipe console history" },
          { text: "  exit      - Close terminal shell connection" }
        ]);
        break;

      case "about":
        setHistory([
          ...newHistory,
          { text: "SRIDHAR KONDA — ASPIRING SECOPS ENGINEER / SOC ANALYST" },
          { text: "B.Tech Computer Science student @ Parul University (2023 - 2027)" },
          { text: "Specialized in SIEM (Splunk), security monitoring, traffic analysis," },
          { text: "OWASP Top 10 remediation, and incident response operations." }
        ]);
        break;

      case "skills":
        setHistory([
          ...newHistory,
          { text: "SECURITY OPERATIONAL CAPABILITIES:", isSuccess: true },
          { text: "  - SIEM/SOC: Splunk Enterprise, Threat Monitoring, Alert Triage" },
          { text: "  - Threat Intel: VirusTotal, AlienVault OTX, OSINT, IOC Enrichment" },
          { text: "  - Web Security & VA: Burp Suite, Nessus, Metasploit, Nmap, Wireshark" },
          { text: "  - Dev/Automation: Bash, Go (Golang), C++, Python Scripting" },
          { text: "  - Forensics/Malware: Autopsy, FTK Imager, Static & Dynamic malware analysis" }
        ]);
        break;

      case "projects":
        setHistory([
          ...newHistory,
          { text: "FEATURED REPOSITORIES:", isSuccess: true },
          { text: "1. THREATFORGE (Threat Intelligence Platform)" },
          { text: "   URL: https://github.com/Sridharsri67/Threat-Forge" },
          { text: "   Integrates VT, Shodan & AlienVault for full-scope IP/domain enrichment." },
          { text: "2. THREAT INTEL AUTOMATION TOOL (Bash Script)" },
          { text: "   URL: https://github.com/Sridharsri67/Threat-Intel" },
          { text: "   Shell engine for automated IOC extraction and reputation parsing." }
        ]);
        break;

      case "contact":
        setHistory([
          ...newHistory,
          { text: "AUTHORIZED CHANNELS:" },
          { text: "  Email:    sridharsri5959@gmail.com" },
          { text: "  LinkedIn: linkedin.com/in/sridhar-konda" },
          { text: "  GitHub:   github.com/Sridharsri67" }
        ]);
        break;

      case "scan":
        if (isScanning) return;
        setIsScanning(true);
        setHistory([...newHistory, { text: "⚡ INITIALIZING SECURITY COMPLIANCE SWEEP..." }]);
        
        // Simulate progress stages
        const scanSteps = [
          "Checking HTTP/TLS endpoints...",
          "Validating SSL/TLS certificate chain...",
          "Analyzing DOM nodes for vulnerable scripts...",
          "Scanning local ports: 80, 443, 8022, 3000...",
          "Analyzing OWASP security headers...",
          "NO INTRUSIONS DETECTED. SECURITY SCORE: 99.8%"
        ];

        for (let i = 0; i < scanSteps.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          setHistory((prev) => [
            ...prev,
            {
              text: `[+] ${scanSteps[i]}`,
              isSuccess: i === scanSteps.length - 1,
            },
          ]);
        }
        setIsScanning(false);
        break;

      case "decrypt":
        setHistory([
          ...newHistory,
          { text: "🔓 DECRYPTING SYST_PAYLOAD..." },
          { text: "  HEX: 4b 4f 4e 44 41 20 53 52 49 44 48 41 52" },
          { text: "  STRING: 'SRIDHAR KONDA'" },
          { text: "  FLAG: SOC{THe_NExt_GeN_SEcOPs_ENgINeER_2026}", isSuccess: true }
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
        onClose();
        break;

      default:
        setHistory([
          ...newHistory,
          {
            text: `Command not found: '${command}'. Type 'help' for support.`,
            isError: true,
          },
        ]);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isScanning) {
      handleCommand(input);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl h-[420px] bg-black border border-cyan-500/30 rounded shadow-[0_0_40px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden font-mono"
      >
        {/* Terminal Header */}
        <div className="bg-slate-950 border-b border-slate-900 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TermIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-400 tracking-wider">
              PORTAL SHELL @ SRIDHAR_SOC
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <button
              onClick={onClose}
              className="p-0.5 rounded hover:bg-slate-900 text-slate-500 hover:text-cyan-400 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal logs */}
        <div className="flex-1 p-4 overflow-y-auto text-[11px] leading-relaxed bg-[#020205] scrollbar-thin">
          {history.map((line, idx) => {
            if (line.isCmd) {
              return (
                <div key={idx} className="terminal-line text-cyan-400 font-bold mb-1.5">
                  {line.text}
                </div>
              );
            }
            let colorClass = "text-slate-400";
            if (line.isError) colorClass = "text-red-400 flex items-center gap-1";
            if (line.isSuccess) colorClass = "text-cyan-400 flex items-center gap-1";

            return (
              <div key={idx} className={`${colorClass} mb-1 whitespace-pre-wrap`}>
                {line.isError && <ShieldAlert className="w-3 h-3 text-red-400 flex-shrink-0" />}
                {line.isSuccess && <Cpu className="w-3 h-3 text-cyan-400 flex-shrink-0" />}
                {line.text}
              </div>
            );
          })}
          {isScanning && (
            <div className="text-cyan-400 animate-pulse text-[10px] mt-1">
              [SYSTEM COMPILING...]
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt */}
        <div className="bg-slate-950 border-t border-slate-900 px-4 py-2.5 flex items-center gap-1">
          <span className="text-cyan-400 font-bold text-xs select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isScanning}
            className="flex-1 bg-transparent outline-none border-none text-cyan-300 text-xs caret-cyan-400"
            placeholder={isScanning ? "Compiling scan..." : "Type command here..."}
            autoFocus
          />
        </div>
      </motion.div>
    </div>
  );
}
