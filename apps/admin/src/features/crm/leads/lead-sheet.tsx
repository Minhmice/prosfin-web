/**
 * Lead Sheet Component
 * Unified Sheet for create/edit
 */

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { leadSchema, type LeadFormData } from "../schemas"
import type { Lead } from "../types"
import { crmProvider } from "../data/provider"
import { toast } from "sonner"
import { LeadFormFields } from "./lead-form-fields"

interface LeadSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  lead?: Lead | null
  onSuccess?: () => void
}

export function LeadSheet({
  open,
  onOpenChange,
  mode,
  lead,
  onSuccess,
}: LeadSheetProps) {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: lead?.name || "",
      company: lead?.company || "",
      email: lead?.email || "",
      phone: lead?.phone || "",
      stage: lead?.stage || "new",
      source: lead?.source || "web",
      score: lead?.score || 0,
      ownerId: lead?.ownerId || "",
      ownerName: lead?.ownerName || "",
      nextActionAt: lead?.nextActionAt,
    },
  })

  React.useEffect(() => {
    if (lead) {
      form.reset({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        stage: lead.stage,
        source: lead.source,
        score: lead.score,
        ownerId: lead.ownerId,
        ownerName: lead.ownerName,
        nextActionAt: lead.nextActionAt,
      })
    } else {
      form.reset({
        name: "",
        company: "",
        email: "",
        phone: "",
        stage: "new",
        source: "web",
        score: 0,
        ownerId: "",
        ownerName: "",
        nextActionAt: undefined,
      })
    }
  }, [lead, form])

  const onSubmit = async (data: LeadFormData) => {
    try {
      if (mode === "create") {
        await crmProvider.createLead(data)
        toast.success("Lead created")
      } else if (lead) {
        await crmProvider.updateLead(lead.id, data)
        toast.success("Lead updated")
      }
      onOpenChange(false)
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.message || "Failed to save lead")
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{mode === "create" ? "Create Lead" : "Edit Lead"}</SheetTitle>
          <SheetDescription aria-describedby={undefined}>
            {mode === "create"
              ? "Add a new lead to your CRM"
              : "Update lead information"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <LeadFormFields form={form} />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

