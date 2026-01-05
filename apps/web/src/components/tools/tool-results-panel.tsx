/**
 * ToolResultsPanel - Display tool results
 * 
 * Metrics, flags, recommendations with KPI cards (green/amber/red thresholds).
 */

"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import type { ToolDefinition, ToolResult } from "@/types/tools";
import { ToolExportActions } from "./tool-export-actions";
import { cn } from "@/lib/utils";

interface ToolResultsPanelProps {
  result: ToolResult;
  tool: ToolDefinition;
}

/**
 * Get threshold color for metric
 */
function getThresholdColor(
  metric: ToolResult["metrics"][0],
  value: number
): "green" | "amber" | "red" | "default" {
  if (!metric.threshold) return "default";
  
  if (value >= metric.threshold.green) return "green";
  if (value >= metric.threshold.amber) return "amber";
  return "red";
}

/**
 * ToolResultsPanel - Display tool results
 */
export function ToolResultsPanel({ result, tool }: ToolResultsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Kết quả</h2>
          <p className="text-muted-foreground mt-2">
            Phân tích và đánh giá dựa trên thông tin bạn đã nhập
          </p>
        </div>
        <ToolExportActions result={result} tool={tool} />
      </div>

      {/* Summary */}
      {result.summary && (
        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{result.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Metrics */}
      {result.metrics.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {result.metrics.map((metric) => {
            const numValue =
              typeof metric.value === "string"
                ? parseFloat(metric.value.replace(/[^\d.-]/g, ""))
                : metric.value;
            const thresholdColor = getThresholdColor(metric, numValue);
            
            return (
              <Card key={metric.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{metric.label}</CardTitle>
                  {metric.description && (
                    <CardDescription>{metric.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div
                      className={cn(
                        "text-3xl font-bold",
                        thresholdColor === "green" && "text-green-600",
                        thresholdColor === "amber" && "text-amber-600",
                        thresholdColor === "red" && "text-red-600"
                      )}
                    >
                      {metric.value} {metric.unit || ""}
                    </div>
                    {metric.threshold && (
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span
                          className={cn(
                            thresholdColor === "green" && "text-green-600"
                          )}
                        >
                          Tốt: ≥{metric.threshold.green}
                        </span>
                        <span
                          className={cn(
                            thresholdColor === "amber" && "text-amber-600"
                          )}
                        >
                          Trung bình: ≥{metric.threshold.amber}
                        </span>
                        <span
                          className={cn(
                            thresholdColor === "red" && "text-red-600"
                          )}
                        >
                          Cần cải thiện: &lt;{metric.threshold.amber}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Flags */}
      {result.flags.length > 0 && (
        <div className="space-y-3">
          {result.flags.map((flag, index) => {
            const Icon =
              flag.type === "error"
                ? XCircle
                : flag.type === "warning"
                  ? AlertCircle
                  : flag.type === "success"
                    ? CheckCircle2
                    : Info;
            
            return (
              <Alert
                key={index}
                variant={
                  flag.type === "error"
                    ? "destructive"
                    : flag.type === "warning"
                      ? "default"
                      : "default"
                }
              >
                <Icon className="h-4 w-4" />
                <AlertTitle>
                  {flag.type === "error"
                    ? "Cảnh báo"
                    : flag.type === "warning"
                      ? "Lưu ý"
                      : flag.type === "success"
                        ? "Thành công"
                        : "Thông tin"}
                </AlertTitle>
                <AlertDescription>
                  {flag.message}
                  {flag.action && (
                    <a
                      href={flag.action.href}
                      className="ml-2 text-primary underline hover:no-underline"
                    >
                      {flag.action.label}
                    </a>
                  )}
                </AlertDescription>
              </Alert>
            );
          })}
        </div>
      )}

      {/* Insights */}
      {result.insights && result.insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Nhận định</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {result.insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

