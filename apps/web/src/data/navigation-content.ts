/**
 * Navigation Content Data
 * 
 * This file contains navigation items for the site header.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dịch vụ",
    href: "/services",
    description: "Tư vấn tài chính, kế toán thuế, kiểm soát nội bộ và CFO đồng hành cho doanh nghiệp SME, startup và hộ kinh doanh.",
  },
  {
    label: "Industries",
    href: "/industries",
    description: "Giải pháp tài chính theo ngành nghề. F&B, Thương mại, Sản xuất, Dịch vụ và Xây dựng.",
  },
  {
    label: "Insights",
    href: "/insights",
    description: "Nghiên cứu và insights về tài chính doanh nghiệp. Briefs, playbooks và tools để nắm vững kiến thức tài chính.",
  },
  {
    label: "Tools & Templates",
    href: "/tools",
    description: "Công cụ tài chính chuyên nghiệp để đánh giá và tối ưu hóa tình hình tài chính của doanh nghiệp.",
  },
  {
    label: "Câu chuyện khách hàng",
    href: "/case-studies",
    description: "Những kết quả thực tế từ các doanh nghiệp đã đồng hành cùng ProsFIN trong việc cải thiện tài chính và tăng trưởng.",
  },
  {
    label: "Về ProsFIN",
    href: "/about",
    description: "Đội ngũ chuyên gia tài chính với kinh nghiệm từ Big4, cam kết mang đến dịch vụ tư vấn tài chính chuẩn mực cho doanh nghiệp Việt Nam.",
  },
  {
    label: "People",
    href: "/people",
    description: "Đội ngũ chuyên gia tài chính với kinh nghiệm từ Big4, sẵn sàng đồng hành cùng doanh nghiệp.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Liên hệ với ProsFIN để được tư vấn về các giải pháp tài chính phù hợp với doanh nghiệp của bạn.",
  },
];

export const headerCtaLabel = "Đặt lịch tư vấn";

