"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import NeonButton from "@/components/ui/NeonButton";
import { HERO_VIDEO_URL } from "@/lib/constants";

/* ══════════════════════════════════════════════
   Section 1: HERO
   ─────────────────────────────────────────────
   Full-screen hero with:
   - Looping video background
   - Left side: headline + CTA
   - Right side: 3D car canvas
   ══════════════════════════════════════════════ */

// Dynamic import for the 3D Experience (avoids SSR issues)
const Experience = dynamic(() => import("@/components/three/Experience"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-orbitron text-neon-blue animate-pulse">Loading 3D...</span>
    </div>
  ),
});

interface HeroProps {
  isEngineOn: boolean;
  speed: number;
  onStartEngine: () => void;
}

export default function S1_Hero({ isEngineOn, speed, onStartEngine }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
    >
      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── Dark Overlay Gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/60" />

      {/* ── Content Grid ── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 pt-20">

        {/* ── Left: Text Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center items-start text-left"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass px-4 py-2 mb-6 inline-flex items-center gap-2"
          >
            <span className="text-sm">⚡</span>
            <span className="font-orbitron text-xs tracking-widest text-neon-blue uppercase">
              Next-Gen Racing Experience
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-orbitron text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="text-white">FEEL THE</span>
            <br />
            <span className="gradient-text">VELOCITY</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-white/60 text-base sm:text-lg max-w-lg mb-8 leading-relaxed"
          >
            Immerse yourself in a breathtaking 3D racing showcase.
            Push the limits of speed with stunning visuals and real-time controls.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <NeonButton
              variant={isEngineOn ? "green" : "blue"}
              size="lg"
              onClick={onStartEngine}
            >
              {isEngineOn ? "🟢 Engine Running" : "🔑 Start Engine"}
            </NeonButton>

            <NeonButton variant="purple" size="lg" onClick={() => {
              document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
            }}>
              🏎️ View Showcase
            </NeonButton>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex gap-8 mt-10"
          >
            {[
              { value: "320", label: "KM/H TOP SPEED" },
              { value: "2.8s", label: "0-100 KM/H" },
              { value: "720", label: "HORSEPOWER" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-orbitron text-xl sm:text-2xl font-bold text-neon-blue text-glow-blue">
                  {stat.value}
                </div>
                <div className="font-orbitron text-[10px] text-white/40 tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D Canvas ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="flex-1 w-full h-[400px] sm:h-[500px] lg:h-[600px] relative"
        >
          <Experience isEngineOn={isEngineOn} speed={speed} />

          {/* Neon Ring Decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-neon-blue/10 blur-3xl rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-orbitron text-[10px] text-white/30 tracking-widest">SCROLL</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-neon-blue/50 to-transparent" />
      </motion.div>
    </section>
  );
}