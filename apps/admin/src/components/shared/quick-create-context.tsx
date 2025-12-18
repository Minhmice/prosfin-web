"use client"

import * as React from "react"

interface QuickCreateContextValue {
  openNewLead: () => void
  openNewClient: () => void
  openNewPost: () => void
}

const QuickCreateContext = React.createContext<QuickCreateContextValue | null>(
  null
)

export function QuickCreateProvider({
  children,
  onNewLead,
  onNewClient,
  onNewPost,
}: {
  children: React.ReactNode
  onNewLead?: () => void
  onNewClient?: () => void
  onNewPost?: () => void
}) {
  const value = React.useMemo<QuickCreateContextValue>(
    () => ({
      openNewLead: () => onNewLead?.(),
      openNewClient: () => onNewClient?.(),
      openNewPost: () => onNewPost?.(),
    }),
    [onNewLead, onNewClient, onNewPost]
  )

  return (
    <QuickCreateContext.Provider value={value}>
      {children}
    </QuickCreateContext.Provider>
  )
}

export function useQuickCreate() {
  const context = React.useContext(QuickCreateContext)
  if (!context) {
    return {
      openNewLead: () => {},
      openNewClient: () => {},
      openNewPost: () => {},
    }
  }
  return context
}
