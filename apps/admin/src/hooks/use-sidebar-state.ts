/**
 * Sidebar State Hook
 * 
 * Persists sidebar collapsed state in localStorage.
 */

"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "prosfin-sidebar-collapsed";

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setCollapsed(stored === "true");
      }
    } catch (error) {
      // Ignore localStorage errors (e.g., in SSR)
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save to localStorage when collapsed changes
  const updateCollapsed = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    try {
      localStorage.setItem(STORAGE_KEY, String(newCollapsed));
    } catch (error) {
      // Ignore localStorage errors
    }
  };

  return {
    collapsed,
    setCollapsed: updateCollapsed,
    hydrated,
  };
}

