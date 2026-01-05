/**
 * ToolExportActions - Export menu for tool results
 * 
 * Copy summary, Download JSON/CSV, Print view.
 */

"use client";

import * as React from "react";
import type { ToolDefinition, ToolResult } from "@/types/tools";
import { ExportMenu } from "@/components/shared/export/export-menu";
import { exportReportJSON, exportReportCSV, exportReportPDF } from "@/lib/leads/export";
import { trackToolEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { useProsfinToast } from "@/components/shared";

interface ToolExportActionsProps {
  result: ToolResult;
  tool: ToolDefinition;
}

/**
 * ToolExportActions - Export actions for tool
 */
export function ToolExportActions({ result, tool }: ToolExportActionsProps) {
  const toast = useProsfinToast();

  const handleCopySummary = async () => {
    const summary = result.summary || "Kết quả phân tích tài chính";
    const metricsText = result.metrics
      .map((m) => `${m.label}: ${m.value} ${m.unit || ""}`)
      .join("\n");
    const text = `${summary}\n\n${metricsText}`;

    try {
      await navigator.clipboard.writeText(text);
      toast.toast({
        description: "Đã sao chép tóm tắt",
        variant: "success",
      });
      trackToolEvent(AnalyticsEvent.TOOL_EXPORT_CLICKED, {
        toolSlug: tool.slug,
        exportType: "copy",
      });
    } catch {
      toast.toast({
        description: "Không thể sao chép",
        variant: "error",
      });
    }
  };

  const handleExportJSON = () => {
    exportReportJSON(result);
    trackToolEvent(AnalyticsEvent.TOOL_EXPORT_CLICKED, {
      toolSlug: tool.slug,
      exportType: "json",
    });
  };

  const handleExportCSV = () => {
    exportReportCSV(result);
    trackToolEvent(AnalyticsEvent.TOOL_EXPORT_CLICKED, {
      toolSlug: tool.slug,
      exportType: "csv",
    });
  };

  const handleExportPDF = () => {
    exportReportPDF(result);
    trackToolEvent(AnalyticsEvent.TOOL_EXPORT_CLICKED, {
      toolSlug: tool.slug,
      exportType: "pdf",
    });
  };

  const handlePrint = () => {
    window.print();
    trackToolEvent(AnalyticsEvent.TOOL_EXPORT_CLICKED, {
      toolSlug: tool.slug,
      exportType: "print",
    });
  };

  return (
    <ExportMenu
      onCopySummary={handleCopySummary}
      onExportJSON={handleExportJSON}
      onExportCSV={handleExportCSV}
      onExportPDF={handleExportPDF}
      onPrint={handlePrint}
    />
  );
}

