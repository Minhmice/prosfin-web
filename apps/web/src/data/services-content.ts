/**
 * Services Section Content Data
 * 
 * This file contains all content for the Services section.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  pillBenefits: string[];
  idealClient?: string;
  ctaLabel?: string;
  ctaType?: "modal" | "scroll" | "link";
  ctaTarget?: string;
  iconName?: string;
}

export interface ServicesSectionContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const servicesSectionContent: ServicesSectionContent = {
  eyebrow: "Giải pháp",
  title: "Dịch vụ ProsFIN đồng hành cùng tài chính doanh nghiệp",
  subtitle:
    "Tùy vào giai đoạn tăng trưởng, chúng tôi thiết kế gói dịch vụ phù hợp – từ sổ sách kế toán, dòng tiền đến hệ thống kiểm soát nội bộ và vai trò CFO đồng hành.",
  services: [
    {
      id: "finance-advisory",
      name: "Tư vấn tài chính & dòng tiền doanh nghiệp",
      shortDescription:
        "Giúp chủ doanh nghiệp hiểu rõ lãi – lỗ, dòng tiền, điểm hòa vốn, kế hoạch dòng tiền 3–6 tháng.",
      pillBenefits: [
        "Báo cáo tài chính dễ hiểu, hành động được",
        "Dự báo dòng tiền 3–6 tháng",
        "Xác định điểm hòa vốn và kế hoạch tài chính",
      ],
      idealClient: "Doanh nghiệp đang tăng trưởng, cần hiểu rõ tình hình tài chính",
      ctaLabel: "Trao đổi về dịch vụ này",
      ctaType: "modal",
      ctaTarget: "#lead-form",
    },
    {
      id: "accounting-tax",
      name: "Dịch vụ kế toán & thuế cho SME",
      shortDescription:
        "Đảm bảo sổ sách chuẩn, giảm rủi ro khi quyết toán, tối ưu nghĩa vụ thuế trong khuôn khổ pháp luật.",
      pillBenefits: [
        "Sổ sách kế toán chuẩn, đầy đủ",
        "Giảm rủi ro quyết toán thuế",
        "Tối ưu nghĩa vụ thuế hợp pháp",
      ],
      idealClient: "SME, startup, hộ kinh doanh cần hệ thống kế toán bài bản",
      ctaLabel: "Trao đổi về dịch vụ này",
      ctaType: "modal",
      ctaTarget: "#lead-form",
    },
    {
      id: "internal-control",
      name: "Thiết kế & vận hành hệ thống kiểm soát nội bộ",
      shortDescription:
        "Xây quy trình phê duyệt, phân quyền, hạn chế thất thoát, gian lận, sai sót.",
      pillBenefits: [
        "Quy trình phê duyệt rõ ràng",
        "Phân quyền và kiểm soát truy cập",
        "Giảm thiểu rủi ro thất thoát, gian lận",
      ],
      idealClient: "Doanh nghiệp cần hệ thống kiểm soát nội bộ chặt chẽ",
      ctaLabel: "Trao đổi về dịch vụ này",
      ctaType: "modal",
      ctaTarget: "#lead-form",
    },
    {
      id: "cfo-part-time",
      name: "CFO đồng hành bán thời gian",
      shortDescription:
        "Role \"CFO part-time\" cho các công ty chưa đủ nguồn lực thuê CFO full-time nhưng cần người đi cùng với CEO về tài chính.",
      pillBenefits: [
        "Tư vấn chiến lược tài chính",
        "Đồng hành ra quyết định đầu tư/mở rộng",
        "Tiết kiệm chi phí so với CFO full-time",
      ],
      idealClient: "Doanh nghiệp đang mở rộng, cần tư vấn tài chính cấp cao",
      ctaLabel: "Trao đổi về dịch vụ này",
      ctaType: "modal",
      ctaTarget: "#lead-form",
    },
  ],
};

