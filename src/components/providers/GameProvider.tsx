"use client";

import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { useControls } from "@/hooks/useControls";
import { useGameState } from "@/hooks/useGameState";
import { GameState, ControlKeys } from "@/types";

/* ══════════════════════════════════════════════
   GameProvider — Global Game State Context
   ─────────────────────────────────────────────
   Centralizes game state management so any
   component in the tree can access:
   - Speed, Gear, Nitro, RPM
   - Engine toggle
   - Control state ref
   
   This eliminates prop-drilling of gameState
   through all 7 sections.
   ══════════════════════════════════════════════ */

/** Context value type */
interface GameContextType {
  /** Current game state (speed, gear, nitro, etc.) */
  gameState: GameState;
  /** Reference to current keyboard controls */
  controlsRef: React.RefObject<ControlKeys | null>;
  /** Toggle the engine on/off */
  toggleEngine: () => void;
  /** Is the car currently accelerating? */
  isAccelerating: boolean;
  /** Is nitro active? */
  isNitroActive: boolean;
  /** Speed as a percentage (0-100) */
  speedPercent: number;
}

/** Create the context */
const GameContext = createContext<GameContextType | null>(null);

/** Custom hook to consume game context */
export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

/** Provider props */
interface GameProviderProps {
  children: ReactNode;
}

export default function GameProvider({ children }: GameProviderProps) {
  // ── Initialize control listener ──
  const controlsRef = useControls();

  // ── Initialize game state with controls ──
  const { gameState, toggleEngine } = useGameState(controlsRef);

  // ── Derive computed values ──
  const isAccelerating = gameState.speed > 5 && gameState.isEngineOn;
  const isNitroActive =
    gameState.nitro < 95 && gameState.isEngineOn && gameState.speed > 0;
  const speedPercent = (gameState.speed / 320) * 100;

  /** Memoize to prevent unnecessary re-renders */
  const contextValue = useMemo<GameContextType>(
    () => ({
      gameState,
      controlsRef,
      toggleEngine,
      isAccelerating,
      isNitroActive,
      speedPercent,
    }),
    // gameState changes every frame when active, so we track specific fields
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      gameState.speed,
      gameState.gear,
      gameState.nitro,
      gameState.rpm,
      gameState.isEngineOn,
      toggleEngine,
    ]
  );

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}