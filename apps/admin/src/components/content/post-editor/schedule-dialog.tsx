"use client";

import * as React from "react";
import { format, addDays, addHours } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Label,
} from "@prosfin/ui";
import { Switch } from "@/components/shared/switch";
import { Calendar, Clock } from "lucide-react";

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (scheduledFor: string | null) => void;
  currentScheduledFor?: string;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  onConfirm,
  currentScheduledFor,
}: ScheduleDialogProps) {
  const [publishImmediately, setPublishImmediately] = React.useState(!currentScheduledFor);
  const [date, setDate] = React.useState(() => {
    if (currentScheduledFor) {
      return format(new Date(currentScheduledFor), "yyyy-MM-dd");
    }
    return format(addDays(new Date(), 1), "yyyy-MM-dd");
  });
  const [time, setTime] = React.useState(() => {
    if (currentScheduledFor) {
      return format(new Date(currentScheduledFor), "HH:mm");
    }
    return "08:00";
  });

  React.useEffect(() => {
    if (open && currentScheduledFor) {
      const scheduledDate = new Date(currentScheduledFor);
      setDate(format(scheduledDate, "yyyy-MM-dd"));
      setTime(format(scheduledDate, "HH:mm"));
      setPublishImmediately(false);
    } else if (open && !currentScheduledFor) {
      setPublishImmediately(true);
    }
  }, [open, currentScheduledFor]);

  const handleConfirm = () => {
    if (publishImmediately) {
      onConfirm(null);
    } else {
      const scheduledFor = new Date(`${date}T${time}:00`);
      const now = new Date();
      
      if (scheduledFor <= now) {
        alert("Cannot schedule in the past. Please select a future date and time.");
        return;
      }
      
      onConfirm(scheduledFor.toISOString());
    }
    onOpenChange(false);
  };

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Publication</DialogTitle>
          <DialogDescription>
            Choose when to publish this post. You can schedule it for later or publish immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="publish-immediately" className="cursor-pointer">
              Publish immediately
            </Label>
            <Switch
              id="publish-immediately"
              checked={publishImmediately}
              onCheckedChange={setPublishImmediately}
            />
          </div>

          {!publishImmediately && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="schedule-date" className="mb-2 flex items-center gap-2">
                  <Calendar className="size-4" />
                  Date
                </Label>
                <input
                  id="schedule-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={format(new Date(), "yyyy-MM-dd")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="schedule-time" className="mb-2 flex items-center gap-2">
                  <Clock className="size-4" />
                  Time
                </Label>
                <input
                  id="schedule-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="text-muted-foreground text-xs">
                Timezone: {timezone}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            {publishImmediately ? "Publish Now" : "Schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

