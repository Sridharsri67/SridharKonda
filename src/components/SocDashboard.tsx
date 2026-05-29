"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, AlertTriangle, CheckCircle, Database, Server, RefreshCw, Cpu, Layers } from "lucide-react";

export default function SocDashboard() {
  const [activeTab, setActiveTab] = useState<"system" | "siem" | "rules">("system");
  const [logCount, setLogCount] = useState(1482041);
  const [blockedCount, setBlockedCount] = useState(3481);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [ramUsage, setRamUsage] = useState(48);
  const [uptime, setUptime] = useState("02d:14h:28m:15s");

  // Telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Ticking logs count
      setLogCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
      
      // Random block count increment
      if (Math.random() > 0.8) {
        setBlockedCount((prev) => prev + 1);
      }

      // Fluctuating system metrics
      setCpuUsage((prev) => {
        const diff = Math.floor(Math.random() * 9) - 4;
        const next = prev + diff;
        return next > 10 && next < 60 ? next : 24;
      });

      setRamUsage((prev) => {
        const diff = Math.floor(Math.random() * 3) - 1;
        const next = prev + diff;
        return next > 40 && next < 55 ? next : 48;
      });

      // Uptime tick
      const date = new Date();
      const secs = String(date.getSeconds()).padStart(2, "0");
      setUptime(`02d:14h:28m:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Mock SIEM log queries
  const siemLogs = [
    { time: "23:31:02", host: "srv-web-01", type: "NGINX", msg: "GET /admin/login.php HTTP/1.1 404 Client Error", status: "WARN" },
    { time: "23:30:58", host: "db-prod-02", type: "POSTGRES", msg: "Ident authentication failed for user 'root' from 10.45.1.80", status: "ALERT" },
    { time: "23:30:45", host: "fw-edge-core", type: "CISCO", msg: "SPI block rule MATCH: UDP packet dropped from 195.22.12.55:5401", status: "BLOCKED" },
    { time: "23:30:12", host: "srv-api-node", type: "NODEJS", msg: "API Request Token verification SUCCESS - uid: 8829", status: "OK" },
    { time: "23:29:55", host: "ldap-dc-01", type: "ACTIVE_DIR", msg: "Kerberos ticket generated: sridhar.konda@secops.local", status: "OK" }
  ];

  // Mock Security Rules
  const firewallRules = [
    { id: "FW-101", name: "BLOCK_RDP_WAN", target: "Port 3389", action: "DROP", count: 1824 },
    { id: "FW-102", name: "ALLOW_HTTPS_IN", target: "Port 443", action: "ACCEPT", count: 489201 },
    { id: "FW-103", name: "BLOCK_TOR_EXIT_IPS", target: "Dynamic List", action: "DROP", count: 12401 },
    { id: "FW-104", name: "RATE_LIMIT_API_ROUTE", target: "100req/min limit", action: "LIMIT", count: 452 }
  ];

  return (
    <div className="w-full glass-panel border-slate-800/80 rounded-md overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      {/* Dashboard Top bar */}
      <div className="bg-slate-950/90 border-b border-slate-900 px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold tracking-wider text-slate-300">
            SEC-OPS CONTROL CONSOLE // HOST: sridhar-workspace
          </span>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded border border-slate-800/80 text-[10px]">
          <button
            onClick={() => setActiveTab("system")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "system" ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            SYS STATUS
          </button>
          <button
            onClick={() => setActiveTab("siem")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "siem" ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            SIEM LOG QUERY
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "rules" ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            POLICIES & RULES
          </button>
        </div>
      </div>

      {/* Main Grid telemetry widgets */}
      <div className="p-4 md:p-6 bg-[#04040c]/40 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stat 1: Log Count */}
        <div className="bg-black/45 border border-slate-800 p-4 rounded flex items-center justify-between font-mono">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-cyan-500" />
              TOTAL LOGS PROCESSED
            </div>
            <div className="text-xl font-bold text-slate-200 text-glow-cyan">
              {logCount.toLocaleString()}
            </div>
          </div>
          <span className="text-[9px] text-cyan-400 animate-pulse bg-cyan-950/20 border border-cyan-500/20 px-1.5 py-0.5 rounded">
            LIVE FEED
          </span>
        </div>

        {/* Stat 2: Intrusion alerts blocked */}
        <div className="bg-black/45 border border-slate-800 p-4 rounded flex items-center justify-between font-mono">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-purple-500" />
              INCIDENTS THWARTED
            </div>
            <div className="text-xl font-bold text-slate-200 text-glow-purple">
              {blockedCount.toLocaleString()}
            </div>
          </div>
          <span className="text-[9px] text-purple-400 bg-purple-950/20 border border-purple-500/20 px-1.5 py-0.5 rounded font-bold">
            IPS ACTIVE
          </span>
        </div>

        {/* Stat 3: CPU Usage */}
        <div className="bg-black/45 border border-slate-800 p-4 rounded flex items-center justify-between font-mono">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-green-500" />
              SOC SYSTEM CPU LOAD
            </div>
            <div className="text-xl font-bold text-slate-200">
              {cpuUsage}%
            </div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            {/* Minimal SVG ring chart */}
            <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91" fill="none" stroke="#12122c" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.91"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeDasharray={`${cpuUsage} 100`}
                className="transition-all duration-500"
              />
            </svg>
          </div>
        </div>

        {/* Stat 4: RAM / Memory */}
        <div className="bg-black/45 border border-slate-800 p-4 rounded flex items-center justify-between font-mono">
          <div className="space-y-1 flex-1 pr-3">
            <div className="text-[10px] text-slate-500 font-bold tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-blue-500" />
              AGENT MEMORY POOL
            </div>
            <div className="text-xl font-bold text-slate-200">
              {ramUsage}%
            </div>
          </div>
          <div className="text-[9px] text-slate-500 flex flex-col text-right">
            <span>UPTIME:</span>
            <span className="text-slate-300 font-bold mt-0.5">{uptime.split(":")[3]}s</span>
          </div>
        </div>
      </div>

      {/* Tab Area Content */}
      <div className="px-4 md:px-6 pb-6 bg-[#04040c]/40 font-mono">
        {activeTab === "system" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SVG Packet telemetry line chart */}
            <div className="md:col-span-2 bg-black/50 border border-slate-800/80 rounded p-4 flex flex-col h-[200px]">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-3 border-b border-slate-900 pb-2">
                <span>INTRUSION DETECTION SYSTEM INGRESS TRAFFIC (KB/s)</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" /> UPDATE: OK
                </span>
              </div>
              <div className="flex-1 relative flex items-end">
                {/* Embedded dynamic SVG line chart */}
                <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#12122c" strokeWidth="0.5" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#12122c" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#12122c" strokeWidth="0.5" />
                  
                  {/* Glowing threat volume area */}
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Area path */}
                  <path
                    d="M0,120 L0,90 L60,80 L120,95 L180,40 L240,65 L300,55 L360,98 L420,30 L480,45 L500,60 L500,120 Z"
                    fill="url(#chartGlow)"
                  />
                  {/* Line path */}
                  <path
                    d="M0,90 L60,80 L120,95 L180,40 L240,65 L300,55 L360,98 L420,30 L480,45 L500,60"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                  />
                  {/* Peak pulse dot */}
                  <circle cx="420" cy="30" r="3.5" fill="#bd00ff" />
                </svg>
                
                {/* Peak Label overlay */}
                <div className="absolute top-2 left-[400px] text-[8px] bg-purple-950/80 text-purple-300 border border-purple-500/30 px-1 rounded">
                  PEAK ALARM: 924 KB/s
                </div>
              </div>
            </div>

            {/* Sys configuration status panel */}
            <div className="bg-black/50 border border-slate-800/80 rounded p-4 flex flex-col justify-between text-[10px] h-[200px] space-y-2">
              <div className="font-bold text-slate-400 border-b border-slate-900 pb-2 flex items-center justify-between">
                <span>LOCAL ENGINE STATUS</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              
              <div className="space-y-1.5 text-slate-400 flex-1 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">FIREWALL ENGINE:</span>
                  <span className="text-green-400 font-bold">COMPLIANT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">SIEM CONNECTOR:</span>
                  <span className="text-green-400 font-bold">CONNECTED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">DNS SECURE RESOLV:</span>
                  <span className="text-cyan-400 font-bold">ACTIVE (TLS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">MALWARE SHIELD:</span>
                  <span className="text-slate-400">MONITOR_ONLY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">LOCAL HONEYPOT:</span>
                  <span className="text-purple-400">LISTEN_22/80</span>
                </div>
              </div>

              <div className="text-[9px] text-slate-500 border-t border-slate-900 pt-2 flex justify-between">
                <span>OS INTEL FEED v14</span>
                <span className="text-slate-400">SAFE STATE</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "siem" && (
          <div className="bg-black/50 border border-slate-800/80 rounded p-4 h-[200px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                EXEC: index=security | stats count by sourcetype
              </span>
              <span className="text-[9px] text-slate-600">INDEXED TODAY</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 text-[10px] leading-relaxed pr-1 scrollbar-thin">
              {siemLogs.map((log, idx) => {
                const isBlocked = log.status === "BLOCKED";
                const isAlert = log.status === "ALERT";
                const isWarn = log.status === "WARN";

                return (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 p-1.5 bg-black/40 border border-slate-900 rounded font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 select-none">[{log.time}]</span>
                      <span className="text-cyan-500/70 font-semibold">{log.host}</span>
                      <span className="bg-slate-900 text-slate-400 text-[8px] px-1 py-0.2 rounded border border-slate-800">{log.type}</span>
                      <span className="text-slate-300 truncate max-w-sm md:max-w-md">{log.msg}</span>
                    </div>
                    <span
                      className={`text-[8px] px-1.5 rounded font-bold self-start md:self-auto
                        ${
                          isBlocked
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : isAlert
                            ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                            : isWarn
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-green-500/10 text-green-400 border border-green-500/20"
                        }
                      `}
                    >
                      {log.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="bg-black/50 border border-slate-800/80 rounded p-4 h-[200px] overflow-y-auto scrollbar-thin">
            <div className="text-[10px] font-bold text-slate-400 border-b border-slate-900 pb-2 mb-3">
              ACTIVE ACCESS CONTROL LIST (ACL) AND SECURITY POLICIES
            </div>
            
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="text-slate-600 border-b border-slate-900/60 pb-1.5">
                  <th className="py-1">RULE ID</th>
                  <th>POLICY NAME</th>
                  <th>TARGET SPEC</th>
                  <th>ACTION</th>
                  <th className="text-right">MATCHES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-400">
                {firewallRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-slate-900/25">
                    <td className="py-2.5 font-bold text-slate-500">{rule.id}</td>
                    <td className="font-semibold text-slate-300">{rule.name}</td>
                    <td>{rule.target}</td>
                    <td>
                      <span
                        className={`text-[8px] px-1.5 py-0.2 rounded font-bold
                          ${
                            rule.action === "DROP"
                              ? "bg-red-950/40 text-red-400 border border-red-500/20"
                              : rule.action === "ACCEPT"
                              ? "bg-green-950/40 text-green-400 border border-green-500/20"
                              : "bg-yellow-950/40 text-yellow-400 border border-yellow-500/20"
                          }
                        `}
                      >
                        {rule.action}
                      </span>
                    </td>
                    <td className="text-right font-bold text-slate-300">{rule.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
