/**
 * Finance Health Check Computation
 * 
 * Computes financial health score based on persona and factors.
 */

import type { ToolInput, ToolResult } from "@/types/tools";

export function computeFinanceHealthCheck(input: ToolInput): ToolResult {
  const persona = (input.persona as "owner" | "cfo" | "finance_team") || "owner";
  const cashflowStable = (input.cashflowStable as boolean) || false;
  const hasForecast = (input.hasForecast as boolean) || false;
  const hasControls = (input.hasControls as boolean) || false;
  const hasReporting = (input.hasReporting as boolean) || false;
  const hasCompliance = (input.hasCompliance as boolean) || false;

  const factors = [
    cashflowStable,
    hasForecast,
    hasControls,
    hasReporting,
    hasCompliance,
  ];

  const baseScore = (factors.filter(Boolean).length / factors.length) * 100;

  // Adjust score based on persona expectations
  let score = baseScore;
  if (persona === "cfo") {
    // CFO expected to have higher standards
    score = baseScore * 0.9;
  } else if (persona === "finance_team") {
    score = baseScore * 0.95;
  }

  const metrics = [
    {
      name: "healthScore",
      label: "Financial Health Score",
      value: Math.round(score),
      unit: "/100",
      threshold: {
        green: 80,
        amber: 50,
        red: 0,
      },
      description: "Điểm đánh giá sức khỏe tài chính tổng thể",
    },
  ];

  const flags = [];
  if (score < 50) {
    flags.push({
      type: "error" as const,
      severity: "high" as const,
      message: "Sức khỏe tài chính ở mức thấp. Cần cải thiện ngay.",
      action: {
        label: "Xem dịch vụ tư vấn",
        href: "/services",
      },
    });
  } else if (score < 80) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "Sức khỏe tài chính ở mức trung bình. Có thể cải thiện.",
    });
  }

  if (!cashflowStable) {
    flags.push({
      type: "warning" as const,
      severity: "high" as const,
      message: "Dòng tiền không ổn định. Cần quản lý dòng tiền tốt hơn.",
      action: {
        label: "Xem dịch vụ quản lý dòng tiền",
        href: "/services?goal=cashflow",
      },
    });
  }

  if (!hasForecast) {
    flags.push({
      type: "info" as const,
      severity: "low" as const,
      message: "Có dự báo tài chính giúp lập kế hoạch tốt hơn.",
    });
  }

  const recommendations = [];
  if (score < 80) {
    recommendations.push({
      type: "service" as const,
      title: "Khám sức khỏe tài chính 360°",
      description: "Đánh giá toàn diện sức khỏe tài chính và đưa ra lộ trình cải thiện",
      href: "/services?slug=health-check-360",
      priority: score < 50 ? ("high" as const) : ("medium" as const),
    });
  }

  if (!cashflowStable) {
    recommendations.push({
      type: "service" as const,
      title: "Quản lý dòng tiền",
      description: "Tối ưu hóa quản lý dòng tiền",
      href: "/services?goal=cashflow",
      priority: "high" as const,
    });
  }

  if (!hasControls) {
    recommendations.push({
      type: "service" as const,
      title: "Kiểm soát nội bộ",
      description: "Xây dựng hệ thống kiểm soát nội bộ",
      href: "/services?goal=risk",
      priority: "medium" as const,
    });
  }

  return {
    metrics,
    flags,
    recommendations,
    recommendedServiceSlugs:
      score < 80
        ? ["health-check-360", "cashflow-management"]
        : cashflowStable
          ? []
          : ["cashflow-management"],
    recommendedPostIds: [],
    summary: `Financial Health Score: ${Math.round(score)}/100. ${score >= 80 ? "Sức khỏe tài chính tốt" : score >= 50 ? "Sức khỏe tài chính trung bình" : "Cần cải thiện"}.`,
    insights: [
      score >= 80
        ? "Sức khỏe tài chính ở mức tốt. Tiếp tục duy trì và cải thiện."
        : "Có thể cải thiện bằng cách: quản lý dòng tiền tốt hơn, có dự báo tài chính, xây dựng hệ thống kiểm soát nội bộ",
      !cashflowStable && "Quản lý dòng tiền ổn định là nền tảng của sức khỏe tài chính",
      !hasForecast && "Dự báo tài chính giúp lập kế hoạch và ra quyết định tốt hơn",
    ].filter(Boolean) as string[],
  };
}

