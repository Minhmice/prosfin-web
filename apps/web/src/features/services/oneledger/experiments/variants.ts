/**
 * Variant Mappings
 * 
 * Maps experiment variants to config overrides for hero, scan, and CTA.
 */

import type { VariantKey } from "@/experiments/experiments.types";
import type { ScanConfig } from "@/content/services/types";

/**
 * Hero value prop variants
 */
export function getHeroVariantOverrides(variant: VariantKey): {
  h1?: string;
  subhead?: string;
} {
  switch (variant) {
    case "v1":
      // "One source of truth" (trust + compliance)
      return {
        h1: "OneLedger™ — Một nguồn dữ liệu duy nhất. Nhiều báo cáo đúng mục tiêu.",
        subhead:
          "Chuẩn hoá hệ thống kế toán để CEO/CFO điều hành bằng số liệu thật, giảm rủi ro thuế–pháp lý và sẵn sàng vay vốn/gọi vốn/M&A.",
      };
    case "v2":
      // "CFO-ready reporting" (decision speed)
      return {
        h1: "OneLedger™ — Báo cáo quản trị CFO-ready trong 5 ngày.",
        subhead:
          "Từ số liệu kế toán thuế → báo cáo quản trị đáng tin, KPI cảnh báo sớm, sẵn sàng ra quyết định chiến lược.",
      };
    case "v3":
      // "High-stakes readiness" (loan/fundraising/M&A)
      return {
        h1: "OneLedger™ — Sẵn sàng vay vốn, gọi vốn, M&A trong 60 ngày.",
        subhead:
          "Chuẩn hoá dữ liệu kế toán, audit trail minh bạch, reporting pack đúng chuẩn thẩm định. Không còn “nhiều sổ”.",
      };
    default:
      return {};
  }
}

/**
 * Scan design variants
 */
export function getScanVariantOverrides(
  variant: VariantKey,
  baseConfig: ScanConfig
): Partial<ScanConfig> {
  switch (variant) {
    case "v1":
      // 8 câu (fast) - take first 8 questions
      return {
        ...baseConfig,
        questions: baseConfig.questions.slice(0, 8),
      };
    case "v2":
      // 10-12 câu (richer classification) - take all questions
      return baseConfig;
    case "v3":
      // 2-step scan (triage → deep dive) - same as v2 for now, can be enhanced later
      return baseConfig;
    default:
      return baseConfig;
  }
}

/**
 * CTA copy variants
 */
export function getCtaVariantOverrides(variant: VariantKey): {
  primaryCta?: string;
  secondaryCta?: string;
} {
  switch (variant) {
    case "v1":
      return {
        primaryCta: "Đăng ký khảo sát OneLedger™ (30')",
        secondaryCta: "Nhận roadmap & scope nghiệm thu",
      };
    case "v2":
      return {
        primaryCta: "Nhận roadmap & scope nghiệm thu",
        secondaryCta: "Đặt lịch đánh giá: số liệu DN có đáng tin?",
      };
    case "v3":
      return {
        primaryCta: "Đặt lịch đánh giá: số liệu DN có đáng tin?",
        secondaryCta: "Đăng ký khảo sát OneLedger™ (30')",
      };
    default:
      return {};
  }
}

