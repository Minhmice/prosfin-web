"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuickCreate } from "@/components/shared/quick-create-context"

/**
 * Quick Actions dropdown - Create new entities
 */
export function QuickActions() {
  const { openNewLead, openNewClient, openNewPost } = useQuickCreate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="default">
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Create</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Create New</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openNewLead}>
          <span>Lead</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openNewClient}>
          <span>Client</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openNewPost}>
          <span>Post</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <span>Schedule</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <span>Task</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

