"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProsfinButton } from "@/components/shared/prosfin-button";

/**
 * Lead Form Schema
 */
const leadFormSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên (tối thiểu 2 ký tự)"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .regex(/^[0-9+\-\s()]+$/, "Số điện thoại không hợp lệ"),
  companyName: z.string().optional(),
  concern: z.string().min(1, "Vui lòng chọn mối quan tâm của bạn"),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface HeroLeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CONCERN_OPTIONS = [
  { value: "cash-flow", label: "Dòng tiền" },
  { value: "profit", label: "Lợi nhuận" },
  { value: "tax", label: "Thuế & kiểm soát" },
  { value: "other", label: "Khác" },
] as const;

/**
 * HeroLeadFormModal - Modal form để thu thập thông tin lead
 * 
 * Wrapper component sử dụng shadcn Dialog và Form.
 * Hiện tại chỉ log ra console, sau này sẽ kết nối với API.
 */
export function HeroLeadFormModal({
  open,
  onOpenChange,
}: HeroLeadFormModalProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      concern: "",
    },
  });

  const onSubmit = (data: LeadFormValues) => {
    // TODO: Connect to API endpoint /api/leads or Supabase
    console.log("Lead form submitted:", data);
    alert("Thông tin đã được ghi nhận (demo). Chúng tôi sẽ liên hệ với bạn sớm nhất!");
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đặt lịch tư vấn miễn phí</DialogTitle>
          <DialogDescription>
            Điền thông tin để chúng tôi có thể liên hệ và tư vấn cho bạn.
          </DialogDescription>
        </DialogHeader>

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
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
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
                    <Input placeholder="0901234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên doanh nghiệp</FormLabel>
                  <FormControl>
                    <Input placeholder="Công ty ABC" {...field} />
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
                    <select
                      {...field}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                    >
                      <option value="">-- Chọn --</option>
                      {CONCERN_OPTIONS.map((option) => (
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

            <div className="flex gap-3 pt-2">
              <ProsfinButton
                type="submit"
                brandVariant="primary"
                className="flex-1"
              >
                Gửi thông tin
              </ProsfinButton>
              <ProsfinButton
                type="button"
                brandVariant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </ProsfinButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

