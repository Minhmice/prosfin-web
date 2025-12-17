/**
 * Form Content Data
 * 
 * Centralized form labels, placeholders, helper text, and error messages
 * for all forms across marketing pages.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface FormFieldConfig {
  label: string;
  placeholder: string;
  helperText?: string;
  errorMessages: {
    required?: string;
    invalid?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
  };
}

export interface FormContent {
  leadForm: {
    title: string;
    description: string;
    fields: {
      fullName: FormFieldConfig;
      email: FormFieldConfig;
      phone: FormFieldConfig;
      companyName: FormFieldConfig;
      concern: FormFieldConfig;
    };
    submitButton: string;
    cancelButton: string;
    successMessage: string;
    errorMessage: string;
  };
  contactForm: {
    fields: {
      fullName: FormFieldConfig;
      email: FormFieldConfig;
      phone: FormFieldConfig;
      company: FormFieldConfig;
      concern: FormFieldConfig;
    };
    submitButton: string;
    successMessage: string;
    errorMessage: string;
  };
}

export const formContent: FormContent = {
  leadForm: {
    title: "Đặt lịch tư vấn miễn phí 30 phút",
    description:
      "Chia sẻ thông tin để ProsFIN hiểu tình hình doanh nghiệp bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.",
    fields: {
      fullName: {
        label: "Họ tên của bạn",
        placeholder: "Ví dụ: Nguyễn Văn A",
        helperText: "Tên bạn để ProsFIN có thể xưng hô khi liên hệ",
        errorMessages: {
          required: "Vui lòng nhập họ tên để ProsFIN có thể liên hệ với bạn",
          minLength: "Họ tên cần ít nhất 2 ký tự",
        },
      },
      email: {
        label: "Email liên hệ",
        placeholder: "email@doanhnghiep.vn",
        helperText:
          "Email để ProsFIN gửi tài liệu và lịch hẹn. Chúng tôi không spam.",
        errorMessages: {
          required:
            "Vui lòng nhập email để ProsFIN có thể phản hồi cho bạn",
          invalid: "Email không đúng định dạng. Vui lòng kiểm tra lại",
        },
      },
      phone: {
        label: "Số điện thoại",
        placeholder: "0901234567 hoặc 0241234567",
        helperText:
          "Số điện thoại để ProsFIN gọi trao đổi nhanh. Chúng tôi chỉ gọi trong giờ hành chính.",
        errorMessages: {
          required:
            "Vui lòng nhập số điện thoại để ProsFIN có thể liên hệ với bạn",
          minLength: "Số điện thoại cần ít nhất 10 số",
          pattern:
            "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng",
        },
      },
      companyName: {
        label: "Tên doanh nghiệp (tùy chọn)",
        placeholder: "Ví dụ: Công ty ABC - Sản xuất đồ gỗ",
        helperText:
          "Giúp ProsFIN hiểu ngành và quy mô để chuẩn bị buổi tư vấn phù hợp hơn",
        errorMessages: {},
      },
      concern: {
        label: "Doanh nghiệp bạn đang gặp vấn đề gì nhất?",
        placeholder: "Chọn vấn đề bạn quan tâm nhất",
        helperText:
          "Giúp ProsFIN chuẩn bị nội dung trao đổi phù hợp với tình hình của bạn",
        errorMessages: {
          required:
            "Vui lòng chọn vấn đề bạn quan tâm để ProsFIN có thể hỗ trợ tốt nhất",
        },
      },
    },
    submitButton: "Gửi thông tin để nhận tư vấn",
    cancelButton: "Để sau",
    successMessage:
      "Cảm ơn bạn! ProsFIN đã nhận thông tin. Chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc.",
    errorMessage:
      "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại hoặc liên hệ trực tiếp qua email/điện thoại.",
  },
  contactForm: {
    fields: {
      fullName: {
        label: "Họ tên của bạn",
        placeholder: "Ví dụ: Nguyễn Văn A",
        helperText: "Tên bạn để ProsFIN có thể xưng hô khi liên hệ",
        errorMessages: {
          required: "Vui lòng nhập họ tên để ProsFIN có thể liên hệ với bạn",
          minLength: "Họ tên cần ít nhất 2 ký tự",
        },
      },
      email: {
        label: "Email liên hệ",
        placeholder: "email@doanhnghiep.vn",
        helperText:
          "Email để ProsFIN gửi tài liệu và lịch hẹn. Chúng tôi không spam.",
        errorMessages: {
          required:
            "Vui lòng nhập email để ProsFIN có thể phản hồi cho bạn",
          invalid: "Email không đúng định dạng. Vui lòng kiểm tra lại",
        },
      },
      phone: {
        label: "Số điện thoại",
        placeholder: "0901234567 hoặc 0241234567",
        helperText:
          "Số điện thoại để ProsFIN gọi trao đổi nhanh. Chúng tôi chỉ gọi trong giờ hành chính.",
        errorMessages: {
          required:
            "Vui lòng nhập số điện thoại để ProsFIN có thể liên hệ với bạn",
          minLength: "Số điện thoại cần ít nhất 10 số",
          pattern:
            "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng",
        },
      },
      company: {
        label: "Tên doanh nghiệp / Ngành (tùy chọn)",
        placeholder: "Ví dụ: Công ty ABC - Sản xuất đồ gỗ",
        helperText:
          "Giúp ProsFIN hiểu ngành và quy mô để chuẩn bị buổi tư vấn phù hợp hơn",
        errorMessages: {},
      },
      concern: {
        label: "Doanh nghiệp bạn đang lo nhất điều gì về tài chính?",
        placeholder:
          "Bạn chỉ cần mô tả sơ bộ, không cần số liệu chi tiết ngay. Ví dụ: 'Lãi trên báo cáo nhưng không thấy tiền', 'Lo về thuế quyết toán', 'Không biết có đủ tiền để mở rộng không'...",
        helperText:
          "Mô tả ngắn gọn vấn đề bạn đang gặp. ProsFIN sẽ hỏi thêm chi tiết trong buổi trao đổi.",
        errorMessages: {},
      },
    },
    submitButton: "Gửi thông tin & đặt lịch tư vấn",
    successMessage:
      "Cảm ơn bạn! ProsFIN đã nhận thông tin. Chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc.",
    errorMessage:
      "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại hoặc liên hệ trực tiếp qua email/điện thoại.",
  },
};

