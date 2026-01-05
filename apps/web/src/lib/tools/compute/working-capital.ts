/**
 * Working Capital Computation
 * 
 * Computes working capital and Cash Conversion Cycle (CCC).
 */

import type { ToolInput, ToolResult } from "@/types/tools";

export function computeWorkingCapital(input: ToolInput): ToolResult {
  const inventory = (input.inventory as number) || 0;
  const receivables = (input.receivables as number) || 0;
  const payables = (input.payables as number) || 0;
  const revenue = (input.revenue as number) || 0;
  const cogs = (input.cogs as number) || 0;

  const workingCapital = inventory + receivables - payables;

  // Calculate days (assuming annual figures, convert to daily)
  const daysInventory = cogs > 0 ? (inventory / cogs) * 365 : 0;
  const daysReceivable = revenue > 0 ? (receivables / revenue) * 365 : 0;
  const daysPayable = cogs > 0 ? (payables / cogs) * 365 : 0;

  const ccc = daysInventory + daysReceivable - daysPayable;

  const metrics = [
    {
      name: "workingCapital",
      label: "Vốn lưu động",
      value: Math.round(workingCapital),
      unit: "VND",
      threshold: {
        green: 0,
        amber: -10000000,
        red: -50000000,
      },
      description: "Vốn lưu động = Hàng tồn kho + Phải thu - Phải trả",
    },
    {
      name: "daysInventory",
      label: "Số ngày tồn kho",
      value: Math.round(daysInventory),
      unit: "ngày",
      description: "Số ngày trung bình hàng tồn kho",
    },
    {
      name: "daysReceivable",
      label: "Số ngày phải thu",
      value: Math.round(daysReceivable),
      unit: "ngày",
      description: "Số ngày trung bình thu hồi công nợ",
    },
    {
      name: "daysPayable",
      label: "Số ngày phải trả",
      value: Math.round(daysPayable),
      unit: "ngày",
      description: "Số ngày trung bình trả nợ",
    },
    {
      name: "ccc",
      label: "Cash Conversion Cycle (CCC)",
      value: Math.round(ccc),
      unit: "ngày",
      threshold: {
        green: 30,
        amber: 60,
        red: 90,
      },
      description: "Chu kỳ chuyển đổi tiền mặt",
    },
  ];

  const flags = [];
  if (workingCapital < 0) {
    flags.push({
      type: "error" as const,
      severity: "high" as const,
      message: "Vốn lưu động âm. Có thể gặp khó khăn thanh khoản.",
      action: {
        label: "Xem dịch vụ quản lý vốn lưu động",
        href: "/services?goal=cashflow",
      },
    });
  }

  if (ccc > 90) {
    flags.push({
      type: "warning" as const,
      severity: "high" as const,
      message: "CCC quá dài (>90 ngày). Cần tối ưu hóa chu kỳ tiền mặt.",
    });
  } else if (ccc > 60) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "CCC khá dài. Có thể cần cải thiện quản lý công nợ.",
    });
  }

  if (daysReceivable > 60) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "Thời gian thu hồi công nợ dài. Cần cải thiện quy trình thu tiền.",
    });
  }

  const recommendations = [];
  if (workingCapital < 0 || ccc > 60) {
    recommendations.push({
      type: "service" as const,
      title: "Quản lý vốn lưu động",
      description: "Tối ưu hóa vốn lưu động và chu kỳ tiền mặt",
      href: "/services?goal=cashflow",
      priority: "high" as const,
    });
  }

  return {
    metrics,
    flags,
    recommendations,
    recommendedServiceSlugs: workingCapital < 0 || ccc > 60 ? ["working-capital-optimization"] : [],
    recommendedPostIds: [],
    summary: `Vốn lưu động: ${Math.round(workingCapital / 1000000)} triệu VND. CCC: ${Math.round(ccc)} ngày.`,
    insights: [
      workingCapital < 0
        ? "Vốn lưu động âm có thể gây khó khăn thanh khoản"
        : "Vốn lưu động ở mức hợp lý",
      ccc > 60
        ? "Có thể tối ưu hóa CCC bằng cách giảm thời gian tồn kho và phải thu, tăng thời gian phải trả"
        : "CCC ở mức tốt",
    ],
  };
}

