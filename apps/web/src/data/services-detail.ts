/**
 * Service Detail Content Data
 * 
 * This file contains detailed content for individual service pages.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ServiceStep {
  title: string;
  description: string;
  deliverables: string[];
}

export interface RelatedCase {
  slug: string;
  title: string;
  summary: string;
}

export interface ServiceDetail {
  slug: string;
  hero: {
    title: string;
    tags: string[];
    summaryBullets: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  problems: string[];
  outcomes: string[];
  steps: ServiceStep[];
  deliverables: string[];
  exclusions?: string[];
  timeline: string;
  format: string;
  requirementsFromClient: string[];
  pricingNote?: string;
  relatedCases?: RelatedCase[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export const servicesDetailMap: Record<string, ServiceDetail> = {
  "health-check-360": {
    slug: "health-check-360",
    hero: {
      title: "Khám sức khỏe tài chính 360° cho SME",
      tags: ["Đánh giá toàn diện", "SME", "Startup"],
      summaryBullets: [
        "Bạn đang tăng trưởng nhưng không chắc tài chính có đủ sức",
        "Muốn biết điểm mạnh và điểm yếu trong quản trị tài chính",
        "Cần roadmap rõ ràng để cải thiện tài chính trong 90 ngày tới",
      ],
      primaryCta: {
        label: "Đặt lịch khám sức khỏe tài chính cho gói này",
        href: "/contact",
      },
      secondaryCta: {
        label: "Trao đổi nhanh để xem có phù hợp",
        href: "/contact",
      },
    },
    problems: [
      "Không biết tình hình tài chính thực sự như thế nào",
      "Báo cáo kế toán có nhưng không hiểu ý nghĩa",
      "Không biết nên ưu tiên cải thiện điều gì trước",
      "Lo lắng về rủi ro tài chính nhưng không biết đo lường",
    ],
    outcomes: [
      "Báo cáo đánh giá tài chính toàn diện, dễ hiểu",
      "Xác định 3 vấn đề trọng tâm cần xử lý ngay",
      "Roadmap ưu tiên hành động trong 30-90 ngày",
      "Hiểu rõ điểm mạnh và điểm yếu của doanh nghiệp",
      "Có cơ sở để ra quyết định đầu tư/mở rộng",
    ],
    steps: [
      {
        title: "Thu thập dữ liệu & đọc nhanh bức tranh tài chính",
        description:
          "ProsFIN xem xét báo cáo tài chính, sổ sách kế toán, và trao đổi với bạn về tình hình kinh doanh hiện tại.",
        deliverables: [
          "Checklist dữ liệu cần chuẩn bị",
          "Buổi trao đổi 60 phút để hiểu bối cảnh",
        ],
      },
      {
        title: "Phân tích & xác định vấn đề trọng tâm",
        description:
          "Chúng tôi phân tích chi tiết để tìm ra nguyên nhân gốc rễ của các vấn đề tài chính.",
        deliverables: [
          "Báo cáo phân tích tài chính chi tiết",
          "Xác định 3 vấn đề trọng tâm",
        ],
      },
      {
        title: "Đưa khuyến nghị + roadmap 30-90 ngày",
        description:
          "Dựa trên phân tích, chúng tôi đưa ra phương án tối ưu và lộ trình hành động cụ thể.",
        deliverables: [
          "Báo cáo khuyến nghị chi tiết",
          "Roadmap ưu tiên 30-90 ngày",
          "Buổi trình bày và trao đổi 90 phút",
        ],
      },
      {
        title: "Follow-up / Review",
        description:
          "Sau 30 ngày, chúng tôi review lại tiến độ và điều chỉnh nếu cần.",
        deliverables: ["Buổi review 30 phút", "Email recap"],
      },
    ],
    deliverables: [
      "Báo cáo đánh giá tài chính toàn diện (PDF, 15-20 trang)",
      "Báo cáo khuyến nghị và roadmap (PDF, 10-15 trang)",
      "2 buổi meeting 1:1 với cố vấn (60 phút + 90 phút)",
      "Email recap và hỗ trợ follow-up trong 30 ngày",
      "Template dashboard mẫu (nếu cần)",
    ],
    exclusions: [
      "Không bao gồm triển khai các giải pháp đề xuất",
      "Không bao gồm dịch vụ kế toán hay kê khai thuế",
      "Không bao gồm tư vấn đầu tư hay mua bán tài sản",
    ],
    timeline: "2-4 tuần",
    format: "Online/Offline kết hợp. Buổi đầu có thể gặp trực tiếp nếu ở Hà Nội.",
    requirementsFromClient: [
      "Báo cáo tài chính 2-3 quý gần nhất",
      "Báo cáo nội bộ (nếu có)",
      "Access vào hệ thống kế toán (nếu cần)",
      "Sẵn sàng trao đổi về tình hình kinh doanh",
    ],
    pricingNote: "Phí từ 15 triệu, tùy theo quy mô và độ phức tạp của doanh nghiệp.",
    relatedCases: [
      {
        slug: "dich-vu-sang-tao",
        title: "DN dịch vụ sáng tạo: Từ mù mờ đến rõ ràng dòng tiền",
        summary:
          "Sau khám sức khỏe tài chính, DN đã xác định được 3 vấn đề trọng tâm và có roadmap cụ thể.",
      },
    ],
    faqs: [
      {
        question: "Gói này có phù hợp với doanh nghiệp mới thành lập không?",
        answer:
          "Có, gói này rất phù hợp với doanh nghiệp mới thành lập hoặc đang trong giai đoạn đầu. Chúng tôi sẽ giúp bạn xây dựng nền tảng tài chính vững chắc ngay từ đầu.",
      },
      {
        question: "Tôi cần chuẩn bị gì trước khi bắt đầu?",
        answer:
          "Bạn cần chuẩn bị báo cáo tài chính (nếu có), sổ sách kế toán, và sẵn sàng trao đổi về tình hình kinh doanh. Chúng tôi sẽ gửi checklist chi tiết sau khi xác nhận hợp tác.",
      },
    ],
  },
  "cash-flow-partnership": {
    slug: "cash-flow-partnership",
    hero: {
      title: "Đồng hành dòng tiền 3-6 tháng cho doanh nghiệp",
      tags: ["Dòng tiền", "SME", "Đồng hành"],
      summaryBullets: [
        "Doanh nghiệp có vấn đề về dòng tiền, luôn lo thiếu tiền trả lương",
        "Muốn có dự báo dòng tiền để chủ động hơn",
        "Cần người đồng hành để ra quyết định đầu tư/mở rộng",
      ],
      primaryCta: {
        label: "Đặt lịch khám sức khỏe tài chính cho gói này",
        href: "/contact",
      },
      secondaryCta: {
        label: "Trao đổi nhanh để xem có phù hợp",
        href: "/contact",
      },
    },
    problems: [
      "Không biết dòng tiền 3 tháng tới sẽ như thế nào",
      "Luôn lo thiếu tiền trả lương, trả nợ",
      "Không dám đầu tư/mở rộng vì sợ thiếu vốn",
      "Chu kỳ công nợ kéo dài, ảnh hưởng dòng tiền",
    ],
    outcomes: [
      "Dự báo dòng tiền 3-6 tháng, cập nhật hàng tháng",
      "Cảnh báo sớm khi có nguy cơ thiếu tiền",
      "Tối ưu chu kỳ công nợ và quản lý khoản phải thu",
      "Có cơ sở để quyết định đầu tư/mở rộng",
      "Giảm stress về tài chính, chủ động hơn",
    ],
    steps: [
      {
        title: "Thiết lập hệ thống dự báo dòng tiền",
        description:
          "Xây dựng mô hình dự báo dòng tiền dựa trên lịch sử và kế hoạch kinh doanh.",
        deliverables: ["Mô hình dự báo dòng tiền", "Hướng dẫn sử dụng"],
      },
      {
        title: "Theo dõi và cảnh báo hàng tháng",
        description:
          "Review dòng tiền thực tế vs dự báo, điều chỉnh và cảnh báo sớm.",
        deliverables: [
          "Báo cáo dòng tiền hàng tháng",
          "Cảnh báo sớm khi có rủi ro",
        ],
      },
      {
        title: "Tối ưu quy trình quản lý công nợ",
        description:
          "Phân tích và đề xuất cách tối ưu chu kỳ công nợ, quản lý khoản phải thu/phải trả.",
        deliverables: [
          "Báo cáo phân tích công nợ",
          "Quy trình tối ưu đề xuất",
        ],
      },
      {
        title: "Hỗ trợ quyết định đầu tư/mở rộng",
        description:
          "Đánh giá tác động tài chính của các quyết định lớn trước khi thực hiện.",
        deliverables: [
          "Phân tích tác động tài chính",
          "Khuyến nghị về timing và quy mô",
        ],
      },
    ],
    deliverables: [
      "Mô hình dự báo dòng tiền (Excel/Google Sheets)",
      "Báo cáo dòng tiền hàng tháng (12 báo cáo)",
      "Buổi review hàng tháng với cố vấn (12 buổi, 60 phút/buổi)",
      "Email hỗ trợ và tư vấn khi cần",
      "Báo cáo tổng kết và khuyến nghị sau 6 tháng",
    ],
    exclusions: [
      "Không bao gồm dịch vụ kế toán hay kê khai thuế",
      "Không bao gồm tư vấn đầu tư hay mua bán tài sản",
    ],
    timeline: "3-6 tháng",
    format: "Online chủ yếu, có thể gặp trực tiếp khi cần. Review hàng tháng qua video call.",
    requirementsFromClient: [
      "Báo cáo tài chính và sổ sách kế toán",
      "Lịch sử công nợ phải thu/phải trả",
      "Kế hoạch kinh doanh (nếu có)",
      "Tham gia đầy đủ các buổi review",
    ],
    pricingNote: "Phí từ 25 triệu/3 tháng, tùy theo quy mô và độ phức tạp.",
    relatedCases: [
      {
        slug: "san-xuat-nho",
        title: "DN sản xuất: Từ căng thẳng dòng tiền đến chủ động",
        summary:
          "Sau 3 tháng đồng hành, DN đã có dự báo dòng tiền 6 tháng và quy trình theo dõi hàng tuần.",
      },
    ],
    faqs: [
      {
        question: "Tôi có thể dừng gói giữa chừng không?",
        answer:
          "Có, bạn có thể dừng gói bất cứ lúc nào. Chúng tôi sẽ thanh toán theo tỷ lệ thời gian đã sử dụng.",
      },
      {
        question: "ProsFIN có hỗ trợ khẩn cấp khi thiếu tiền không?",
        answer:
          "Chúng tôi sẽ cảnh báo sớm khi phát hiện nguy cơ thiếu tiền và đề xuất giải pháp. Tuy nhiên, chúng tôi không cung cấp dịch vụ tài chính hay cho vay.",
      },
    ],
  },
};

