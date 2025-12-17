/**
 * useAttribution - Hook để capture attribution data
 * 
 * Lưu attribution vào localStorage để dùng khi submit form.
 * Chuẩn bị cho Phase 3 khi có Leads DB.
 */

"use client";

import * as React from "react";

export interface AttributionData {
  landingPath: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  timestamp: string;
}

const ATTRIBUTION_KEY = "prosfin_attribution";

/**
 * useAttribution - Hook để capture và lưu attribution data
 * 
 * @example
 * ```tsx
 * const { attribution, captureAttribution } = useAttribution();
 * ```
 */
export function useAttribution() {
  const [attribution, setAttribution] = React.useState<AttributionData | null>(null);

  const captureAttribution = React.useCallback(() => {
    if (typeof window === "undefined") return;

    // Get UTM params from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get("utm_source") || undefined;
    const utm_medium = urlParams.get("utm_medium") || undefined;
    const utm_campaign = urlParams.get("utm_campaign") || undefined;
    const utm_content = urlParams.get("utm_content") || undefined;
    const utm_term = urlParams.get("utm_term") || undefined;

    const data: AttributionData = {
      landingPath: window.location.pathname,
      referrer: document.referrer || undefined,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
      setAttribution(data);
    } catch (error) {
      console.warn("Failed to save attribution to localStorage:", error);
    }
  }, []);

  const getAttribution = React.useCallback((): AttributionData | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(ATTRIBUTION_KEY);
      if (stored) {
        return JSON.parse(stored) as AttributionData;
      }
    } catch (error) {
      console.warn("Failed to read attribution from localStorage:", error);
    }

    return attribution;
  }, [attribution]);

  React.useEffect(() => {
    // Capture on mount
    captureAttribution();
  }, [captureAttribution]);

  const clearAttribution = React.useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(ATTRIBUTION_KEY);
      setAttribution(null);
    } catch (error) {
      console.warn("Failed to clear attribution from localStorage:", error);
    }
  }, []);

  return {
    attribution: attribution || getAttribution(),
    captureAttribution,
    getAttribution,
    clearAttribution,
  };
}

