/**
 * RFP Options
 * 
 * Service options for Request Proposal form.
 * Maps to 4 main services that use the same RFP layout.
 */

export interface RfpServiceOption {
  id: string;
  label: string;
  value: string; // Used in form and query params
  description?: string;
  team?: string; // Team/bucket that receives leads for this service
}

/**
 * RFP Service Options (4 services)
 */
export const RFP_SERVICES: RfpServiceOption[] = [
  {
    id: "cleardata",
    label: "ProsFIN ClearData™",
    value: "prosfin-cleardata",
    description: "Chuẩn hóa dữ liệu kế toán và báo cáo tài chính",
    team: "ClearData",
  },
  {
    id: "cfo-office",
    label: "ProsFIN CFO Office",
    value: "prosfin-cfo-office",
    description: "Dịch vụ CFO Office và tư vấn tài chính chiến lược",
    team: "CFO Office",
  },
  {
    id: "oneledger",
    label: "ProsFIN OneLedger™",
    value: "prosfin-oneledger",
    description: "Hệ thống kiểm soát nội bộ và báo cáo quản trị",
    team: "OneLedger",
  },
  {
    id: "performance-mentor",
    label: "ProsFIN Performance Mentor",
    value: "prosfin-performance-mentor",
    description: "Mentoring và phát triển đội ngũ tài chính",
    team: "Performance Mentor",
  },
];

/**
 * Get service option by value
 */
export function getRfpServiceByValue(value: string): RfpServiceOption | undefined {
  return RFP_SERVICES.find((service) => service.value === value);
}

/**
 * Get service option by id
 */
export function getRfpServiceById(id: string): RfpServiceOption | undefined {
  return RFP_SERVICES.find((service) => service.id === id);
}

/**
 * Validate service value
 */
export function isValidRfpService(value: string): boolean {
  return RFP_SERVICES.some((service) => service.value === value);
}

