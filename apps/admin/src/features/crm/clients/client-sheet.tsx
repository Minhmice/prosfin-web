/**
 * Client Sheet Component
 * Unified Sheet for create/edit/view with Client 360 tabs
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { clientSchema, type ClientFormData } from "../schemas"
import type { Client } from "../types"
import { crmProvider } from "../data/provider"
import { toast } from "sonner"
import { ClientFormFields } from "./client-form-fields"
import { Client360Tabs } from "./client-360-tabs"

interface ClientSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "view" | "edit"
  client?: Client | null
  onSuccess?: () => void
}

export function ClientSheet({
  open,
  onOpenChange,
  mode,
  client,
  onSuccess,
}: ClientSheetProps) {
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      company: client?.company || "",
      title: client?.title || "",
      email: client?.email || "",
      phone: client?.phone || "",
      status: client?.status || "active",
      ownerId: client?.ownerId || "",
      ownerName: client?.ownerName || "",
      tags: client?.tags || [],
    },
  })

  React.useEffect(() => {
    if (client) {
      form.reset({
        name: client.name,
        company: client.company,
        title: client.title,
        email: client.email,
        phone: client.phone,
        status: client.status,
        ownerId: client.ownerId,
        ownerName: client.ownerName,
        tags: client.tags,
      })
    } else {
      form.reset({
        name: "",
        company: "",
        title: "",
        email: "",
        phone: "",
        status: "active",
        ownerId: "",
        ownerName: "",
        tags: [],
      })
    }
  }, [client, form])

  const onSubmit = async (data: ClientFormData) => {
    try {
      if (client) {
        await crmProvider.updateClient(client.id, data)
        toast.success("Client updated successfully")
      } else {
        await crmProvider.createClient(data)
        toast.success("Client created successfully")
      }
      onOpenChange(false)
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.message || "Failed to save client")
    }
  }

  const isViewMode = mode === "view"
  const isEditMode = mode === "edit"
  const isCreateMode = mode === "create"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isCreateMode ? "New Client" : isEditMode ? "Edit Client" : "Client Details"}
          </SheetTitle>
          <SheetDescription aria-describedby={undefined}>
            {isCreateMode
              ? "Create a new client record"
              : isEditMode
                ? "Update client information"
                : "View client information and related data"}
          </SheetDescription>
        </SheetHeader>

        {isViewMode && client ? (
          <div className="mt-6">
            <Client360Tabs clientId={client.id} />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <ClientFormFields form={form} />
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">{isCreateMode ? "Create" : "Update"}</Button>
              </div>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  )
}

