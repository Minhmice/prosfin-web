"use client";

import * as React from "react";
import { ProsfinPrimaryButton, ProsfinGhostButton } from "@/components/shared";
import { formContent } from "@/data/form-content";

export function LeadFormActions({
  isSubmitting,
  onCancel,
}: {
  isSubmitting: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      <ProsfinPrimaryButton
        type="submit"
        className="w-full min-h-[44px] sm:flex-1"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {formContent.leadForm.submitButton}
      </ProsfinPrimaryButton>
      <ProsfinGhostButton
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="hidden sm:block"
      >
        {formContent.leadForm.cancelButton}
      </ProsfinGhostButton>
    </div>
  );
}


