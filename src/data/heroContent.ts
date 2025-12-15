/**
 * Hero Section Content Data
 * 
 * This file contains all content for the Hero section.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface HeroCTA {
  label: string;
  href: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: HeroCTA;
  secondaryCta: HeroCTA;
  note: string;
  stats: HeroStat[];
  heroImage: string;
}

export const heroContent: HeroContent = {
  eyebrow: "Tư vấn tài chính doanh nghiệp chuẩn Big4",
  headline: "Đọc vị tài chính doanh nghiệp rõ như bảng điều khiển",
  subheadline:
    "ProsFIN đồng hành chủ doanh nghiệp SME, startup và hộ kinh doanh trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế. Từ dữ liệu kế toán rời rạc, chúng tôi giúp bạn có bức tranh tài chính rõ ràng, dễ hiểu và có thể hành động ngay, theo phương pháp bài bản của các firm Big4.",
  primaryCta: {
    label: "Đặt lịch tư vấn",
    href: "#lead-form",
  },
  secondaryCta: {
    label: "Xem dịch vụ",
    href: "#services",
  },
  note: "Buổi tư vấn đầu tiên 30 phút, miễn phí đánh giá sơ bộ.",
  stats: [
    {
      label: "DN đã đồng hành",
      value: "+120",
    },
    {
      label: "Năm kinh nghiệm",
      value: "8+",
    },
  ],
  heroImage: "/images/hero-dashboard-mockup.png", // Placeholder path
};

