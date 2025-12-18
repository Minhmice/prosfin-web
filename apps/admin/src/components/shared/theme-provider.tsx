"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { defaultTheme } from "@/lib/themes"

const ACCENT_STORAGE_KEY = "admin-accent-theme"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [accent, setAccent] = React.useState<string>(defaultTheme.id)

  React.useEffect(() => {
    // Load accent from localStorage
    const stored = localStorage.getItem(ACCENT_STORAGE_KEY)
    if (stored) {
      setAccent(stored)
      document.documentElement.setAttribute("data-accent", stored)
    } else {
      document.documentElement.setAttribute("data-accent", defaultTheme.id)
    }
  }, [])

  const setAccentTheme = React.useCallback((themeId: string) => {
    setAccent(themeId)
    localStorage.setItem(ACCENT_STORAGE_KEY, themeId)
    document.documentElement.setAttribute("data-accent", themeId)
  }, [])

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider value={{ accent, setAccentTheme }}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  )
}

const ThemeContext = React.createContext<{
  accent: string
  setAccentTheme: (themeId: string) => void
}>({
  accent: defaultTheme.id,
  setAccentTheme: () => {},
})

export function useThemeAccent() {
  return React.useContext(ThemeContext)
}
