"use client";

import * as React from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ProsfinPrimaryButton, ProsfinSecondaryButton } from "@/components/shared";
import { useLeadDraft } from "@/hooks/use-lead-draft";

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const safe = name.length <= 2 ? name : `${name.slice(0, 2)}***`;
  return `${safe}@${domain}`;
}

export function VerifyEmailPanel() {
  const { draft, hydrated, updateDraft } = useLeadDraft();
  const currentEmail = (draft?.email ?? "").trim();
  const [open, setOpen] = React.useState(false);
  const [nextEmail, setNextEmail] = React.useState(currentEmail);

  React.useEffect(() => {
    if (hydrated) setNextEmail(currentEmail);
  }, [hydrated, currentEmail]);

  const saveEmail = () => {
    const email = nextEmail.trim();
    if (!email) return;
    updateDraft({ email });
    setOpen(false);
  };

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Kiểm tra Gmail của bạn</h3>
        <p className="text-sm text-muted-foreground">
          ProsFIN sẽ gửi xác nhận và hướng dẫn tiếp theo tới:{" "}
          <span className="font-medium text-foreground">
            {currentEmail ? maskEmail(currentEmail) : "email bạn đã cung cấp"}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Nếu sau 5–10 phút chưa thấy email, hãy kiểm tra Spam/Quảng cáo.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:flex-1"
        >
          <ProsfinPrimaryButton className="w-full">Mở Gmail</ProsfinPrimaryButton>
        </a>

        <ProsfinSecondaryButton
          className="w-full sm:flex-1"
          type="button"
          onClick={() => setOpen(true)}
        >
          Đổi email
        </ProsfinSecondaryButton>
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        Hoặc{" "}
        <Link href="/contact-lite" className="text-primary underline underline-offset-2">
          điền lại form nhanh
        </Link>
        .
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Đổi email nhận hướng dẫn</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              type="email"
              value={nextEmail}
              onChange={(e) => setNextEmail(e.target.value)}
              placeholder="email@domain.com"
            />
            <ProsfinPrimaryButton className="w-full" type="button" onClick={saveEmail}>
              Lưu email
            </ProsfinPrimaryButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


