/* ══════════════════════════════════════════════
   UTILITY FUNCTIONS
   ══════════════════════════════════════════════ */

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/** Format speed with leading zeros */
export function formatSpeed(speed: number): string {
  return Math.floor(speed).toString().padStart(3, "0");
}

/** Concatenate class names (filter falsy) */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}