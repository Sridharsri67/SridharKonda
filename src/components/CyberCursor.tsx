"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CyberCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const delayPos = useRef({ x: -100, y: -100 });
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover (not a touch device)
    const mediaQuery = window.matchMedia("(any-hover: none)");
    if (mediaQuery.matches) return; // Disable cursor on touch devices

    setIsHidden(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setCoords({ x: Math.floor(e.clientX), y: Math.floor(e.clientY) });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or parent is interactive
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isClickable);
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth animation loop for the outer ring
    let animationId: number;
    const updatePosition = () => {
      const dx = position.x - delayPos.current.x;
      const dy = position.y - delayPos.current.y;
      
      // Interpolate position
      delayPos.current.x += dx * 0.15;
      delayPos.current.y += dy * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${delayPos.current.x - 18}px, ${delayPos.current.y - 18}px, 0)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`;
      }

      animationId = requestAnimationFrame(updatePosition);
    };
    
    animationId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      {/* Outer crosshair ring with smooth delay */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-9 h-9 border border-cyan-500/40 rounded-full pointer-events-none z-50 transition-all duration-150 ease-out flex items-center justify-center
          ${isHovering ? "w-14 h-14 border-purple-500/70 bg-purple-500/5 shadow-[0_0_15px_rgba(189,0,255,0.4)]" : ""}
          ${isClicked ? "scale-75 border-cyan-400 bg-cyan-400/10 shadow-[0_0_10px_rgba(0,240,255,0.6)]" : ""}
        `}
      >
        {/* Cyber crosshair ticks */}
        <div className={`absolute top-0 w-[1px] h-1.5 bg-cyan-500/60 ${isHovering ? "bg-purple-400" : ""}`} />
        <div className={`absolute bottom-0 w-[1px] h-1.5 bg-cyan-500/60 ${isHovering ? "bg-purple-400" : ""}`} />
        <div className={`absolute left-0 h-[1px] w-1.5 bg-cyan-500/60 ${isHovering ? "bg-purple-400" : ""}`} />
        <div className={`absolute right-0 h-[1px] w-1.5 bg-cyan-500/60 ${isHovering ? "bg-purple-400" : ""}`} />
      </div>

      {/* Instant center target dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50
          ${isHovering ? "bg-purple-400 shadow-[0_0_8px_#bd00ff]" : "bg-cyan-400 shadow-[0_0_8px_#00f0ff]"}
        `}
      />

      {/* Floating digital coordinates HUD (very cybersecurity dashboard) */}
      <div
        className="fixed pointer-events-none z-50 text-[9px] font-mono text-cyan-400/50 hidden md:block"
        style={{
          left: `${position.x + 18}px`,
          top: `${position.y + 18}px`,
        }}
      >
        X: {coords.x} Y: {coords.y}
      </div>
    </>
  );
}
