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
import type { Lead } from "../types"

const LEAD_STAGES: Lead["stage"][] = ["new", "qualified", "proposal", "won", "lost"]

interface BulkSetStageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leads: Lead[]
  onConfirm: (stage: Lead["stage"]) => Promise<void>
}

export function BulkSetStageDialog({
  open,
  onOpenChange,
  leads,
  onConfirm,
}: BulkSetStageDialogProps) {
  const [selectedStage, setSelectedStage] = React.useState<Lead["stage"] | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setSelectedStage(undefined)
    }
  }, [open])

  const handleConfirm = async () => {
    if (!selectedStage) return
    setIsLoading(true)
    try {
      await onConfirm(selectedStage)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Stage for {leads.length} Lead{leads.length !== 1 ? "s" : ""}</DialogTitle>
          <DialogDescription aria-describedby={undefined}>
            Select a stage to set for the selected leads.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Stage</label>
            <Select
              value={selectedStage || ""}
              onValueChange={(value) => setSelectedStage(value as Lead["stage"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage..." />
              </SelectTrigger>
              <SelectContent>
                {LEAD_STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
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
          <Button onClick={handleConfirm} disabled={isLoading || !selectedStage}>
            {isLoading ? "Setting..." : "Set Stage"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

