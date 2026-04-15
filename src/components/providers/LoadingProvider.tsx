"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════
   LoadingProvider — Page Loading Screen
   ─────────────────────────────────────────────
   Shows a cinematic loading screen on initial
   page load with:
   - Animated logo
   - Progress bar
   - Auto-dismiss after assets are ready
   
   Also provides a context for manually
   triggering loading states.
   ══════════════════════════════════════════════ */

/** Context value type */
interface LoadingContextType {
  /** Is the app currently loading? */
  isLoading: boolean;
  /** Manually set loading state */
  setIsLoading: (loading: boolean) => void;
  /** Loading progress (0-100) */
  progress: number;
  /** Manually set progress */
  setProgress: (progress: number) => void;
}

/** Create the context */
const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
  progress: 0,
  setProgress: () => {},
});

/** Custom hook to consume loading context */
export function useLoading(): LoadingContextType {
  return useContext(LoadingContext);
}

/** Provider props */
interface LoadingProviderProps {
  children: ReactNode;
  /** Minimum loading time in ms (prevents flash) */
  minLoadTime?: number;
  /** Enable/disable the loading screen */
  enabled?: boolean;
}

export default function LoadingProvider({
  children,
  minLoadTime = 2500,
  enabled = true,
}: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(enabled);
  const [progress, setProgress] = useState(0);

  /** Simulate loading progress */
  useEffect(() => {
    if (!enabled) return;

    // ── Phase 1: Quick progress to 60% ──
    const phase1 = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 60) {
          clearInterval(phase1);
          return prev;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 100);

    // ── Phase 2: Slow progress to 90% ──
    const phase2Timer = setTimeout(() => {
      const phase2 = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(phase2);
            return prev;
          }
          return prev + Math.random() * 3 + 1;
        });
      }, 200);

      return () => clearInterval(phase2);
    }, 800);

    // ── Phase 3: Complete and dismiss ──
    const completeTimer = setTimeout(() => {
      setProgress(100);
      // Small delay after reaching 100% for the animation to complete
      setTimeout(() => setIsLoading(false), 400);
    }, minLoadTime);

    return () => {
      clearInterval(phase1);
      clearTimeout(phase2Timer);
      clearTimeout(completeTimer);
    };
  }, [enabled, minLoadTime]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, progress, setProgress }}>
      {/* ── Loading Screen Overlay ── */}
      <AnimatePresence mode="wait">
        {isLoading && enabled && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-dark-900 flex flex-col items-center justify-center"
          >
            {/* ── Background Grid ── */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* ── Glow Effects ── */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[200px] h-[200px] bg-neon-purple/10 rounded-full blur-3xl" />

            {/* ── Logo Animation ── */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 mb-12"
            >
              {/* Car Emoji as Logo */}
              <motion.span
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 360],
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                }}
                className="text-6xl"
                style={{ display: "inline-block" }}
              >
                🏎️
              </motion.span>

              {/* Brand Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-orbitron text-3xl font-black gradient-text"
              >
                VELOCITY
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="font-orbitron text-xs text-white/40 tracking-[0.4em] uppercase"
              >
                Initializing Race Engine
              </motion.p>
            </motion.div>

            {/* ── Progress Bar ── */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "280px" }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Bar Background */}
              <div className="w-[280px] h-1 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    background: "linear-gradient(90deg, #00f0ff, #b000ff, #ff00e5)",
                    boxShadow: "0 0 15px rgba(0, 240, 255, 0.5)",
                  }}
                />
              </div>

              {/* Progress Percentage */}
              <span className="font-orbitron text-[10px] text-white/30 tracking-widest">
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </motion.div>

            {/* ── Loading Dots ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-neon-blue"
                />
              ))}
            </motion.div>

            {/* ── System Status Messages ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={
                    progress < 30
                      ? "loading-assets"
                      : progress < 60
                      ? "loading-engine"
                      : progress < 90
                      ? "loading-track"
                      : "ready"
                  }
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-orbitron text-[10px] text-white/30 tracking-[0.3em]"
                >
                  {progress < 30
                    ? "⚡ LOADING 3D ASSETS..."
                    : progress < 60
                    ? "⚙️ INITIALIZING ENGINE..."
                    : progress < 90
                    ? "🏁 PREPARING TRACK..."
                    : "🟢 SYSTEMS READY"}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── App Content ── */}
      {children}
    </LoadingContext.Provider>
  );
}