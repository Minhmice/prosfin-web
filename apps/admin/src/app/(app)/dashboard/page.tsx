"use client";

import * as React from "react";
import { AdminPageShell, AdminSectionCard } from "@prosfin/ui";
import { listLeads } from "@/lib/data/leads";

export default function DashboardPage() {
  const [stats, setStats] = React.useState({
    leadsThisWeek: 0,
    conversionRate: 0,
    topSource: "-",
    pipeline: 0,
  });

  React.useEffect(() => {
    listLeads().then((leads) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const leadsThisWeek = leads.filter(
        (lead) => new Date(lead.createdAt) >= weekAgo
      ).length;

      const converted = leads.filter((l) => l.status === "converted").length;
      const conversionRate = leads.length > 0 ? (converted / leads.length) * 100 : 0;

      const sourceCounts: Record<string, number> = {};
      leads.forEach((lead) => {
        sourceCounts[lead.source] = (sourceCounts[lead.source] || 0) + 1;
      });
      const topSource =
        Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

      setStats({
        leadsThisWeek,
        conversionRate: Math.round(conversionRate * 10) / 10,
        topSource,
        pipeline: leads.filter((l) => l.status === "qualified" || l.status === "meeting_scheduled").length,
      });
    });
  }, []);

  return (
    <AdminPageShell
      title="Dashboard"
      description="Overview of your business metrics"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AdminSectionCard title="Leads This Week">
          <div className="text-2xl font-bold">{stats.leadsThisWeek}</div>
          <p className="text-muted-foreground text-xs">New leads</p>
        </AdminSectionCard>
        <AdminSectionCard title="Conversion Rate">
          <div className="text-2xl font-bold">{stats.conversionRate}%</div>
          <p className="text-muted-foreground text-xs">Last 30 days</p>
        </AdminSectionCard>
        <AdminSectionCard title="Top Source">
          <div className="text-2xl font-bold">{stats.topSource}</div>
          <p className="text-muted-foreground text-xs">Most effective</p>
        </AdminSectionCard>
        <AdminSectionCard title="Pipeline">
          <div className="text-2xl font-bold">{stats.pipeline}</div>
          <p className="text-muted-foreground text-xs">Active deals</p>
        </AdminSectionCard>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <AdminSectionCard title="Leads Over Time">
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            Chart placeholder
          </div>
        </AdminSectionCard>
        <AdminSectionCard title="Source Distribution">
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            Chart placeholder
          </div>
        </AdminSectionCard>
      </div>
    </AdminPageShell>
  );
}
