"use client";

import * as React from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@prosfin/ui";
import { Download, User, Tag, X } from "lucide-react";
import type { Lead, LeadStatus } from "@/types/admin";
import { showToast } from "@/lib/toast";

interface BulkActionsBarProps {
  selectedLeads: Lead[];
  onBulkStatusUpdate: (leadIds: string[], status: LeadStatus) => void;
  onBulkOwnerAssign: (leadIds: string[], owner: string | undefined) => void;
  onClearSelection: () => void;
}

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "meeting_scheduled", label: "Meeting Scheduled" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" },
];

const ownerOptions = ["You", "Admin", "Editor A", "Editor B"];

export function BulkActionsBar({
  selectedLeads,
  onBulkStatusUpdate,
  onBulkOwnerAssign,
  onClearSelection,
}: BulkActionsBarProps) {
  const [statusMenuOpen, setStatusMenuOpen] = React.useState(false);
  const [ownerMenuOpen, setOwnerMenuOpen] = React.useState(false);

  if (selectedLeads.length === 0) {
    return null;
  }

  const handleBulkStatus = (status: LeadStatus) => {
    const leadIds = selectedLeads.map((lead) => lead.id);
    onBulkStatusUpdate(leadIds, status);
    setStatusMenuOpen(false);
  };

  const handleBulkOwner = (owner: string | undefined) => {
    const leadIds = selectedLeads.map((lead) => lead.id);
    onBulkOwnerAssign(leadIds, owner);
    setOwnerMenuOpen(false);
  };

  const handleBulkExport = () => {
    // Placeholder
    showToast.info(`Exporting ${selectedLeads.length} lead(s)...`);
  };

  return (
    <div className="flex items-center justify-between rounded-md border bg-muted/50 px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {selectedLeads.length} selected
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="h-7"
        >
          <X className="mr-1 size-3" />
          Clear
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu open={statusMenuOpen} onOpenChange={setStatusMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7">
              <Tag className="mr-2 size-3" />
              Update Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleBulkStatus(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu open={ownerMenuOpen} onOpenChange={setOwnerMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7">
              <User className="mr-2 size-3" />
              Assign Owner
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleBulkOwner(undefined)}>
              <span className="text-muted-foreground">Unassigned</span>
            </DropdownMenuItem>
            {ownerOptions.map((owner) => (
              <DropdownMenuItem
                key={owner}
                onClick={() => handleBulkOwner(owner)}
              >
                {owner}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" onClick={handleBulkExport} className="h-7">
          <Download className="mr-2 size-3" />
          Export
        </Button>
      </div>
    </div>
  );
}

