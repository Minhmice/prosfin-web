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
import type { Control } from "react-hook-form";
import { formContent } from "@/data/form-content";
import type { ContactFormValues } from "./schema";
import { HelperText } from "./helper-text";

export function ContactFormFieldsBasic({
  control,
}: {
  control: Control<ContactFormValues>;
}) {
  return (
    <>
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formContent.contactForm.fields.fullName.label} *</FormLabel>
            <FormControl>
              <Input
                placeholder={formContent.contactForm.fields.fullName.placeholder}
                {...field}
              />
            </FormControl>
            {formContent.contactForm.fields.fullName.helperText && (
              <HelperText>{formContent.contactForm.fields.fullName.helperText}</HelperText>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formContent.contactForm.fields.email.label} *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder={formContent.contactForm.fields.email.placeholder}
                {...field}
              />
            </FormControl>
            {formContent.contactForm.fields.email.helperText && (
              <HelperText>{formContent.contactForm.fields.email.helperText}</HelperText>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formContent.contactForm.fields.phone.label} *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder={formContent.contactForm.fields.phone.placeholder}
                {...field}
              />
            </FormControl>
            {formContent.contactForm.fields.phone.helperText && (
              <HelperText>{formContent.contactForm.fields.phone.helperText}</HelperText>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}


