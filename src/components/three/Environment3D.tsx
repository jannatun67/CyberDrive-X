"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ══════════════════════════════════════════════
   Environment3D — Ground Grid + Particles
   ══════════════════════════════════════════════ */

interface Environment3DProps {
  speed: number;
  isEngineOn: boolean;
}

export default function Environment3D({ speed, isEngineOn }: Environment3DProps) {
  const particlesRef = useRef<THREE.Points>(null);

  /** Generate random particle positions */
  const [particlePositions] = useState(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  });

  /** Animate particles */
  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    // Slow rotation of the particle field
    particlesRef.current.rotation.y += delta * 0.02;
    particlesRef.current.rotation.x += delta * 0.01;

    // Speed-based movement when engine is on
    if (isEngineOn && speed > 0) {
      particlesRef.current.rotation.z += delta * (speed / 320) * 0.1;
    }
  });

  return (
    <>
      {/* ── Ambient Light ── */}
      <ambientLight intensity={0.15} />

      {/* ── Key Light (top-right) ── */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* ── Neon Fill Lights ── */}
      <pointLight position={[-3, 2, -3]} intensity={1} color="#00f0ff" distance={10} />
      <pointLight position={[3, 2, 3]} intensity={0.8} color="#b000ff" distance={10} />
      <pointLight position={[0, -1, 0]} intensity={isEngineOn ? 1.5 : 0.3} color="#00f0ff" distance={5} />

      {/* ── Ground Reflection Plane ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* ── Grid Lines on Ground ── */}
      <gridHelper
        args={[30, 30, "#00f0ff", "#1a1a2e"]}
        position={[0, -1.19, 0]}
       
        material-transparent={true}
      
        material-opacity={0.15}
      />

      {/* ── Floating Particles ── */}
      <Points ref={particlesRef} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </>
  );
}