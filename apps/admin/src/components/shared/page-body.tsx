"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PageBodyProps {
  children: React.ReactNode
  className?: string
}

export function PageBody({ children, className }: PageBodyProps) {
  return (
    <div className={cn("space-y-6 px-4 md:px-6", className)}>
      {children}
    </div>
  )
}
