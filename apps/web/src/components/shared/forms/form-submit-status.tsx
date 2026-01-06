/**
 * FormSubmitStatus - Unified loading/success/error UI pattern
 * 
 * Map error codes → user-friendly messages (VN).
 */

"use client";

import * as React from "react";
import { AppAlert, AppAlertDescription } from "@/components/shared/alert";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { getErrorMessage } from "@/lib/leads/error-codes";
import { cn } from "@/lib/utils";

export type FormSubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

interface FormSubmitStatusProps {
  status: FormSubmitStatus;
  errorCode?: string;
  errorMessage?: string;
  onRetry?: () => void;
  successMessage?: string;
  className?: string;
}

/**
 * FormSubmitStatus - Display form submission status
 */
export function FormSubmitStatus({
  status,
  errorCode,
  errorMessage,
  onRetry,
  successMessage = "Đã gửi thành công!",
  className,
}: FormSubmitStatusProps) {
  if (status === "idle") {
    return null;
  }

  if (status === "submitting") {
    return (
      <AppAlert className={cn("border-muted", className)}>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AppAlertDescription>Đang gửi...</AppAlertDescription>
      </AppAlert>
    );
  }

  if (status === "success") {
    return (
      <AppAlert className={cn("border-green-500 bg-green-50 dark:bg-green-950", className)}>
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AppAlertDescription className="text-green-800 dark:text-green-200">
          {successMessage}
        </AppAlertDescription>
      </AppAlert>
    );
  }

  if (status === "error") {
    const message =
      errorMessage ||
      (errorCode ? getErrorMessage(errorCode) : "Có lỗi xảy ra. Vui lòng thử lại.");

    return (
      <AppAlert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AppAlertDescription>{message}</AppAlertDescription>
        {onRetry && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2"
          >
            Thử lại
          </Button>
        )}
      </AppAlert>
    );
  }

  return null;
}

