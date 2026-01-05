"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface ListSkeletonProps {
  /**
   * Number of items to show
   */
  items?: number
  /**
   * Show avatar skeleton
   */
  showAvatar?: boolean
}

/**
 * List Skeleton component for loading states
 */
export function ListSkeleton({ items = 5, showAvatar = false }: ListSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          {showAvatar && <Skeleton className="h-10 w-10 rounded-full" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

