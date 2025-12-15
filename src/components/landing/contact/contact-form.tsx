"use client";

import * as React from "react";
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
import { ProsfinPrimaryButton } from "@/components/shared/button/prosfin-primary-button";
import { useProsfinToast } from "@/components/shared/toast/prosfin-toast-provider";
import { formContent } from "@/data/form-content";

const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, formContent.contactForm.fields.fullName.errorMessages.minLength || "Họ tên cần ít nhất 2 ký tự"),
  email: z
    .string()
    .min(1, formContent.contactForm.fields.email.errorMessages.required || "Vui lòng nhập email")
    .email(formContent.contactForm.fields.email.errorMessages.invalid || "Email không đúng định dạng"),
  phone: z
    .string()
    .min(10, formContent.contactForm.fields.phone.errorMessages.minLength || "Số điện thoại cần ít nhất 10 số")
    .regex(
      /^[0-9+\-\s()]+$/,
      formContent.contactForm.fields.phone.errorMessages.pattern || "Số điện thoại không hợp lệ"
    ),
  company: z.string().optional(),
  concern: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await Promise.resolve(onSubmit(data));
      } else {
        // Default: simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Contact form submitted:", data);
      }
      
      toast.toast({
        description: formContent.contactForm.successMessage,
        variant: "success",
      });
      
      form.reset();
    } catch (error) {
      toast.toast({
        description: formContent.contactForm.errorMessage,
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={className}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formContent.contactForm.fields.fullName.label} *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={formContent.contactForm.fields.fullName.placeholder}
                    {...field}
                  />
                </FormControl>
                {formContent.contactForm.fields.fullName.helperText && (
                  <p className="text-xs text-muted-foreground">
                    {formContent.contactForm.fields.fullName.helperText}
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
                  {formContent.contactForm.fields.email.label} *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={formContent.contactForm.fields.email.placeholder}
                    {...field}
                  />
                </FormControl>
                {formContent.contactForm.fields.email.helperText && (
                  <p className="text-xs text-muted-foreground">
                    {formContent.contactForm.fields.email.helperText}
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
                  {formContent.contactForm.fields.phone.label} *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={formContent.contactForm.fields.phone.placeholder}
                    {...field}
                  />
                </FormControl>
                {formContent.contactForm.fields.phone.helperText && (
                  <p className="text-xs text-muted-foreground">
                    {formContent.contactForm.fields.phone.helperText}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formContent.contactForm.fields.company.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={formContent.contactForm.fields.company.placeholder}
                    {...field}
                  />
                </FormControl>
                {formContent.contactForm.fields.company.helperText && (
                  <p className="text-xs text-muted-foreground">
                    {formContent.contactForm.fields.company.helperText}
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
                  {formContent.contactForm.fields.concern.label}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={formContent.contactForm.fields.concern.placeholder}
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                {formContent.contactForm.fields.concern.helperText && (
                  <p className="text-xs text-muted-foreground">
                    {formContent.contactForm.fields.concern.helperText}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <ProsfinPrimaryButton
            type="submit"
            size="lg"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {submitLabel}
          </ProsfinPrimaryButton>
        </div>
      </form>
    </Form>
  );
}

