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
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";
import { ProsfinGhostButton } from "@/components/shared/button/prosfin-ghost-button";
import { useProsfinToast } from "@/components/shared/toast/prosfin-toast-provider";
import { formContent } from "@/data/form-content";

/**
 * Lead Form Schema
 */
const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, formContent.leadForm.fields.fullName.errorMessages.minLength || "Họ tên cần ít nhất 2 ký tự"),
  email: z
    .string()
    .min(1, formContent.leadForm.fields.email.errorMessages.required || "Vui lòng nhập email")
    .email(formContent.leadForm.fields.email.errorMessages.invalid || "Email không đúng định dạng"),
  phone: z
    .string()
    .min(10, formContent.leadForm.fields.phone.errorMessages.minLength || "Số điện thoại cần ít nhất 10 số")
    .regex(
      /^[0-9+\-\s()]+$/,
      formContent.leadForm.fields.phone.errorMessages.pattern || "Số điện thoại không hợp lệ"
    ),
  companyName: z.string().optional(),
  concern: z.string().min(
    1,
    formContent.leadForm.fields.concern.errorMessages.required || "Vui lòng chọn vấn đề bạn quan tâm"
  ),
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
  const toast = useProsfinToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: Connect to API endpoint /api/leads or Supabase
      console.log("Lead form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.toast({
        description: formContent.leadForm.successMessage,
        variant: "success",
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.toast({
        description: formContent.leadForm.errorMessage,
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{formContent.leadForm.title}</DialogTitle>
          <DialogDescription>
            {formContent.leadForm.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formContent.leadForm.fields.fullName.label} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={formContent.leadForm.fields.fullName.placeholder}
                      {...field}
                    />
                  </FormControl>
                  {formContent.leadForm.fields.fullName.helperText && (
                    <p className="text-xs text-muted-foreground">
                      {formContent.leadForm.fields.fullName.helperText}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formContent.leadForm.fields.email.label} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={formContent.leadForm.fields.email.placeholder}
                      {...field}
                    />
                  </FormControl>
                  {formContent.leadForm.fields.email.helperText && (
                    <p className="text-xs text-muted-foreground">
                      {formContent.leadForm.fields.email.helperText}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formContent.leadForm.fields.phone.label} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={formContent.leadForm.fields.phone.placeholder}
                      {...field}
                    />
                  </FormControl>
                  {formContent.leadForm.fields.phone.helperText && (
                    <p className="text-xs text-muted-foreground">
                      {formContent.leadForm.fields.phone.helperText}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formContent.leadForm.fields.companyName.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        formContent.leadForm.fields.companyName.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  {formContent.leadForm.fields.companyName.helperText && (
                    <p className="text-xs text-muted-foreground">
                      {formContent.leadForm.fields.companyName.helperText}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="concern"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formContent.leadForm.fields.concern.label} *
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                    >
                      <option value="">
                        {formContent.leadForm.fields.concern.placeholder}
                      </option>
                      {CONCERN_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {formContent.leadForm.fields.concern.helperText && (
                    <p className="text-xs text-muted-foreground">
                      {formContent.leadForm.fields.concern.helperText}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <ProsfinPrimaryButton
                type="submit"
                className="flex-1"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {formContent.leadForm.submitButton}
              </ProsfinPrimaryButton>
              <ProsfinGhostButton
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {formContent.leadForm.cancelButton}
              </ProsfinGhostButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

