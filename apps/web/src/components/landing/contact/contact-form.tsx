"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ProsfinPrimaryButton, useProsfinToast } from "@/components/shared";
import { formContent } from "@/data/form-content";
import { useAttribution } from "@/hooks/use-attribution";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { TurnstileField } from "@/components/shared/forms/turnstile-field";
import { FormSubmitStatus } from "@/components/shared/forms/form-submit-status";
import { contactFormSchema, type ContactFormValues } from "./contact-form/schema";
import { ContactFormFieldsBasic } from "./contact-form/fields-basic";
import { ContactFormFieldsExtra } from "./contact-form/fields-extra";

export interface ContactFormProps {
  /**
   * Submit handler
   */
  onSubmit?: (data: ContactFormValues) => void;
  /**
   * Submit button label
   * @default "Đặt lịch tư vấn"
   */
  submitLabel?: string;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ContactForm - Form component cho Contact Section
 * 
 * Component riêng của Contact Section.
 * Form đơn giản với validation.
 */
export function ContactForm({
  onSubmit,
  submitLabel = "Đặt lịch tư vấn",
  className,
}: ContactFormProps) {
  const toast = useProsfinToast();
  const { attribution } = useAttribution();
  const [turnstileToken, setTurnstileToken] = React.useState<string | undefined>();
  
  const { submit, isSubmitting, error, errorCode, retry } = useLeadSubmit({
    source: "contact_page",
    attribution: attribution || undefined,
    onSuccess: () => {
      toast.toast({
        description: formContent.contactForm.successMessage,
        variant: "success",
      });
      // Don't reset form - keep message for user to copy
    },
    onError: () => {
      toast.toast({
        description: formContent.contactForm.errorMessage,
        variant: "error",
      });
    },
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      concern: "",
    },
  });

  const handleSubmit = async (data: ContactFormValues) => {
    if (onSubmit) {
      await Promise.resolve(onSubmit(data));
      return;
    }

    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      concern: data.concern,
    };

    await submit(payload, turnstileToken);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={className}
      >
        <div className="space-y-4">
          <ContactFormFieldsBasic control={form.control} />
          <ContactFormFieldsExtra control={form.control} />

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
            size="lg"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting || !turnstileToken}
          >
            {submitLabel}
          </ProsfinPrimaryButton>
        </div>
      </form>
    </Form>
  );
}

