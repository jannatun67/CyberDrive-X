"use client";

import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════
   useMediaQuery Hook
   ─────────────────────────────────────────────
   Returns true if the viewport matches the query.
   Used for responsive 3D canvas adjustments.
   ══════════════════════════════════════════════ */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}