/**
 * Profit Levers Computation
 * 
 * Computes profit margins and sensitivity analysis.
 */

import type { ToolInput, ToolResult } from "@/types/tools";

export function computeProfitLevers(input: ToolInput): ToolResult {
  const revenue = (input.revenue as number) || 0;
  const cogs = (input.cogs as number) || 0;
  const opex = (input.opex as number) || 0;

  const grossProfit = revenue - cogs;
  const netProfit = revenue - cogs - opex;

  const grossMargin = revenue > 0 ? grossProfit / revenue : 0;
  const netMargin = revenue > 0 ? netProfit / revenue : 0;

  // Sensitivity analysis
  const priceSensitivity = revenue > 0 ? (revenue * 0.05) / netProfit : 0;
  const cogsSensitivity = cogs > 0 ? (cogs * 0.03) / netProfit : 0;
  const opexSensitivity = opex > 0 ? (opex * 0.02) / netProfit : 0;

  const metrics = [
    {
      name: "grossMargin",
      label: "Biên lợi nhuận gộp",
      value: `${Math.round(grossMargin * 100)}%`,
      threshold: {
        green: 0.4,
        amber: 0.2,
        red: 0,
      },
      description: "Tỷ lệ lợi nhuận gộp trên doanh thu",
    },
    {
      name: "netMargin",
      label: "Biên lợi nhuận ròng",
      value: `${Math.round(netMargin * 100)}%`,
      threshold: {
        green: 0.2,
        amber: 0.1,
        red: 0,
      },
      description: "Tỷ lệ lợi nhuận ròng trên doanh thu",
    },
    {
      name: "grossProfit",
      label: "Lợi nhuận gộp",
      value: Math.round(grossProfit),
      unit: "VND",
    },
    {
      name: "netProfit",
      label: "Lợi nhuận ròng",
      value: Math.round(netProfit),
      unit: "VND",
    },
  ];

  const flags = [];
  if (netMargin < 0) {
    flags.push({
      type: "error" as const,
      severity: "high" as const,
      message: "Doanh nghiệp đang lỗ. Cần xem xét lại cấu trúc chi phí.",
    });
  } else if (netMargin < 0.1) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "Biên lợi nhuận ròng thấp. Có thể cần tối ưu hóa.",
    });
  }

  if (grossMargin < 0.2) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "Biên lợi nhuận gộp thấp. Có thể cần xem xét lại giá bán hoặc giá vốn.",
    });
  }

  const recommendations = [];
  if (netMargin < 0.1) {
    recommendations.push({
      type: "service" as const,
      title: "Tối ưu lợi nhuận",
      description: "Phân tích và tối ưu hóa cấu trúc chi phí",
      href: "/services?goal=profit",
      priority: "high" as const,
    });
  }

  return {
    metrics,
    flags,
    recommendations,
    recommendedServiceSlugs: netMargin < 0.1 ? ["profit-optimization"] : [],
    recommendedPostIds: [],
    summary: `Biên lợi nhuận gộp ${Math.round(grossMargin * 100)}%, biên lợi nhuận ròng ${Math.round(netMargin * 100)}%.`,
    insights: [
      `Tăng giá 5% sẽ tăng lợi nhuận khoảng ${Math.round(priceSensitivity * 100)}%`,
      `Giảm giá vốn 3% sẽ tăng lợi nhuận khoảng ${Math.round(cogsSensitivity * 100)}%`,
      `Giảm chi phí hoạt động 2% sẽ tăng lợi nhuận khoảng ${Math.round(opexSensitivity * 100)}%`,
    ],
  };
}

