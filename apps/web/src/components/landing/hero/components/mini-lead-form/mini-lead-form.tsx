"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormTitle, ProsfinPrimaryButton, Text } from "@/components/shared";
import { useLeadDraft } from "@/hooks/use-lead-draft";
import { useAttribution } from "@/hooks/use-attribution";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { TurnstileField } from "@/components/shared/forms/turnstile-field";
import { FormSubmitStatus } from "@/components/shared/forms/form-submit-status";

const miniLeadSchema = z.object({
  fullName: z.string().min(2, "Họ tên cần ít nhất 2 ký tự"),
  email: z.string().min(1, "Vui lòng nhập email").email("Email không đúng định dạng"),
  phone: z
    .string()
    .min(10, "Số điện thoại cần ít nhất 10 số")
    .regex(/^[0-9+\-\s()]+$/, "Số điện thoại không hợp lệ"),
  concern: z.string().min(1, "Vui lòng nhập vấn đề bạn quan tâm"),
});

type MiniLeadValues = z.infer<typeof miniLeadSchema>;

export type MiniLeadFormMode = "modal" | "page";

export function MiniLeadForm({
  mode = "page",
  onSubmitted,
}: {
  mode?: MiniLeadFormMode;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const { draft, hydrated, updateDraft } = useLeadDraft();
  const { attribution } = useAttribution();
  const [turnstileToken, setTurnstileToken] = React.useState<string | undefined>();
  
  const { submit, isSubmitting, error, errorCode, retry } = useLeadSubmit({
    source: "hero_modal",
    attribution: attribution || undefined,
    onSuccess: (leadId) => {
      onSubmitted?.();
      router.push(`/onboarding/thanks?leadId=${leadId}`);
    },
  });

  const form = useForm<MiniLeadValues>({
    resolver: zodResolver(miniLeadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      concern: "",
    },
  });

  React.useEffect(() => {
    if (!hydrated) return;
    // Nếu user đã bắt đầu gõ trước khi hook hydrate xong, đừng overwrite.
    if (form.formState.isDirty) return;
    form.reset({
      fullName: draft?.fullName ?? "",
      email: draft?.email ?? "",
      phone: draft?.phone ?? "",
      concern: draft?.concern ?? "",
    });
    // chỉ hydrate 1 lần để tránh overwrite khi user đang gõ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const onSubmit = async (values: MiniLeadValues) => {
    updateDraft(values);
    
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      concern: values.concern,
    };

    await submit(payload, turnstileToken);
  };

  return (
    <div className={mode === "page" ? "mx-auto w-full max-w-xl" : "w-full"}>
      <div className="mb-6 space-y-2">
        {mode === "page" ? (
          <FormTitle>Gửi thông tin nhanh</FormTitle>
        ) : (
          <Text as="p" variant="large">
            Gửi thông tin nhanh
          </Text>
        )}
        <Text as="p" variant="muted">
          Chỉ mất 1–2 phút. ProsFIN sẽ dùng thông tin này để liên hệ và chuẩn bị buổi tư vấn.
        </Text>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
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
                  <Input type="email" placeholder="email@domain.com" {...field} />
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
                <FormLabel>Số điện thoại *</FormLabel>
                <FormControl>
                  <Input placeholder="090xxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="concern"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bạn đang lo nhất điều gì? *</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Ví dụ: dòng tiền luôn căng, khó kiểm soát chi phí..." {...field} />
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
            Gửi thông tin nhanh
          </ProsfinPrimaryButton>
        </form>
      </Form>
    </div>
  );
}


