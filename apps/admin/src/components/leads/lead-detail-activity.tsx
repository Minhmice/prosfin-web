"use client";

import * as React from "react";
import { ActivityTimeline } from "./activity-timeline";
import type { Lead } from "@/types/admin";

interface LeadDetailActivityProps {
  lead: Lead;
}

export function LeadDetailActivity({ lead }: LeadDetailActivityProps) {
  const events = lead.timeline || [];

  return <ActivityTimeline events={events} />;
}

