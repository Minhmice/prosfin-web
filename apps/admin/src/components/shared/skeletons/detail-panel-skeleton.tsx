"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

interface DetailPanelSkeletonProps {
  /**
   * Show header section
   */
  showHeader?: boolean
  /**
   * Number of sections
   */
  sections?: number
}

/**
 * Detail Panel Skeleton component for loading states
 */
export function DetailPanelSkeleton({
  showHeader = true,
  sections = 3,
}: DetailPanelSkeletonProps) {
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      )}

      {Array.from({ length: sections }).map((_, i) => (
        <div key={i} className="space-y-3">
          {i > 0 && <Separator />}
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      ))}
    </div>
  )
}

