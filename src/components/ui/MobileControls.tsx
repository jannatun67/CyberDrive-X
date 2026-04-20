"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ControlKeys } from "@/types";

interface MobileControlsProps {
  controlsRef: React.RefObject<ControlKeys>;
  isEngineOn: boolean;
}

export default function MobileControls({
  controlsRef,
  isEngineOn,
}: MobileControlsProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);

  /** Joystick Start */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = joystickRef.current?.getBoundingClientRect();

    const centerX = rect ? rect.left + rect.width / 2 : touch.clientX;
    const centerY = rect ? rect.top + rect.height / 2 : touch.clientY;

    setTouchStart({ x: centerX, y: centerY });
    setJoystickPos({ x: 0, y: 0 });
  }, []);

  /** Joystick Move */
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 45;
      const clampedDistance = Math.min(distance, maxDistance);
      const angle = Math.atan2(deltaY, deltaX);

      const clampedX = Math.cos(angle) * clampedDistance;
      const clampedY = Math.sin(angle) * clampedDistance;

      setJoystickPos({ x: clampedX, y: clampedY });

      // Reset
      controlsRef.current.left = false;
      controlsRef.current.right = false;
      controlsRef.current.forward = false;
      controlsRef.current.backward = false;

      if (Math.abs(deltaX) > 10) {
        controlsRef.current.right = deltaX > 0;
        controlsRef.current.left = deltaX < 0;
      }

      if (Math.abs(deltaY) > 10) {
        controlsRef.current.backward = deltaY > 0;
        controlsRef.current.forward = deltaY < 0;
      }
    },
    [touchStart, controlsRef]
  );

  /** End */
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

  const handleButtonPress = useCallback(
    (action: keyof ControlKeys, pressed: boolean) => {
      controlsRef.current[action] = pressed;
    },
    [controlsRef]
  );

  if (!isEngineOn) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        fixed bottom-4 left-3 right-3 z-50 
        md:hidden
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <div className="flex items-end justify-between gap-4">

        {/* 🎮 Joystick */}
        <div
          ref={joystickRef}
          className="
            relative 
            w-20 h-20 sm:w-24 sm:h-24 
            bg-dark-800/70 backdrop-blur-md 
            rounded-full 
            border border-neon-blue/30 
            flex items-center justify-center
            shadow-[0_0_20px_rgba(0,200,255,0.15)]
          "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ touchAction: "none" }}
        >
          {/* inner */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neon-blue/20 rounded-full flex items-center justify-center">
            <span className="text-[10px] sm:text-xs text-neon-blue">🎮</span>
          </div>

          {/* knob */}
          <motion.div
            className="absolute w-5 h-5 sm:w-6 sm:h-6 bg-neon-blue rounded-full shadow-lg"
            animate={{ x: joystickPos.x, y: joystickPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>

        {/* 🔘 Buttons */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">

          {/* Nitro */}
          <motion.button
            className="
              w-12 h-12 sm:w-14 sm:h-14
              bg-neon-purple/80 backdrop-blur-md 
              rounded-full 
              border border-neon-purple/50 
              flex items-center justify-center 
              text-base sm:text-lg 
              shadow-[0_0_20px_rgba(180,0,255,0.25)]
              active:scale-90 transition
            "
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

          {/* Brake */}
          <motion.button
            className="
              w-12 h-12 sm:w-14 sm:h-14
              bg-red-500/80 backdrop-blur-md 
              rounded-full 
              border border-red-500/50 
              flex items-center justify-center 
              text-base sm:text-lg 
              shadow-[0_0_20px_rgba(255,0,0,0.25)]
              active:scale-90 transition
            "
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