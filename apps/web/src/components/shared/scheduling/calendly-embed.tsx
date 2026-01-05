/**
 * Calendly Embed
 * 
 * Wrapper for Calendly embed with dynamic loading and performance optimization.
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CalendlyEmbedProps {
  url: string;
  mode?: "inline" | "popup-text" | "popup-widget";
  text?: string;
  className?: string;
  height?: string;
  onLoad?: () => void;
}

/**
 * CalendlyEmbed - Calendly scheduling embed
 * 
 * Supports inline embed and pop-up modes.
 * Dynamically loads Calendly script only when needed.
 */
export function CalendlyEmbed({
  url,
  mode = "inline",
  text = "Đặt lịch tư vấn",
  className,
  height = "700px",
  onLoad,
}: CalendlyEmbedProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(mode === "inline");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!shouldLoad || isLoaded) return;

    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [shouldLoad, isLoaded, onLoad]);

  React.useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    // Initialize Calendly widget
    if (mode === "inline" && (window as any).Calendly) {
      (window as any).Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      });
    }
  }, [isLoaded, mode, url]);

  const handlePopupClick = () => {
    if (!isLoaded) {
      setShouldLoad(true);
      // Wait for script to load
      setTimeout(() => {
        if ((window as any).Calendly) {
          if (mode === "popup-text") {
            (window as any).Calendly.initPopupWidget({
              url,
              text,
            });
          } else if (mode === "popup-widget") {
            (window as any).Calendly.initPopupWidget({
              url,
            });
          }
        }
      }, 100);
    } else {
      if (mode === "popup-text") {
        (window as any).Calendly.initPopupWidget({
          url,
          text,
        });
      } else if (mode === "popup-widget") {
        (window as any).Calendly.initPopupWidget({
          url,
        });
      }
    }
  };

  if (mode === "inline") {
    return (
      <div
        ref={containerRef}
        className={cn("calendly-inline-widget", className)}
        style={{ minHeight: height, width: "100%" }}
        data-url={url}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handlePopupClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      {text}
    </button>
  );
}

