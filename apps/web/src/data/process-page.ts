/**
 * Process Page Content Data
 * 
 * This file contains all content for the /process page.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ProcessStepDetail {
  id: string;
  order: number;
  title: string;
  whatToPrepare: string[];
  whatProsfinDoes: string[];
  whatYouGet: string[];
}

export interface ProcessPersona {
  id: string;
  name: string;
  industry: string;
  size: string;
  journey: {
    week: string;
    activity: string;
    outcome: string;
  }[];
}

export interface TimelineBlock {
  period: string;
  activities: string[];
  deliverables: string[];
}

export interface ProcessPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: { label: string; href: string };
  };
  stepDetails: ProcessStepDetail[];
  personas: ProcessPersona[];
  timelineBlocks: TimelineBlock[];
  scopeNote: {
    title: string;
    content: string;
  };
}

export const processPageContent: ProcessPageContent = {
  hero: {
    eyebrow: "How we work",
    title: "Quy trình ProsFIN đồng hành cùng doanh nghiệp",
    subtitle:
      "Rõ ràng – không mơ hồ – không bất ngờ về phạm vi. Mọi bước đều được trao đổi trước và bạn có quyền quyết định.",
    cta: {
      label: "Bắt đầu từ bước 1: Đặt lịch khám sức khỏe tài chính",
      href: "/contact",
    },
  },
  stepDetails: [
    {
      id: "step-1",
      order: 1,
      title: "Khám sức khỏe tài chính sơ bộ",
      whatToPrepare: [
        "Báo cáo tài chính 2-3 quý gần nhất",
        "Sẵn sàng chia sẻ về tình hình kinh doanh",
        "Danh sách câu hỏi bạn muốn giải đáp",
      ],
      whatProsfinDoes: [
        "Xem xét và phân tích số liệu tài chính",
        "Trao đổi 60 phút để hiểu bối cảnh",
        "Xác định vấn đề trọng tâm",
      ],
      whatYouGet: [
        "Báo cáo đánh giá tài chính sơ bộ",
        "Danh sách 3 vấn đề trọng tâm cần xử lý",
        "Gợi ý bước tiếp theo",
      ],
    },
    {
      id: "step-2",
      order: 2,
      title: "Đào sâu số liệu & bối cảnh",
      whatToPrepare: [
        "Access vào hệ thống kế toán (nếu cần)",
        "Báo cáo nội bộ chi tiết hơn",
        "Tham gia buổi trao đổi sâu",
      ],
      whatProsfinDoes: [
        "Phân tích chi tiết từng hạng mục",
        "Tìm nguyên nhân gốc rễ của vấn đề",
        "Đánh giá rủi ro và cơ hội",
      ],
      whatYouGet: [
        "Báo cáo phân tích chi tiết",
        "Xác định nguyên nhân gốc rễ",
        "Đánh giá rủi ro và cơ hội",
      ],
    },
    {
      id: "step-3",
      order: 3,
      title: "Xác định trọng tâm & đề xuất roadmap",
      whatToPrepare: [
        "Review và phản hồi về phân tích",
        "Xác nhận mục tiêu ưu tiên",
        "Tham gia buổi trình bày",
      ],
      whatProsfinDoes: [
        "Đưa ra phương án tối ưu",
        "Xây dựng roadmap 30-90 ngày",
        "Trình bày và giải thích chi tiết",
      ],
      whatYouGet: [
        "Báo cáo khuyến nghị chi tiết",
        "Roadmap ưu tiên hành động",
        "Template và quy trình đề xuất",
      ],
    },
    {
      id: "step-4",
      order: 4,
      title: "Triển khai & theo dõi",
      whatToPrepare: [
        "Triển khai các giải pháp đề xuất",
        "Cập nhật số liệu định kỳ",
        "Tham gia buổi review",
      ],
      whatProsfinDoes: [
        "Hỗ trợ triển khai (nếu trong scope)",
        "Theo dõi tiến độ và điều chỉnh",
        "Review định kỳ và đánh giá kết quả",
      ],
      whatYouGet: [
        "Hỗ trợ triển khai",
        "Báo cáo theo dõi tiến độ",
        "Điều chỉnh và tối ưu liên tục",
      ],
    },
    {
      id: "step-5",
      order: 5,
      title: "Review & điều chỉnh",
      whatToPrepare: [
        "Tổng hợp kết quả đạt được",
        "Chia sẻ feedback và học hỏi",
        "Xác định bước tiếp theo",
      ],
      whatProsfinDoes: [
        "Đánh giá tổng kết",
        "Đề xuất điều chỉnh nếu cần",
        "Gợi ý bước tiếp theo",
      ],
      whatYouGet: [
        "Báo cáo tổng kết",
        "Khuyến nghị điều chỉnh",
        "Kế hoạch tiếp theo (nếu có)",
      ],
    },
  ],
  personas: [
    {
      id: "manufacturing",
      name: "Chủ DN sản xuất",
      industry: "Sản xuất",
      size: "30-50 nhân sự",
      journey: [
        {
          week: "Tuần 1-2",
          activity: "Khám sức khỏe tài chính, phân tích chi phí sản xuất",
          outcome: "Xác định 3 khoản chi phí 'ẩn' đang ăn lợi nhuận",
        },
        {
          week: "Tuần 3-4",
          activity: "Đề xuất tối ưu chi phí, xây quy trình theo dõi",
          outcome: "Có roadmap giảm chi phí 15% trong 90 ngày",
        },
        {
          week: "Tháng 2-3",
          activity: "Theo dõi triển khai, review và điều chỉnh",
          outcome: "Đạt mục tiêu giảm chi phí, có hệ thống theo dõi bền vững",
        },
      ],
    },
    {
      id: "creative-service",
      name: "Studio dịch vụ sáng tạo",
      industry: "Dịch vụ sáng tạo",
      size: "15-25 nhân sự",
      journey: [
        {
          week: "Tuần 1-2",
          activity: "Đánh giá dòng tiền, phân tích chu kỳ công nợ",
          outcome: "Hiểu rõ tại sao dòng tiền luôn căng thẳng",
        },
        {
          week: "Tuần 3-4",
          activity: "Xây dựng hệ thống dự báo dòng tiền, tối ưu quy trình thu tiền",
          outcome: "Có dự báo dòng tiền 6 tháng, quy trình thu tiền rõ ràng",
        },
        {
          week: "Tháng 2-3",
          activity: "Theo dõi và cảnh báo sớm, hỗ trợ quyết định đầu tư",
          outcome: "Chủ động hơn về dòng tiền, tự tin quyết định mở rộng",
        },
      ],
    },
  ],
  timelineBlocks: [
    {
      period: "Tuần 1-2",
      activities: [
        "Thu thập số liệu",
        "Buổi trao đổi đầu tiên",
        "Phân tích sơ bộ",
      ],
      deliverables: [
        "Báo cáo đánh giá sơ bộ",
        "Danh sách vấn đề trọng tâm",
      ],
    },
    {
      period: "Tuần 3-4",
      activities: [
        "Phân tích chi tiết",
        "Đào sâu bối cảnh",
        "Xây dựng phương án",
      ],
      deliverables: [
        "Báo cáo phân tích chi tiết",
        "Báo cáo khuyến nghị",
        "Roadmap hành động",
      ],
    },
    {
      period: "Tháng 2-3",
      activities: [
        "Triển khai giải pháp",
        "Theo dõi tiến độ",
        "Review và điều chỉnh",
      ],
      deliverables: [
        "Báo cáo theo dõi",
        "Điều chỉnh và tối ưu",
        "Báo cáo tổng kết",
      ],
    },
  ],
  scopeNote: {
    title: "Bạn giữ quyền quyết định",
    content:
      "ProsFIN tư vấn và đề xuất dựa trên số liệu thực tế. Quyết định và triển khai thuộc về doanh nghiệp bạn. Chúng tôi không có quyền hạn pháp lý hay quản trị trong doanh nghiệp của bạn. Mọi quyết định cuối cùng đều do bạn đưa ra, và bạn chịu trách nhiệm về kết quả.",
  },
};

