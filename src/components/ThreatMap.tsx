"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Globe, Server, Activity, ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface ThreatLog {
  id: string;
  timestamp: string;
  sourceIp: string;
  sourceLoc: string;
  targetService: string;
  attackType: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
}

interface AttackPath {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

export default function ThreatMap() {
  const [logs, setLogs] = useState<ThreatLog[]>([]);
  const [attacks, setAttacks] = useState<AttackPath[]>([]);
  const [selectedNode, setSelectedNode] = useState<{name: string, ip: string, status: string} | null>(null);

  // Define fixed static nodes coordinates on our grid
  const nodes = [
    { id: "na-east", name: "US-EAST // GATEWAY", x: 180, y: 110, ip: "10.45.12.8", status: "SAFE" },
    { id: "eu-west", name: "EU-WEST // CORE", x: 380, y: 90, ip: "172.16.89.24", status: "SAFE" },
    { id: "asia-east", name: "ASIA-PACIFIC // REGIONAL", x: 580, y: 140, ip: "192.168.4.11", status: "ATTACK_ALERT" },
    { id: "sa-east", name: "LATAM // SENSOR_03", x: 260, y: 230, ip: "10.112.5.4", status: "SAFE" },
    { id: "af-south", name: "AFRICA // HONEYPOT", x: 420, y: 220, ip: "198.51.100.12", status: "SAFE" }
  ];

  // List of mock source threats
  const threatSources = [
    { loc: "NL (Rotterdam)", ip: "185.220.101.4", x: 370, y: 70 },
    { loc: "RU (St Petersburg)", ip: "45.138.16.2", x: 440, y: 70 },
    { loc: "CN (Guangzhou)", ip: "218.85.12.98", x: 570, y: 110 },
    { loc: "US (Silicon Valley)", ip: "64.233.160.10", x: 120, y: 120 },
    { loc: "IN (Bangalore)", ip: "103.21.141.2", x: 510, y: 150 }
  ];

  const attackTypes = [
    "DDoS Botnet Flood",
    "SQL Injection Attempt",
    "SSH Brute Force",
    "Reverse Shell exploit",
    "OWASP Top 10 API Scan",
    "Log4j Exploit payload"
  ];

  const services = ["HTTPS/443", "SSH/22", "DNS/53", "SMB/445", "API/8080"];

  // Initialize and update logs & attacks
  useEffect(() => {
    // Generate base logs
    const initialLogs: ThreatLog[] = Array.from({ length: 4 }).map((_, idx) => generateRandomLog(idx.toString()));
    setLogs(initialLogs);

    const interval = setInterval(() => {
      // 1. Generate new log
      const newLog = generateRandomLog(Date.now().toString());
      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);

      // 2. Trigger attack animation path on map
      const src = threatSources[Math.floor(Math.random() * threatSources.length)];
      const target = nodes[Math.floor(Math.random() * nodes.length)];
      
      const newAttack: AttackPath = {
        id: Date.now().toString(),
        x1: src.x,
        y1: src.y,
        x2: target.x,
        y2: target.y,
        color: newLog.severity === "CRITICAL" ? "#ff3131" : newLog.severity === "HIGH" ? "#ffbd03" : "#00f0ff"
      };

      setAttacks((prev) => [...prev, newAttack]);

      // Remove attack after animation completes
      setTimeout(() => {
        setAttacks((prev) => prev.filter((a) => a.id !== newAttack.id));
      }, 1500);

    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const generateRandomLog = (id: string): ThreatLog => {
    const src = threatSources[Math.floor(Math.random() * threatSources.length)];
    const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    
    const severities: ("CRITICAL" | "HIGH" | "MEDIUM")[] = ["CRITICAL", "HIGH", "MEDIUM"];
    const weight = Math.random();
    const severity = weight > 0.85 ? "CRITICAL" : weight > 0.5 ? "HIGH" : "MEDIUM";

    return {
      id,
      timestamp: new Date().toISOString().split("T")[1].slice(0, 8),
      sourceIp: src.ip,
      sourceLoc: src.loc,
      targetService: `${targetNode.name.split(" ")[0]} (${services[Math.floor(Math.random() * services.length)]})`,
      attackType: attackTypes[Math.floor(Math.random() * attackTypes.length)],
      severity
    };
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map visualizer */}
      <div className="lg:col-span-2 glass-panel p-4 rounded-md relative border-slate-800 flex flex-col h-[320px] md:h-[400px] overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4.5 h-4.5 text-cyan-400 animate-spin-slow" />
            <span className="font-mono text-xs font-bold tracking-wider">
              CYBER_THREAT_RADAR.LOG
            </span>
          </div>
          <span className="font-mono text-[9px] text-cyan-500/70 bg-cyan-950/30 px-2 py-0.5 border border-cyan-500/20 rounded">
            SCANNING FEED
          </span>
        </div>

        {/* Dynamic Threat Graphic Area */}
        <div className="relative flex-1 bg-black/40 rounded border border-slate-900/60 overflow-hidden">
          {/* Cyber grid overlays */}
          <div className="absolute inset-0 cyber-grid-dots opacity-40" />

          {/* SVG Map Canvas */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 320" preserveAspectRatio="none">
            {/* Draw grid references */}
            <line x1="0" y1="160" x2="700" y2="160" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="5,5" />
            <line x1="350" y1="0" x2="350" y2="320" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="5,5" />

            {/* Static Grid Map dots outline (aesthetic representation of map) */}
            <path
              d="M 50,80 Q 80,60 120,70 T 200,90 T 250,110 T 320,80 T 400,60 T 480,80 T 540,110 T 630,90 T 680,120"
              fill="none"
              stroke="rgba(0, 136, 255, 0.05)"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <path
              d="M 120,180 Q 180,210 240,230 T 310,250 T 400,220 T 480,240 T 560,200 T 650,210"
              fill="none"
              stroke="rgba(0, 136, 255, 0.05)"
              strokeWidth="2"
              strokeDasharray="4,4"
            />

            {/* Dynamic attack lines */}
            {attacks.map((a) => {
              // Draw curvature via Bezier quadratic curve
              const mx = (a.x1 + a.x2) / 2;
              const my = Math.min(a.y1, a.y2) - 40; // control point curve offset
              const pathD = `M ${a.x1} ${a.y1} Q ${mx} ${my} ${a.x2} ${a.y2}`;

              return (
                <g key={a.id}>
                  {/* Backdrop shadow path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={a.color}
                    strokeWidth="1.5"
                    className="opacity-20"
                  />
                  {/* Animated attack dash */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={a.color}
                    strokeWidth="2"
                    strokeDasharray="15, 150"
                    initial={{ strokeDashoffset: 150 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </g>
              );
            })}

            {/* Render Static Threat Source Locations (Faded red) */}
            {threatSources.map((src, i) => (
              <g key={i}>
                <circle cx={src.x} cy={src.y} r="3" fill="#ff3131" className="opacity-45" />
                <circle cx={src.x} cy={src.y} r="8" fill="none" stroke="#ff3131" strokeWidth="0.5" className="animate-ping opacity-25" />
              </g>
            ))}

            {/* Render SOC Core nodes (Glowing cyan/blue) */}
            {nodes.map((node) => {
              const isSelected = selectedNode?.ip === node.ip;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode({ name: node.name, ip: node.ip, status: node.status })}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? "7" : "5"}
                    fill={node.id === "asia-east" ? "#ffbd03" : "#00f0ff"}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? "15" : "11"}
                    fill="none"
                    stroke={node.id === "asia-east" ? "#ffbd03" : "#00f0ff"}
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                  <text
                    x={node.x}
                    y={node.y - 12}
                    fill="#94a3b8"
                    fontSize="7"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* HUD Status Box overlay */}
          <div className="absolute bottom-3 left-3 bg-[#020208]/90 border border-slate-800 p-2.5 rounded font-mono text-[9px] space-y-1 z-10 max-w-[170px] shadow-lg">
            <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 mb-1">RADAR TELEMETRY</div>
            <div className="flex justify-between gap-3 text-slate-500">
              <span>SCAN RATE:</span> <span className="text-cyan-400 font-bold">148.2 pps</span>
            </div>
            <div className="flex justify-between gap-3 text-slate-500">
              <span>ALERTS (1H):</span> <span className="text-purple-400 font-bold">182 events</span>
            </div>
            <div className="flex justify-between gap-3 text-slate-500">
              <span>IDS THRESHOLD:</span> <span className="text-green-400 font-bold">99.8% safe</span>
            </div>
          </div>

          {/* Node detail tooltip overlay */}
          {selectedNode && (
            <div className="absolute top-3 right-3 bg-slate-950/95 border border-cyan-500/40 p-3 rounded font-mono text-[9px] z-10 w-44 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
              <div className="flex justify-between items-center mb-1.5 border-b border-slate-800 pb-1 font-bold text-cyan-400">
                <span>NODE DETAILS</span>
                <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-white cursor-pointer">X</button>
              </div>
              <div className="space-y-1 text-slate-400">
                <div><span className="text-slate-600">ID:</span> {selectedNode.name.split(" ")[0]}</div>
                <div><span className="text-slate-600">IP:</span> {selectedNode.ip}</div>
                <div>
                  <span className="text-slate-600">STATE:</span>{" "}
                  <span className={selectedNode.status === "SAFE" ? "text-green-400" : "text-yellow-400"}>
                    {selectedNode.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Threat incident log box */}
      <div className="glass-panel p-4 rounded-md border-slate-800 flex flex-col h-[320px] md:h-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider">
              REALTIME_IDS.FEED
            </span>
          </div>
          <span className="font-mono text-[8px] bg-red-950/30 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 font-semibold animate-pulse">
            ALERTS INBOUND
          </span>
        </div>

        {/* Live List feed */}
        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] scrollbar-thin pr-1">
          {logs.map((log) => {
            const isCritical = log.severity === "CRITICAL";
            const isHigh = log.severity === "HIGH";
            
            return (
              <div
                key={log.id}
                className={`p-2.5 rounded border bg-black/40 flex flex-col gap-1 transition-all duration-300 hover:bg-slate-900/40
                  ${
                    isCritical
                      ? "border-red-500/20 shadow-[inset_0_0_8px_rgba(255,49,49,0.05)]"
                      : isHigh
                      ? "border-yellow-500/20 shadow-[inset_0_0_8px_rgba(255,189,3,0.05)]"
                      : "border-slate-900"
                  }
                `}
              >
                {/* Header Line */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[8px]">{log.timestamp}</span>
                  <span
                    className={`text-[8px] px-1.5 py-0.2 rounded font-bold
                      ${
                        isCritical
                          ? "bg-red-500/10 text-red-400 border border-red-500/30"
                          : isHigh
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                          : "bg-slate-900 text-slate-400 border border-slate-800"
                      }
                    `}
                  >
                    {log.severity}
                  </span>
                </div>

                {/* Event Name */}
                <div className="text-slate-200 font-bold text-[10.5px]">
                  {log.attackType}
                </div>

                {/* Event details */}
                <div className="flex items-center justify-between text-slate-500 text-[9px] mt-0.5 pt-1.5 border-t border-slate-900/60">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600">SRC:</span>
                    <span className="text-slate-300 font-semibold">{log.sourceIp}</span>
                    <span className="text-[8px] text-slate-600">({log.sourceLoc})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ArrowRight className="w-2.5 h-2.5 text-slate-600" />
                    <span className="text-cyan-400/90 font-semibold">{log.targetService.split(" ")[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
