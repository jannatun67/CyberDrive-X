"use client";

import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import GameProvider from "./GameProvider";
import LoadingProvider from "./LoadingProvider";
import SmoothScroll from "./SmoothScroll";

/* ══════════════════════════════════════════════
   Providers — Master Wrapper
   ─────────────────────────────────────────────
   Composes ALL providers in the correct order:

   1. LoadingProvider  — Outermost (controls loading screen)
   2. ThemeProvider    — Theme context available everywhere
   3. GameProvider     — Game state & controls
   4. SmoothScroll     — Smooth scrolling wrapper

   Usage in layout.tsx:
     <Providers>{children}</Providers>

   This pattern keeps layout.tsx clean and
   makes it easy to add/remove providers.
   ══════════════════════════════════════════════ */

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <LoadingProvider minLoadTime={2500} enabled={true}>
      <ThemeProvider defaultTheme="neon-blue">
        <GameProvider>
          <SmoothScroll
            enabled={true}
            stiffness={100}
            damping={30}
            mass={0.5}
          >
            {children}
          </SmoothScroll>
        </GameProvider>
      </ThemeProvider>
    </LoadingProvider>
  );
}