"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, Tabs, TabsList, TabsTrigger, TabsContent, Badge, Button } from "@prosfin/ui";
import { X, Copy, User, Tag, ArrowRight } from "lucide-react";
import { LeadDetailOverview } from "./lead-detail-overview";
import { LeadDetailActivity } from "./lead-detail-activity";
import { LeadDetailAttribution } from "./lead-detail-attribution";
import { showToast } from "@/lib/toast";
import type { Lead } from "@/types/admin";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<Lead["status"], string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  meeting_scheduled: "bg-purple-100 text-purple-800",
  converted: "bg-gray-100 text-gray-800",
  lost: "bg-red-100 text-red-800",
};

export function LeadDetailDrawer({ lead, open, onOpenChange }: LeadDetailDrawerProps) {
  const router = useRouter();
  const [convertDialogOpen, setConvertDialogOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    router.push("/leads");
    onOpenChange(false);
  }, [router, onOpenChange]);

  // Keyboard navigation: Esc to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleClose]);

  if (!lead) {
    return null;
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(lead.email);
    showToast.success("Email copied to clipboard");
  };

  const handleCopyPhone = () => {
    if (lead.phone) {
      navigator.clipboard.writeText(lead.phone);
      showToast.success("Phone copied to clipboard");
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-background z-10 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-lg font-semibold mb-2">
                {lead.name}
              </SheetTitle>
              <div className="flex items-center gap-2 flex-wrap">
                {lead.company && (
                  <span className="text-sm text-muted-foreground">{lead.company}</span>
                )}
                <Badge className={statusColors[lead.status]}>
                  {lead.status}
                </Badge>
                {lead.owner && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <User className="size-3" />
                    {lead.owner}
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

          {/* Quick Actions */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // TODO: Open status change dialog
                showToast.info("Status change dialog (coming soon)");
              }}
            >
              <Tag className="mr-2 size-3" />
              Change Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConvertDialogOpen(true)}
            >
              <ArrowRight className="mr-2 size-3" />
              Convert to Client
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyEmail}
              className="h-8 w-8"
              title="Copy email"
            >
              <Copy className="size-4" />
            </Button>
            {lead.phone && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyPhone}
                className="h-8 w-8"
                title="Copy phone"
              >
                <Copy className="size-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="attribution">Attribution</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <LeadDetailOverview lead={lead} />
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <LeadDetailActivity lead={lead} />
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <LeadDetailNotes lead={lead} />
            </TabsContent>

            <TabsContent value="attribution" className="mt-4">
              <LeadDetailAttribution lead={lead} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>

      <ConvertLeadDialog
        lead={lead}
        open={convertDialogOpen}
        onOpenChange={setConvertDialogOpen}
        onConverted={(clientId) => {
          // Refresh lead data or update state
          showToast.success("Lead converted successfully");
        }}
      />
    </Sheet>
  );
}

