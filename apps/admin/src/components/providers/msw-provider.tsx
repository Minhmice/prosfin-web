"use client"

import * as React from "react"
import { initMSW } from "@/lib/msw-init"

/**
 * MSW Provider
 * Initializes MSW worker on mount (client-side only)
 */
export function MSWProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Initialize MSW in development
    if (process.env.NODE_ENV === "development") {
      initMSW().catch(console.error)
    }
  }, [])

  return <>{children}</>
}

