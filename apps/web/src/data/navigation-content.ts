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
    label: "Research",
    href: "/research",
    description: "Nghiên cứu và insights về tài chính doanh nghiệp. Briefs, playbooks và tools để nắm vững kiến thức tài chính.",
  },
  {
    label: "Quy trình",
    href: "/#process",
    description: "Quy trình làm việc bài bản từ khám sức khỏe tài chính, phân tích dữ liệu đến triển khai giải pháp và đồng hành dài hạn.",
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
    label: "FAQ",
    href: "/#faq",
    description: "Câu hỏi thường gặp về dịch vụ, quy trình làm việc, chi phí và các vấn đề liên quan đến tư vấn tài chính doanh nghiệp.",
  },
];

export const headerCtaLabel = "Đặt lịch tư vấn";

