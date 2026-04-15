"use client";

import { motion } from "framer-motion";

/* ══════════════════════════════════════════════
   SceneLoader — Loading Screen for 3D Assets
   ══════════════════════════════════════════════ */

export default function SceneLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-900 z-10">
      {/* Spinning Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-2 border-transparent border-t-neon-blue border-r-neon-purple"
      />

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="font-orbitron text-sm text-neon-blue mt-4 tracking-widest"
      >
        LOADING ENGINE...
      </motion.p>
    </div>
  );
}