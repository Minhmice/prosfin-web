/**
 * Bulk Assign Owner Dialog
 * Assign owner to multiple leads
 */

"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { OwnerCombobox } from "@/features/crm/clients/owner-combobox"
import type { Lead } from "../types"

interface BulkAssignOwnerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leads: Lead[]
  onConfirm: (ownerId: string | undefined) => Promise<void>
}

export function BulkAssignOwnerDialog({
  open,
  onOpenChange,
  leads,
  onConfirm,
}: BulkAssignOwnerDialogProps) {
  const [selectedOwner, setSelectedOwner] = React.useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setSelectedOwner(undefined)
    }
  }, [open])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm(selectedOwner)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Owner to {leads.length} Lead{leads.length !== 1 ? "s" : ""}</DialogTitle>
          <DialogDescription aria-describedby={undefined}>
            Select an owner to assign to the selected leads.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Owner</label>
            <OwnerCombobox
              value={selectedOwner}
              onValueChange={setSelectedOwner}
              placeholder="Select owner..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

