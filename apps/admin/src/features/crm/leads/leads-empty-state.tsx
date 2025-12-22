/**
 * Leads Empty State
 */

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface LeadsEmptyStateProps {
  onNewLead?: () => void
}

export function LeadsEmptyState({ onNewLead }: LeadsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Plus className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No leads found</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        Get started by creating your first lead or adjusting your filters.
      </p>
      {onNewLead && (
        <Button onClick={onNewLead}>
          <Plus className="mr-2 size-4" />
          New Lead
        </Button>
      )}
    </div>
  )
}

