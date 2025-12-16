"use client";

import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Control } from "react-hook-form";
import { formContent } from "@/data/form-content";
import type { ContactFormValues } from "./schema";
import { HelperText } from "./helper-text";

export function ContactFormFieldsExtra({
  control,
}: {
  control: Control<ContactFormValues>;
}) {
  return (
    <>
      <FormField
        control={control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formContent.contactForm.fields.company.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={formContent.contactForm.fields.company.placeholder}
                {...field}
              />
            </FormControl>
            {formContent.contactForm.fields.company.helperText && (
              <HelperText>{formContent.contactForm.fields.company.helperText}</HelperText>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="concern"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formContent.contactForm.fields.concern.label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={formContent.contactForm.fields.concern.placeholder}
                className="min-h-20"
                {...field}
              />
            </FormControl>
            {formContent.contactForm.fields.concern.helperText && (
              <HelperText>{formContent.contactForm.fields.concern.helperText}</HelperText>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}


