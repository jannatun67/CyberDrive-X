"use client";

import { useEffect, useCallback, useRef } from "react";
import { ControlKeys } from "@/types";

/* ══════════════════════════════════════════════
   useControls Hook
   ─────────────────────────────────────────────
   Listens for Arrow Keys / WASD / Shift / Space
   Returns a ref to the current control state
   (ref avoids unnecessary re-renders on every keypress)
   ══════════════════════════════════════════════ */

const DEFAULT_CONTROLS: ControlKeys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  nitro: false,
  brake: false,
};

/** Map of keyboard keys → control actions */
const KEY_MAP: Record<string, keyof ControlKeys> = {
  ArrowUp: "forward",
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  ShiftLeft: "nitro",
  ShiftRight: "nitro",
  Space: "brake",
};

export function useControls() {
  const controlsRef = useRef<ControlKeys>({ ...DEFAULT_CONTROLS });

  /** Handle key down — set the corresponding control to true */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = KEY_MAP[e.code];
    if (action) {
      e.preventDefault();
      controlsRef.current[action] = true;
    }
  }, []);

  /** Handle key up — set the corresponding control to false */
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = KEY_MAP[e.code];
    if (action) {
      e.preventDefault();
      controlsRef.current[action] = false;
    }
  }, []);

  /** Handle blur — reset all controls when window loses focus */
  const handleBlur = useCallback(() => {
    controlsRef.current = { ...DEFAULT_CONTROLS };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [handleKeyDown, handleKeyUp, handleBlur]);

  return controlsRef;
}