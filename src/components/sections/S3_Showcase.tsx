"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

/* ══════════════════════════════════════════════
   Section 3: 3D SHOWCASE
   ─────────────────────────────────────────────
   Full-width 3D interactive viewer.
   Users can orbit the car 360° with mouse/touch.
   ══════════════════════════════════════════════ */

const Experience = dynamic(() => import("@/components/three/Experience"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-dark-800 rounded-2xl">
      <span className="font-orbitron text-neon-blue animate-pulse">Initializing 3D Viewer...</span>
    </div>
  ),
});

interface ShowcaseProps {
  isEngineOn: boolean;
  speed: number;
}

export default function S3_Showcase({ isEngineOn, speed }: ShowcaseProps) {
  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-orbitron text-xs tracking-[0.3em] text-neon-blue uppercase">
            Interactive 3D
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black mt-4 mb-6">
            <span className="text-white">360° </span>
            <span className="gradient-text">SHOWCASE</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Drag to rotate. Scroll to zoom. Experience every angle of this machine.
          </p>
        </motion.div>

        {/* ── 3D Viewer Container ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] glass border-glow rounded-2xl overflow-hidden"
        >
          <Experience isEngineOn={isEngineOn} speed={speed} />

          {/* Corner Decorations */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map(
            (pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-8 h-8 border-neon-blue/30 ${
                  i === 0 ? "border-t-2 border-l-2" :
                  i === 1 ? "border-t-2 border-r-2" :
                  i === 2 ? "border-b-2 border-l-2" :
                  "border-b-2 border-r-2"
                }`}
              />
            )
          )}

          {/* Control Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full">
            <span className="font-orbitron text-[10px] text-white/50 tracking-widest">
              🖱️ DRAG TO ROTATE &nbsp;&bull;&nbsp; 🔍 SCROLL TO ZOOM
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}