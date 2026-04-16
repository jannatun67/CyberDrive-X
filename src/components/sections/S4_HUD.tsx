"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Speedometer from "@/components/ui/Speedometer";
import GearIndicator from "@/components/ui/GearIndicator";
import NitroBar from "@/components/ui/NitroBar";
import NeonButton from "@/components/ui/NeonButton";
import MobileControls from "@/components/ui/MobileControls";
import { useState, useEffect } from "react";
import { GameState, ControlKeys } from "@/types";

/* ══════════════════════════════════════════════
   Section 4: HUD (Heads-Up Display)
   ─────────────────────────────────────────────
   Game-style dashboard showing:
   - Speedometer
   - Gear indicator
   - Nitro gauge
   - Control instructions
   ══════════════════════════════════════════════ */

interface HUDProps {
  gameState: GameState;
  onToggleEngine: () => void;
  controlsRef: React.RefObject<ControlKeys>;
}

export default function S4_HUD({ gameState, onToggleEngine, controlsRef }: HUDProps) {
  const { speed, gear, nitro, rpm, isEngineOn } = gameState;
  const [activeControls, setActiveControls] = useState<ControlKeys>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    nitro: false,
    brake: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveControls({ ...controlsRef.current });
    }, 50);
    return () => clearInterval(interval);
  }, [controlsRef]);

  const controlIndicators = [
    { key: "W / ↑", active: activeControls.forward, action: "Accelerate" },
    { key: "S / ↓", active: activeControls.backward, action: "Brake" },
    { key: "A / ←", active: activeControls.left, action: "Steer Left" },
    { key: "D / →", active: activeControls.right, action: "Steer Right" },
    { key: "SHIFT", active: activeControls.nitro, action: "Nitro" },
    { key: "SPACE", active: activeControls.brake, action: "Handbrake" },
  ];

  return (
    <section id="hud" className="relative py-24 sm:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-orbitron text-[20px] tracking-[0.3em] text-neon-green uppercase">
            Game Dashboard
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black mt-4 mb-6">
            <span className="text-white">RACING </span>
            <span className="gradient-text">HUD</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-[20px]">
            Real-time dashboard. Start the engine and use WASD or Arrow Keys to control.
          </p>
        </motion.div>

        {/* ── HUD Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Speedometer ── */}
          <GlassCard hover={false} className="flex flex-col items-center justify-center py-10">
            <Speedometer speed={speed} />
          </GlassCard>

          {/* ── Center: Main Controls + Nitro ── */}
          <GlassCard hover={false} className="flex flex-col items-center justify-between py-10 gap-8">
            {/* Engine Status */}
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  isEngineOn ? "bg-neon-green animate-pulse shadow-neon-green" : "bg-red-500"
                }`}
              />
              <span className="font-orbitron text-xs tracking-widest text-white/60">
                {isEngineOn ? "ENGINE ACTIVE" : "ENGINE OFF"}
              </span>
            </div>

            {/* Engine Toggle */}
            <NeonButton
              variant={isEngineOn ? "green" : "blue"}
              size="lg"
              onClick={onToggleEngine}
            >
              {isEngineOn ? "🔴 Kill Engine" : "🟢 Ignition"}
            </NeonButton>

            {/* Nitro Bar */}
            <div className="w-full px-4">
              <NitroBar nitro={nitro} />
            </div>

            {/* Controls Guide */}
            <div className="grid grid-cols-2 gap-3 text-center w-full px-4">
              {controlIndicators.map((control) => (
                <div key={control.key} className="flex items-center gap-2 text-left">
                  <span className={`font-orbitron text-[10px] px-2 py-1 rounded min-w-[60px] text-center transition-all ${
                    control.active 
                      ? "bg-neon-blue text-dark-900 shadow-neon-blue" 
                      : "bg-dark-700 text-neon-blue"
                  }`}>
                    {control.key}
                  </span>
                  <span className={`text-xs transition-all ${control.active ? "text-neon-green" : "text-white/40"}`}>
                    {control.action}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* ── Right: Gear + RPM ── */}
          <GlassCard hover={false} className="flex flex-col items-center justify-center py-10 gap-6">
            <GearIndicator gear={gear} rpm={rpm} />

            {/* Gear Map Visualization */}
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <div
                  key={g}
                  className={`
                    font-orbitron text-[20px] w-10 h-10 rounded-lg flex items-center justify-center
                    border transition-all duration-300
                    ${g === gear
                      ? "border-neon-blue bg-neon-blue/20 text-neon-blue shadow-neon-blue"
                      : "border-white/10 text-white/20 bg-dark-800"
                    }
                  `}
                >
                  {g}
                </div>
              ))}
            </div>

            {/* Telemetry Mini Stats */}
            <div className="grid grid-cols-2 gap-4 w-full mt-4 px-4">
              {[
                { label: "LAP", value: "01:23.456", icon: "⏱️" },
                { label: "TEMP", value: `${Math.floor(80 + (speed / 320) * 40)}°C`, icon: "🌡️" },
                { label: "FUEL", value: "87%", icon: "⛽" },
                { label: "TIRE", value: `${Math.floor(100 - (speed / 320) * 15)}%`, icon: "🛞" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-[24px] mb-1">{stat.icon}</div>
                  <div className="font-orbitron text-[20px] text-neon-blue">{stat.value}</div>
                  <div className="font-orbitron text-[16px] text-white/30 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Mobile Controls */}
        <MobileControls controlsRef={controlsRef} isEngineOn={isEngineOn} />
      </div>
    </section>
  );
}