/**
 * useConsent - Hook for managing cookie consent state
 * 
 * Manages consent status (granted/denied/pending) with localStorage persistence.
 */

"use client";

import * as React from "react";

export type ConsentStatus = "granted" | "denied" | "pending";

const CONSENT_KEY = "prosfin-cookie-consent";

/**
 * useConsent - Hook to manage consent state
 * 
 * @returns { status, setConsent, hasConsent }
 */
export function useConsent() {
  const [status, setStatus] = React.useState<ConsentStatus>("pending");

  // Read consent from localStorage on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "granted") {
        setStatus("granted");
      } else if (stored === "denied") {
        setStatus("denied");
      } else {
        setStatus("pending");
      }
    } catch (error) {
      console.warn("Failed to read consent from localStorage:", error);
      setStatus("pending");
    }
  }, []);

  // Set consent status
  const setConsent = React.useCallback((newStatus: ConsentStatus) => {
    if (typeof window === "undefined") return;

    try {
      if (newStatus === "pending") {
        localStorage.removeItem(CONSENT_KEY);
      } else {
        localStorage.setItem(CONSENT_KEY, newStatus);
      }
      setStatus(newStatus);
    } catch (error) {
      console.warn("Failed to save consent to localStorage:", error);
    }
  }, []);

  // Check if consent is granted
  const hasConsent = React.useMemo(() => {
    return status === "granted";
  }, [status]);

  return {
    status,
    setConsent,
    hasConsent,
  };
}

