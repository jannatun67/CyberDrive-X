"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GameState, ControlKeys } from "@/types";
import { clamp, lerp } from "@/lib/utils";
import { GEAR_THRESHOLDS } from "@/lib/constants";

const INITIAL_STATE: GameState = {
  speed: 0,
  gear: 1,
  nitro: 100,
  rpm: 0,
  isEngineOn: false,
};

export function useGameState(controlsRef: React.RefObject<ControlKeys>) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const stateRef = useRef<GameState>(INITIAL_STATE);
  const rafRef = useRef<number>(0);
  const gameLoopRef = useRef<() => void>(() => {});

  /** Calculate gear */
  const calculateGear = useCallback((speed: number): number => {
    for (let i = GEAR_THRESHOLDS.length - 1; i >= 0; i--) {
      if (speed >= GEAR_THRESHOLDS[i]) return Math.min(i + 1, 6);
    }
    return 1;
  }, []);

  /** Main loop */
  const gameLoop = useCallback(() => {
    const controls = controlsRef.current;

    if (!controls) {
      rafRef.current = requestAnimationFrame(gameLoopRef.current);
      return;
    }

    const state = stateRef.current;
    if (!state.isEngineOn) {
      rafRef.current = requestAnimationFrame(gameLoopRef.current);
      return;
    }

    let { speed, nitro } = state;

    // Acceleration
    if (controls.forward) {
      const acceleration = controls.nitro && nitro > 0 ? 2.0 : 1.0;
      speed = lerp(speed, 320, 0.02 * acceleration);
    }

    // Reverse / Brake
    if (controls.backward) {
      speed = lerp(speed, 0, 0.05);
    }

    if (controls.brake) {
      speed = lerp(speed, 0, 0.08);
    }

    // Natural slow
    if (!controls.forward && !controls.backward && !controls.brake) {
      speed = lerp(speed, 0, 0.01);
    }

    // Nitro
    if (controls.nitro && controls.forward && nitro > 0) {
      nitro = clamp(nitro - 0.5, 0, 100);
    } else if (nitro < 100) {
      nitro = clamp(nitro + 0.1, 0, 100);
    }

    speed = clamp(speed, 0, 320);

    const gear = calculateGear(speed);

    const gearMin = GEAR_THRESHOLDS[gear - 1] || 0;
    const gearMax = GEAR_THRESHOLDS[gear] || 320;
    const gearProgress = (speed - gearMin) / (gearMax - gearMin);
    const rpm = clamp(2000 + gearProgress * 7000, 1000, 9000);

    const newState: GameState = {
      speed,
      gear,
      nitro,
      rpm,
      isEngineOn: state.isEngineOn,
    };

    stateRef.current = newState;
    setGameState(newState);

    rafRef.current = requestAnimationFrame(gameLoopRef.current);
  }, [calculateGear, controlsRef]);

  useEffect(() => {
    gameLoopRef.current = gameLoop;
  }, [gameLoop]);

  /** Reset state when engine turns off */
  const resetState = useCallback(() => {
    stateRef.current = {
      ...stateRef.current,
      speed: 0,
      rpm: 0,
      gear: 1,
      nitro: 100,
    };
    setGameState({ ...stateRef.current });
  }, []);

  /** Toggle engine */
  const toggleEngine = useCallback(() => {
    const wasOn = stateRef.current.isEngineOn;
    const willBeOn = !wasOn;
    
    stateRef.current = {
      ...stateRef.current,
      isEngineOn: willBeOn,
    };
    setGameState({ ...stateRef.current });
    
    if (wasOn && !willBeOn) {
      resetState();
    }
  }, [resetState]);

  /** Start game loop on mount, stop on unmount */
  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoopRef.current);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { gameState, toggleEngine, resetState };
}