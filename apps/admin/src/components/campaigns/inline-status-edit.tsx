"use client";

import * as React from "react";
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@prosfin/ui";
import { ChevronDown } from "lucide-react";
import type { Campaign, CampaignStatus } from "@/types/admin";

interface InlineStatusEditProps {
  campaign: Campaign;
  onUpdate: (campaignId: string, status: CampaignStatus) => void;
  onNeedsNotes?: (campaignId: string, status: CampaignStatus) => void;
}

const statusColors: Record<CampaignStatus, string> = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-100 text-gray-800",
};

const statusOptions: { value: CampaignStatus; label: string; needsNotes: boolean }[] = [
  { value: "active", label: "Active", needsNotes: false },
  { value: "paused", label: "Paused", needsNotes: true },
  { value: "archived", label: "Archived", needsNotes: true },
];

export function InlineStatusEdit({ campaign, onUpdate, onNeedsNotes }: InlineStatusEditProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleStatusChange = (newStatus: CampaignStatus, needsNotes: boolean) => {
    if (newStatus === campaign.status) {
      setIsOpen(false);
      return;
    }

    if (needsNotes && onNeedsNotes) {
      onNeedsNotes(campaign.id, newStatus);
    } else {
      onUpdate(campaign.id, newStatus);
    }

    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          onClick={(e) => e.stopPropagation()}
          suppressHydrationWarning
        >
          <Badge className={statusColors[campaign.status]}>
            {campaign.status}
          </Badge>
          <ChevronDown className="size-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(option.value, option.needsNotes);
            }}
            className={option.value === campaign.status ? "bg-muted" : ""}
          >
            <Badge className={`mr-2 ${statusColors[option.value]}`}>
              {option.label}
            </Badge>
            {option.needsNotes && option.value !== campaign.status && (
              <span className="text-xs text-muted-foreground">(requires note)</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

