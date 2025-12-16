"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ProsfinPrimaryButton, useProsfinToast } from "@/components/shared";
import { useLeadDraft, type LeadDraft } from "@/hooks/use-lead-draft";
import { detailSchema, type DetailValues } from "./detail-information/schema";
import { CompanyInfoSection } from "./detail-information/company-info-section";
import { GoalsSection } from "./detail-information/goals-section";

export function DetailInformationForm() {
  const toast = useProsfinToast();
  const { draft, hydrated, updateDraft } = useLeadDraft();
  const [saving, setSaving] = React.useState(false);

  const form = useForm<DetailValues>({
    resolver: zodResolver(detailSchema),
    defaultValues: {
      industry: "",
      companySize: "1-5",
      revenueRange: "lt-1b",
      yearsActive: "0-1",
      goal: "",
      painPoints: "",
    },
  });

  React.useEffect(() => {
    if (!hydrated) return;
    if (form.formState.isDirty) return;
    form.reset({
      industry: draft?.industry ?? "",
      companySize: (draft?.companySize ?? "1-5") as LeadDraft["companySize"],
      revenueRange: (draft?.revenueRange ?? "lt-1b") as LeadDraft["revenueRange"],
      yearsActive: (draft?.yearsActive ?? "0-1") as LeadDraft["yearsActive"],
      goal: draft?.goal ?? "",
      painPoints: draft?.painPoints ?? "",
    });
    // chỉ hydrate 1 lần để tránh overwrite khi user đang gõ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const onSubmit = async (values: DetailValues) => {
    setSaving(true);
    try {
      updateDraft(values);
      toast.toast({ description: "Đã lưu thông tin (UI demo).", variant: "success" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CompanyInfoSection control={form.control} />
        <GoalsSection control={form.control} />

        <ProsfinPrimaryButton type="submit" className="w-full" loading={saving}>
          Lưu thông tin
        </ProsfinPrimaryButton>
      </form>
    </Form>
  );
}


