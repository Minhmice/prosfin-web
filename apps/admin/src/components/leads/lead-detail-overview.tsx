"use client";

import * as React from "react";
import { format } from "date-fns";
import { Badge, Button } from "@prosfin/ui";
import { AlertTriangle } from "lucide-react";
import type { Lead } from "@/types/admin";

interface LeadDetailOverviewProps {
  lead: Lead;
}

const statusColors: Record<Lead["status"], string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-green-100 text-green-800",
  meeting_scheduled: "bg-purple-100 text-purple-800",
  converted: "bg-gray-100 text-gray-800",
  lost: "bg-red-100 text-red-800",
};

const urgencyColors: Record<"low" | "medium" | "high", string> = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export function LeadDetailOverview({ lead }: LeadDetailOverviewProps) {
  const missingEmail = !lead.email || lead.email.trim() === "";
  const missingPhone = !lead.phone || lead.phone.trim() === "";

  return (
    <div className="space-y-6">
      {/* Validation Warnings */}
      {(missingEmail || missingPhone) && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-destructive" />
              <span className="text-sm text-destructive">
                {missingEmail && missingPhone
                  ? "Email and phone are missing"
                  : missingEmail
                  ? "Email is missing"
                  : "Phone is missing"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7"
              onClick={() => {
                // TODO: Open request info dialog
                console.log("Request info");
              }}
            >
              Request Info
            </Button>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Contact Information</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Name</label>
            <p className="text-sm font-medium">{lead.name}</p>
          </div>
          {lead.company && (
            <div>
              <label className="text-xs text-muted-foreground">Company</label>
              <p className="text-sm font-medium">{lead.company}</p>
            </div>
          )}
          <div>
            <label className="text-xs text-muted-foreground">Email</label>
            <p className="text-sm font-medium">{lead.email || "—"}</p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Phone</label>
            <p className="text-sm font-medium">{lead.phone || "—"}</p>
          </div>
        </div>
      </div>

      {/* Service Interest & Urgency */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Interest & Priority</h3>
        <div className="space-y-3">
          {lead.interest && (
            <div>
              <label className="text-xs text-muted-foreground">Service Interest</label>
              <div className="mt-1">
                <Badge variant="outline">{lead.interest}</Badge>
              </div>
            </div>
          )}
          {lead.urgency && (
            <div>
              <label className="text-xs text-muted-foreground">Urgency</label>
              <div className="mt-1">
                <Badge className={urgencyColors[lead.urgency]}>
                  {lead.urgency}
                </Badge>
              </div>
            </div>
          )}
          <div>
            <label className="text-xs text-muted-foreground">Status</label>
            <div className="mt-1">
              <Badge className={statusColors[lead.status]}>
                {lead.status}
              </Badge>
            </div>
          </div>
          {lead.owner && (
            <div>
              <label className="text-xs text-muted-foreground">Owner</label>
              <p className="text-sm font-medium">{lead.owner}</p>
            </div>
          )}
        </div>
      </div>

      {/* Dates */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Dates</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Created</label>
            <p className="text-sm font-medium">
              {format(new Date(lead.createdAt), "MMM dd, yyyy HH:mm")}
            </p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Last Updated</label>
            <p className="text-sm font-medium">
              {format(new Date(lead.updatedAt), "MMM dd, yyyy HH:mm")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

