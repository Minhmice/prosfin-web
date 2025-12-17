"use client";

import * as React from "react";
import { AdminPageShell } from "@prosfin/ui";
import { Button } from "@prosfin/ui";
import { Plus } from "lucide-react";
import { MetricCards } from "@/components/documents/metric-cards";
import { VisitorsChart } from "@/components/documents/visitors-chart";
import { DocumentsTable } from "@/components/documents/documents-table";

export default function DocumentsPage() {
  return (
    <AdminPageShell
      title="Documents"
      actions={
        <Button size="sm" className="hidden sm:flex">
          <Plus className="mr-2 size-4" />
          Quick Create
        </Button>
      }
    >
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Metric Cards */}
        <MetricCards />

        {/* Visitors Chart */}
        <VisitorsChart />

        {/* Documents Table */}
        <DocumentsTable />
      </div>
    </AdminPageShell>
  );
}

