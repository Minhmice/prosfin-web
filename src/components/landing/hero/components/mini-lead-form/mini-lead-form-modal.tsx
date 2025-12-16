"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MiniLeadForm } from "./mini-lead-form";

export function MiniLeadFormModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Đặt lịch tư vấn</DialogTitle>
          <DialogDescription>
            Gửi thông tin nhanh để ProsFIN liên hệ và hướng dẫn bước tiếp theo.
          </DialogDescription>
        </DialogHeader>
        <MiniLeadForm mode="modal" onSubmitted={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}


