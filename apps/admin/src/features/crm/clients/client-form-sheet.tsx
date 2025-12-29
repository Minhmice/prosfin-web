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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { clientSchema, type ClientFormData } from "../schemas"
import type { Client } from "../types"
import { crmProvider } from "../data/provider"
import { toast } from "sonner"

interface ClientFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: Client | null
  onSuccess?: () => void
}

export function ClientFormSheet({
  open,
  onOpenChange,
  client,
  onSuccess,
}: ClientFormSheetProps) {
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
      tags: client?.tags ?? [],
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
        await crmProvider.createClient({
          ...data,
        })
        toast.success("Client created successfully")
      }
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      toast.error("Failed to save client")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{client ? "Edit Client" : "New Client"}</SheetTitle>
          <SheetDescription aria-describedby={undefined}>
            {client
              ? "Update client information"
              : "Create a new client record"}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. CEO, CFO" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {client ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
