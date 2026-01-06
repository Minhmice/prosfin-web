/**
 * Data Request List Templates
 * 
 * Mapping: gateId/moduleId → list tài liệu cần cung cấp.
 * Config-first approach.
 */

export interface DataRequestItem {
  id: string;
  label: string;
  required: boolean;
  description?: string;
}

export interface DataRequestTemplate {
  gateId?: string;
  moduleId?: string;
  items: DataRequestItem[];
}

/**
 * Data request templates by gate
 */
export const dataRequestByGate: Record<string, DataRequestItem[]> = {
  G0: [
    { id: "org-chart", label: "Sơ đồ tổ chức phòng kế toán", required: true },
    { id: "system-list", label: "Danh sách hệ thống kế toán đang dùng", required: true },
    { id: "chart-of-accounts", label: "Chart of Accounts (nếu có)", required: false },
  ],
  G1: [
    { id: "balance-sheet", label: "Bảng cân đối kế toán gần nhất", required: true },
    { id: "income-statement", label: "Báo cáo kết quả kinh doanh gần nhất", required: true },
    { id: "cash-flow", label: "Báo cáo lưu chuyển tiền tệ (nếu có)", required: false },
    { id: "trial-balance", label: "Bảng cân đối số phát sinh", required: true },
  ],
  G2: [
    { id: "accounting-policies", label: "Chính sách kế toán hiện tại", required: false },
    { id: "internal-standards", label: "Quy định nội bộ về kế toán", required: false },
    { id: "mapping-docs", label: "Tài liệu mapping tài khoản (nếu có)", required: false },
  ],
  G3: [
    { id: "closing-checklist", label: "Checklist đóng sổ hiện tại", required: false },
    { id: "process-flow", label: "Sơ đồ quy trình đóng sổ", required: false },
    { id: "raci-chart", label: "RACI chart cho closing process", required: false },
  ],
  G4: [
    { id: "control-docs", label: "Tài liệu kiểm soát nội bộ hiện tại", required: false },
    { id: "risk-assessment", label: "Đánh giá rủi ro (nếu có)", required: false },
  ],
  G5: [
    { id: "current-reports", label: "Báo cáo quản trị hiện tại (mẫu)", required: false },
    { id: "kpi-list", label: "Danh sách KPI đang theo dõi", required: false },
  ],
};

/**
 * Data request templates by module
 */
export const dataRequestByModule: Record<string, DataRequestItem[]> = {
  M1: [
    { id: "all-ledgers", label: "Tất cả các sổ kế toán hiện tại", required: true },
    { id: "reconciliation", label: "Bảng đối chiếu số dư", required: true },
  ],
  M2: [
    { id: "coa", label: "Chart of Accounts đầy đủ", required: true },
    { id: "account-mapping", label: "Mapping tài khoản giữa các hệ thống", required: false },
  ],
  M3: [
    { id: "closing-process", label: "Quy trình đóng sổ hiện tại", required: true },
    { id: "timeline", label: "Timeline đóng sổ hàng tháng", required: false },
  ],
  M4: [
    { id: "control-docs", label: "Tài liệu kiểm soát nội bộ", required: false },
    { id: "audit-reports", label: "Báo cáo kiểm toán (nếu có)", required: false },
  ],
  M5: [
    { id: "report-templates", label: "Mẫu báo cáo hiện tại", required: true },
    { id: "kpi-definitions", label: "Định nghĩa KPI", required: false },
  ],
};

/**
 * Get data request list for gate/module
 */
export function getDataRequestList(gateId?: string, moduleId?: string): DataRequestItem[] {
  const items: DataRequestItem[] = [];

  if (gateId && dataRequestByGate[gateId]) {
    items.push(...dataRequestByGate[gateId]);
  }

  if (moduleId && dataRequestByModule[moduleId]) {
    items.push(...dataRequestByModule[moduleId]);
  }

  // Remove duplicates by id
  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.id, item])).values()
  );

  return uniqueItems;
}

/**
 * Get all data requests for multiple gates/modules
 */
export function getDataRequestListForMultiple(
  gateIds?: string[],
  moduleIds?: string[]
): DataRequestItem[] {
  const items: DataRequestItem[] = [];

  gateIds?.forEach((gateId) => {
    if (dataRequestByGate[gateId]) {
      items.push(...dataRequestByGate[gateId]);
    }
  });

  moduleIds?.forEach((moduleId) => {
    if (dataRequestByModule[moduleId]) {
      items.push(...dataRequestByModule[moduleId]);
    }
  });

  // Remove duplicates by id
  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.id, item])).values()
  );

  return uniqueItems;
}

