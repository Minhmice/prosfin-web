/**
 * Process Section Content Data
 * 
 * This file contains all content for the Process section.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
  outcome?: string;
}

export interface ProcessSectionContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export const processSectionContent: ProcessSectionContent = {
  eyebrow: "Quy trình",
  title: "Cách ProsFIN đồng hành cùng doanh nghiệp bạn",
  subtitle:
    "Mọi hợp tác đều bắt đầu bằng việc lắng nghe câu chuyện của bạn, sau đó là đọc số liệu, xây kế hoạch và đồng hành triển khai.",
  steps: [
    {
      id: "step-1",
      order: 1,
      title: "Khám phá vấn đề (Discovery Call)",
      description:
        "Bạn chia sẻ tình hình hiện tại, mục tiêu, mối lo về tài chính – kế toán – thuế. Chúng tôi lắng nghe để hiểu rõ bối cảnh và nhu cầu thực sự của doanh nghiệp.",
      outcome: "Bạn rõ ràng về bức tranh tài chính hiện tại và những điểm cần cải thiện.",
    },
    {
      id: "step-2",
      order: 2,
      title: "Đọc & soi số liệu (Financial Health Check)",
      description:
        "ProsFIN xem sổ sách, báo cáo, dòng tiền để \"chẩn đoán\" vấn đề cốt lõi. Chúng tôi phân tích chi tiết để tìm ra nguyên nhân gốc rễ của các vấn đề tài chính.",
      outcome: "Bạn có báo cáo đánh giá tài chính chi tiết, chỉ ra điểm mạnh và điểm yếu.",
    },
    {
      id: "step-3",
      order: 3,
      title: "Đề xuất lộ trình & giải pháp (Action Plan)",
      description:
        "Đưa ra phương án tối ưu: điều chỉnh dòng tiền, tối ưu chi phí, xử lý rủi ro thuế, hoàn thiện hệ thống. Mỗi giải pháp được thiết kế phù hợp với tình hình thực tế của bạn.",
      outcome: "Bạn có lộ trình hành động cụ thể, ưu tiên và timeline rõ ràng.",
    },
    {
      id: "step-4",
      order: 4,
      title: "Đồng hành triển khai & theo dõi (Ongoing Support)",
      description:
        "Theo dõi định kỳ, cập nhật số liệu, tư vấn khi bạn cần ra quyết định lớn. Chúng tôi đồng hành để đảm bảo các giải pháp được triển khai hiệu quả.",
      outcome: "Bạn có người đồng hành tin cậy, luôn sẵn sàng hỗ trợ khi cần.",
    },
  ],
};

