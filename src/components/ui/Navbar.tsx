"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

/* ══════════════════════════════════════════════
   Navbar — Fixed Top Navigation
   ══════════════════════════════════════════════ */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /** Track scroll position for navbar background */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled ? "glass-strong shadow-lg" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ── Logo ── */}
          <a href="#hero" className="flex items-center gap-2">
            <span className="text-2xl">🏎️</span>
            <span className="font-orbitron font-bold text-lg gradient-text hidden sm:block">
              VELOCITY
            </span>
          </a>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  font-orbitron text-xs tracking-wider text-white/60
                  hover:text-neon-blue transition-colors duration-300
                  px-3 py-2 rounded-lg hover:bg-white/5
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── CTA Button ── */}
          <div className="hidden md:block">
            <a
              href="#hud"
              className="
                font-orbitron text-xs font-bold tracking-wider
                text-neon-blue border border-neon-blue/50 rounded-lg
                px-4 py-2 hover:bg-neon-blue/10 transition-all duration-300
                hover:shadow-neon-blue
              "
            >
              PLAY NOW
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-neon-blue transition-all duration-300 ${
                isMobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-neon-blue transition-all duration-300 ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-neon-blue transition-all duration-300 ${
                isMobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="
                    font-orbitron text-sm tracking-wider text-white/70
                    hover:text-neon-blue transition-colors duration-300
                    py-2 px-3 rounded-lg hover:bg-white/5
                  "
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}