"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { CAR_SPECS } from "@/lib/constants";

/* ══════════════════════════════════════════════
   Section 6: CAR SPECS
   ─────────────────────────────────────────────
   Animated stat bars showing car specifications.
   ══════════════════════════════════════════════ */

export default function S6_Specs() {
  return (
    <section id="specs" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-orbitron text-xs tracking-[0.3em] text-neon-pink uppercase">
            Under The Hood
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black mt-4 mb-6">
            <span className="text-white">TECHNICAL </span>
            <span className="gradient-text">SPECS</span>
          </h2>
        </motion.div>

        {/* ── Specs Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Spec Bars ── */}
          <div className="space-y-6">
            {CAR_SPECS.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Label & Value */}
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-orbitron text-sm text-white/70 tracking-wider">
                    {spec.label}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-orbitron text-xl font-bold text-neon-blue">
                      {spec.value}
                    </span>
                    <span className="font-orbitron text-xs text-white/40">{spec.unit}</span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${spec.barPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    style={{
                      background: `linear-gradient(90deg, #00f0ff, #b000ff)`,
                      boxShadow: "0 0 10px rgba(0, 240, 255, 0.3)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Right: Spec Card Summary ── */}
          <GlassCard hover={false} className="p-8">
            {/* Car Name */}
            <div className="mb-8">
              <span className="font-orbitron text-xs text-neon-purple tracking-widest uppercase">
                Vehicle Profile
              </span>
              <h3 className="font-orbitron text-2xl font-black text-white mt-2">
                VELOCITY <span className="text-neon-blue">GT-R</span>
              </h3>
              <p className="text-white/40 text-sm mt-2 leading-relaxed">
                The Velocity GT-R is engineered for dominance. With a twin-turbo V8 producing
                720 HP and an advanced aerodynamics package, it delivers unmatched performance
                on any track.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏎️", label: "Class", value: "GT Supercar" },
                { icon: "⚙️", label: "Engine", value: "V8 Twin-Turbo" },
                { icon: "🔄", label: "Transmission", value: "7-Speed DCT" },
                { icon: "🏁", label: "Drivetrain", value: "RWD" },
                { icon: "🛞", label: "Tires", value: "Semi-Slick" },
                { icon: "🪶", label: "Body", value: "Carbon Fiber" },
              ].map((item) => (
                <div key={item.label} className="glass p-3 rounded-lg text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="font-orbitron text-xs text-neon-blue font-bold">{item.value}</div>
                  <div className="font-orbitron text-[9px] text-white/30 tracking-wider mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}