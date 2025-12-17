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
  Label,
} from "@prosfin/ui";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (mode: "update" | "draft") => void;
}

export function PublishDialog({ open, onOpenChange, onConfirm }: PublishDialogProps) {
  const [mode, setMode] = React.useState<"update" | "draft">("update");

  const handleConfirm = () => {
    onConfirm(mode);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Published Post</DialogTitle>
          <DialogDescription>
            Choose how you want to handle changes to this published post.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={mode} onValueChange={(value) => setMode(value as "update" | "draft")}>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="update"
                value="update"
                checked={mode === "update"}
                onChange={() => setMode("update")}
                className="size-4"
              />
              <Label htmlFor="update" className="flex-1 cursor-pointer">
                <div className="font-medium">Update published immediately</div>
                <div className="text-muted-foreground text-sm">
                  Changes will be live on the published version right away.
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="draft"
                value="draft"
                checked={mode === "draft"}
                onChange={() => setMode("draft")}
                className="size-4"
              />
              <Label htmlFor="draft" className="flex-1 cursor-pointer">
                <div className="font-medium">Create draft revision</div>
                <div className="text-muted-foreground text-sm">
                  Create a new draft version. You can review and publish it later.
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

