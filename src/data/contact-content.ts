/**
 * Contact Section Content Data
 * 
 * This file contains all content for the Final CTA/Contact section.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  zalo?: string;
  linkedin?: string;
}

export interface ContactSectionContent {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  primaryCtaLabel: string;
  notePrivacy?: string;
  contactInfo: ContactInfo;
}

export const contactSectionContent: ContactSectionContent = {
  eyebrow: "Bắt đầu",
  title: "Đặt lịch buổi khám sức khỏe tài chính cùng ProsFIN",
  subtitle:
    "Buổi tư vấn đầu tiên 30 phút, miễn phí. Chúng tôi sẽ giúp bạn hiểu rõ tình hình tài chính hiện tại và đưa ra gợi ý cụ thể.",
  bullets: [
    "Hiểu nhanh lãi – lỗ và dòng tiền hiện tại",
    "Nhận gợi ý ưu tiên 3 việc cần làm trong 30–90 ngày tới",
    "Tất cả trao đổi được bảo mật thông tin",
  ],
  primaryCtaLabel: "Đặt lịch tư vấn",
  notePrivacy:
    "Chúng tôi cam kết bảo mật thông tin của bạn. Dữ liệu chỉ được sử dụng để liên hệ và tư vấn, không chia sẻ với bên thứ ba.",
  contactInfo: {
    email: "hello@prosfin.vn",
    phone: "+84 123 456 789",
    address: "Hà Nội, Việt Nam",
    linkedin: "https://linkedin.com/company/prosfin",
  },
};

