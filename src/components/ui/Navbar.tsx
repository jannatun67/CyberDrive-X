"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

/* ══════════════════════════════════════════════
   Navbar — Responsive Top Navigation
   ══════════════════════════════════════════════ */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 50 : false
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled ? "glass-strong shadow-xl backdrop-blur-xl" : "bg-transparent"}
        `}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            <a href="#hero" className="flex items-center gap-2">
              <span className="font-orbitron font-black text-2xl sm:text-2xl gradient-text">
                VELOCITY
              </span>
            </a>

            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-orbitron text-[20px] xl:text-base tracking-wider text-white/70 hover:text-neon-blue transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#hud"
                className="hidden md:flex font-orbitron text-sm xl:text-base font-bold tracking-wider text-neon-blue border border-neon-blue/50 rounded-full px-8 py-4 hover:bg-neon-blue/10 transition-all duration-300"
              >
                PLAY NOW
              </a>

              <button
                onClick={() => setIsMobileOpen((prev) => !prev)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileOpen}
              >
                <span
                  className={`block w-6 h-0.5 bg-neon-blue transition-transform duration-300 ${
                    isMobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-neon-blue transition-all duration-300 ${
                    isMobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-neon-blue transition-transform duration-300 ${
                    isMobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40  bg-dark-900/70 backdrop-blur-sm"
              onClick={handleLinkClick}
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="fixed top-16 inset-x-4 z-50 rounded-3xl border border-white/10 bg-dark-950/95 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="px-5 py-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block font-orbitron text-base tracking-wider text-white/80 rounded-2xl px-4 py-3 hover:bg-white/5 hover:text-neon-blue transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#hud"
                  onClick={handleLinkClick}
                  className="block text-center font-orbitron text-base font-bold tracking-wider text-neon-blue border border-neon-blue/50 rounded-full px-4 py-3 hover:bg-neon-blue/10 transition-all duration-200"
                >
                  PLAY NOW
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
