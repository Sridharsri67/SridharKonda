"use client";

import React, { useState } from "react";
import { ShieldCheck, Award, ChevronLeft, ChevronRight } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  badgeCode: string;
  status: string;
  desc: string;
  url: string;
}

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? certs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === certs.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="certifications" className="py-24 border-b border-neutral-900 relative">
      <div className="absolute inset-0 cyber-grid-dots opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            CERTIFICATIONS
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5353] mt-2" />
        </div>

        {/* Custom Slide Carousel */}
        <div className="max-w-3xl mx-auto relative px-12">
          
          {/* Active slide card display */}
          <a
            href={certs[activeIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-neutral-950/40 border border-neutral-900 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 group hover:border-[#ff5353]/25 hover:bg-neutral-900/10 cursor-pointer transition-all duration-300 relative shadow-2xl overflow-hidden min-h-[220px]"
          >
            {/* Glowing slide highlights */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ff5353]/20 group-hover:border-[#ff5353]/60 transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ff5353]/20 group-hover:border-[#ff5353]/60 transition-colors" />

            {/* Left badge visual */}
            <div className="p-4 rounded-xl bg-[#ff5353]/10 border border-[#ff5353]/20 flex-shrink-0 flex items-center justify-center">
              <Award className="w-10 h-10 text-[#ff5353] animate-pulse" />
            </div>

            {/* Content text */}
            <div className="space-y-3 flex-1 text-center md:text-left">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-sans text-[10px] text-[#ff5353] font-bold tracking-widest">
                    {certs[activeIndex].issuer.toUpperCase()}
                  </span>
                  <span className="font-sans text-[8px] bg-green-950/30 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-bold w-fit mx-auto sm:mx-0">
                    {certs[activeIndex].status}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mt-1.5 leading-snug">
                  {certs[activeIndex].title}
                </h3>
              </div>

              <p className="text-neutral-400 text-xs leading-relaxed">
                {certs[activeIndex].desc}
              </p>

              <div className="font-sans text-[10px] text-neutral-500 flex items-center justify-center md:justify-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5353]" />
                <span>VERIFICATION: <span className="text-neutral-300 font-semibold">{certs[activeIndex].badgeCode}</span></span>
              </div>
            </div>
          </a>

          {/* Carousel Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 border border-neutral-800 rounded bg-neutral-950/50 text-neutral-400 hover:text-[#ff5353] hover:border-[#ff5353]/35 cursor-pointer transition-all duration-200"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 border border-neutral-800 rounded bg-neutral-950/50 text-neutral-400 hover:text-[#ff5353] hover:border-[#ff5353]/35 cursor-pointer transition-all duration-200"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Index indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {certs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full cursor-pointer transition-all duration-300
                ${activeIndex === idx ? "w-6 bg-[#ff5353]" : "w-1.5 bg-neutral-800 hover:bg-neutral-700"}
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
