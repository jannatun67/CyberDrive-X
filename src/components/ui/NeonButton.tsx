"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/* ══════════════════════════════════════════════
   NeonButton — Glowing CTA Button
   ══════════════════════════════════════════════ */

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "blue" | "purple" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const VARIANT_STYLES = {
  blue: "bg-neon-blue/10 border-neon-blue text-neon-blue shadow-neon-blue hover:bg-neon-blue/20",
  purple: "bg-neon-purple/10 border-neon-purple text-neon-purple shadow-neon-purple hover:bg-neon-purple/20",
  green: "bg-neon-green/10 border-neon-green text-neon-green shadow-neon-green hover:bg-neon-green/20",
};

const SIZE_STYLES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-[20px]",
};

export default function NeonButton({
  children,
  onClick,
  variant = "blue",
  size = "md",
  className = "",
  disabled = false,
}: NeonButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-orbitron font-bold uppercase tracking-wider
        border-2 rounded-lg backdrop-blur-sm
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}