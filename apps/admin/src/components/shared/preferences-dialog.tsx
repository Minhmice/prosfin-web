"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThemePicker } from "./theme-picker";
import { useThemeAccent } from "./theme-provider";
import { defaultTheme } from "@/lib/themes";

interface PreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PreferencesDialog({
  open,
  onOpenChange,
}: PreferencesDialogProps) {
  const { theme, setTheme } = useTheme();
  const { accent, setAccentTheme } = useThemeAccent();

  const handleReset = () => {
    setTheme("system");
    setAccentTheme(defaultTheme.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>
            Customize your theme and appearance settings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>Mode</Label>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="font-normal cursor-pointer">
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="font-normal cursor-pointer">
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="font-normal cursor-pointer">
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Separator />
          <div className="space-y-3">
            <Label>Accent Color</Label>
            <ThemePicker />
          </div>
          <Separator />
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
