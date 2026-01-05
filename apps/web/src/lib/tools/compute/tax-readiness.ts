/**
 * Tax Readiness Computation
 * 
 * Computes tax readiness score based on compliance factors.
 */

import type { ToolInput, ToolResult } from "@/types/tools";

export function computeTaxReadiness(input: ToolInput): ToolResult {
  const hasAccountant = (input.hasAccountant as boolean) || false;
  const hasTaxSoftware = (input.hasTaxSoftware as boolean) || false;
  const monthlyBookkeeping = (input.monthlyBookkeeping as boolean) || false;
  const quarterlyReports = (input.quarterlyReports as boolean) || false;
  const taxDeductions = (input.taxDeductions as boolean) || false;
  const complianceTraining = (input.complianceTraining as boolean) || false;

  const factors = [
    hasAccountant,
    hasTaxSoftware,
    monthlyBookkeeping,
    quarterlyReports,
    taxDeductions,
    complianceTraining,
  ];

  const score = (factors.filter(Boolean).length / factors.length) * 100;

  const metrics = [
    {
      name: "readinessScore",
      label: "Điểm sẵn sàng tuân thủ thuế",
      value: Math.round(score),
      unit: "/100",
      threshold: {
        green: 80,
        amber: 50,
        red: 0,
      },
      description: "Điểm đánh giá mức độ sẵn sàng tuân thủ thuế",
    },
  ];

  const flags = [];
  if (score < 50) {
    flags.push({
      type: "error" as const,
      severity: "high" as const,
      message: "Mức độ sẵn sàng tuân thủ thuế thấp. Có nguy cơ vi phạm quy định.",
      action: {
        label: "Xem dịch vụ tuân thủ thuế",
        href: "/services?goal=compliance",
      },
    });
  } else if (score < 80) {
    flags.push({
      type: "warning" as const,
      severity: "medium" as const,
      message: "Mức độ sẵn sàng ở mức trung bình. Có thể cần cải thiện.",
    });
  }

  if (!hasAccountant) {
    flags.push({
      type: "info" as const,
      severity: "low" as const,
      message: "Có kế toán chuyên nghiệp sẽ giúp đảm bảo tuân thủ tốt hơn.",
    });
  }

  if (!monthlyBookkeeping) {
    flags.push({
      type: "info" as const,
      severity: "low" as const,
      message: "Ghi sổ sách hàng tháng đều đặn giúp tránh sai sót và vi phạm.",
    });
  }

  const recommendations = [];
  if (score < 80) {
    recommendations.push({
      type: "service" as const,
      title: "Dịch vụ tuân thủ thuế",
      description: "Hỗ trợ đảm bảo tuân thủ đầy đủ quy định thuế",
      href: "/services?goal=compliance",
      priority: score < 50 ? ("high" as const) : ("medium" as const),
    });
  }

  if (!hasAccountant) {
    recommendations.push({
      type: "service" as const,
      title: "Chuẩn hóa kế toán",
      description: "Xây dựng hệ thống kế toán chuyên nghiệp",
      href: "/services?goal=compliance",
      priority: "medium" as const,
    });
  }

  return {
    metrics,
    flags,
    recommendations,
    recommendedServiceSlugs: score < 80 ? ["compliance-audit", "accounting-standardization"] : [],
    recommendedPostIds: [],
    summary: `Điểm sẵn sàng tuân thủ thuế: ${Math.round(score)}/100. ${score >= 80 ? "Mức độ tốt" : score >= 50 ? "Mức độ trung bình" : "Cần cải thiện"}.`,
    insights: [
      score >= 80
        ? "Doanh nghiệp có mức độ sẵn sàng tuân thủ thuế tốt"
        : "Có thể cải thiện bằng cách: có kế toán chuyên nghiệp, sử dụng phần mềm kế toán, ghi sổ sách đều đặn",
      !hasAccountant && "Có kế toán chuyên nghiệp sẽ giúp đảm bảo tuân thủ tốt hơn",
      !monthlyBookkeeping && "Ghi sổ sách hàng tháng đều đặn giúp tránh sai sót",
    ].filter(Boolean) as string[],
  };
}

