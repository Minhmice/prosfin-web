/**
 * Capabilities Content Data
 * 
 * This file contains capability groupings for services.
 * Maps services into Big4-style capability groups.
 */

export interface Capability {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  coverImage?: string;
  serviceSlugs: string[];
  relatedPostIds: string[];
  relatedCaseStudySlugs: string[];
  relatedToolSlugs: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    id: "financial-data-bookkeeping",
    slug: "financial-data-bookkeeping",
    name: "Financial Data & Bookkeeping Integrity",
    description:
      "Chuẩn hóa dữ liệu tài chính, đối chiếu công nợ/kho/giá vốn, và đảm bảo tính toàn vẹn của sổ sách kế toán.",
    shortDescription:
      "Chuẩn hóa dữ liệu tài chính và đảm bảo tính toàn vẹn sổ sách",
    serviceSlugs: ["cleardata", "consulting"],
    relatedPostIds: [],
    relatedCaseStudySlugs: [],
    relatedToolSlugs: [],
  },
  {
    id: "finance-function-reporting",
    slug: "finance-function-reporting",
    name: "Finance Function & Reporting",
    description:
      "Xây dựng hệ thống báo cáo quản trị, dashboard, và quy trình review định kỳ cho bộ phận tài chính.",
    shortDescription:
      "Báo cáo quản trị, dashboard và quy trình review định kỳ",
    serviceSlugs: ["advisor", "execution-coaching"],
    relatedPostIds: [],
    relatedCaseStudySlugs: [],
    relatedToolSlugs: [],
  },
  {
    id: "cashflow-working-capital",
    slug: "cashflow-working-capital",
    name: "Cashflow & Working Capital",
    description:
      "Dự báo dòng tiền, quản lý runway/burn rate, và tối ưu chu kỳ công nợ (CCC).",
    shortDescription: "Dự báo dòng tiền và tối ưu vốn lưu động",
    serviceSlugs: ["consulting", "execution-coaching"],
    relatedPostIds: [],
    relatedCaseStudySlugs: [],
    relatedToolSlugs: ["cashflow-forecast", "ccc-calculator"],
  },
  {
    id: "profitability-cost-control",
    slug: "profitability-cost-control",
    name: "Profitability & Cost Control",
    description:
      "Phân tích mô hình chi phí, contribution margin, và break-even để tối ưu lợi nhuận.",
    shortDescription: "Phân tích chi phí và tối ưu lợi nhuận",
    serviceSlugs: ["consulting", "execution-coaching"],
    relatedPostIds: [],
    relatedCaseStudySlugs: [],
    relatedToolSlugs: ["break-even", "cost-model"],
  },
  {
    id: "tax-compliance",
    slug: "tax-compliance",
    name: "Tax & Compliance",
    description:
      "Tư vấn thuế, kiểm soát rủi ro thuế, và đảm bảo tuân thủ các quy định pháp luật.",
    shortDescription: "Tư vấn thuế và đảm bảo tuân thủ",
    serviceSlugs: ["consulting", "audit"],
    relatedPostIds: [],
    relatedCaseStudySlugs: [],
    relatedToolSlugs: [],
  },
  {
    id: "risk-internal-controls",
    slug: "risk-internal-controls",
    name: "Risk & Internal Controls",
    description:
      "Xây dựng hệ thống kiểm soát nội bộ (KSNB) và sẵn sàng cho audit.",
    shortDescription: "Kiểm soát nội bộ và quản trị rủi ro",
    serviceSlugs: ["audit", "consulting"],
    relatedPostIds: [],
    relatedCaseStudySlugs: [],
    relatedToolSlugs: [],
  },
  {
    id: "people-capability-building",
    slug: "people-capability-building",
    name: "People & Capability Building",
    description:
      "Mentoring/coaching đội ngũ, đánh giá năng lực, và hỗ trợ tuyển dụng nhân sự tài chính.",
    shortDescription: "Phát triển năng lực đội ngũ tài chính",
    serviceSlugs: ["mentor", "seminar"],
    relatedPostIds: [],
    relatedCaseStudySlugs: [],
    relatedToolSlugs: [],
  },
];

/**
 * Get capability by slug
 */
export function getCapabilityBySlug(slug: string): Capability | undefined {
  return CAPABILITIES.find((capability) => capability.slug === slug);
}

/**
 * Get all capabilities
 */
export function getAllCapabilities(): Capability[] {
  return CAPABILITIES;
}

/**
 * Get capability for a service slug
 */
export function getCapabilityForService(
  serviceSlug: string
): Capability | undefined {
  return CAPABILITIES.find((capability) =>
    capability.serviceSlugs.includes(serviceSlug)
  );
}

