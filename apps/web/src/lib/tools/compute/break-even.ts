/**
 * Break Even Computation
 * 
 * Computes break-even point and contribution margin.
 */

import type { ToolInput, ToolResult } from "@/types/tools";

export function computeBreakEven(input: ToolInput): ToolResult {
  const fixedCosts = (input.fixedCosts as number) || 0;
  const variableCostPerUnit = (input.variableCostPerUnit as number) || 0;
  const pricePerUnit = (input.pricePerUnit as number) || 0;

  const contributionMarginPerUnit = pricePerUnit - variableCostPerUnit;
  const contributionMarginRatio =
    pricePerUnit > 0 ? contributionMarginPerUnit / pricePerUnit : 0;

  const breakEvenUnits =
    contributionMarginPerUnit > 0 ? fixedCosts / contributionMarginPerUnit : 0;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  const metrics = [
    {
      name: "breakEvenUnits",
      label: "Số lượng hòa vốn",
      value: Math.ceil(breakEvenUnits),
      unit: "đơn vị",
      description: "Số lượng sản phẩm cần bán để hòa vốn",
    },
    {
      name: "breakEvenRevenue",
      label: "Doanh thu hòa vốn",
      value: Math.round(breakEvenRevenue),
      unit: "VND",
      description: "Doanh thu cần đạt để hòa vốn",
    },
    {
      name: "contributionMarginPerUnit",
      label: "Contribution margin mỗi đơn vị",
      value: Math.round(contributionMarginPerUnit),
      unit: "VND",
      description: "Lợi nhuận đóng góp mỗi đơn vị sản phẩm",
    },
    {
      name: "contributionMarginRatio",
      label: "Tỷ lệ contribution margin",
      value: `${Math.round(contributionMarginRatio * 100)}%`,
      description: "Tỷ lệ lợi nhuận đóng góp trên giá bán",
    },
  ];

  const flags = [];
  if (contributionMarginPerUnit <= 0) {
    flags.push({
      type: "error" as const,
      severity: "high" as const,
      message: "Giá bán không đủ để cover chi phí biến đổi. Cần xem xét lại giá hoặc chi phí.",
    });
  } else if (contributionMarginRatio < 0.3) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "Contribution margin thấp. Có thể cần tăng giá hoặc giảm chi phí biến đổi.",
    });
  }

  const recommendations = [];
  if (contributionMarginPerUnit <= 0) {
    recommendations.push({
      type: "service" as const,
      title: "Tối ưu giá và chi phí",
      description: "Phân tích cấu trúc giá và chi phí để đảm bảo lợi nhuận",
      href: "/services?goal=profit",
      priority: "high" as const,
    });
  }

  return {
    metrics,
    flags,
    recommendations,
    recommendedServiceSlugs: contributionMarginPerUnit <= 0 ? ["profit-optimization"] : [],
    recommendedPostIds: [],
    summary: `Cần bán ${Math.ceil(breakEvenUnits)} đơn vị (doanh thu ${Math.round(breakEvenRevenue / 1000000)} triệu VND) để hòa vốn.`,
    insights: [
      contributionMarginRatio > 0.3
        ? "Contribution margin ở mức tốt"
        : "Có thể cần tối ưu hóa contribution margin",
      breakEvenUnits > 0
        ? `Mỗi đơn vị bán thêm sau điểm hòa vốn sẽ tạo ra ${Math.round(contributionMarginPerUnit / 1000)}k VND lợi nhuận`
        : "Cần xem xét lại cấu trúc giá và chi phí",
    ],
  };
}

