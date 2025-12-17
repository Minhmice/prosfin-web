"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@prosfin/ui";
import { convertLeadToClient } from "@/lib/data/leads";
import { createClient, type CreateClientInput } from "@/lib/data/clients";
import { showToast } from "@/lib/toast";
import type { Lead } from "@/types/admin";

interface ConvertLeadDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConverted?: (clientId: string) => void;
}

export function ConvertLeadDialog({
  lead,
  open,
  onOpenChange,
  onConverted,
}: ConvertLeadDialogProps) {
  const router = useRouter();
  const [mode, setMode] = React.useState<"new" | "existing">("new");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [existingClientSearch, setExistingClientSearch] = React.useState("");

  // Prefill mapping
  const [clientData, setClientData] = React.useState({
    companyName: lead.company || "",
    contactName: lead.name,
    email: lead.email,
    phone: lead.phone || "",
  });

  const handleConvert = async () => {
    setIsSubmitting(true);
    try {
      if (mode === "new") {
        // Create new client
        const newClient = await createClient({
          companyName: clientData.companyName || lead.name,
          contactName: clientData.contactName,
          email: clientData.email,
          phone: clientData.phone,
          status: "onboarding",
          linkedLeads: [lead.id],
          owner: lead.owner,
        });

        // Convert lead
        await convertLeadToClient(lead.id, newClient.id);

        showToast.success(`Lead converted to client: ${newClient.companyName}`);
        onConverted?.(newClient.id);
        onOpenChange(false);

        // Option: Navigate to client detail
        // router.push(`/clients/${newClient.id}`);
      } else {
        // Link to existing client (mock - would search and select)
        showToast.info("Link to existing client (mock - coming soon)");
      }
    } catch (error) {
      showToast.error("Failed to convert lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Convert Lead to Client</DialogTitle>
          <DialogDescription>
            Create a new client record from this lead or link to an existing client.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mode Selection */}
          <RadioGroup value={mode} onValueChange={(value) => setMode(value as "new" | "existing")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new" className="font-normal cursor-pointer">
                Create new client
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="existing" />
              <Label htmlFor="existing" className="font-normal cursor-pointer">
                Link to existing client
              </Label>
            </div>
          </RadioGroup>

          {mode === "new" ? (
            /* New Client Form */
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={clientData.companyName}
                  onChange={(e) =>
                    setClientData({ ...clientData, companyName: e.target.value })
                  }
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor="contactName">Primary Contact</Label>
                <Input
                  id="contactName"
                  value={clientData.contactName}
                  onChange={(e) =>
                    setClientData({ ...clientData, contactName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientData.email}
                  onChange={(e) =>
                    setClientData({ ...clientData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={clientData.phone}
                  onChange={(e) =>
                    setClientData({ ...clientData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          ) : (
            /* Existing Client Search */
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Search Client</Label>
                <Input
                  id="search"
                  placeholder="Search by company name or email..."
                  value={existingClientSearch}
                  onChange={(e) => setExistingClientSearch(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Mock: Client search functionality (coming soon)</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleConvert} disabled={isSubmitting || mode === "existing"}>
            {isSubmitting ? "Converting..." : "Convert"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

