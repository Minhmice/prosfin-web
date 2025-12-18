"use client";

import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

const SIDEBAR_STORAGE_KEY = "sidebar_state";

export function useSidebarState() {
  const { open, setOpen, state } = useSidebar();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) {
      const shouldOpen = stored === "true";
      if (shouldOpen !== open) {
        setOpen(shouldOpen);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Save to localStorage when state changes (after hydration)
    if (isHydrated) {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, open.toString());
    }
  }, [open, isHydrated]);

  return {
    open,
    setOpen,
    state,
    isHydrated,
  };
}
