/**
 * Problem Section Content Data
 * 
 * This file contains all content for the Problem/Pain Points section.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface Problem {
  id: string;
  title: string;
  description: string;
  impact?: string;
}

export interface ProblemSectionContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  problems: Problem[];
  cta?: {
    label: string;
    href: string;
  };
}

export const problemSectionContent: ProblemSectionContent = {
  eyebrow: "Vấn đề",
  title: "Kinh doanh có doanh thu, nhưng tài chính luôn trong trạng thái \"mù mờ\"",
  subtitle:
    "Phần lớn chủ doanh nghiệp chỉ xem doanh thu và số dư tài khoản. Nhưng đằng sau đó là lãi – lỗ, dòng tiền, thuế và rủi ro mà nếu bỏ qua quá lâu, doanh nghiệp sẽ rất dễ hụt hơi.",
  problems: [
    {
      id: "profit-no-cash",
      title: "Lãi trên báo cáo, nhưng tài khoản luôn cạn",
      description:
        "Báo cáo kế toán cho thấy lãi, nhưng tiền mặt trong tài khoản không tăng. Bạn không biết tiền đang \"kẹt\" ở đâu trong chuỗi hoạt động.",
      impact: "Thiếu vốn lưu động để mở rộng hoặc xử lý các khoản phải trả.",
    },
    {
      id: "cost-overrun",
      title: "Chi phí phình to mà không biết đang lãng phí ở đâu",
      description:
        "Tổng chi phí tăng đều đặn, nhưng bạn không thể chỉ ra được khoản nào đang \"ăn\" lợi nhuận. Không có báo cáo phân tích chi phí theo từng hạng mục.",
      impact: "Lợi nhuận bị bào mòn dần, khó cạnh tranh về giá.",
    },
    {
      id: "tax-anxiety",
      title: "Mỗi kỳ quyết toán thuế là một lần thấp thỏm",
      description:
        "Lo lắng về việc bị truy thu, phạt chậm nộp, hoặc không biết mình đã khai báo đúng chưa. Hồ sơ thuế rời rạc, không có hệ thống.",
      impact: "Rủi ro pháp lý và tâm lý căng thẳng mỗi kỳ quyết toán.",
    },
    {
      id: "no-data-decision",
      title: "Không có hệ thống số liệu để ra quyết định đầu tư/mở rộng",
      description:
        "Muốn mở rộng kinh doanh, thuê thêm nhân sự, hoặc đầu tư thiết bị, nhưng không có báo cáo tài chính đáng tin cậy để đánh giá khả năng tài chính.",
      impact: "Bỏ lỡ cơ hội tăng trưởng hoặc đầu tư sai hướng.",
    },
  ],
  cta: {
    label: "Tôi gặp ít nhất 1 trong các vấn đề trên",
    href: "#lead-form",
  },
};

