"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProsfinPrimaryButton, ProsfinSecondaryButton } from "@/components/shared";
import { useAttribution } from "@/hooks/use-attribution";
import { useLeadDraft, clearLeadDraft } from "@/hooks/use-lead-draft";
import { useProsfinToast } from "@/components/shared";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { TurnstileField } from "@/components/shared/forms/turnstile-field";
import { FormSubmitStatus } from "@/components/shared/forms/form-submit-status";
import { trackEvent } from "@/lib/analytics";
import {
  clearDataFormSchema,
  type ClearDataFormValues,
} from "./cleardata-form-schema";

export interface ClearDataFormProps {
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  privacyNote?: string;
  onBookCallClick?: () => void;
  className?: string;
  variant?: "default" | "compact";
}

const REVENUE_OPTIONS = [
  { value: "", label: "Chọn một" },
  { value: "lt-10b", label: "Dưới 10 tỷ" },
  { value: "10-50b", label: "10-50 tỷ" },
  { value: "50-200b", label: "50-200 tỷ" },
  { value: "gt-200b", label: "Trên 200 tỷ" },
];

/**
 * ClearDataForm - Form component cho ClearData service
 * 
 * Form thu thập lead với validation và redirect to thanks page.
 */
export function ClearDataForm({
  title = "Nhận Checklist CLEAR",
  description,
  primaryCtaLabel = "Nhận Checklist CLEAR",
  secondaryCtaLabel = "Đặt lịch tư vấn 15–30 phút",
  privacyNote,
  onBookCallClick,
  className,
  variant = "default",
}: ClearDataFormProps) {
  const router = useRouter();
  const toast = useProsfinToast();
  const { attribution } = useAttribution();
  const { draft, hydrated, updateDraft } = useLeadDraft();
  const [turnstileToken, setTurnstileToken] = React.useState<string | undefined>();
  
  const { submit, isSubmitting, error, errorCode, retry } = useLeadSubmit({
    source: "cleardata_lp",
    attribution: attribution || undefined,
    onSuccess: (leadId) => {
      clearLeadDraft();
      trackEvent("lead_checklist_submit", {
        hasPhone: !!form.getValues("phone"),
        hasEmail: !!form.getValues("email"),
        hasRevenueRange: !!form.getValues("revenueRange"),
      });
      router.push(`/services/cleardata/thanks?leadId=${leadId}`);
    },
    onError: (error) => {
      toast.toast({
        description: error.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "error",
      });
      trackEvent("form_error", { error: String(error) });
    },
  });

  const form = useForm<ClearDataFormValues>({
    resolver: zodResolver(clearDataFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      revenueRange: "",
    },
  });

  // Hydrate form from draft
  React.useEffect(() => {
    if (!hydrated) return;
    if (form.formState.isDirty) return;

    form.reset({
      fullName: draft?.fullName ?? "",
      phone: draft?.phone ?? "",
      email: draft?.email ?? "",
      revenueRange: draft?.revenueRange ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const onSubmit = async (data: ClearDataFormValues) => {
    // Update draft
    updateDraft({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      revenueRange: data.revenueRange as any,
    });

    const payload = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      revenueRange: data.revenueRange,
    };

    await submit(payload, turnstileToken);
  };

  const handleBookCallClick = () => {
    trackEvent("book_call_click");
    if (onBookCallClick) {
      onBookCallClick();
    }
  };

  const paddingClass = variant === "compact" ? "p-6" : "p-7";
  const spacingClass = variant === "compact" ? "space-y-3" : "space-y-4";

  return (
    <div className={`bg-card border-2 border-border rounded-2xl ${paddingClass} shadow-lg ${className || ""}`}>
      {title && (
        <h3 className={`${variant === "compact" ? "text-xl" : "text-2xl"} mb-${variant === "compact" ? "2" : "6"} font-bold`}>
          {title}
        </h3>
      )}

      {description && (
        <p className={`text-sm text-muted-foreground mb-${variant === "compact" ? "4" : "6"}`}>
          {description}
        </p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={spacingClass}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="VD: Nguyễn Văn A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SĐT hoặc Email</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="VD: 09…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hoặc email@…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="revenueRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quy mô doanh thu/năm</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {REVENUE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TurnstileField
            onVerify={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(undefined)}
            theme="auto"
            size="normal"
          />

          <FormSubmitStatus
            status={isSubmitting ? "submitting" : error ? "error" : "idle"}
            errorCode={errorCode || undefined}
            onRetry={retry}
          />

          <ProsfinPrimaryButton
            type="submit"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting || !turnstileToken}
          >
            {primaryCtaLabel}
          </ProsfinPrimaryButton>

          <button
            type="button"
            onClick={handleBookCallClick}
            className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors underline text-sm"
          >
            {secondaryCtaLabel}
          </button>

          {privacyNote && (
            <p className="text-xs text-muted-foreground leading-relaxed pt-2">
              {privacyNote}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}

