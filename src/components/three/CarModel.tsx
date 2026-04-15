"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { Float, MeshDistortMaterial } from "@react-three/drei";

/* ══════════════════════════════════════════════
   CarModel — 3D Car with Floating + Rotation
   ─────────────────────────────────────────────
   Uses a placeholder geometry since the PMND
   market GLB requires manual download.
   The model features:
   - Floating effect (bob up and down)
   - Auto 360° rotation
   - Neon glow material
   ══════════════════════════════════════════════ */

interface CarModelProps {
  isEngineOn: boolean;
  speed: number;
}

export default function CarModel({ isEngineOn, speed }: CarModelProps) {
  const groupRef = useRef<Group>(null);
  const bodyRef = useRef<Mesh>(null);
  const wheelFLRef = useRef<Mesh>(null);
  const wheelFRRef = useRef<Mesh>(null);
  const wheelBLRef = useRef<Mesh>(null);
  const wheelBRRef = useRef<Mesh>(null);

  /** Animate every frame */
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // ── 360° Auto Rotation ──
    const rotationSpeed = isEngineOn ? 0.3 + (speed / 320) * 0.5 : 0.15;
    groupRef.current.rotation.y += delta * rotationSpeed;

    // ── Engine vibration when ON ──
    if (isEngineOn && bodyRef.current) {
      const vibration = Math.sin(state.clock.elapsedTime * 30) * 0.002 * (1 + speed / 320);
      bodyRef.current.position.y = vibration;
    }

    // ── Spin wheels based on speed ──
    const wheelSpeed = delta * (speed / 10);
    [wheelFLRef, wheelFRRef, wheelBLRef, wheelBRRef].forEach((ref) => {
      if (ref.current) ref.current.rotation.x += wheelSpeed;
    });
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={isEngineOn ? 0.8 : 0.4}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} scale={1.2} position={[0, -0.5, 0]}>
        {/* ── Car Body ── */}
        <mesh ref={bodyRef} castShadow>
          {/* Main body — elongated box */}
          <boxGeometry args={[2.4, 0.5, 1.1]} />
          <meshStandardMaterial
            color={isEngineOn ? "#00f0ff" : "#4a5568"}
            metalness={0.9}
            roughness={0.1}
            emissive={isEngineOn ? "#00f0ff" : "#000000"}
            emissiveIntensity={isEngineOn ? 0.3 + (speed / 320) * 0.7 : 0}
          />
        </mesh>

        {/* ── Cabin / Roof ── */}
        <mesh position={[0.1, 0.45, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 1.0]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* ── Front Spoiler ── */}
        <mesh position={[1.3, -0.1, 0]} castShadow>
          <boxGeometry args={[0.3, 0.15, 1.3]} />
          <meshStandardMaterial
            color={isEngineOn ? "#b000ff" : "#2d2d44"}
            metalness={0.9}
            roughness={0.1}
            emissive={isEngineOn ? "#b000ff" : "#000000"}
            emissiveIntensity={isEngineOn ? 0.5 : 0}
          />
        </mesh>

        {/* ── Rear Wing ── */}
        <group position={[-1.3, 0.4, 0]}>
          {/* Wing Plate */}
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.05, 1.2]} />
            <meshStandardMaterial
              color={isEngineOn ? "#ff00e5" : "#2d2d44"}
              metalness={0.9}
              roughness={0.1}
              emissive={isEngineOn ? "#ff00e5" : "#000000"}
              emissiveIntensity={isEngineOn ? 0.4 : 0}
            />
          </mesh>
          {/* Wing Supports */}
          {[-0.4, 0.4].map((z, i) => (
            <mesh key={i} position={[0, -0.2, z]} castShadow>
              <boxGeometry args={[0.05, 0.4, 0.05]} />
              <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
            </mesh>
          ))}
        </group>

        {/* ── Wheels ── */}
        {[
          { ref: wheelFLRef, pos: [0.8, -0.35, 0.65] as [number, number, number] },
          { ref: wheelFRRef, pos: [0.8, -0.35, -0.65] as [number, number, number] },
          { ref: wheelBLRef, pos: [-0.8, -0.35, 0.65] as [number, number, number] },
          { ref: wheelBRRef, pos: [-0.8, -0.35, -0.65] as [number, number, number] },
        ].map(({ ref, pos }, i) => (
          <mesh key={i} ref={ref} position={pos} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
            <meshStandardMaterial color="#111" metalness={0.5} roughness={0.6} />
          </mesh>
        ))}

        {/* ── Headlights ── */}
        {[0.35, -0.35].map((z, i) => (
          <mesh key={i} position={[1.25, 0.05, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={isEngineOn ? "#ffffff" : "#333"}
              emissiveIntensity={isEngineOn ? 2 : 0}
            />
          </mesh>
        ))}

        {/* ── Tail Lights ── */}
        {[0.4, -0.4].map((z, i) => (
          <mesh key={i} position={[-1.25, 0.05, z]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color="#ff0000"
              emissive={isEngineOn ? "#ff0000" : "#330000"}
              emissiveIntensity={isEngineOn ? 1.5 : 0.1}
            />
          </mesh>
        ))}

        {/* ── Neon Underglow ── */}
        {isEngineOn && (
          <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.6, 1.3]} />
            <MeshDistortMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.5 + (speed / 320) * 1.5}
              transparent
              opacity={0.3}
              distort={0.2}
              speed={3}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}