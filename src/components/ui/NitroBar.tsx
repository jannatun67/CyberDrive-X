"use client";

import { motion } from "framer-motion";

/* ══════════════════════════════════════════════
   NitroBar — Horizontal Nitro Gauge
   ══════════════════════════════════════════════ */

interface NitroBarProps {
  nitro: number; // 0 - 100
}

export default function NitroBar({ nitro }: NitroBarProps) {
  const isLow = nitro < 20;
  const isActive = nitro < 95; // Actively being used

  return (
    <div className="w-full">
      {/* Label Row */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-orbitron text-xs text-white/50 tracking-widest uppercase">
          🔥 Nitro
        </span>
        <span
          className={`font-orbitron text-xs font-bold ${
            isLow ? "text-red-500 animate-pulse" : "text-neon-green"
          }`}
        >
          {Math.floor(nitro)}%
        </span>
      </div>

      {/* Bar Container */}
      <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden border border-white/5">
        <motion.div
          className="h-full rounded-full relative"
          animate={{
            width: `${nitro}%`,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            background: isLow
              ? "linear-gradient(90deg, #ff3333, #ff6600)"
              : "linear-gradient(90deg, #39ff14, #00f0ff)",
            boxShadow: isLow
              ? "0 0 15px rgba(255, 51, 51, 0.5)"
              : "0 0 15px rgba(57, 255, 20, 0.3)",
          }}
        >
          {/* Shimmer Effect when nitro is active */}
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent loading-shimmer" />
          )}
        </motion.div>
      </div>

      {/* Nitro segments */}
      <div className="flex gap-1 mt-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-200 ${
              i * 10 < nitro ? "bg-neon-green/40" : "bg-dark-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}