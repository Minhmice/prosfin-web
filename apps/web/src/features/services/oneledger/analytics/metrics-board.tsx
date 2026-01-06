/**
 * Metrics Board
 * 
 * Weekly metrics dashboard for OneLedger growth visibility.
 * Shows funnel metrics, variant performance, and content assist.
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsBoardProps {
  // TODO: Connect to actual data source
  // For now, placeholder structure
}

export function MetricsBoard({}: MetricsBoardProps) {
  // TODO: Fetch actual metrics from analytics/leads store
  // Placeholder data structure

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">OneLedger Growth Metrics</h2>
        <p className="text-sm text-muted-foreground">
          Weekly metrics dashboard (placeholder - connect to data source)
        </p>
      </div>

      {/* Funnel Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Visitors</p>
              <p className="text-2xl font-semibold">-</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Scan Completion</p>
              <p className="text-2xl font-semibold">-</p>
              <p className="text-xs text-muted-foreground">-%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">CTA Open</p>
              <p className="text-2xl font-semibold">-</p>
              <p className="text-xs text-muted-foreground">-%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Lead Submitted</p>
              <p className="text-2xl font-semibold">-</p>
              <p className="text-xs text-muted-foreground">-%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Qualified (P0/P1)</p>
              <p className="text-2xl font-semibold">-</p>
              <p className="text-xs text-muted-foreground">-%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Variant Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Variant Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Hero Value Prop</h3>
              <div className="grid gap-2 md:grid-cols-3">
                <div className="rounded border p-2 text-sm">
                  <p className="font-medium">V1 (One source of truth)</p>
                  <p className="text-xs text-muted-foreground">Lead submit rate: -</p>
                </div>
                <div className="rounded border p-2 text-sm">
                  <p className="font-medium">V2 (CFO-ready reporting)</p>
                  <p className="text-xs text-muted-foreground">Lead submit rate: -</p>
                </div>
                <div className="rounded border p-2 text-sm">
                  <p className="font-medium">V3 (High-stakes readiness)</p>
                  <p className="text-xs text-muted-foreground">Lead submit rate: -</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Scan Design</h3>
              <div className="grid gap-2 md:grid-cols-3">
                <div className="rounded border p-2 text-sm">
                  <p className="font-medium">V1 (8 câu)</p>
                  <p className="text-xs text-muted-foreground">Lead quality: -</p>
                </div>
                <div className="rounded border p-2 text-sm">
                  <p className="font-medium">V2 (10-12 câu)</p>
                  <p className="text-xs text-muted-foreground">Lead quality: -</p>
                </div>
                <div className="rounded border p-2 text-sm">
                  <p className="font-medium">V3 (2-step)</p>
                  <p className="text-xs text-muted-foreground">Lead quality: -</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Assist */}
      <Card>
        <CardHeader>
          <CardTitle>Content Assist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold mb-2">Top Referrers (Posts)</h3>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">- (placeholder)</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Internal Link Click-through</h3>
              <p className="text-sm text-muted-foreground">- (placeholder)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

