/**
 * Bulk Set Stage Dialog
 * Set stage for multiple leads
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Lead } from "@prosfin/shared"

const LEAD_STATUSES: Lead["status"][] = ["new", "contacted", "qualified", "converted", "archived"]

interface BulkSetStageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leads: Lead[]
  onConfirm: (status: Lead["status"]) => Promise<void>
}

export function BulkSetStageDialog({
  open,
  onOpenChange,
  leads,
  onConfirm,
}: BulkSetStageDialogProps) {
  const [selectedStatus, setSelectedStatus] = React.useState<Lead["status"] | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setSelectedStatus(undefined)
    }
  }, [open])

  const handleConfirm = async () => {
    if (!selectedStatus) return
    setIsLoading(true)
    try {
      await onConfirm(selectedStatus)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Status for {leads.length} Lead{leads.length !== 1 ? "s" : ""}</DialogTitle>
          <DialogDescription aria-describedby={undefined}>
            Select a status to set for the selected leads.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={selectedStatus || ""}
              onValueChange={(value) => setSelectedStatus(value as Lead["status"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent>
                {LEAD_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <Button onClick={handleConfirm} disabled={isLoading || !selectedStatus}>
            {isLoading ? "Setting..." : "Set Status"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

