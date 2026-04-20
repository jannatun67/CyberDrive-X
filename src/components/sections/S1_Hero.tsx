"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import NeonButton from "@/components/ui/NeonButton";
import { HERO_VIDEO_URL } from "@/lib/constants";

const Experience = dynamic(() => import("@/components/three/Experience"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-orbitron text-sm sm:text-base text-neon-blue animate-pulse">
        Loading 3D...
      </span>
    </div>
  ),
});

interface HeroProps {
  isEngineOn: boolean;
  speed: number;
  onStartEngine: () => void;
}

export default function S1_Hero({
  isEngineOn,
  speed,
  onStartEngine,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0 w-full h-full object-cover opacity-10

          scale-125 sm:scale-110 lg:scale-100
          translate-y-6 sm:translate-y-2 lg:translate-y-0
          object-[center_30%]
        "
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/40 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/60" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-4 sm:px-6 lg:px-10 pt-24 pb-10 max-w-7xl mx-auto">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass px-3 mb-3 py-2 mb-5 inline-flex items-center gap-2"
          >
            <span>⚡</span>
            <span className="font-orbitron text-xs sm:text-sm md:text-base tracking-widest text-neon-blue uppercase">
              Next-Gen Racing Experience
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-orbitron mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-5"
          >
            <span className="text-white">FEEL THE</span>
            <br />
            <span className="gradient-text">VELOCITY</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/60 text-sm mb-4 sm:text-base md:text-lg max-w-md sm:max-w-lg mx-auto lg:mx-0 mb-7"
          >
            Immerse yourself in a breathtaking 3D racing showcase.
            Push the limits of speed with stunning visuals and real-time controls.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <NeonButton
              variant={isEngineOn ? "green" : "blue"}
              size="lg"
              onClick={onStartEngine}
            >
              {isEngineOn ? "🟢 Engine Running" : "🔑 Start Engine"}
            </NeonButton>

            <NeonButton
              variant="purple"
              size="lg"
              onClick={() => {
                document
                  .getElementById("showcase")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🏎️ View Showcase
            </NeonButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mt-8"
          >
            {[
              { value: "320", label: "KM/H TOP SPEED" },
              { value: "2.8s", label: "0-100 KM/H" },
              { value: "720", label: "HORSEPOWER" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-orbitron text-lg sm:text-xl md:text-2xl text-neon-blue">
                  {stat.value}
                </div>
                <div className="font-orbitron text-xs sm:text-sm text-white/40 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex-1 w-full h-[260px] sm:h-[380px] md:h-[450px] lg:h-[600px] relative"
        >
          <Experience isEngineOn={isEngineOn} speed={speed} />

          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] sm:w-[280px] lg:w-[300px] h-[200px] sm:h-[300px] bg-neon-blue/10 blur-3xl rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2"
      >
        <span className="font-orbitron text-xs sm:text-sm text-white/30">
          SCROLL
        </span>
        <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-neon-blue/50 to-transparent" />
      </motion.div>
    </section>
  );
}