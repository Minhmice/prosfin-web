/**
 * ToolLeadMagnetCta - Lead magnet CTA for tool
 * 
 * Opens modal form (reuse Hero modal pattern) and saves lead + tool context.
 */

"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ToolDefinition, ToolInput, ToolResult } from "@/types/tools";
import type { Lead } from "@/types/leads";
import { saveLead } from "@/lib/leads/local-leads-store";
import { exportReportPDF } from "@/lib/leads/export";
import { useAttribution } from "@/hooks/use-attribution";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { TurnstileField } from "@/components/shared/forms/turnstile-field";
import { FormSubmitStatus } from "@/components/shared/forms/form-submit-status";
import { trackToolEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { useProsfinToast } from "@/components/shared";

interface ToolLeadMagnetCtaProps {
  tool: ToolDefinition;
  result: ToolResult;
  input: ToolInput;
}

const leadFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

/**
 * ToolLeadMagnetCta - Lead magnet CTA
 */
export function ToolLeadMagnetCta({
  tool,
  result,
  input,
}: ToolLeadMagnetCtaProps) {
  const [open, setOpen] = React.useState(false);
  const [turnstileToken, setTurnstileToken] = React.useState<string | undefined>();
  const toast = useProsfinToast();
  const { attribution } = useAttribution();
  
  const { submit, isSubmitting, error, errorCode, retry } = useLeadSubmit({
    source: "tool_lead_magnet",
    attribution: attribution || undefined,
    onSuccess: (leadId) => {
      // Still save to localStorage for Phase 5 compatibility
      const lead: Lead = {
        id: leadId,
        createdAt: new Date().toISOString(),
        source: "tool",
        attribution: {
          source: "tool",
          toolSlug: tool.slug,
        },
        context: {
          toolSlug: tool.slug,
          inputs: input,
          outputs: {
            metrics: result.metrics.map((m) => ({
              name: m.name,
              value: m.value,
            })),
            flags: result.flags.map((f) => ({
              type: f.type,
              message: f.message,
            })),
          },
        },
        contact: form.getValues(),
        status: "new",
      };
      saveLead(lead);
      
      // Export PDF
      exportReportPDF(result, lead);
      
      trackToolEvent(AnalyticsEvent.TOOL_LEAD_MAGNET_COMPLETED, {
        toolSlug: tool.slug,
        leadId,
      });
      
      toast.toast({
        description: "Đã tải báo cáo chi tiết. Kiểm tra email của bạn!",
        variant: "success",
      });
      
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.toast({
        description: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
        variant: "error",
      });
    },
  });

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const handleOpen = () => {
    setOpen(true);
    trackToolEvent(AnalyticsEvent.TOOL_LEAD_MAGNET_OPENED, {
      toolSlug: tool.slug,
    });
  };

  const handleSubmit = async (values: LeadFormValues) => {
    const payload = {
      fullName: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company,
      toolContext: {
        toolSlug: tool.slug,
        inputs: input,
        outputs: {
          metrics: result.metrics.map((m) => ({
            name: m.name,
            value: m.value,
          })),
          flags: result.flags.map((f) => ({
            type: f.type,
            message: f.message,
          })),
        },
      },
    };

    await submit(payload, turnstileToken);
  };

  return (
    <>
      <div className="rounded-lg border bg-muted p-6 text-center">
        <h3 className="text-xl font-bold">Tải báo cáo chi tiết</h3>
        <p className="text-muted-foreground mt-2">
          Điền thông tin để nhận báo cáo PDF chi tiết với phân tích đầy đủ
        </p>
        <Button onClick={handleOpen} className="mt-4" size="lg">
          Tải báo cáo miễn phí
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tải báo cáo chi tiết</DialogTitle>
            <DialogDescription>
              Điền thông tin để nhận báo cáo PDF với phân tích đầy đủ về kết quả
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn Văn A" {...field} />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
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
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="0901234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Công ty</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên công ty" {...field} />
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

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting || !turnstileToken}
                >
                  {isSubmitting ? "Đang tải..." : "Tải báo cáo"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

