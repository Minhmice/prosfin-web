"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CardSkeletonProps {
  /**
   * Show description skeleton
   */
  showDescription?: boolean
  /**
   * Number of content lines
   */
  contentLines?: number
}

/**
 * Card Skeleton component for loading states
 */
export function CardSkeleton({
  showDescription = true,
  contentLines = 3,
}: CardSkeletonProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-3/4" />
        </CardTitle>
        {showDescription && (
          <CardDescription>
            <Skeleton className="h-4 w-full" />
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {Array.from({ length: contentLines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </CardContent>
    </Card>
  )
}

