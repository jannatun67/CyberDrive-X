"use client";

import Navbar from "@/components/ui/Navbar";
import S1_Hero from "@/components/sections/S1_Hero";
import S2_Features from "@/components/sections/S2_Features";
import S3_Showcase from "@/components/sections/S3_Showcase";
import S4_HUD from "@/components/sections/S4_HUD";
import S5_Gallery from "@/components/sections/S5_Gallery";
import S6_Specs from "@/components/sections/S6_Specs";
import S7_Footer from "@/components/sections/S7_Footer";
import { useGame } from "@/components/providers/GameProvider";

/* ══════════════════════════════════════════════
   MAIN PAGE — Now Uses GameProvider Context
   ─────────────────────────────────────────────
   No more prop drilling! All sections can
   access game state via useGame() hook.
   ══════════════════════════════════════════════ */

export default function Home() {
  // ── Pull from global game context ──
  const { gameState, toggleEngine, controlsRef } = useGame();

  return (
    <main className="relative min-h-screen bg-dark-900">
      <Navbar />
      <div className="container">
        <S1_Hero
          isEngineOn={gameState.isEngineOn}
          speed={gameState.speed}
          onStartEngine={toggleEngine}
        />

        <S2_Features />

        <S3_Showcase
          isEngineOn={gameState.isEngineOn}
          speed={gameState.speed}
        />

        <S4_HUD
          gameState={gameState}
          onToggleEngine={toggleEngine}
          controlsRef={controlsRef}
        />

        <S5_Gallery />
        <S6_Specs />
        <S7_Footer />
      </div>
    </main>
  );
}