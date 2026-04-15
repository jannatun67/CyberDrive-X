"use client";

import { motion } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import { NAV_LINKS } from "@/lib/constants";

/* ══════════════════════════════════════════════
   Section 7: FOOTER
   ─────────────────────────────────────────────
   CTA banner + links + credits.
   ══════════════════════════════════════════════ */

export default function S7_Footer() {
  return (
    <footer id="footer" className="relative pt-24 pb-8">
      {/* ── CTA Banner ── */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass border-glow rounded-2xl p-10 sm:p-16 text-center overflow-hidden"
        >
          {/* Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <span className="text-4xl mb-4 block">🏁</span>
            <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
              <span className="text-white">READY TO </span>
              <span className="gradient-text">RACE?</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-8">
              Jump into the cockpit and experience the thrill of next-gen 3D racing
              right in your browser. No downloads. No limits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <NeonButton variant="blue" size="lg" onClick={() => {
                document.getElementById("hud")?.scrollIntoView({ behavior: "smooth" });
              }}>
                🎮 Start Racing
              </NeonButton>
              <NeonButton variant="purple" size="lg">
                📧 Get Notified
              </NeonButton>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Footer Content ── */}
      <div>
        <div className="border-t border-white/5 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* ── Brand ── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏎️</span>
                <span className="font-orbitron font-bold text-xl gradient-text">VELOCITY</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                A next-generation 3D car racing showcase built with React Three Fiber,
                Next.js 14, and cutting-edge web technologies.
              </p>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <h4 className="font-orbitron text-sm font-bold text-white mb-4 tracking-wider">
                QUICK LINKS
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-orbitron text-xs text-white/40 hover:text-neon-blue transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Tech Stack ── */}
            <div>
              <h4 className="font-orbitron text-sm font-bold text-white mb-4 tracking-wider">
                BUILT WITH
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 14",
                  "TypeScript",
                  "Tailwind CSS",
                  "Three.js",
                  "R3F",
                  "Framer Motion",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="font-orbitron text-[10px] text-white/30 bg-dark-700 px-3 py-1.5 rounded-full border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Copyright ── */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-orbitron text-[10px] text-white/20 tracking-widest">
              © 2024 VELOCITY. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-orbitron text-[10px] text-white/20 hover:text-white/50 tracking-wider transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}