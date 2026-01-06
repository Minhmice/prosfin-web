/**
 * Personalization Engine
 * 
 * Rule-based personalization based on persona, trigger events, and scan results.
 */

import type { ModuleConfig, AcceptanceGate } from "@/content/services/types";

export type Persona = "owner" | "cfo" | "chief-accountant" | "finance-team";
export type TriggerEvent = "bank_loan" | "fundraising" | "mna" | "compliance_pressure";

export interface ScanResult {
  riskLevel: "low" | "medium" | "high" | "critical";
  topRisks: string[];
  recommendedModuleIds: string[];
  recommendedGateId?: string;
}

export interface PersonalizationInput {
  persona?: Persona;
  triggerEvents?: TriggerEvent[];
  scan?: ScanResult;
}

export interface PersonalizedView {
  heroOverrides?: {
    subhead?: string;
  };
  pinnedModuleIds?: string[]; // Pin 2 modules đầu
  ctaVariant?: "book_assessment" | "download_scope";
  proofVariant?: "trust" | "speed" | "readiness";
  recommendedGateId?: string;
  recommendedBundleId?: string;
}

/**
 * Get personalized view based on inputs
 */
export function getPersonalizedView(input: PersonalizationInput): PersonalizedView {
  const { persona, triggerEvents = [], scan } = input;
  const view: PersonalizedView = {};

  // Hero subhead personalization by persona
  if (persona) {
    switch (persona) {
      case "owner":
        view.heroOverrides = {
          subhead:
            "Chuẩn hoá hệ thống kế toán để bạn điều hành bằng số liệu thật, giảm rủi ro và sẵn sàng vay vốn/gọi vốn.",
        };
        break;
      case "cfo":
        view.heroOverrides = {
          subhead:
            "Báo cáo quản trị CFO-ready trong 5 ngày. Từ số liệu kế toán thuế → báo cáo đáng tin, KPI cảnh báo sớm.",
        };
        break;
      case "chief-accountant":
        view.heroOverrides = {
          subhead:
            "Chuẩn hoá dữ liệu, workflow và kiểm soát nội bộ. Giảm phụ thuộc vào 1 người, scale theo giai đoạn phát triển.",
        };
        break;
    }
  }

  // Proof variant by trigger events
  if (triggerEvents.includes("mna") || triggerEvents.includes("fundraising")) {
    view.proofVariant = "readiness";
  } else if (triggerEvents.includes("bank_loan")) {
    view.proofVariant = "trust";
  } else {
    view.proofVariant = "speed";
  }

  // Module pinning and gate recommendation from scan
  if (scan) {
    // Pin top 2 recommended modules
    view.pinnedModuleIds = scan.recommendedModuleIds.slice(0, 2);
    view.recommendedGateId = scan.recommendedGateId;

    // CTA variant based on risk level
    if (scan.riskLevel === "critical" || scan.riskLevel === "high") {
      view.ctaVariant = "book_assessment";
    } else {
      view.ctaVariant = "download_scope";
    }

    // Bundle recommendation based on top risks and trigger events
    if (triggerEvents.includes("mna") || triggerEvents.includes("fundraising")) {
      view.recommendedBundleId = "bundle-d"; // Transaction Readiness
    } else if (scan.topRisks.includes("control_weakness") || scan.topRisks.includes("process_bottlenecks")) {
      view.recommendedBundleId = "bundle-b"; // Controls Pack
    } else if (scan.topRisks.includes("no_management_reporting")) {
      view.recommendedBundleId = "bundle-c"; // CFO Pack
    } else {
      view.recommendedBundleId = "bundle-a"; // Foundation Pack
    }
  }

  return view;
}

/**
 * Get why recommended reasons (min 2 bullets)
 */
export function getWhyRecommendedReasons(
  scan: ScanResult,
  modules: ModuleConfig[]
): string[] {
  const reasons: string[] = [];

  // Map top risks to reasons
  scan.topRisks.forEach((risk) => {
    switch (risk) {
      case "data_integrity":
        reasons.push("Số liệu không nhất quán giữa các bộ sổ");
        break;
      case "no_management_reporting":
        reasons.push("Thiếu báo cáo quản trị để ra quyết định");
        break;
      case "process_bottlenecks":
        reasons.push("Quy trình chứng từ chậm, closing > 10 ngày");
        break;
      case "control_weakness":
        reasons.push("Kiểm soát nội bộ yếu, dễ sai sót");
        break;
      case "org_dependency":
        reasons.push("Phụ thuộc mạnh vào 1 người, rủi ro nhân sự");
        break;
    }
  });

  // Add module-specific reasons
  scan.recommendedModuleIds.slice(0, 2).forEach((moduleId) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      reasons.push(`Module ${module.name} phù hợp với tình trạng hiện tại`);
    }
  });

  // Ensure min 2 bullets
  if (reasons.length < 2) {
    reasons.push("Chuẩn hoá hệ thống kế toán để giảm rủi ro và tăng hiệu quả");
    reasons.push("Sẵn sàng cho các giai đoạn phát triển tiếp theo");
  }

  return reasons.slice(0, 4); // Max 4 reasons
}

