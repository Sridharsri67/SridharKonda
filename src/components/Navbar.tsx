"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onTerminalToggle?: () => void;
}

export default function Navbar({ onTerminalToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Monitor scroll state for styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sections = ["home", "projects", "skills", "certifications", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navItems = [
    { name: "HOME", href: "#home", id: "home" },
    { name: "PROJECTS", href: "#projects", id: "projects" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "CERTIFICATIONS", href: "#certifications", id: "certifications" }
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-4 right-4 z-40 max-w-6xl mx-auto rounded-2xl bg-black/90 backdrop-blur-md border border-neutral-900/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          scrolled ? "py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)]" : "py-3.5"
        }`}
      >
        <div className="px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center gap-3.5 group text-white transition-colors"
          >
            {/* Geometric Aperture SVG Logo */}
            <div className="relative w-8 h-8 flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Ring */}
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4.5" />
                {/* Inner Guide Circle */}
                <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
                {/* Aperture blades intersecting geometric lines */}
                <line x1="50" y1="8" x2="80" y2="35" stroke="currentColor" strokeWidth="2.5" />
                <line x1="80" y1="35" x2="80" y2="70" stroke="currentColor" strokeWidth="2.5" />
                <line x1="80" y1="70" x2="50" y2="92" stroke="currentColor" strokeWidth="2.5" />
                <line x1="50" y1="92" x2="20" y2="70" stroke="currentColor" strokeWidth="2.5" />
                <line x1="20" y1="70" x2="20" y2="35" stroke="currentColor" strokeWidth="2.5" />
                <line x1="20" y1="35" x2="50" y2="8" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
            
            {/* Brand Name "SRIDHAR KONDA" */}
            <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] sm:tracking-[0.4em] text-white uppercase transition-colors">
              SRIDHAR KONDA
            </span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-sans text-[11px] font-bold tracking-widest relative py-2 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff5353] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Pill Action Button (Desktop) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-2.5 bg-white/5 hover:bg-[#ff5353] text-white border border-white/10 hover:border-[#ff5353] font-sans text-xs font-semibold tracking-widest rounded-full transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              CONTACT
            </a>
          </div>

          {/* Hamburger Trigger (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-neutral-400 hover:text-white md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[110%] left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border border-neutral-900/60 shadow-xl rounded-2xl md:hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-sans text-sm font-bold tracking-wider py-1 border-b border-neutral-900 transition-colors ${
                        isActive ? "text-[#ff5353]" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
                
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 w-full text-center py-2.5 bg-white/5 hover:bg-[#ff5353] text-white border border-white/10 hover:border-[#ff5353] font-sans text-xs font-semibold tracking-widest rounded-full transition-all"
                >
                  CONTACT
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
