"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ControlKeys } from "@/types";

/* ══════════════════════════════════════════════
   MobileControls — Touch Controls for Mobile
   ─────────────────────────────────────────────
   Virtual joystick and buttons for mobile devices.
   Updates the controls ref directly.
   ══════════════════════════════════════════════ */

interface MobileControlsProps {
  controlsRef: React.RefObject<ControlKeys>;
  isEngineOn: boolean;
}

export default function MobileControls({ controlsRef, isEngineOn }: MobileControlsProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);

  /** Handle touch start on the virtual joystick */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = joystickRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : touch.clientX;
    const centerY = rect ? rect.top + rect.height / 2 : touch.clientY;

    setTouchStart({ x: centerX, y: centerY });
    setJoystickPos({ x: 0, y: 0 });
  }, []);

  /** Handle touch move on the virtual joystick */
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // Limit joystick movement to a circle
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 40; // pixels
    const clampedDistance = Math.min(distance, maxDistance);
    const angle = Math.atan2(deltaY, deltaX);

    const clampedX = Math.cos(angle) * clampedDistance;
    const clampedY = Math.sin(angle) * clampedDistance;

    setJoystickPos({ x: clampedX, y: clampedY });

    // Reset all directional controls
    controlsRef.current.left = false;
    controlsRef.current.right = false;
    controlsRef.current.forward = false;
    controlsRef.current.backward = false;

    // Set direction based on touch movement
    if (Math.abs(deltaX) > 10) {
      if (deltaX > 0) {
        controlsRef.current.right = true;
      } else {
        controlsRef.current.left = true;
      }
    }

    if (Math.abs(deltaY) > 10) {
      if (deltaY > 0) {
        controlsRef.current.backward = true;
      } else {
        controlsRef.current.forward = true;
      }
    }
  }, [touchStart, controlsRef]);

  /** Handle touch end on the virtual joystick */
  const handleTouchEnd = useCallback(() => {
    setTouchStart(null);
    setJoystickPos({ x: 0, y: 0 });
    controlsRef.current.left = false;
    controlsRef.current.right = false;
    controlsRef.current.forward = false;
    controlsRef.current.backward = false;
  }, [controlsRef]);

  useEffect(() => {
    const controls = controlsRef.current;
    return () => {
      controls.left = false;
      controls.right = false;
      controls.forward = false;
      controls.backward = false;
      controls.nitro = false;
      controls.brake = false;
    };
  }, [controlsRef]);

  /** Handle button press */
  const handleButtonPress = useCallback((action: keyof ControlKeys, pressed: boolean) => {
    controlsRef.current[action] = pressed;
  }, [controlsRef]);

  if (!isEngineOn) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 right-6 z-40 md:hidden"
    >
      <div className="flex items-end justify-between">
        {/* Virtual Joystick */}
        <div
          ref={joystickRef}
          className="relative w-24 h-24 bg-dark-800/80 backdrop-blur-sm rounded-full border border-neon-blue/30 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ touchAction: "none" }}
        >
          <div className="w-16 h-16 bg-neon-blue/20 rounded-full flex items-center justify-center">
            <span className="text-neon-blue text-xs">🎮</span>
          </div>
          {/* Joystick indicator */}
          <motion.div
            className="absolute w-6 h-6 bg-neon-blue rounded-full"
            animate={{ x: joystickPos.x, y: joystickPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Nitro Button */}
          <motion.button
            className="w-14 h-14 bg-neon-purple/80 backdrop-blur-sm rounded-full border border-neon-purple/50 flex items-center justify-center text-neon-purple font-bold text-lg shadow-lg active:scale-95 transition-transform"
            onTouchStart={(e) => {
              e.preventDefault();
              handleButtonPress("nitro", true);
            }}
            onTouchEnd={() => handleButtonPress("nitro", false)}
            onTouchCancel={() => handleButtonPress("nitro", false)}
            whileTap={{ scale: 0.9 }}
            style={{ touchAction: "none" }}
          >
            ⚡
          </motion.button>

          {/* Brake Button */}
          <motion.button
            className="w-14 h-14 bg-red-500/80 backdrop-blur-sm rounded-full border border-red-500/50 flex items-center justify-center text-white font-bold text-lg shadow-lg active:scale-95 transition-transform"
            onTouchStart={(e) => {
              e.preventDefault();
              handleButtonPress("brake", true);
            }}
            onTouchEnd={() => handleButtonPress("brake", false)}
            onTouchCancel={() => handleButtonPress("brake", false)}
            whileTap={{ scale: 0.9 }}
            style={{ touchAction: "none" }}
          >
            🛑
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}