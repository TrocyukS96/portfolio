"use client";

import { useEffect, useRef, useState } from "react";

interface UseSliderAutoplayOptions {
  enabled: boolean;
  onAdvance: () => void;
  interval?: number;
  pauseOnHover?: boolean;
}

export function useSliderAutoplay({
  enabled,
  onAdvance,
  interval = 3000,
  pauseOnHover = true,
}: UseSliderAutoplayOptions) {
  const [isPaused, setIsPaused] = useState(false);
  const onAdvanceRef = useRef(onAdvance);
  onAdvanceRef.current = onAdvance;

  useEffect(() => {
    if (!enabled || isPaused) return;

    const id = window.setInterval(() => {
      onAdvanceRef.current();
    }, interval);

    return () => window.clearInterval(id);
  }, [enabled, isPaused, interval]);

  const hoverHandlers = pauseOnHover
    ? {
        onMouseEnter: () => setIsPaused(true),
        onMouseLeave: () => setIsPaused(false),
        onFocusCapture: () => setIsPaused(true),
        onBlurCapture: () => setIsPaused(false),
      }
    : {};

  return { hoverHandlers };
}
