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
  Textarea,
  Label,
} from "@prosfin/ui";
import { updateCampaignStatus } from "@/lib/data/campaigns";
import { showToast } from "@/lib/toast";
import type { Campaign, CampaignStatus } from "@/types/admin";

interface StatusChangeDialogProps {
  campaign: Campaign | null;
  targetStatus: CampaignStatus | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChanged?: (campaignId: string, newStatus: CampaignStatus) => void;
}

export function StatusChangeDialog({
  campaign,
  targetStatus,
  open,
  onOpenChange,
  onStatusChanged,
}: StatusChangeDialogProps) {
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setNotes("");
    }
  }, [open]);

  if (!campaign || !targetStatus) {
    return null;
  }

  const requiresNotes = targetStatus === "paused" || targetStatus === "archived";

  const handleSubmit = async () => {
    if (requiresNotes && !notes.trim()) {
      showToast.error("Please provide a note for this status change");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateCampaignStatus(campaign.id, targetStatus, notes || undefined);
      onStatusChanged?.(campaign.id, targetStatus);
      showToast.success(`Campaign ${targetStatus}`);
      onOpenChange(false);
    } catch (error) {
      showToast.error("Failed to update status");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusLabels: Record<CampaignStatus, string> = {
    active: "Resume",
    paused: "Pause",
    archived: "Archive",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{statusLabels[targetStatus]} Campaign</DialogTitle>
          <DialogDescription>
            {targetStatus === "paused"
              ? "Pausing this campaign will stop it from being actively used. You can resume it later."
              : targetStatus === "archived"
              ? "Archiving this campaign will hide it from the default list. You can still access it via filters."
              : `Resume "${campaign.name}" to make it active again.`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div>
            <Label htmlFor="notes">
              Notes {requiresNotes && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                targetStatus === "paused"
                  ? "Why is this campaign being paused?"
                  : targetStatus === "archived"
                  ? "Why is this campaign being archived?"
                  : "Add a note (optional)"
              }
              rows={3}
              className="mt-2"
            />
            {requiresNotes && (
              <p className="text-xs text-muted-foreground mt-1">
                A note is required when {targetStatus === "paused" ? "pausing" : "archiving"} a campaign.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (requiresNotes && !notes.trim())}
            variant={targetStatus === "archived" ? "destructive" : "default"}
          >
            {isSubmitting ? "Updating..." : statusLabels[targetStatus]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

