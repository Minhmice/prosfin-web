"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useProsfinToast } from "@/components/shared";
import { formContent } from "@/data/form-content";
import { LeadFormActions } from "./lead-form-actions";
import { LeadFormFields } from "./lead-form-fields";
import { leadFormSchema, type LeadFormValues } from "./schema";

interface HeroLeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * HeroLeadFormModal - Modal form thu thập lead (tách thành component con để dễ đọc & <200 lines/file).
 */
export function HeroLeadFormModal({ open, onOpenChange }: HeroLeadFormModalProps) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.toast({
        description: formContent.leadForm.successMessage,
        variant: "success",
      });

      form.reset();
      onOpenChange(false);
    } catch {
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
      <DialogContent className="max-w-none h-screen max-h-screen flex flex-col p-4 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] sm:max-w-md sm:h-auto sm:max-h-[90vh] sm:p-6 sm:rounded-lg">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg">
            {formContent.leadForm.title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {formContent.leadForm.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto space-y-4 pr-2 sm:pr-0"
          >
            <LeadFormFields form={form} />
            <LeadFormActions
              isSubmitting={isSubmitting}
              onCancel={() => onOpenChange(false)}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


