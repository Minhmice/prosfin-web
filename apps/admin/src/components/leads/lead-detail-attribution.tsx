"use client";

import * as React from "react";
import { format } from "date-fns";
import type { Lead } from "@/types/admin";

interface LeadDetailAttributionProps {
  lead: Lead;
}

export function LeadDetailAttribution({ lead }: LeadDetailAttributionProps) {
  const attribution = lead.attribution;

  if (!attribution) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No attribution data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Landing Path */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Landing Information</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Landing Path</label>
            <p className="text-sm font-medium">{attribution.landingPath}</p>
          </div>
          {attribution.referrer && (
            <div>
              <label className="text-xs text-muted-foreground">Referrer</label>
              <p className="text-sm font-medium break-all">{attribution.referrer}</p>
            </div>
          )}
          <div>
            <label className="text-xs text-muted-foreground">Timestamp</label>
            <p className="text-sm font-medium">
              {format(new Date(attribution.timestamp), "MMM dd, yyyy HH:mm")}
            </p>
          </div>
        </div>
      </div>

      {/* UTM Parameters */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">UTM Parameters</h3>
        <div className="space-y-3">
          {attribution.utm_source && (
            <div>
              <label className="text-xs text-muted-foreground">UTM Source</label>
              <p className="text-sm font-medium">{attribution.utm_source}</p>
            </div>
          )}
          {attribution.utm_medium && (
            <div>
              <label className="text-xs text-muted-foreground">UTM Medium</label>
              <p className="text-sm font-medium">{attribution.utm_medium}</p>
            </div>
          )}
          {attribution.utm_campaign && (
            <div>
              <label className="text-xs text-muted-foreground">UTM Campaign</label>
              <p className="text-sm font-medium">{attribution.utm_campaign}</p>
            </div>
          )}
          {attribution.utm_content && (
            <div>
              <label className="text-xs text-muted-foreground">UTM Content</label>
              <p className="text-sm font-medium">{attribution.utm_content}</p>
            </div>
          )}
          {attribution.utm_term && (
            <div>
              <label className="text-xs text-muted-foreground">UTM Term</label>
              <p className="text-sm font-medium">{attribution.utm_term}</p>
            </div>
          )}
        </div>
      </div>

      {/* Source */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Source</h3>
        <div>
          <label className="text-xs text-muted-foreground">Source</label>
          <p className="text-sm font-medium">{lead.source}</p>
        </div>
        {lead.utm_campaign && (
          <div className="mt-3">
            <label className="text-xs text-muted-foreground">Campaign</label>
            <p className="text-sm font-medium">{lead.utm_campaign}</p>
          </div>
        )}
      </div>
    </div>
  );
}

