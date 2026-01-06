"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { rfpFormSchema, type RfpFormValues } from "@/lib/rfp/rfp.schema";
import { parseServiceFromQuery } from "@/lib/rfp/rfp.utils";
import { useAttribution } from "@/hooks/use-attribution";
import { RfpFields } from "./rfp-fields";
import { RfpUpload } from "./rfp-upload";
import { RfpTerms } from "./rfp-terms";
import { ProsfinPrimaryButton } from "@/components/shared";
import { useProsfinToast } from "@/components/shared/toast/toast-provider";

export interface RfpFormProps {
  preselectedService?: string;
  className?: string;
}

/**
 * RfpForm - Main RFP form component
 * 
 * Handles form submission, validation, and file upload.
 */
export function RfpForm({ preselectedService, className }: RfpFormProps) {
  const router = useRouter();
  const toast = useProsfinToast();
  const { attribution } = useAttribution();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<RfpFormValues>({
    resolver: zodResolver(rfpFormSchema),
    defaultValues: {
      service: preselectedService || "",
      title: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      phone: "",
      companyLocation: "",
      industry: "",
      companyName: "",
      yearlyRevenue: "",
      attachment: undefined,
      comments: "",
      acceptTerms: false,
      honeypot: "", // Anti-spam
    },
  });

  const onSubmit = async (data: RfpFormValues) => {
    // Anti-spam: check honeypot
    if (data.honeypot) {
      console.warn("Honeypot field filled - potential spam");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Build FormData for multipart upload
      const formData = new FormData();
      
      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "attachment" && value instanceof File) {
          formData.append("attachment", value);
        } else if (key !== "attachment" && key !== "honeypot") {
          formData.append(key, value === undefined || value === null ? "" : String(value));
        }
      });

      // Add metadata
      if (attribution) {
        formData.append("sourcePath", attribution.landingPath || window.location.pathname);
        formData.append("referrer", attribution.referrer || "");
        formData.append("utm_source", attribution.utm_source || "");
        formData.append("utm_medium", attribution.utm_medium || "");
        formData.append("utm_campaign", attribution.utm_campaign || "");
        formData.append("utm_content", attribution.utm_content || "");
        formData.append("utm_term", attribution.utm_term || "");
      } else {
        formData.append("sourcePath", window.location.pathname);
        formData.append("referrer", document.referrer || "");
      }

      // Submit to API
      const response = await fetch("/api/rfp", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Có lỗi xảy ra khi gửi yêu cầu");
      }

      const result = await response.json();
      
      // Redirect to thank-you page
      router.push(`/request-proposal/thanks?submissionId=${result.submissionId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi gửi yêu cầu";
      setError(errorMessage);
      toast.toast({
        description: errorMessage,
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {/* Hidden honeypot field */}
        <input
          type="text"
          {...form.register("honeypot")}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="space-y-6">
          <RfpFields control={form.control} preselectedService={preselectedService} />
          <RfpUpload />
          <RfpTerms />

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          <ProsfinPrimaryButton
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu đề xuất"}
          </ProsfinPrimaryButton>
        </div>
      </form>
    </Form>
  );
}

