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
import type { Lead } from "@prosfin/shared"

interface LeadDetailPanelProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailPanel({ lead, open, onOpenChange }: LeadDetailPanelProps) {
  const isMobile = useIsMobile()
  const [notes, setNotes] = React.useState("")

  if (!lead) return null

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{lead.name}</DrawerTitle>
            <DrawerDescription>{lead.company}</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
            <LeadDetailContent lead={lead} notes={notes} onNotesChange={setNotes} />
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
          <SheetTitle>{lead.name}</SheetTitle>
          <SheetDescription>{lead.company}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <LeadDetailContent lead={lead} notes={notes} onNotesChange={setNotes} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function LeadDetailContent({
  lead,
  notes,
  onNotesChange,
}: {
  lead: Lead
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
              <p className="font-medium">{lead.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Company</Label>
              <p className="font-medium">{lead.company}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p className="font-medium">{lead.email}</p>
            </div>
            {lead.phone && (
              <div>
                <Label className="text-muted-foreground">Phone</Label>
                <p className="font-medium">{lead.phone}</p>
              </div>
            )}
            <div>
              <Label className="text-muted-foreground">Status</Label>
              <Badge variant="outline">{lead.status}</Badge>
            </div>
            <div>
              <Label className="text-muted-foreground">Source</Label>
              <Badge variant="secondary">{lead.source}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Status Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Created on {lead.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span>Last updated on {lead.updatedAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Attribution</h3>
          <div className="space-y-2 text-sm">
            <div>
              <Label className="text-muted-foreground">Referrer</Label>
              <p className="text-muted-foreground">Not available</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Landing Path</Label>
              <p className="text-muted-foreground">Not available</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Notes</h3>
          <Textarea
            placeholder="Add notes about this lead..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </>
  )
}
