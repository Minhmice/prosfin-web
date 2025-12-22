"use client";

import * as React from "react";

/**
 * Hook to detect if device is mobile
 * 
 * Uses window.matchMedia to detect screen width < 768px (md breakpoint)
 */
export function useMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
}

