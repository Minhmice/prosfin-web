"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  RadioGroup,
  RadioGroupItem,
  Label,
} from "@prosfin/ui";
import { updateLeadStatus } from "@/lib/data/leads";
import { showToast } from "@/lib/toast";
import type { Lead, LeadStatus } from "@/types/admin";

interface StatusChangeDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChanged?: (leadId: string, newStatus: LeadStatus) => void;
}

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "meeting_scheduled", label: "Meeting Scheduled" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" },
];

export function StatusChangeDialog({
  lead,
  open,
  onOpenChange,
  onStatusChanged,
}: StatusChangeDialogProps) {
  const [selectedStatus, setSelectedStatus] = React.useState<LeadStatus>(lead.status);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setSelectedStatus(lead.status);
    }
  }, [open, lead.status]);

  const handleSubmit = async () => {
    if (selectedStatus === lead.status) {
      onOpenChange(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateLeadStatus(lead.id, selectedStatus);
      onStatusChanged?.(lead.id, selectedStatus);
      showToast.success(`Status updated to ${selectedStatus}`);
      onOpenChange(false);
    } catch (error) {
      showToast.error("Failed to update status");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
          <DialogDescription>
            Update the status for {lead.name}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value as LeadStatus)}
          >
            {statusOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

