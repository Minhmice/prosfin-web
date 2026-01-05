/**
 * Cashflow Runway Computation
 * 
 * Computes cash runway, burn rate, and related metrics.
 */

import type { ToolInput, ToolResult } from "@/types/tools";

export function computeCashflowRunway(input: ToolInput): ToolResult {
  const currentCash = (input.currentCash as number) || 0;
  const monthlyRevenue = (input.monthlyRevenue as number) || 0;
  const monthlyCogs = (input.monthlyCogs as number) || 0;
  const monthlyOpex = (input.monthlyOpex as number) || 0;

  // Calculate monthly burn rate (negative cash flow)
  const monthlyBurnRate = monthlyCogs + monthlyOpex - monthlyRevenue;

  // Calculate runway (months until cash runs out)
  const runwayMonths =
    monthlyBurnRate > 0 ? currentCash / monthlyBurnRate : Infinity;

  // Calculate gross margin
  const grossMargin = monthlyRevenue > 0 ? (monthlyRevenue - monthlyCogs) / monthlyRevenue : 0;

  // Calculate net margin
  const netMargin = monthlyRevenue > 0 ? (monthlyRevenue - monthlyCogs - monthlyOpex) / monthlyRevenue : 0;

  const metrics = [
    {
      name: "runwayMonths",
      label: "Thời gian còn lại (tháng)",
      value: runwayMonths === Infinity ? "∞" : Math.round(runwayMonths * 10) / 10,
      unit: "tháng",
      threshold: {
        green: 6,
        amber: 3,
        red: 0,
      },
      description: "Số tháng còn lại trước khi hết tiền mặt",
    },
    {
      name: "monthlyBurnRate",
      label: "Tốc độ đốt tiền hàng tháng",
      value: Math.round(monthlyBurnRate),
      unit: "VND",
      description: monthlyBurnRate > 0 ? "Số tiền tiêu tốn mỗi tháng" : "Số tiền tạo ra mỗi tháng",
    },
    {
      name: "grossMargin",
      label: "Biên lợi nhuận gộp",
      value: `${Math.round(grossMargin * 100)}%`,
      description: "Tỷ lệ lợi nhuận gộp trên doanh thu",
    },
    {
      name: "netMargin",
      label: "Biên lợi nhuận ròng",
      value: `${Math.round(netMargin * 100)}%`,
      description: "Tỷ lệ lợi nhuận ròng trên doanh thu",
    },
  ];

  const flags = [];
  if (runwayMonths < 3 && runwayMonths !== Infinity) {
    flags.push({
      type: "error" as const,
      severity: "high" as const,
      message: "Cảnh báo: Thời gian còn lại dưới 3 tháng. Cần hành động ngay.",
      action: {
        label: "Xem dịch vụ quản lý dòng tiền",
        href: "/services?goal=cashflow",
      },
    });
  } else if (runwayMonths < 6 && runwayMonths !== Infinity) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "Thời gian còn lại dưới 6 tháng. Nên lập kế hoạch tài chính.",
      action: {
        label: "Xem dịch vụ tư vấn",
        href: "/services",
      },
    });
  }

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
      message: "Biên lợi nhuận ròng thấp. Có thể cần tối ưu hóa chi phí.",
    });
  }

  const recommendations = [];
  if (runwayMonths < 6 && runwayMonths !== Infinity) {
    recommendations.push({
      type: "service" as const,
      title: "Quản lý dòng tiền",
      description: "Dịch vụ giúp bạn kiểm soát và tối ưu dòng tiền hiệu quả",
      href: "/services?goal=cashflow",
      priority: "high" as const,
    });
  }

  if (netMargin < 0.1) {
    recommendations.push({
      type: "service" as const,
      title: "Tối ưu lợi nhuận",
      description: "Phân tích và tối ưu hóa cấu trúc chi phí để tăng lợi nhuận",
      href: "/services?goal=profit",
      priority: "high" as const,
    });
  }

  return {
    metrics,
    flags,
    recommendations,
    recommendedServiceSlugs: runwayMonths < 6 ? ["cashflow-management"] : [],
    recommendedPostIds: [],
    summary: `Doanh nghiệp có ${runwayMonths === Infinity ? "dòng tiền dương" : `${Math.round(runwayMonths * 10) / 10} tháng`} còn lại với tốc độ đốt tiền ${monthlyBurnRate > 0 ? `${Math.round(monthlyBurnRate / 1000000)} triệu VND/tháng` : "dòng tiền dương"}.`,
    insights: [
      runwayMonths < 6 && runwayMonths !== Infinity
        ? "Cần lập kế hoạch tài chính ngay để đảm bảo thanh khoản"
        : "Dòng tiền hiện tại ổn định",
      netMargin < 0.1
        ? "Có thể tối ưu hóa chi phí để tăng biên lợi nhuận"
        : "Biên lợi nhuận ở mức hợp lý",
    ].filter(Boolean) as string[],
  };
}

