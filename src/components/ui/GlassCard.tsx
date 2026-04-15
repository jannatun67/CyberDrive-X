"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/* ══════════════════════════════════════════════
   GlassCard — Reusable Glassmorphism Card
   ══════════════════════════════════════════════ */

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={
        hover
          ? { scale: 1.03, boxShadow: "0 0 30px rgba(0, 240, 255, 0.2)" }
          : undefined
      }
      className={`
        glass p-6 transition-all duration-300
        ${hover ? "cursor-pointer hover:border-neon-blue/30" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}