/**
 * Contact Page Content Data
 * 
 * This file contains all content for the /contact page.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface ContactFormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface ContactFaq {
  id: string;
  question: string;
  answer: string;
}

export interface ContactPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  formFields: ContactFormField[];
  privacyNote: string;
  faqs: ContactFaq[];
}

export const contactPageContent: ContactPageContent = {
  hero: {
    eyebrow: "Bắt đầu",
    title: "Đặt lịch khám sức khỏe tài chính cùng ProsFIN",
    subtitle:
      "Điền form bên dưới hoặc liên hệ trực tiếp. ProsFIN sẽ phản hồi trong vòng 24 giờ làm việc để trao đổi về tình hình doanh nghiệp bạn.",
  },
  formFields: [
    {
      id: "fullName",
      label: "Họ tên của bạn",
      type: "text",
      required: true,
      placeholder: "Ví dụ: Nguyễn Văn A",
    },
    {
      id: "email",
      label: "Email liên hệ",
      type: "email",
      required: true,
      placeholder: "email@doanhnghiep.vn",
    },
    {
      id: "phone",
      label: "Số điện thoại",
      type: "tel",
      required: true,
      placeholder: "0901234567 hoặc 0241234567",
    },
    {
      id: "company",
      label: "Tên doanh nghiệp / Ngành (tùy chọn)",
      type: "text",
      required: false,
      placeholder: "Ví dụ: Công ty ABC - Sản xuất đồ gỗ",
    },
    {
      id: "size",
      label: "Quy mô (tùy chọn)",
      type: "select",
      required: false,
      options: [
        { value: "1-10", label: "1-10 nhân sự" },
        { value: "11-50", label: "11-50 nhân sự" },
        { value: "51-200", label: "51-200 nhân sự" },
        { value: "200+", label: "Trên 200 nhân sự" },
      ],
    },
    {
      id: "concern",
      label: "Doanh nghiệp bạn đang lo nhất điều gì về tài chính?",
      type: "textarea",
      required: false,
      placeholder:
        "Bạn chỉ cần mô tả sơ bộ, không cần số liệu chi tiết ngay. Ví dụ: 'Lãi trên báo cáo nhưng không thấy tiền', 'Lo về thuế quyết toán', 'Không biết có đủ tiền để mở rộng không'...",
    },
    {
      id: "preferredTime",
      label: "Khung giờ bạn muốn trao đổi (tùy chọn)",
      type: "select",
      required: false,
      options: [
        { value: "morning", label: "Sáng (9h-12h)" },
        { value: "afternoon", label: "Chiều (13h-17h)" },
        { value: "evening", label: "Tối (18h-20h)" },
        { value: "flexible", label: "Linh hoạt" },
      ],
    },
  ],
  privacyNote:
    "ProsFIN cam kết bảo mật thông tin của bạn. Dữ liệu chỉ được sử dụng để liên hệ và chuẩn bị buổi tư vấn, không chia sẻ với bên thứ ba. Bạn có thể yên tâm chia sẻ tình hình doanh nghiệp.",
  faqs: [
    {
      id: "faq-1",
      question: "Bao lâu ProsFIN sẽ phản hồi?",
      answer:
        "ProsFIN sẽ phản hồi trong vòng 24 giờ làm việc (trừ cuối tuần và ngày lễ). Nếu bạn gửi form vào cuối tuần, chúng tôi sẽ phản hồi vào thứ 2.",
    },
    {
      id: "faq-2",
      question: "Buổi tư vấn đầu tiên có mất phí không?",
      answer:
        "Buổi tư vấn đầu tiên 30 phút là miễn phí để bạn đánh giá sơ bộ và xem ProsFIN có phù hợp với nhu cầu của bạn không. Sau đó, nếu bạn quyết định tiếp tục, chúng tôi sẽ báo giá cụ thể cho gói dịch vụ phù hợp.",
    },
    {
      id: "faq-3",
      question: "Tôi cần chuẩn bị gì trước buổi gặp?",
      answer:
        "Bạn không cần chuẩn bị gì phức tạp. Chỉ cần sẵn sàng chia sẻ về tình hình kinh doanh hiện tại, những vấn đề tài chính bạn đang gặp phải, và mục tiêu bạn muốn đạt được. Nếu có sẵn báo cáo tài chính gần nhất, bạn có thể chia sẻ, nhưng không bắt buộc.",
    },
  ],
};

