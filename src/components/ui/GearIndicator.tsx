"use client";

import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════
   GearIndicator — Shows Current Gear with Animation
   ══════════════════════════════════════════════ */

interface GearIndicatorProps {
  gear: number;
  rpm: number;
}

export default function GearIndicator({ gear, rpm }: GearIndicatorProps) {
  const rpmPercentage = (rpm / 9000) * 100;
  const isRedline = rpm > 7500;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Gear Label */}
      <span className="font-orbitron text-[20px] text-white/50 tracking-widest uppercase">
        Gear
      </span>

      {/* Gear Number with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gear}
          initial={{ y: -20, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
          className={`
            font-orbitron text-5xl font-black
            ${isRedline ? "text-neon-pink text-glow-purple" : "text-neon-purple text-glow-purple"}
          `}
        >
          {gear}
        </motion.div>
      </AnimatePresence>

      {/* RPM Bar */}
      <div className="w-20 h-1.5 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          animate={{
            width: `${rpmPercentage}%`,
            backgroundColor: isRedline ? "#ff00e5" : "#b000ff",
          }}
          transition={{ duration: 0.1 }}
          style={{
            boxShadow: isRedline ? "0 0 10px #ff00e5" : "0 0 6px #b000ff",
          }}
        />
      </div>

      {/* RPM Number */}
      <span
        className={`font-orbitron text-[20px] ${
          isRedline ? "text-neon-pink" : "text-white/40"
        }`}
      >
        {Math.floor(rpm)} RPM
      </span>
    </div>
  );
}