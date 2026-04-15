"use client";

import { formatSpeed } from "@/lib/utils";

/* ══════════════════════════════════════════════
   Speedometer — Digital Speed Display
   ══════════════════════════════════════════════ */

interface SpeedometerProps {
  speed: number;
  maxSpeed?: number;
}

export default function Speedometer({ speed, maxSpeed = 320 }: SpeedometerProps) {
  const percentage = (speed / maxSpeed) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Speed Number */}
      <div className="font-orbitron text-5xl md:text-7xl font-black text-glow-blue text-neon-blue">
        {formatSpeed(speed)}
      </div>

      {/* Unit */}
      <span className="font-orbitron text-xs text-white/50 tracking-widest uppercase">
        km/h
      </span>

      {/* Speed Bar */}
      <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden mt-2">
        <div
          className="h-full rounded-full transition-all duration-150 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, #00f0ff, ${
              percentage > 70 ? "#ff00e5" : "#b000ff"
            })`,
            boxShadow: `0 0 10px ${percentage > 70 ? "#ff00e5" : "#00f0ff"}`,
          }}
        />
      </div>
    </div>
  );
}