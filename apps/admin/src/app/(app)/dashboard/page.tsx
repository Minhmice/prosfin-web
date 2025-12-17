"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { format, parseISO, subDays, differenceInDays } from "date-fns";
import { AdminPageShell, AdminSkeleton } from "@prosfin/ui";
import { DashboardControlBar } from "@/components/dashboard/dashboard-control-bar";
import { KPICard } from "@/components/dashboard/kpi-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import {
  ChannelChart,
  PipelineChart,
} from "@/components/dashboard/breakdown-charts";
import {
  TopCampaigns,
  TopLandingPaths,
  RecentActivity,
} from "@/components/dashboard/top-performers";
import { getDashboardData, type DateRange } from "@/lib/data/dashboard";
import type { DashboardData } from "@/lib/data/dashboard";

export const dynamic = "force-dynamic";

function SearchParamsReader({
  children,
}: {
  children: (params: {
    from: string | null;
    to: string | null;
    compareMode: string;
  }) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const fromStr = searchParams.get("from");
  const toStr = searchParams.get("to");
  const compareMode = searchParams.get("compare_mode") || "prev";

  return <>{children({ from: fromStr, to: toStr, compareMode })}</>;
}

// Wrap SearchParamsReader in Suspense for Next.js
function SearchParamsReaderWrapper({
  children,
}: {
  children: (params: {
    from: string | null;
    to: string | null;
    compareMode: string;
  }) => React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <SearchParamsReader>{children}</SearchParamsReader>
    </Suspense>
  );
}

function DashboardContentWithParams({
  params,
}: {
  params: { from: string | null; to: string | null; compareMode: string };
}) {
  const [dashboardData, setDashboardData] =
    React.useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dateRange, setDateRange] = React.useState<DateRange | null>(null);
  const [compareEnabled, setCompareEnabled] = React.useState(false);
  const [compareRange, setCompareRange] = React.useState<DateRange | null>(
    null
  );

  // Get date range from URL or default
  const fromStr = params.from;
  const toStr = params.to;
  const compareMode = params.compareMode || "prev";

  React.useEffect(() => {
    if (fromStr && toStr) {
      try {
        const from = parseISO(fromStr);
        const to = parseISO(toStr);
        setDateRange({ from, to });
      } catch {
        // Invalid date, use default
        const to = new Date();
        const from = subDays(to, 30);
        setDateRange({ from, to });
      }
    } else {
      // Default: last 30 days
      const to = new Date();
      const from = subDays(to, 30);
      setDateRange({ from, to });
    }
  }, [fromStr, toStr]);

  // Calculate compare range
  React.useEffect(() => {
    if (dateRange && compareEnabled) {
      if (compareMode === "prev") {
        const days = differenceInDays(dateRange.to, dateRange.from);
        const compareTo = subDays(dateRange.from, 1);
        const compareFrom = subDays(compareTo, days);
        setCompareRange({ from: compareFrom, to: compareTo });
      } else if (compareMode === "month") {
        // Previous month (simplified)
        const compareTo = subDays(dateRange.from, 1);
        const days = differenceInDays(dateRange.to, dateRange.from);
        const compareFrom = subDays(compareTo, days);
        setCompareRange({ from: compareFrom, to: compareTo });
      }
    } else {
      setCompareRange(null);
    }
  }, [dateRange, compareEnabled, compareMode]);

  // Fetch dashboard data
  React.useEffect(() => {
    if (!dateRange) return;

    let cancelled = false;
    setIsLoading(true);
    getDashboardData(dateRange, compareRange || undefined)
      .then((data) => {
        if (!cancelled) {
          setDashboardData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Failed to load dashboard data:", error);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dateRange, compareRange]);

  // Build drill-down params with date range
  const buildDrillDownParams = React.useCallback(
    (additionalParams: Record<string, string> = {}) => {
      const params: Record<string, string> = { ...additionalParams };
      if (dateRange) {
        params.from = format(dateRange.from, "yyyy-MM-dd");
        params.to = format(dateRange.to, "yyyy-MM-dd");
      }
      return params;
    },
    [dateRange]
  );

  if (isLoading || !dashboardData || !dateRange) {
    return (
      <AdminPageShell
        title="Dashboard"
        description="Overview of your business metrics"
      >
        <DashboardControlBar />
        <div className="space-y-6 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <AdminSkeleton key={i} variant="rectangular" className="h-32" />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <AdminSkeleton variant="rectangular" className="h-80" />
            <AdminSkeleton variant="rectangular" className="h-80" />
          </div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      title="Dashboard"
      description="Overview of your business metrics"
    >
      <DashboardControlBar
        onDateRangeChange={setDateRange}
        onCompareChange={setCompareEnabled}
      />

      <div className="space-y-6 p-4">
        {/* KPI Strip */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 overflow-x-auto snap-x snap-mandatory">
          <KPICard
            title="New Leads"
            value={dashboardData.kpis.newLeads}
            compareValue={dashboardData.kpisCompare?.newLeads}
            sparklineData={dashboardData.sparklineData}
            tooltip="Total new leads in the selected period"
            drillDownPath="/leads"
            drillDownParams={buildDrillDownParams({ status: "new" })}
          />
          <KPICard
            title="Qualified"
            value={dashboardData.kpis.qualifiedLeads}
            compareValue={dashboardData.kpisCompare?.qualifiedLeads}
            sparklineData={dashboardData.sparklineData}
            tooltip="Leads that have been qualified"
            drillDownPath="/leads"
            drillDownParams={buildDrillDownParams({ status: "qualified" })}
          />
          <KPICard
            title="Meetings"
            value={dashboardData.kpis.meetingsScheduled}
            compareValue={dashboardData.kpisCompare?.meetingsScheduled}
            sparklineData={dashboardData.sparklineData}
            tooltip="Meetings scheduled with leads"
            drillDownPath="/leads"
            drillDownParams={buildDrillDownParams({
              status: "meeting_scheduled",
            })}
          />
          <KPICard
            title="Won"
            value={dashboardData.kpis.won}
            compareValue={dashboardData.kpisCompare?.won}
            sparklineData={dashboardData.sparklineData}
            tooltip="Converted leads / clients"
            drillDownPath="/clients"
            drillDownParams={buildDrillDownParams({ status: "active" })}
          />
          <KPICard
            title="CVR: Lead→Qualified"
            value={dashboardData.kpis.cvrLeadToQualified}
            compareValue={dashboardData.kpisCompare?.cvrLeadToQualified}
            sparklineData={dashboardData.sparklineData}
            tooltip="Conversion rate from new leads to qualified"
            formatValue={(v) => `${v}%`}
          />
          <KPICard
            title="CVR: Qualified→Meeting"
            value={dashboardData.kpis.cvrQualifiedToMeeting}
            compareValue={dashboardData.kpisCompare?.cvrQualifiedToMeeting}
            sparklineData={dashboardData.sparklineData}
            tooltip="Conversion rate from qualified to meeting scheduled"
            formatValue={(v) => `${v}%`}
          />
        </div>

        {/* Core Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <TrendChart
            title="Acquisition Trend"
            data={dashboardData.dailySeries}
            compareData={dashboardData.dailySeriesCompare}
            metric="leads"
          />
          <ChannelChart
            data={dashboardData.channelBreakdown}
            onBarClick={(channel) => {
              const params = new URLSearchParams(
                buildDrillDownParams({ source: channel })
              );
              window.location.href = `/leads?${params.toString()}`;
            }}
          />
        </div>

        <PipelineChart data={dashboardData.pipelineSnapshot} />

        {/* Operational Tables */}
        <div className="grid gap-6 md:grid-cols-2">
          <TopCampaigns
            data={dashboardData.campaignPerformance}
            dateRange={
              dateRange
                ? {
                    from: format(dateRange.from, "yyyy-MM-dd"),
                    to: format(dateRange.to, "yyyy-MM-dd"),
                  }
                : undefined
            }
          />
          <TopLandingPaths
            data={dashboardData.landingPathPerformance}
            dateRange={
              dateRange
                ? {
                    from: format(dateRange.from, "yyyy-MM-dd"),
                    to: format(dateRange.to, "yyyy-MM-dd"),
                  }
                : undefined
            }
          />
        </div>

        {/* Recent Activity */}
        <RecentActivity data={dashboardData.recentActivity} />
      </div>
    </AdminPageShell>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <AdminPageShell
          title="Dashboard"
          description="Overview of your business metrics"
        >
          <DashboardControlBar />
          <div className="space-y-6 p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <AdminSkeleton key={i} variant="rectangular" className="h-32" />
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <AdminSkeleton variant="rectangular" className="h-80" />
              <AdminSkeleton variant="rectangular" className="h-80" />
            </div>
          </div>
        </AdminPageShell>
      }
    >
      <SearchParamsReaderWrapper>
        {(params) => <DashboardContentWithParams params={params} />}
      </SearchParamsReaderWrapper>
    </Suspense>
  );
}
