"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ProsfinPrimaryButton, useProsfinToast } from "@/components/shared";
import { formContent } from "@/data/form-content";
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
          <ContactFormFieldsBasic control={form.control} />
          <ContactFormFieldsExtra control={form.control} />

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

