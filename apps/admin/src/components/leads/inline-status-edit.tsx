"use client";

import * as React from "react";
import { Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@prosfin/ui";
import { ChevronDown } from "lucide-react";
import type { Lead, LeadStatus } from "@/types/admin";
import { updateLeadStatus } from "@/lib/data/leads";
import { showToast } from "@/lib/toast";

interface InlineStatusEditProps {
  lead: Lead;
  onUpdate: (leadId: string, status: LeadStatus) => void;
}

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  meeting_scheduled: "bg-purple-100 text-purple-800",
  converted: "bg-gray-100 text-gray-800",
  lost: "bg-red-100 text-red-800",
};

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "meeting_scheduled", label: "Meeting Scheduled" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" },
];

export function InlineStatusEdit({ lead, onUpdate }: InlineStatusEditProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (newStatus === lead.status) {
      setIsOpen(false);
      return;
    }

    // Optimistic update
    onUpdate(lead.id, newStatus);

    try {
      await updateLeadStatus(lead.id, newStatus);
      showToast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      // Revert on error
      onUpdate(lead.id, lead.status);
      showToast.error("Failed to update status");
    }

    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity" suppressHydrationWarning>
          <Badge className={statusColors[lead.status]}>
            {lead.status}
          </Badge>
          <ChevronDown className="size-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className={option.value === lead.status ? "bg-muted" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

