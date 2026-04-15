"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import CarModel from "./CarModel";
import Environment3D from "./Environment3D";
import SceneLoader from "./SceneLoader";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ══════════════════════════════════════════════
   Experience — Main 3D Canvas Scene
   ─────────────────────────────────────────────
   Wraps the Three.js canvas with:
   - Responsive camera positioning
   - OrbitControls (limited for UX)
   - Suspense boundary with loader
   - Car model + environment
   ══════════════════════════════════════════════ */

interface ExperienceProps {
  isEngineOn: boolean;
  speed: number;
}

export default function Experience({ isEngineOn, speed }: ExperienceProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full h-full relative r3f-canvas">
      {/* Suspense Fallback — shown while 3D assets load */}
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          /* ── Camera Config ── */
          camera={{
            position: isMobile ? [4, 3, 4] : [5, 3, 5],
            fov: isMobile ? 60 : 50,
            near: 0.1,
            far: 100,
          }}
          /* ── Rendering Config ── */
          shadows
          dpr={[1, 2]} // Pixel ratio: min 1, max 2 for performance
          gl={{
            antialias: true,
            alpha: true, // Transparent background
            powerPreference: "high-performance",
          }}
          /* ── Accessibility ── */
          style={{ touchAction: "none" }}
        >
          {/* ── Fog for depth effect ── */}
          <fog attach="fog" args={["#0a0a0f", 8, 25]} />

          {/* ── 3D Environment (lights, grid, particles) ── */}
          <Environment3D speed={speed} isEngineOn={isEngineOn} />

          {/* ── The Car ── */}
          <CarModel isEngineOn={isEngineOn} speed={speed} />

          {/* ── User Camera Controls ── */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2.1} // Prevent going below ground
            minPolarAngle={0.3}
            autoRotate={false} // Car handles its own rotation
            target={[0, 0, 0]}
          />

          {/* ── Preload all assets ── */}
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}