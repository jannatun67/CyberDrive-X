"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { GALLERY_ITEMS } from "@/lib/constants";

/* ══════════════════════════════════════════════
   Section 5: GALLERY
   ─────────────────────────────────────────────
   Track/Car gallery with filter tabs and
   card-based layout with hover effects.
   ══════════════════════════════════════════════ */

const FILTERS = ["All", "Circuit", "Rally", "Drift", "Sprint", "Night", "Extreme"];

export default function S5_Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.tag === activeFilter);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-orbitron text-xs tracking-[0.3em] text-neon-orange uppercase">
            Explore Tracks
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black mt-4 mb-6">
            <span className="text-white">TRACK </span>
            <span className="gradient-text">GALLERY</span>
          </h2>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                font-orbitron text-xs tracking-wider px-4 py-2 rounded-lg
                border transition-all duration-300
                ${activeFilter === filter
                  ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
                }
              `}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* ── Gallery Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <GlassCard className="group overflow-hidden">
                  {/* Image Area (Emoji placeholder) */}
                  <div className="relative w-full h-48 bg-dark-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <span className="text-6xl group-hover:scale-125 transition-transform duration-500">
                      {item.image}
                    </span>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="font-orbitron text-xs text-neon-blue tracking-wider">
                        VIEW TRACK →
                      </span>
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full">
                      <span className="font-orbitron text-[10px] text-neon-purple tracking-wider">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="font-orbitron text-base font-bold text-white group-hover:text-neon-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-orbitron text-xs text-white/40 mt-1">
                    {item.subtitle}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}