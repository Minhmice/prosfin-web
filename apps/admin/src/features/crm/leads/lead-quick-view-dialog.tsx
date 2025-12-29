/**
 * Lead Quick View Dialog
 * Read-only view with actions
 */

"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Lead } from "@prosfin/shared"

interface LeadQuickViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onEdit?: () => void
  onConvert?: () => void
}

function getSourceBadgeVariant(source: Lead["source"]) {
  switch (source) {
    case "website":
      return "default"
    case "referral":
      return "secondary"
    case "social":
      return "outline"
    default:
      return "outline"
  }
}

function getStatusBadgeVariant(status: Lead["status"]) {
  switch (status) {
    case "new":
      return "default"
    case "contacted":
      return "secondary"
    case "qualified":
      return "outline"
    case "converted":
      return "default"
    case "archived":
      return "destructive"
    default:
      return "outline"
  }
}

export function LeadQuickViewDialog({
  open,
  onOpenChange,
  lead,
  onEdit,
  onConvert,
}: LeadQuickViewDialogProps) {
  if (!lead) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{lead.name}</DialogTitle>
          <DialogDescription aria-describedby={undefined}>
            {lead.company}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Email:</span>{" "}
                  <span className="text-sm">{lead.email}</span>
                </div>
                {lead.phone && (
                  <div>
                    <span className="text-sm font-medium">Phone:</span>{" "}
                    <span className="text-sm">{lead.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Lead Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Source:</span>
                  <div className="mt-1">
                    <Badge variant={getSourceBadgeVariant(lead.source)}>{lead.source}</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Status:</span>
                  <div className="mt-1">
                    <Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge>
                  </div>
                </div>
                {lead.ownerName && (
                  <div>
                    <span className="text-sm font-medium">Owner:</span>
                    <div className="mt-1">
                      <span className="text-sm">{lead.ownerName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Activity</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>{" "}
                  <span>{format(lead.createdAt, "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last updated:</span>{" "}
                  <span>{format(lead.updatedAt, "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {onEdit && (
              <Button onClick={onEdit}>
                Edit
              </Button>
            )}
            {onConvert && (
              <Button variant="default" onClick={onConvert}>
                Convert to Client
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

