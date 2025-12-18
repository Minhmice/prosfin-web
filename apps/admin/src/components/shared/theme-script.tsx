"use client"

import { useEffect } from "react"
import { defaultTheme } from "@/lib/themes"

const ACCENT_STORAGE_KEY = "admin-accent-theme"

export function ThemeScript() {
  useEffect(() => {
    // Set accent before paint to avoid flash
    const stored = localStorage.getItem(ACCENT_STORAGE_KEY)
    const accent = stored || defaultTheme.id
    document.documentElement.setAttribute("data-accent", accent)
  }, [])

  return null
}
