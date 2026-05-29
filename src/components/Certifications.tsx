"use client";

import React, { useRef, useEffect } from "react";
import { ShieldCheck, Award } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  badgeCode: string;
  status: string;
  desc: string;
  url: string;
}

export default function Certifications() {
  const certs: Certification[] = [
    {
      title: "Certified Junior Web Application Penetration Tester",
      issuer: "eLearnSecurity / INE",
      badgeCode: "ID: eWPT-79401",
      status: "VERIFIED",
      desc: "Validates practical hands-on penetration testing skills against web applications, SQLi exploitation, XSS, and authorization bypasses.",
      url: "https://verify.sturtles.in"
    },
    {
      title: "Network Security Fundamentals",
      issuer: "Palo Alto Networks",
      badgeCode: "PCCET Track",
      status: "ACTIVE",
      desc: "Covers key concepts of routing, switching, packet monitoring, firewall architecture, and prevention rules.",
      url: "https://paloaltonetworksacademy.net/mod/customcert/verify_certificate.php"
    },
    {
      title: "Cybersecurity Foundation",
      issuer: "Palo Alto Networks",
      badgeCode: "Foundation Track",
      status: "ACTIVE",
      desc: "Demonstrates core knowledge of data security, endpoint protection strategies, cloud visibility, and threat hunting workflows.",
      url: "https://paloaltonetworksacademy.net/mod/customcert/verify_certificate.php"
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Networking Professional",
      issuer: "Oracle University",
      badgeCode: "OCI-NP-2025",
      status: "ACTIVE",
      desc: "Validates advanced networking capabilities including VCN design, routing policies, fast connect, and secure load balancer deployments.",
      url: "https://certview.oracle.com"
    },
    {
      title: "Cryptography and Network Security",
      issuer: "NPTEL / IIT",
      badgeCode: "Score: Elite",
      status: "COMPLETED",
      desc: "Academic certification analyzing mathematical models of encryption (AES, RSA, ECC), message integrity, and PKI setups.",
      url: "https://swayam.gov.in"
    },
    {
      title: "CCEP",
      issuer: "RedTeam Leaders",
      badgeCode: "RTL-CCEP-2024",
      status: "VERIFIED",
      desc: "Offensive-focused credential specializing in endpoint penetration tactics, scripting automation, and vulnerability assessment models.",
      url: "https://redteamleaders.com"
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const scrollPos = useRef(0);
  const currentSpeed = useRef(0.85);
  const targetSpeed = useRef(0.85);

  // Duplicate the list for seamless infinite horizontal scrolling
  const displayCerts = [...certs, ...certs];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Sync starting position
    scrollPos.current = container.scrollLeft;

    let animationFrameId: number;

    const updateScroll = () => {
      // Decelerate to 0 when interacting, accelerate to 0.85 when free
      const speedGoal = isInteracting.current ? 0 : 0.85;
      currentSpeed.current += (speedGoal - currentSpeed.current) * 0.08;

      if (Math.abs(currentSpeed.current) > 0.005) {
        scrollPos.current += currentSpeed.current;

        // Find the offset where the duplicated list starts
        const firstDupCard = container.children[certs.length] as HTMLElement;
        if (firstDupCard) {
          const wrapPoint = firstDupCard.offsetLeft - container.offsetLeft;
          if (scrollPos.current >= wrapPoint) {
            scrollPos.current -= wrapPoint;
          }
        }
        container.scrollLeft = scrollPos.current;
      }

      animationFrameId = requestAnimationFrame(updateScroll);
    };

    animationFrameId = requestAnimationFrame(updateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [certs.length]);

  return (
    <section id="certifications" className="py-24 border-b border-neutral-900 relative">
      <div className="absolute inset-0 cyber-grid-dots opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            CERTIFICATIONS
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Scrollable Container */}
        <div className="w-full relative mt-6">
          <div 
            ref={scrollContainerRef}
            onMouseEnter={() => { isInteracting.current = true; }}
            onMouseLeave={() => { isInteracting.current = false; }}
            onTouchStart={() => { isInteracting.current = true; }}
            onTouchEnd={() => { isInteracting.current = false; }}
            onScroll={() => {
              if (isInteracting.current && scrollContainerRef.current) {
                scrollPos.current = scrollContainerRef.current.scrollLeft;
              }
            }}
            className="flex overflow-x-auto gap-6 pb-6 px-1"
          >
            {displayCerts.map((cert, index) => (
              <a
                key={`${cert.title}-${index}`}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[400px] bg-neutral-950/40 border border-neutral-900 rounded-xl p-5 md:p-6 flex flex-col justify-between gap-4 group hover:border-[#ff5353]/25 hover:bg-neutral-900/10 cursor-pointer transition-all duration-300 relative shadow-xl overflow-hidden"
              >
                {/* Glowing card highlights */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ff5353]/20 group-hover:border-[#ff5353]/60 transition-colors" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ff5353]/20 group-hover:border-[#ff5353]/60 transition-colors" />

                <div className="flex gap-4 items-start">
                  {/* Left badge visual */}
                  <div className="p-3 rounded-lg bg-[#ff5353]/10 border border-[#ff5353]/20 flex-shrink-0 flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#ff5353]" />
                  </div>

                  {/* Content text */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-[9px] text-[#ff5353] font-bold tracking-widest uppercase">
                        {cert.issuer}
                      </span>
                      <span className="font-sans text-[8px] bg-green-950/30 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-bold">
                        {cert.status}
                      </span>
                    </div>
                    <h3 className="text-[14px] md:text-[15px] font-black text-white leading-snug group-hover:text-[#ff5353] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-neutral-400 text-[11px] leading-relaxed line-clamp-3">
                      {cert.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Verification Label */}
                <div className="font-sans text-[9px] text-neutral-500 flex items-center gap-1 border-t border-neutral-900/60 pt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff5353]/70" />
                  <span>VERIFICATION: <span className="text-neutral-300 font-semibold">{cert.badgeCode}</span></span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
