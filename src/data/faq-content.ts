/**
 * FAQ Section Content Data
 * 
 * This file contains all content for the FAQ section.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface FaqItem {
  id: string;
  category?: string;
  question: string;
  answer: string;
}

export interface FaqSectionContent {
  eyebrow: string;
  title: string;
  subtitle?: string;
  items: FaqItem[];
}

export const faqSectionContent: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Những câu hỏi ProsFIN thường nhận được",
  subtitle:
    "Dưới đây là các câu hỏi thường gặp về dịch vụ, quy trình và cách làm việc của ProsFIN.",
  items: [
    {
      id: "faq-1",
      category: "Quy trình",
      question: "Quy trình làm việc với ProsFIN diễn ra như thế nào?",
      answer:
        "Quy trình bắt đầu bằng buổi trao đổi đầu tiên (Discovery Call) để chúng tôi hiểu tình hình và nhu cầu của bạn. Sau đó, chúng tôi sẽ xem xét số liệu tài chính hiện tại (Financial Health Check), đưa ra lộ trình và giải pháp cụ thể (Action Plan), và đồng hành triển khai cùng bạn (Ongoing Support). Mỗi bước đều được trao đổi rõ ràng và bạn có quyền quyết định.",
    },
    {
      id: "faq-2",
      category: "Quy trình",
      question: "Mình cần chuẩn bị gì trước buổi tư vấn đầu tiên?",
      answer:
        "Bạn không cần chuẩn bị gì phức tạp. Chỉ cần sẵn sàng chia sẻ về tình hình kinh doanh hiện tại, những vấn đề tài chính bạn đang gặp phải, và mục tiêu bạn muốn đạt được. Nếu có sẵn báo cáo tài chính gần nhất, bạn có thể chia sẻ, nhưng không bắt buộc. Buổi đầu tiên chủ yếu là để chúng tôi lắng nghe và hiểu bạn.",
    },
    {
      id: "faq-3",
      category: "Phí & cam kết",
      question: "Phí dịch vụ được tính như thế nào?",
      answer:
        "Phí dịch vụ của ProsFIN được tính dựa trên phạm vi công việc và thời gian triển khai. Chúng tôi sẽ báo giá cụ thể sau khi đánh giá nhu cầu của bạn trong buổi trao đổi đầu tiên. Buổi tư vấn đầu tiên 30 phút là miễn phí để bạn đánh giá sơ bộ. Không có phí ẩn, mọi thứ đều minh bạch từ đầu.",
    },
    {
      id: "faq-4",
      category: "Phí & cam kết",
      question: "Có ràng buộc hợp đồng tối thiểu không?",
      answer:
        "Không. ProsFIN không yêu cầu hợp đồng dài hạn bắt buộc. Bạn có thể chọn làm việc theo dự án hoặc theo tháng, tùy vào nhu cầu. Chúng tôi tin rằng giá trị dịch vụ sẽ tự nói lên, và bạn sẽ muốn tiếp tục đồng hành vì thấy được kết quả thực tế.",
    },
    {
      id: "faq-5",
      category: "Bảo mật & dữ liệu",
      question: "ProsFIN bảo mật số liệu tài chính của doanh nghiệp ra sao?",
      answer:
        "Bảo mật thông tin là ưu tiên hàng đầu của ProsFIN. Tất cả dữ liệu tài chính được xử lý với mức độ bảo mật cao, chỉ những người trực tiếp làm việc với bạn mới có quyền truy cập. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo mật dữ liệu và có cam kết không chia sẻ thông tin với bên thứ ba mà không có sự đồng ý của bạn.",
    },
    {
      id: "faq-6",
      category: "Bảo mật & dữ liệu",
      question: "Ai có quyền truy cập vào dữ liệu của tôi?",
      answer:
        "Chỉ đội ngũ ProsFIN trực tiếp làm việc với bạn mới có quyền truy cập vào dữ liệu. Chúng tôi không chia sẻ thông tin với bất kỳ bên thứ ba nào. Tất cả thành viên trong đội ngũ đều ký cam kết bảo mật và tuân thủ các quy định về bảo vệ dữ liệu.",
    },
    {
      id: "faq-7",
      category: "Phạm vi dịch vụ",
      question:
        "ProsFIN có thay kế toán nội bộ / dịch vụ kê khai thuế không?",
      answer:
        "ProsFIN tập trung vào tư vấn tài chính, kiểm soát nội bộ và đồng hành quản trị tài chính. Chúng tôi không thay thế kế toán nội bộ hay làm dịch vụ kê khai thuế trực tiếp, nhưng có thể hỗ trợ bạn xây dựng hệ thống kế toán và tối ưu quy trình để kế toán nội bộ hoặc đối tác kế toán của bạn làm việc hiệu quả hơn.",
    },
    {
      id: "faq-8",
      category: "Phạm vi dịch vụ",
      question: "ProsFIN phù hợp với doanh nghiệp ở giai đoạn nào?",
      answer:
        "ProsFIN phù hợp với doanh nghiệp ở nhiều giai đoạn: từ startup đang tìm hướng tài chính, SME đang tăng trưởng cần kiểm soát tốt hơn, đến các công ty đã ổn định nhưng muốn tối ưu và mở rộng. Chúng tôi thiết kế dịch vụ linh hoạt để phù hợp với từng giai đoạn phát triển của doanh nghiệp.",
    },
    {
      id: "faq-9",
      category: "Pháp lý / kỳ vọng",
      question:
        "ProsFIN có cam kết lợi nhuận / kết quả cụ thể không?",
      answer:
        "Không. ProsFIN không cam kết hay hứa hẹn về lợi nhuận hay kết quả tài chính cụ thể. Chúng tôi cung cấp tư vấn dựa trên số liệu thực tế và kinh nghiệm, giúp bạn có bức tranh tài chính rõ ràng và đưa ra quyết định sáng suốt hơn. Mọi quyết định cuối cùng đều thuộc về bạn, và kết quả phụ thuộc vào nhiều yếu tố ngoài tầm kiểm soát của chúng tôi.",
    },
  ],
};

