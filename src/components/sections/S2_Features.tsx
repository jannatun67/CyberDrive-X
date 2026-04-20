"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { FEATURES } from "@/lib/constants";

export default function S2_Features() {
  return (
    <section id="features" className="relative w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-60 sm:w-80 lg:w-96 h-60 sm:h-80 lg:h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-60 sm:w-80 lg:w-96 h-60 sm:h-80 lg:h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="font-orbitron text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] text-neon-purple uppercase">
            What We Offer
          </span>

          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight">
            <span className="text-white">POWERED BY </span>
            <span className="gradient-text">INNOVATION</span>
          </h2>

          <p className="text-white/60 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl">
            Experience cutting-edge technology that pushes the boundaries of web-based 3D racing.
          </p>
        </motion.div>

        {/* ── Feature Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {FEATURES.map((feature, index) => (
            <GlassCard
              key={feature.id}
              delay={index * 0.1}
              className="group p-4 sm:p-5 lg:p-6"
            >
              
              {/* Image */}
              <div className="w-full h-40 sm:h-48 md:h-52 lg:h-60 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Gradient Line */}
              <div
                className={`w-10 sm:w-12 h-1 rounded-full bg-linear-to-r ${feature.gradient} mb-3 sm:mb-4`}
              />

              {/* Title */}
              <h3 className="font-orbitron text-lg sm:text-xl lg:text-[22px] font-bold text-white mb-2 sm:mb-3 group-hover:text-neon-blue transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm sm:text-base lg:text-[18px] leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}