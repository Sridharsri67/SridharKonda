"use client";

import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  color?: string; // e.g. "rgba(0, 240, 255," for cyan
  opacity?: number;
}

export default function MatrixRain({ color = "rgba(0, 136, 255,", opacity = 0.08 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters from standard cyber/matrix set (hex, binary, runes)
    const charset = "01010101ABCDEFUXYZ<>[]{}*#@$%&+";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);

    // Initialize drops
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start offscreen
    }

    const draw = () => {
      // Clear with slight alpha to create fade effect
      ctx.fillStyle = `rgba(2, 2, 8, ${opacity})`;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charset[Math.floor(Math.random() * charset.length)];
        
        // Vary transparency for depth
        const dropOpacity = Math.random() * 0.5 + 0.5;
        
        // Vary colors between blue/cyan and occasional purple
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(189, 0, 255, ${dropOpacity})`; // Purple flash
        } else {
          ctx.fillStyle = `${color}${dropOpacity})`; // Theme color (blue/cyan)
        }

        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop if it reaches bottom of screen
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop position
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30 fps

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const newColumns = Math.floor(width / fontSize);
      const oldLen = drops.length;
      
      if (newColumns > oldLen) {
        for (let i = oldLen; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      } else {
        drops.length = newColumns;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
