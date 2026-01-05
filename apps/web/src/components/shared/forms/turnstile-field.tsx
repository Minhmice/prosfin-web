/**
 * TurnstileField - Cloudflare Turnstile widget wrapper
 * 
 * Client component với dynamic script loading.
 * Support invisible/managed modes.
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TurnstileFieldProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "invisible";
  className?: string;
}

/**
 * TurnstileField - Cloudflare Turnstile widget
 */
export function TurnstileField({
  onVerify,
  onError,
  theme = "auto",
  size = "normal",
  className,
}: TurnstileFieldProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [widgetId, setWidgetId] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  React.useEffect(() => {
    if (!siteKey || isLoaded) return;

    // Load Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [siteKey, isLoaded]);

  React.useEffect(() => {
    if (!isLoaded || !containerRef.current || !siteKey) return;
    if (widgetId) return; // Already initialized

    // Initialize Turnstile widget
    const id = (window as any).turnstile?.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      size,
      callback: (token: string) => {
        onVerify(token);
      },
      "error-callback": () => {
        onError?.();
      },
    });

    if (id) {
      setWidgetId(id);
    }
  }, [isLoaded, siteKey, theme, size, onVerify, onError, widgetId]);

  // Cleanup widget on unmount
  React.useEffect(() => {
    return () => {
      if (widgetId && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetId);
      }
    };
  }, [widgetId]);

  if (!siteKey) {
    // In development, show placeholder if no site key
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={cn(
            "h-[65px] w-full rounded border border-dashed border-muted-foreground/50 flex items-center justify-center text-xs text-muted-foreground",
            className
          )}
        >
          [Turnstile - No site key configured]
        </div>
      );
    }
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn("turnstile-widget", className)}
      data-sitekey={siteKey}
    />
  );
}

