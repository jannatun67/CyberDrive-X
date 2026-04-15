/* ══════════════════════════════════════════════
   TYPE DEFINITIONS
   ══════════════════════════════════════════════ */

/** Control keys state for driving the car */
export interface ControlKeys {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  nitro: boolean;  // Shift key
  brake: boolean;  // Space key
}

/** Game state for the HUD display */
export interface GameState {
  speed: number;       // 0 - 320 km/h
  gear: number;        // 1 - 6
  nitro: number;       // 0 - 100 (percentage)
  rpm: number;         // 0 - 9000
  isEngineOn: boolean;
}

/** Feature card data */
export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: string;  // Image URL
  gradient: string;
}

/** Car spec data */
export interface CarSpec {
  label: string;
  value: string;
  unit: string;
  barPercent: number;
}

/** Gallery item */
export interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

/** Nav link */
export interface NavLink {
  label: string;
  href: string;
}