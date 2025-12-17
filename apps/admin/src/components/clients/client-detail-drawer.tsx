"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, Tabs, TabsList, TabsTrigger, TabsContent, Badge, Button } from "@prosfin/ui";
import { X, User } from "lucide-react";
import { format } from "date-fns";
import type { Client } from "@/types/admin";
import { ActivityTimeline } from "@/components/leads/activity-timeline";
import { NotesSection } from "@/components/leads/notes-section";

interface ClientDetailDrawerProps {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<Client["status"], string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  onboarding: "bg-yellow-100 text-yellow-800",
};

export function ClientDetailDrawer({ client, open, onOpenChange }: ClientDetailDrawerProps) {
  const router = useRouter();

  const handleClose = React.useCallback(() => {
    router.push("/clients");
    onOpenChange(false);
  }, [router, onOpenChange]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleClose]);

  if (!client) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-background z-10 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-lg font-semibold mb-2">
                {client.companyName}
              </SheetTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={statusColors[client.status]}>
                  {client.status}
                </Badge>
                {client.owner && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <User className="size-3" />
                    {client.owner}
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="size-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="leads">Linked Leads</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Company Name</label>
                      <p className="text-sm font-medium">{client.companyName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Primary Contact</label>
                      <p className="text-sm font-medium">{client.contactName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Email</label>
                      <p className="text-sm font-medium">{client.email}</p>
                    </div>
                    {client.phone && (
                      <div>
                        <label className="text-xs text-muted-foreground">Phone</label>
                        <p className="text-sm font-medium">{client.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Dates</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Created</label>
                      <p className="text-sm font-medium">
                        {format(new Date(client.createdAt), "MMM dd, yyyy HH:mm")}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Last Updated</label>
                      <p className="text-sm font-medium">
                        {format(new Date(client.updatedAt), "MMM dd, yyyy HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              {client.timeline && client.timeline.length > 0 ? (
                <ActivityTimeline events={client.timeline} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No activity yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <NotesSection lead={null as any} />
            </TabsContent>

            <TabsContent value="leads" className="mt-4">
              {client.linkedLeads && client.linkedLeads.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {client.linkedLeads.length} linked lead(s)
                  </p>
                  {client.linkedLeads.map((leadId) => (
                    <Button
                      key={leadId}
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/leads/${leadId}`)}
                      className="w-full justify-start"
                    >
                      View Lead: {leadId}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No linked leads</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

