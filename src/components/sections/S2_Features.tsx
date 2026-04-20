"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { FEATURES } from "@/lib/constants";

export default function S2_Features() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-60 sm:w-80 lg:w-96 h-60 sm:h-80 lg:h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-60 sm:w-80 lg:w-96 h-60 sm:h-80 lg:h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5"> {/* slightly smaller container */}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="font-orbitron text-[20px]  sm:text-sm tracking-[0.25em] text-neon-purple uppercase">
            What We Offer
          </span>

          <h2 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-black mt-3 mb-4">
            <span className="text-white">POWERED BY </span>
            <span className="gradient-text">INNOVATION</span>
          </h2>

          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base lg:text-lg">
            Experience cutting-edge technology that pushes the boundaries of web-based 3D racing.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
  {FEATURES.map((feature, index) => (
    <GlassCard
      key={feature.id}
      delay={index * 0.06}
      className="group p-3 sm:p-4 hover:scale-[1.02] transition duration-300"
    >
      
      {/* 🔥 Image (height significantly reduced) */}
      <div className="w-full    mb-2 rounded-md overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.title}
          width={400}
          height={200}
          className="w-full h-[200px] object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Line */}
      <div className={`w-8 h-[2px] bg-linear-to-r ${feature.gradient} mb-2`} />

      {/* Title */}
      <h3 className="font-orbitron text-[20px] sm:text-base lg:text-lg font-semibold text-white mb-1">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-white/60 text-xs sm:text-sm leading-relaxed line-clamp-2">
        {feature.description}
      </p>
    </GlassCard>
  ))}
</div>
      </div>
    </section>
  );
}