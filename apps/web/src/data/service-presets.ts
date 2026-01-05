/**
 * Service Presets Data
 * 
 * Curated filter presets for quick discovery.
 */

import type { ExplorerFilters } from "@/lib/services-explorer/params";

export interface ServicePreset {
  id: string;
  label: string;
  description: string;
  filters: ExplorerFilters;
  icon?: string;
}

/**
 * Hardcoded presets for Phase 3
 */
export const SERVICE_PRESETS: ServicePreset[] = [
  {
    id: "owner-cashflow",
    label: "Chủ DN: cần kiểm soát dòng tiền",
    description: "Dịch vụ giúp chủ doanh nghiệp quản lý và tối ưu dòng tiền hiệu quả",
    filters: {
      audience: "owner",
      goal: "cashflow",
    },
  },
  {
    id: "cfo-profit",
    label: "CFO: tối ưu lợi nhuận",
    description: "Giải pháp tài chính giúp CFO tối ưu hóa lợi nhuận và hiệu quả kinh doanh",
    filters: {
      audience: "finance_team",
      goal: "profit",
    },
  },
  {
    id: "accountant-compliance",
    label: "Kế toán trưởng: chuẩn hóa sổ sách & tuân thủ",
    description: "Dịch vụ hỗ trợ kế toán trưởng chuẩn hóa hệ thống kế toán và đảm bảo tuân thủ",
    filters: {
      audience: "finance_team",
      goal: "compliance",
      format: "audit",
    },
  },
  {
    id: "owner-tax",
    label: "Chủ DN: tối ưu thuế",
    description: "Tư vấn và hỗ trợ tối ưu hóa nghĩa vụ thuế hợp pháp cho doanh nghiệp",
    filters: {
      audience: "owner",
      goal: "tax",
    },
  },
  {
    id: "finance-team-risk",
    label: "Đội ngũ tài chính: kiểm soát rủi ro",
    description: "Giải pháp giúp đội ngũ tài chính kiểm soát và quản lý rủi ro hiệu quả",
    filters: {
      audience: "finance_team",
      goal: "risk",
    },
  },
];

/**
 * Get preset by ID
 */
export function getPresetById(id: string): ServicePreset | undefined {
  return SERVICE_PRESETS.find((p) => p.id === id);
}

/**
 * Get all presets
 */
export function getAllPresets(): ServicePreset[] {
  return SERVICE_PRESETS;
}

