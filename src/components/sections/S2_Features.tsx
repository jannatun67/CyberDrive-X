"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { FEATURES } from "@/lib/constants";

/* ══════════════════════════════════════════════
   Section 2: FEATURES
   ─────────────────────────────────────────────
   6 feature cards with glassmorphism design.
   Staggered animation on scroll.
   ══════════════════════════════════════════════ */

export default function S2_Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-orbitron text-xs tracking-[0.3em] text-neon-purple uppercase">
            What We Offer
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black mt-4 mb-6">
            <span className="text-white">POWERED BY </span>
            <span className="gradient-text">INNOVATION</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Experience cutting-edge technology that pushes the boundaries of web-based 3D racing.
          </p>
        </motion.div>

        {/* ── Feature Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <GlassCard key={feature.id} delay={index * 0.1} className="group">
              {/* Icon */}
              <div className="text-4xl mb-4">{feature.icon}</div>

              {/* Gradient Line */}
              <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${feature.gradient} mb-4`} />

              {/* Title */}
              <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}