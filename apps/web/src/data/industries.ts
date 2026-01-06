/**
 * Industries Content Data
 * 
 * This file contains all content for the /industries pages.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  coverImage?: string;
  topPains: string[];
  recommendedCapabilities: string[];
  relatedServiceSlugs: string[];
  relatedCaseStudySlugs: string[];
  relatedPostIds: string[];
  relatedToolSlugs: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "f-b",
    slug: "f-b",
    name: "F&B (Food & Beverage)",
    description:
      "Ngành F&B với đặc thù quản lý nguyên vật liệu, chi phí biến đổi cao, và chu kỳ công nợ phức tạp.",
    shortDescription: "Giải pháp tài chính cho ngành F&B",
    topPains: [
      "Quản lý chi phí nguyên vật liệu biến động",
      "Kiểm soát hàng tồn kho và vòng quay",
      "Theo dõi chi phí sản xuất và giá vốn",
      "Quản lý công nợ với nhà cung cấp và khách hàng",
      "Dự báo dòng tiền theo mùa vụ",
    ],
    recommendedCapabilities: [
      "financial-data-bookkeeping",
      "cashflow-working-capital",
      "profitability-cost-control",
    ],
    relatedServiceSlugs: ["cleardata", "consulting", "execution-coaching"],
    relatedCaseStudySlugs: [],
    relatedPostIds: [],
    relatedToolSlugs: ["cashflow-forecast", "break-even"],
  },
  {
    id: "trading",
    slug: "trading",
    name: "Thương mại (Trading)",
    description:
      "Ngành thương mại với đặc thù quản lý hàng hóa, chu kỳ công nợ dài, và nhu cầu vốn lưu động cao.",
    shortDescription: "Giải pháp tài chính cho ngành thương mại",
    topPains: [
      "Quản lý hàng tồn kho và vòng quay hàng hóa",
      "Kiểm soát công nợ phải thu và phải trả",
      "Tối ưu vốn lưu động",
      "Theo dõi lợi nhuận theo sản phẩm/dòng hàng",
      "Dự báo nhu cầu và đặt hàng",
    ],
    recommendedCapabilities: [
      "cashflow-working-capital",
      "profitability-cost-control",
      "financial-data-bookkeeping",
    ],
    relatedServiceSlugs: ["cleardata", "consulting"],
    relatedCaseStudySlugs: [],
    relatedPostIds: [],
    relatedToolSlugs: ["working-capital", "ccc-calculator"],
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    name: "Sản xuất (Manufacturing)",
    description:
      "Ngành sản xuất với đặc thù quản lý chi phí sản xuất, định giá sản phẩm, và tối ưu hiệu quả sản xuất.",
    shortDescription: "Giải pháp tài chính cho ngành sản xuất",
    topPains: [
      "Tính toán giá vốn và chi phí sản xuất",
      "Kiểm soát chi phí nguyên vật liệu và nhân công",
      "Định giá sản phẩm cạnh tranh",
      "Quản lý hàng tồn kho nguyên vật liệu và thành phẩm",
      "Tối ưu hiệu quả sản xuất và giảm lãng phí",
    ],
    recommendedCapabilities: [
      "profitability-cost-control",
      "financial-data-bookkeeping",
      "cashflow-working-capital",
    ],
    relatedServiceSlugs: ["cleardata", "consulting", "execution-coaching"],
    relatedCaseStudySlugs: [],
    relatedPostIds: [],
    relatedToolSlugs: ["break-even", "cost-model"],
  },
  {
    id: "services",
    slug: "services",
    name: "Dịch vụ (Services)",
    description:
      "Ngành dịch vụ với đặc thù quản lý dự án, theo dõi chi phí theo dự án, và quản lý công nợ phải thu.",
    shortDescription: "Giải pháp tài chính cho ngành dịch vụ",
    topPains: [
      "Theo dõi chi phí và lợi nhuận theo dự án",
      "Quản lý công nợ phải thu từ khách hàng",
      "Dự báo dòng tiền theo tiến độ dự án",
      "Định giá dịch vụ và tính toán contribution margin",
      "Quản lý chi phí nhân sự và overhead",
    ],
    recommendedCapabilities: [
      "cashflow-working-capital",
      "profitability-cost-control",
      "finance-function-reporting",
    ],
    relatedServiceSlugs: ["consulting", "execution-coaching"],
    relatedCaseStudySlugs: [],
    relatedPostIds: [],
    relatedToolSlugs: ["cashflow-forecast", "project-profitability"],
  },
  {
    id: "construction",
    slug: "construction",
    name: "Xây dựng/Dự án (Construction/Projects)",
    description:
      "Ngành xây dựng với đặc thù quản lý dự án dài hạn, thanh toán theo tiến độ, và quản lý vốn lưu động lớn.",
    shortDescription: "Giải pháp tài chính cho ngành xây dựng",
    topPains: [
      "Quản lý chi phí và lợi nhuận theo dự án",
      "Theo dõi thanh toán theo tiến độ",
      "Quản lý vốn lưu động cho nhiều dự án đồng thời",
      "Dự báo dòng tiền dài hạn",
      "Kiểm soát chi phí nguyên vật liệu và nhân công",
    ],
    recommendedCapabilities: [
      "cashflow-working-capital",
      "finance-function-reporting",
      "risk-internal-controls",
    ],
    relatedServiceSlugs: ["consulting", "execution-coaching"],
    relatedCaseStudySlugs: [],
    relatedPostIds: [],
    relatedToolSlugs: ["cashflow-forecast", "project-profitability"],
  },
];

/**
 * Get industry by slug
 */
export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

/**
 * Get all industries
 */
export function getAllIndustries(): Industry[] {
  return INDUSTRIES;
}

