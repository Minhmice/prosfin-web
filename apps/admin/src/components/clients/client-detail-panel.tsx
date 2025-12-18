"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import type { Client } from "@/types"

interface ClientDetailPanelProps {
  client: Client | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClientDetailPanel({ client, open, onOpenChange }: ClientDetailPanelProps) {
  const isMobile = useIsMobile()
  const [notes, setNotes] = React.useState("")

  if (!client) return null

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{client.name}</DrawerTitle>
            <DrawerDescription>{client.company}</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
            <ClientDetailContent client={client} notes={notes} onNotesChange={setNotes} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{client.name}</SheetTitle>
          <SheetDescription>{client.company}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <ClientDetailContent client={client} notes={notes} onNotesChange={setNotes} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function ClientDetailContent({
  client,
  notes,
  onNotesChange,
}: {
  client: Client
  notes: string
  onNotesChange: (notes: string) => void
}) {
  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Summary</h3>
          <div className="space-y-2">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="font-medium">{client.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Company</Label>
              <p className="font-medium">{client.company}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <Badge variant="outline">{client.status}</Badge>
            </div>
            {client.owner && (
              <div>
                <Label className="text-muted-foreground">Owner</Label>
                <p className="font-medium">{client.owner}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Related Leads</h3>
          <p className="text-sm text-muted-foreground">No related leads found</p>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Notes</h3>
          <Textarea
            placeholder="Add notes about this client..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </>
  )
}
