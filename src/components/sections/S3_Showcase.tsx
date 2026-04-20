"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/three/Experience"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-dark-800 rounded-2xl">
      <span className="font-orbitron text-sm sm:text-base text-neon-blue animate-pulse">
        Initializing 3D Viewer...
      </span>
    </div>
  ),
});

interface ShowcaseProps {
  isEngineOn: boolean;
  speed: number;
}

export default function S3_Showcase({ isEngineOn, speed }: ShowcaseProps) {
  return (
    <section
      id="showcase"
      className="relative  w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="font-orbitron text-[20px]  sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] text-neon-blue uppercase">
            Interactive 3D
          </span>

          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight">
            <span className="text-white">360° </span>
            <span className="gradient-text">SHOWCASE</span>
          </h2>

          <p className="text-white/60 max-w-md sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl">
            Drag to rotate. Scroll to zoom. Experience every angle of this machine.
          </p>
        </motion.div>

        {/* ── 3D Viewer ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full 
                     h-[280px] 
                     xs:h-[320px] 
                     sm:h-[420px] 
                     md:h-[500px] 
                     lg:h-[650px] 
                     glass border-glow rounded-xl sm:rounded-2xl overflow-hidden"
        >
          <Experience isEngineOn={isEngineOn} speed={speed} />

          {/* Corner Decorations (hide on small devices) */}
          <div className="hidden sm:block">
            {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map(
              (pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-6 sm:w-8 h-6 sm:h-8 border-neon-blue/30 ${
                    i === 0
                      ? "border-t-2 border-l-2"
                      : i === 1
                      ? "border-t-2 border-r-2"
                      : i === 2
                      ? "border-b-2 border-l-2"
                      : "border-b-2 border-r-2"
                  }`}
                />
              )
            )}
          </div>

          {/* Control Hint */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass max-w-[90%]">
            <span className="font-orbitron text-[10px] sm:text-xs md:text-sm text-white/60 tracking-wide text-center block whitespace-nowrap sm:whitespace-normal">
              🖱️ DRAG &nbsp;•&nbsp; 🔍 ZOOM
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}