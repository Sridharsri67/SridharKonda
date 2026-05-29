"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 500);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center select-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Minimalist SVG aperture logo */}
            <div className="w-12 h-12 text-[#ff5353] animate-pulse">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" />
                <line x1="50" y1="8" x2="80" y2="35" stroke="currentColor" strokeWidth="3" />
                <line x1="80" y1="35" x2="80" y2="70" stroke="currentColor" strokeWidth="3" />
                <line x1="80" y1="70" x2="50" y2="92" stroke="currentColor" strokeWidth="3" />
                <line x1="50" y1="92" x2="20" y2="70" stroke="currentColor" strokeWidth="3" />
                <line x1="20" y1="70" x2="20" y2="35" stroke="currentColor" strokeWidth="3" />
                <line x1="20" y1="35" x2="50" y2="8" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>
            
            {/* Spaced brand monogram */}
            <span className="font-sans text-sm font-semibold tracking-[0.5em] text-white">
              SRIDHAR KONDA
            </span>
            
            {/* Minimalist loading bar */}
            <div className="w-32 h-[2px] bg-neutral-900 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
                className="h-full bg-[#ff5353] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
