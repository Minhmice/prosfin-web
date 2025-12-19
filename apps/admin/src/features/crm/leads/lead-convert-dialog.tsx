/**
 * Lead Convert Dialog
 * Confirmation dialog for converting lead to client
 */

"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Lead } from "@/features/crm/types"

interface LeadConvertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onConfirm: () => void
}

export function LeadConvertDialog({
  open,
  onOpenChange,
  lead,
  onConfirm,
}: LeadConvertDialogProps) {
  if (!lead) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Convert Lead to Client?</AlertDialogTitle>
          <AlertDialogDescription aria-describedby={undefined}>
            This will create a new client from lead <strong>{lead.name}</strong> at{" "}
            <strong>{lead.company}</strong>. The lead will be marked as "won" and you will be
            redirected to the client page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Convert</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

