"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

/* ══════════════════════════════════════════════
   ThemeProvider — Neon Gaming Theme Context
   ─────────────────────────────────────────────
   Manages the active color theme across the app.
   Provides:
   - Current theme (neon-blue, neon-purple, etc.)
   - Toggle function to switch themes
   - CSS variable injection for dynamic theming
   ══════════════════════════════════════════════ */

/** Available neon theme options */
export type NeonTheme =
  | "neon-blue"
  | "neon-purple"
  | "neon-pink"
  | "neon-green"
  | "neon-orange";

/** Theme configuration with CSS values */
interface ThemeConfig {
  name: NeonTheme;
  label: string;
  primary: string;      // Main neon color
  secondary: string;    // Accent neon color
  glow: string;         // Glow shadow color
  gradient: string;     // Gradient pair
  emoji: string;        // Theme icon (no SVGs!)
}

/** All available themes */
const THEMES: Record<NeonTheme, ThemeConfig> = {
  "neon-blue": {
    name: "neon-blue",
    label: "Cyan Storm",
    primary: "#00f0ff",
    secondary: "#b000ff",
    glow: "rgba(0, 240, 255, 0.5)",
    gradient: "linear-gradient(135deg, #00f0ff, #b000ff)",
    emoji: "🔵",
  },
  "neon-purple": {
    name: "neon-purple",
    label: "Violet Surge",
    primary: "#b000ff",
    secondary: "#ff00e5",
    glow: "rgba(176, 0, 255, 0.5)",
    gradient: "linear-gradient(135deg, #b000ff, #ff00e5)",
    emoji: "🟣",
  },
  "neon-pink": {
    name: "neon-pink",
    label: "Magenta Rush",
    primary: "#ff00e5",
    secondary: "#ff6600",
    glow: "rgba(255, 0, 229, 0.5)",
    gradient: "linear-gradient(135deg, #ff00e5, #ff6600)",
    emoji: "🩷",
  },
  "neon-green": {
    name: "neon-green",
    label: "Toxic Drift",
    primary: "#39ff14",
    secondary: "#00f0ff",
    glow: "rgba(57, 255, 20, 0.5)",
    gradient: "linear-gradient(135deg, #39ff14, #00f0ff)",
    emoji: "🟢",
  },
  "neon-orange": {
    name: "neon-orange",
    label: "Blaze Trail",
    primary: "#ff6600",
    secondary: "#ff00e5",
    glow: "rgba(255, 102, 0, 0.5)",
    gradient: "linear-gradient(135deg, #ff6600, #ff00e5)",
    emoji: "🟠",
  },
};

/** Context value type */
interface ThemeContextType {
  /** Current active theme */
  theme: NeonTheme;
  /** Full config for the active theme */
  config: ThemeConfig;
  /** All available themes */
  themes: Record<NeonTheme, ThemeConfig>;
  /** Set a specific theme */
  setTheme: (theme: NeonTheme) => void;
  /** Cycle to the next theme */
  cycleTheme: () => void;
}

/** Create the context with a sensible default */
const ThemeContext = createContext<ThemeContextType>({
  theme: "neon-blue",
  config: THEMES["neon-blue"],
  themes: THEMES,
  setTheme: () => {},
  cycleTheme: () => {},
});

/** Custom hook to consume the theme context */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/** Provider props */
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: NeonTheme;
}

export default function ThemeProvider({
  children,
  defaultTheme = "neon-blue",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<NeonTheme>(defaultTheme);

  /** Set a specific theme and inject CSS variables */
  const setTheme = useCallback((newTheme: NeonTheme) => {
    setThemeState(newTheme);

    // ── Inject CSS custom properties into :root ──
    const config = THEMES[newTheme];
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", config.primary);
    root.style.setProperty("--theme-secondary", config.secondary);
    root.style.setProperty("--theme-glow", config.glow);
    root.style.setProperty("--theme-gradient", config.gradient);
  }, []);

  /** Cycle through themes in order */
  const cycleTheme = useCallback(() => {
    const themeKeys = Object.keys(THEMES) as NeonTheme[];
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  }, [theme, setTheme]);

  /** Memoize context value to prevent unnecessary re-renders */
  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      config: THEMES[theme],
      themes: THEMES,
      setTheme,
      cycleTheme,
    }),
    [theme, setTheme, cycleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}