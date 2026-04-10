/**
 * @file useNarrator.ts
 * @description Custom hook for the companion narrator system.
 *
 * Provides:
 *   - narratorText: current text to display
 *   - setNarratorText: manual override
 *   - handleMouseOver: event handler to attach to container divs
 */

import { useState, useCallback } from "react";

const DEFAULT_TEXT = "Welcome, traveler. Hover over anything to learn more...";

export function useNarrator(defaultText: string = DEFAULT_TEXT) {
  const [narratorText, setNarratorText] = useState(defaultText);

  const handleMouseOver = useCallback((e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest("[data-narrator]");
    if (target) {
      const text = target.getAttribute("data-narrator");
      if (text) setNarratorText(text);
    }
  }, []);

  return { narratorText, setNarratorText, handleMouseOver };
}
