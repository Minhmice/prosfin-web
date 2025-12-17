"use client";

import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formContent } from "@/data/form-content";
import { CONCERN_OPTIONS, type LeadFormValues } from "./schema";

export function LeadFormFields({ form }: { form: UseFormReturn<LeadFormValues> }) {
  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formContent.leadForm.fields.fullName.label} *</FormLabel>
            <FormControl>
              <Input placeholder={formContent.leadForm.fields.fullName.placeholder} {...field} />
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
            <FormLabel>{formContent.leadForm.fields.email.label} *</FormLabel>
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
            <FormLabel>{formContent.leadForm.fields.phone.label} *</FormLabel>
            <FormControl>
              <Input placeholder={formContent.leadForm.fields.phone.placeholder} {...field} />
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
            <FormLabel>{formContent.leadForm.fields.companyName.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={formContent.leadForm.fields.companyName.placeholder}
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
            <FormLabel>{formContent.leadForm.fields.concern.label} *</FormLabel>
            <FormControl>
              <select
                {...field}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
              >
                <option value="">{formContent.leadForm.fields.concern.placeholder}</option>
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
    </>
  );
}


