/**
 * Services Page Content Data
 * 
 * This file contains all content for the /services page.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ServicePackage {
  id: string;
  slug: string;
  title: string;
  targetAudience: string[];
  benefits: string[];
  duration: string;
  scope: string;
}

export interface ServiceSegment {
  id: string;
  label: string;
  pains: string[];
  recommendedPackages: string[];
}

export interface ServiceValueProp {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceMiniCase {
  id: string;
  slug: string;
  situation: string;
  result: string;
}

export interface ServicesPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  packages: ServicePackage[];
  segments: ServiceSegment[];
  valueProps: ServiceValueProp[];
  miniCases: ServiceMiniCase[];
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export const servicesPageContent: ServicesPageContent = {
  hero: {
    eyebrow: "Dịch vụ ProsFIN",
    title: "Các giải pháp ProsFIN đồng hành cùng tài chính doanh nghiệp",
    subtitle:
      "Từ khám sức khỏe tài chính đến đồng hành dài hạn, ProsFIN thiết kế gói dịch vụ phù hợp với từng giai đoạn phát triển của doanh nghiệp.",
    primaryCta: {
      label: "Đặt lịch khám sức khỏe tài chính miễn phí",
      href: "/contact",
    },
    secondaryCta: {
      label: "Trao đổi để chọn gói phù hợp",
      href: "/contact",
    },
  },
  packages: [
    {
      id: "health-check",
      slug: "health-check-360",
      title: "Khám sức khỏe tài chính 360°",
      targetAudience: ["SME", "Startup", "DN đang tăng trưởng"],
      benefits: [
        "Báo cáo đánh giá tài chính toàn diện",
        "Xác định 3 vấn đề trọng tâm cần xử lý",
        "Roadmap ưu tiên 30-90 ngày",
        "Buổi trao đổi 1:1 với cố vấn",
      ],
      duration: "2-3 tuần",
      scope: "Đánh giá toàn diện, không triển khai",
    },
    {
      id: "cash-flow",
      slug: "cash-flow-partnership",
      title: "Đồng hành dòng tiền 3-6 tháng",
      targetAudience: ["SME", "DN có vấn đề dòng tiền"],
      benefits: [
        "Dự báo dòng tiền 3-6 tháng",
        "Theo dõi và cảnh báo sớm",
        "Tối ưu chu kỳ công nợ",
        "Hỗ trợ quyết định đầu tư/mở rộng",
      ],
      duration: "3-6 tháng",
      scope: "Đồng hành định kỳ, review hàng tháng",
    },
    {
      id: "cfo-part-time",
      slug: "cfo-part-time",
      title: "Cố vấn tài chính nội bộ bán thời gian",
      targetAudience: ["DN đang mở rộng", "DN cần tư vấn cấp cao"],
      benefits: [
        "Tư vấn chiến lược tài chính",
        "Đồng hành ra quyết định lớn",
        "Xây dựng hệ thống báo cáo nội bộ",
        "Tiết kiệm so với CFO full-time",
      ],
      duration: "6-12 tháng",
      scope: "Đồng hành dài hạn, linh hoạt",
    },
  ],
  segments: [
    {
      id: "sme-owner",
      label: "Chủ doanh nghiệp SME",
      pains: [
        "Lãi trên báo cáo nhưng không thấy tiền",
        "Không biết chi phí nào đang 'ăn' lợi nhuận",
        "Lo lắng về thuế và quyết toán",
      ],
      recommendedPackages: ["health-check", "cash-flow"],
    },
    {
      id: "startup",
      label: "Startup / DN trẻ",
      pains: [
        "Chưa có hệ thống kế toán bài bản",
        "Cần hiểu số liệu để pitch investor",
        "Muốn mở rộng nhưng không chắc khả năng tài chính",
      ],
      recommendedPackages: ["health-check", "cfo-part-time"],
    },
    {
      id: "accounting-team",
      label: "Kế toán / Bộ phận tài chính",
      pains: [
        "Báo cáo không được sử dụng để ra quyết định",
        "Thiếu hệ thống phân tích chi phí",
        "Cần người review và tư vấn nâng cao",
      ],
      recommendedPackages: ["health-check", "cash-flow"],
    },
  ],
  valueProps: [
    {
      id: "simple-language",
      title: "Ngôn ngữ dễ hiểu",
      description:
        "Chúng tôi 'dịch' số liệu tài chính sang ngôn ngữ của bạn, không dùng jargon khó hiểu.",
    },
    {
      id: "systematized",
      title: "Hệ thống hóa số liệu",
      description:
        "Từ dữ liệu rời rạc, chúng tôi giúp bạn có bức tranh tài chính rõ ràng, có thể hành động ngay.",
    },
    {
      id: "action-first",
      title: "Action-first",
      description:
        "Mỗi báo cáo đều kèm 3 việc cần làm tuần này/tháng này, không chỉ là số liệu.",
    },
    {
      id: "partnership",
      title: "Đồng hành dài hạn",
      description:
        "Không chỉ tư vấn xong là thôi. Chúng tôi đồng hành để bạn ra quyết định tự tin hơn.",
    },
  ],
  miniCases: [
    {
      id: "case-1",
      slug: "dich-vu-sang-tao",
      situation: "DN dịch vụ sáng tạo 25 nhân sự, tăng trưởng nhanh nhưng dòng tiền luôn căng thẳng",
      result: "Sau 3 tháng, có dự báo dòng tiền 6 tháng và quy trình theo dõi hàng tuần",
    },
    {
      id: "case-2",
      slug: "san-xuat-nho",
      situation: "DN sản xuất nhỏ, lãi trên báo cáo nhưng không biết tiền đi đâu",
      result: "Xác định được 3 khoản chi phí 'ẩn' và có kế hoạch tối ưu trong 90 ngày",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Phí tư vấn được tính thế nào?",
      answer:
        "Phí dịch vụ được tính dựa trên phạm vi công việc và thời gian triển khai. Chúng tôi sẽ báo giá cụ thể sau khi đánh giá nhu cầu của bạn trong buổi trao đổi đầu tiên. Buổi tư vấn đầu tiên 30 phút là miễn phí.",
    },
    {
      id: "faq-2",
      question: "ProsFIN có cam kết kết quả không?",
      answer:
        "Không. ProsFIN không cam kết hay hứa hẹn về lợi nhuận hay kết quả tài chính cụ thể. Chúng tôi cung cấp tư vấn dựa trên số liệu thực tế và kinh nghiệm, giúp bạn có bức tranh tài chính rõ ràng và đưa ra quyết định sáng suốt hơn.",
    },
    {
      id: "faq-3",
      question: "ProsFIN có thay thế vai trò kế toán không?",
      answer:
        "ProsFIN tập trung vào tư vấn tài chính, kiểm soát nội bộ và đồng hành quản trị tài chính. Chúng tôi không thay thế kế toán nội bộ hay làm dịch vụ kê khai thuế trực tiếp, nhưng có thể hỗ trợ bạn xây dựng hệ thống kế toán và tối ưu quy trình.",
    },
  ],
};

