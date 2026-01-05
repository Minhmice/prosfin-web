/**
 * Service Presets Content
 * 
 * Content data for indexable preset pages.
 */

export interface ServicePresetContent {
  slug: string;
  title: string;
  description: string;
  intro: string; // Problem framing + "why this set"
  audience: string;
  goal: string;
  tags: string[];
  serviceSlugs: string[]; // Curated services for this preset
  faqIds?: string[];
  proofIds?: string[];
}

/**
 * 6 minimum presets for Phase 4
 */
export const SERVICE_PRESETS_CONTENT: ServicePresetContent[] = [
  {
    slug: "owner-cashflow",
    title: "Chủ DN: Cần kiểm soát dòng tiền",
    description:
      "Giải pháp tài chính giúp chủ doanh nghiệp quản lý và tối ưu dòng tiền hiệu quả, đảm bảo thanh khoản và phát triển bền vững.",
    intro:
      "Dòng tiền là mạch máu của doanh nghiệp. Nhiều chủ DN gặp khó khăn trong việc dự đoán và kiểm soát dòng tiền, dẫn đến thiếu hụt thanh khoản hoặc lãng phí nguồn vốn. Bộ dịch vụ này giúp bạn xây dựng hệ thống quản lý dòng tiền chuyên nghiệp, từ dự báo đến tối ưu hóa vòng quay vốn.",
    audience: "owner",
    goal: "cashflow",
    tags: ["dòng tiền", "thanh khoản", "quản lý tài chính", "dự báo"],
    serviceSlugs: [
      "cashflow-management",
      "financial-forecasting",
      "working-capital-optimization",
    ],
    faqIds: ["faq-cashflow-1", "faq-cashflow-2"],
  },
  {
    slug: "owner-compliance",
    title: "Chủ DN: Đảm bảo tuân thủ",
    description:
      "Dịch vụ hỗ trợ chủ doanh nghiệp đảm bảo tuân thủ các quy định về kế toán, thuế và báo cáo tài chính.",
    intro:
      "Tuân thủ pháp luật là nền tảng của doanh nghiệp bền vững. Với các quy định phức tạp và thay đổi liên tục, chủ DN cần một đối tác tin cậy để đảm bảo không vi phạm. Bộ dịch vụ này cung cấp giải pháp toàn diện từ kiểm tra, chuẩn hóa đến đồng hành dài hạn.",
    audience: "owner",
    goal: "compliance",
    tags: ["tuân thủ", "kế toán", "thuế", "báo cáo tài chính"],
    serviceSlugs: [
      "compliance-audit",
      "accounting-standardization",
      "tax-compliance",
    ],
    faqIds: ["faq-compliance-1", "faq-compliance-2"],
  },
  {
    slug: "cfo-profit",
    title: "CFO: Tối ưu lợi nhuận",
    description:
      "Giải pháp tài chính giúp CFO tối ưu hóa lợi nhuận và hiệu quả kinh doanh thông qua phân tích sâu và chiến lược tài chính.",
    intro:
      "CFO không chỉ quản lý số liệu mà còn là đối tác chiến lược trong việc tối ưu hóa lợi nhuận. Bộ dịch vụ này cung cấp các công cụ phân tích, mô hình tài chính và tư vấn chiến lược để giúp CFO đưa ra quyết định dựa trên dữ liệu, tối đa hóa giá trị cho doanh nghiệp.",
    audience: "cfo",
    goal: "profit",
    tags: ["lợi nhuận", "phân tích tài chính", "chiến lược", "CFO"],
    serviceSlugs: [
      "financial-analysis",
      "profit-optimization",
      "strategic-financial-planning",
    ],
    faqIds: ["faq-cfo-1", "faq-cfo-2"],
  },
  {
    slug: "cfo-capital",
    title: "CFO: Quản lý vốn và đầu tư",
    description:
      "Dịch vụ hỗ trợ CFO trong việc quản lý vốn, cấu trúc tài chính và đưa ra quyết định đầu tư hiệu quả.",
    intro:
      "Quản lý vốn hiệu quả là chìa khóa để doanh nghiệp tăng trưởng bền vững. CFO cần cân bằng giữa thanh khoản, đầu tư và rủi ro. Bộ dịch vụ này giúp CFO xây dựng chiến lược vốn tối ưu, đánh giá cơ hội đầu tư và quản lý cấu trúc tài chính một cách chuyên nghiệp.",
    audience: "cfo",
    goal: "cashflow",
    tags: ["quản lý vốn", "đầu tư", "cấu trúc tài chính", "CFO"],
    serviceSlugs: [
      "capital-management",
      "investment-analysis",
      "financial-structure-optimization",
    ],
    faqIds: ["faq-capital-1"],
  },
  {
    slug: "chief-accountant-standardize",
    title: "Kế toán trưởng: Chuẩn hóa sổ sách",
    description:
      "Dịch vụ hỗ trợ kế toán trưởng chuẩn hóa hệ thống kế toán, sổ sách và quy trình làm việc theo chuẩn mực.",
    intro:
      "Hệ thống kế toán chuẩn hóa là nền tảng cho báo cáo tài chính chính xác và đáng tin cậy. Kế toán trưởng cần đảm bảo mọi giao dịch được ghi nhận đúng, đầy đủ và tuân thủ chuẩn mực kế toán. Bộ dịch vụ này giúp xây dựng và duy trì hệ thống kế toán chuyên nghiệp, từ quy trình đến công cụ.",
    audience: "chief-accountant",
    goal: "compliance",
    tags: ["chuẩn hóa", "kế toán", "sổ sách", "quy trình"],
    serviceSlugs: [
      "accounting-standardization",
      "bookkeeping-optimization",
      "accounting-process-improvement",
    ],
    faqIds: ["faq-accountant-1", "faq-accountant-2"],
  },
  {
    slug: "finance-team-control",
    title: "Đội ngũ tài chính: Kiểm soát nội bộ",
    description:
      "Giải pháp giúp đội ngũ tài chính xây dựng và vận hành hệ thống kiểm soát nội bộ hiệu quả.",
    intro:
      "Kiểm soát nội bộ mạnh mẽ là lá chắn bảo vệ doanh nghiệp khỏi rủi ro tài chính và gian lận. Đội ngũ tài chính cần một hệ thống kiểm soát toàn diện, từ quy trình đến giám sát. Bộ dịch vụ này cung cấp framework, công cụ và hỗ trợ triển khai để xây dựng hệ thống kiểm soát nội bộ chuyên nghiệp.",
    audience: "finance_team",
    goal: "risk",
    tags: ["kiểm soát nội bộ", "rủi ro", "tuân thủ", "quy trình"],
    serviceSlugs: [
      "internal-control-system",
      "risk-management",
      "financial-audit",
    ],
    faqIds: ["faq-control-1"],
  },
];

