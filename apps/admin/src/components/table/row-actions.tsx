"use client"

import { IconDotsVertical } from "@tabler/icons-react"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as React from "react"
import type { RowActionsProps } from "./types"

export function RowActions<TData>({
  row,
  actions = [],
  onAction,
}: RowActionsProps<TData>) {
  const [confirmAction, setConfirmAction] = React.useState<{
    action: string
    row: TData
  } | null>(null)

  const handleAction = (action: string) => {
    const actionConfig = actions.find((a) => a.action === action)

    if (actionConfig?.variant === "destructive") {
      setConfirmAction({ action, row })
    } else {
      onAction?.(action, row)
    }
  }

  const handleConfirm = () => {
    if (confirmAction) {
      onAction?.(confirmAction.action, confirmAction.row)
      setConfirmAction(null)
    }
  }

  if (actions.length === 0) {
    return null
  }

  const defaultActions = actions.filter((a) => a.variant !== "destructive")
  const destructiveActions = actions.filter((a) => a.variant === "destructive")

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          {defaultActions.map((action) => (
            <DropdownMenuItem
              key={action.action}
              onClick={() => handleAction(action.action)}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
          {destructiveActions.length > 0 && defaultActions.length > 0 && (
            <DropdownMenuSeparator />
          )}
          {destructiveActions.map((action) => (
            <DropdownMenuItem
              key={action.action}
              onClick={() => handleAction(action.action)}
              className="text-destructive"
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
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
