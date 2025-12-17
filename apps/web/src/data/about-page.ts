/**
 * About Page Content Data
 * 
 * This file contains all content for the /about page.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface StoryTimelineItem {
  period: string;
  title: string;
  description: string;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
}

export interface AboutStat {
  id: string;
  label: string;
  value: string;
}

export interface ComplianceNote {
  title: string;
  content: string;
}

export interface AboutPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  storyTimeline: StoryTimelineItem[];
  principles: Principle[];
  stats: AboutStat[];
  complianceNotes: ComplianceNote[];
}

export const aboutPageContent: AboutPageContent = {
  hero: {
    eyebrow: "Về ProsFIN",
    title: "Về ProsFIN",
    subtitle:
      "Chúng tôi giúp chủ doanh nghiệp nói chuyện với số liệu như nói chuyện với người bạn thân.",
  },
  storyTimeline: [
    {
      period: "2015-2020",
      title: "Nền tảng từ Big4",
      description:
        "Đội ngũ ProsFIN có nền tảng từ các firm Big4 và công ty kiểm toán hàng đầu. Chúng tôi đã làm việc với hàng trăm doanh nghiệp, từ startup đến công ty niêm yết.",
    },
    {
      period: "2020-2022",
      title: "Nhận ra vấn đề",
      description:
        "Trong quá trình làm việc, chúng tôi nhận thấy nhiều chủ doanh nghiệp SME gặp khó khăn trong việc hiểu và sử dụng số liệu tài chính để ra quyết định. Báo cáo kế toán có, nhưng không được 'dịch' sang ngôn ngữ của họ.",
    },
    {
      period: "2023",
      title: "Quyết định thành lập ProsFIN",
      description:
        "Chúng tôi quyết định thành lập ProsFIN với sứ mệnh giúp chủ doanh nghiệp đọc – hiểu – hành động với số liệu tài chính. Không chỉ là báo cáo, mà là giải pháp thực tế.",
    },
  ],
  principles: [
    {
      id: "privacy",
      title: "Tôn trọng bảo mật",
      description:
        "Bảo mật thông tin tài chính là ưu tiên hàng đầu. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu và không chia sẻ thông tin với bên thứ ba.",
    },
    {
      id: "simplicity",
      title: "Giải thích dễ hiểu",
      description:
        "Chúng tôi không dùng jargon khó hiểu. Mọi số liệu đều được 'dịch' sang ngôn ngữ của bạn, với ví dụ thực tế và có thể hành động ngay.",
    },
    {
      id: "no-conflict",
      title: "Không lợi ích chồng chéo",
      description:
        "ProsFIN không bán sản phẩm tài chính, không nhận hoa hồng từ bên thứ ba. Chúng tôi chỉ tư vấn dựa trên lợi ích tốt nhất của bạn.",
    },
    {
      id: "action-first",
      title: "Action-first",
      description:
        "Mỗi báo cáo đều kèm 3 việc cần làm tuần này/tháng này. Chúng tôi không chỉ đưa số liệu, mà còn giúp bạn hành động.",
    },
    {
      id: "partnership",
      title: "Đồng hành dài hạn",
      description:
        "Chúng tôi không chỉ tư vấn xong là thôi. ProsFIN đồng hành để bạn ra quyết định tự tin hơn, không chỉ một lần mà liên tục.",
    },
  ],
  stats: [
    {
      id: "experience",
      label: "Năm kinh nghiệm",
      value: "8+",
    },
    {
      id: "clients",
      label: "DN đã tư vấn",
      value: "120+",
    },
    {
      id: "industries",
      label: "Ngành đã chạm tới",
      value: "15+",
    },
  ],
  complianceNotes: [
    {
      title: "Chuẩn mực nghề nghiệp",
      content:
        "ProsFIN tuân thủ các chuẩn mực nghề nghiệp về tư vấn tài chính và kế toán. Đội ngũ có chứng chỉ chuyên môn (ACCA, CPA) và kinh nghiệm từ các firm hàng đầu.",
    },
    {
      title: "Giới hạn tư vấn",
      content:
        "ProsFIN cung cấp tư vấn tài chính, không phải dịch vụ kế toán hay kê khai thuế trực tiếp. Chúng tôi không có quyền hạn pháp lý hay quản trị trong doanh nghiệp của bạn.",
    },
    {
      title: "Không cam kết lợi nhuận",
      content:
        "ProsFIN không cam kết hay hứa hẹn về lợi nhuận hay kết quả tài chính cụ thể. Chúng tôi cung cấp tư vấn dựa trên số liệu thực tế, và mọi quyết định cuối cùng thuộc về bạn.",
    },
  ],
};

