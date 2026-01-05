/**
 * ToolScenarios - Scenario toggles for tool
 * 
 * Scenario toggles (e.g., "+5% price") with delta display (before/after).
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { ToolDefinition, ToolInput, ToolResult } from "@/types/tools";
import { computeTool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface ToolScenariosProps {
  tool: ToolDefinition;
  baseInput: ToolInput;
  baseResult: ToolResult;
  onScenarioChange: (scenarioInput: ToolInput) => void;
}

/**
 * Common scenarios for different tool types
 */
const SCENARIOS: Record<
  string,
  Array<{
    label: string;
    apply: (input: ToolInput) => ToolInput;
  }>
> = {
  "cashflow-runway": [
    {
      label: "+10% doanh thu",
      apply: (input) => ({
        ...input,
        monthlyRevenue: ((input.monthlyRevenue as number) || 0) * 1.1,
      }),
    },
    {
      label: "-10% chi phí",
      apply: (input) => ({
        ...input,
        monthlyOpex: ((input.monthlyOpex as number) || 0) * 0.9,
      }),
    },
  ],
  "profit-levers": [
    {
      label: "+5% giá bán",
      apply: (input) => ({
        ...input,
        revenue: ((input.revenue as number) || 0) * 1.05,
      }),
    },
    {
      label: "-3% giá vốn",
      apply: (input) => ({
        ...input,
        cogs: ((input.cogs as number) || 0) * 0.97,
      }),
    },
  ],
  "break-even": [
    {
      label: "+10% giá bán",
      apply: (input) => ({
        ...input,
        pricePerUnit: ((input.pricePerUnit as number) || 0) * 1.1,
      }),
    },
    {
      label: "-5% chi phí biến đổi",
      apply: (input) => ({
        ...input,
        variableCostPerUnit: ((input.variableCostPerUnit as number) || 0) * 0.95,
      }),
    },
  ],
};

/**
 * ToolScenarios - Scenario toggles
 */
export function ToolScenarios({
  tool,
  baseInput,
  baseResult,
  onScenarioChange,
}: ToolScenariosProps) {
  const [activeScenario, setActiveScenario] = React.useState<string | null>(null);

  const scenarios = SCENARIOS[tool.slug] || [];

  if (scenarios.length === 0) return null;

  const handleScenarioClick = (scenario: (typeof scenarios)[0], index: number) => {
    const key = `${tool.slug}_${index}`;
    if (activeScenario === key) {
      setActiveScenario(null);
      onScenarioChange(baseInput);
    } else {
      setActiveScenario(key);
      const scenarioInput = scenario.apply(baseInput);
      onScenarioChange(scenarioInput);
    }
  };

  const scenarioResult = activeScenario
    ? computeTool(tool.slug, (() => {
        const index = parseInt(activeScenario.split("_")[1]);
        return scenarios[index].apply(baseInput);
      })())
    : null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold">Kịch bản giả định</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Xem kết quả khi thay đổi các yếu tố
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {scenarios.map((scenario, index) => {
          const key = `${tool.slug}_${index}`;
          const isActive = activeScenario === key;
          
          return (
            <Button
              key={index}
              type="button"
              variant={isActive ? "default" : "outline"}
              onClick={() => handleScenarioClick(scenario, index)}
            >
              {scenario.label}
            </Button>
          );
        })}
      </div>

      {/* Delta Display */}
      {scenarioResult && activeScenario && (
        <Card>
          <CardHeader>
            <CardTitle>So sánh kết quả</CardTitle>
            <CardDescription>
              Thay đổi so với kết quả ban đầu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scenarioResult.metrics.map((scenarioMetric) => {
                const baseMetric = baseResult.metrics.find(
                  (m) => m.name === scenarioMetric.name
                );
                if (!baseMetric) return null;

                const baseValue =
                  typeof baseMetric.value === "string"
                    ? parseFloat(baseMetric.value.replace(/[^\d.-]/g, ""))
                    : baseMetric.value;
                const scenarioValue =
                  typeof scenarioMetric.value === "string"
                    ? parseFloat(scenarioMetric.value.replace(/[^\d.-]/g, ""))
                    : scenarioMetric.value;

                if (typeof baseValue !== "number" || typeof scenarioValue !== "number") {
                  return null;
                }

                const delta = scenarioValue - baseValue;
                const deltaPercent =
                  baseValue !== 0 ? (delta / baseValue) * 100 : 0;

                const DeltaIcon =
                  delta > 0 ? ArrowUp : delta < 0 ? ArrowDown : Minus;

                return (
                  <div
                    key={scenarioMetric.name}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <span className="text-sm font-medium">
                      {scenarioMetric.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {baseMetric.value} {baseMetric.unit || ""}
                      </span>
                      <span
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium",
                          delta > 0 && "text-green-600",
                          delta < 0 && "text-red-600"
                        )}
                      >
                        <DeltaIcon className="h-4 w-4" />
                        {delta > 0 ? "+" : ""}
                        {delta.toFixed(2)} ({deltaPercent > 0 ? "+" : ""}
                        {deltaPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

