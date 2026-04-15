"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ══════════════════════════════════════════════
   SmoothScroll Provider
   ─────────────────────────────────────────────
   Wraps the entire application in a smooth
   scroll container using Framer Motion springs.
   
   Features:
   - Smooth momentum-based scrolling on desktop
   - Native scroll on mobile (better UX & perf)
   - Adjustable damping & stiffness
   - Recalculates on window resize
   ══════════════════════════════════════════════ */

interface SmoothScrollProps {
  children: ReactNode;
  /** Enable or disable smooth scrolling */
  enabled?: boolean;
  /** Spring stiffness — higher = snappier */
  stiffness?: number;
  /** Spring damping — higher = less bounce */
  damping?: number;
  /** Mass of the spring animation */
  mass?: number;
}

export default function SmoothScroll({
  children,
  enabled = true,
  stiffness = 100,
  damping = 30,
  mass = 0.5,
}: SmoothScrollProps) {
  // ── Refs ──
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Disable smooth scroll on mobile for native feel ──
  const isMobile = useMediaQuery("(max-width: 768px)");
  const shouldSmooth = enabled && !isMobile;

  // ── Track the scroll progress of the window ──
  const { scrollY } = useScroll();

  // ── Apply spring physics to the scroll position ──
  const smoothY = useSpring(scrollY, {
    stiffness,
    damping,
    mass,
    restDelta: 0.001, // Stop animating when delta is this small
  });

  // ── Transform: invert scrollY for translateY effect ──
  const y = useTransform(smoothY, (value) => -value);

  // ── Sync the body height with content height ──
  useEffect(() => {
    if (!shouldSmooth || !contentRef.current) return;

    /** Calculate and set the body height to match content */
    const updateHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        document.body.style.height = `${contentHeight}px`;
      }
    };

    // Initial calculation
    updateHeight();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(contentRef.current);

    // Also listen for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup: reset body height
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
      document.body.style.height = "";
    };
  }, [shouldSmooth]);

  // ── If smooth scroll is disabled, render children directly ──
  if (!shouldSmooth) {
    return <>{children}</>;
  }

  // ── Smooth scroll wrapper ──
  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}