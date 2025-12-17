"use client";

import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@prosfin/ui";
import { ChevronDown, User } from "lucide-react";
import type { Lead } from "@/types/admin";
import { updateLeadOwner } from "@/lib/data/leads";
import { showToast } from "@/lib/toast";

interface InlineOwnerEditProps {
  lead: Lead;
  onUpdate: (leadId: string, owner: string | undefined) => void;
}

const ownerOptions = ["You", "Admin", "Editor A", "Editor B"];

export function InlineOwnerEdit({ lead, onUpdate }: InlineOwnerEditProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOwnerChange = async (newOwner: string | undefined) => {
    if (newOwner === lead.owner) {
      setIsOpen(false);
      return;
    }

    // Optimistic update
    onUpdate(lead.id, newOwner);

    try {
      await updateLeadOwner(lead.id, newOwner);
      showToast.success(newOwner ? `Assigned to ${newOwner}` : "Unassigned");
    } catch (error) {
      // Revert on error
      onUpdate(lead.id, lead.owner);
      showToast.error("Failed to update owner");
    }

    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity text-sm" suppressHydrationWarning>
          {lead.owner ? (
            <>
              <User className="size-3" />
              <span>{lead.owner}</span>
            </>
          ) : (
            <span className="text-muted-foreground">Unassigned</span>
          )}
          <ChevronDown className="size-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => handleOwnerChange(undefined)}>
          <span className="text-muted-foreground">Unassigned</span>
        </DropdownMenuItem>
        {ownerOptions.map((owner) => (
          <DropdownMenuItem
            key={owner}
            onClick={() => handleOwnerChange(owner)}
            className={owner === lead.owner ? "bg-muted" : ""}
          >
            {owner}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

