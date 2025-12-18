"use client"

import * as React from "react"
import { IconTrash } from "@tabler/icons-react"

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
import { Button } from "@/components/ui/button"
import type { Table as TanStackTable } from "@tanstack/react-table"
import type { BulkBarProps } from "./types"

export function BulkBar<TData>({
  table,
  actions = [],
  onAction,
}: BulkBarProps<TData>) {
  const [confirmAction, setConfirmAction] = React.useState<{
    action: string
    rows: TData[]
  } | null>(null)

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedCount = selectedRows.length

  if (selectedCount === 0) {
    return null
  }

  const handleAction = (action: string) => {
    const rows = selectedRows.map((row) => row.original)
    const actionConfig = actions.find((a) => a.action === action)

    if (actionConfig?.variant === "destructive") {
      setConfirmAction({ action, rows })
    } else {
      onAction?.(action, rows)
    }
  }

  const handleConfirm = () => {
    if (confirmAction) {
      onAction?.(confirmAction.action, confirmAction.rows)
      setConfirmAction(null)
      table.resetRowSelection()
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2 lg:px-6">
        <span className="text-sm font-medium">
          {selectedCount} row(s) selected
        </span>
        <div className="ml-auto flex items-center gap-2">
          {actions.map((action) => (
            <Button
              key={action.action}
              variant={action.variant === "destructive" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleAction(action.action)}
            >
              {action.variant === "destructive" && <IconTrash className="mr-2 size-4" />}
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently affect{" "}
              {confirmAction?.rows.length} selected item(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
