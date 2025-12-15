/**
 * About Section Content Data
 * 
 * This file contains all content for the About/Team section.
 * In the future, this data can be fetched from CMS/backend API.
 */

export interface HighlightItem {
  id: string;
  label: string;
  value: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials?: string[];
  bio: string;
  avatarUrl?: string;
  linkedInUrl?: string;
}

export interface AboutSectionContent {
  eyebrow: string;
  title: string;
  introParagraph: string;
  highlights?: HighlightItem[];
  valuesOrStyle?: ValueItem[];
  team: TeamMember[];
}

export const aboutSectionContent: AboutSectionContent = {
  eyebrow: "Về ProsFIN",
  title: "Đội ngũ tài chính xuất thân Big4, nói chuyện với bạn bằng ngôn ngữ dễ hiểu",
  introParagraph:
    "ProsFIN được thành lập bởi các chuyên gia tài chính – kế toán có kinh nghiệm từ các firm Big4 và các công ty kiểm toán hàng đầu. Chúng tôi hiểu rằng số liệu tài chính không phải là thứ khó hiểu, mà chỉ cần được \"dịch\" sang ngôn ngữ của chủ doanh nghiệp. Sứ mệnh của chúng tôi là giúp bạn có bức tranh tài chính rõ ràng, dễ hiểu và có thể hành động ngay.",
  highlights: [
    {
      id: "experience",
      label: "Kinh nghiệm trong ngành tài chính – kiểm toán – thuế",
      value: "8+ năm",
    },
    {
      id: "big4",
      label: "Xuất thân từ Big4 & firm kiểm toán hàng đầu",
      value: "Ex-Big4",
    },
    {
      id: "credentials",
      label: "Chứng chỉ chuyên môn",
      value: "ACCA, CPA",
    },
    {
      id: "clients",
      label: "Đã đồng hành với doanh nghiệp",
      value: "120+ DN",
    },
  ],
  valuesOrStyle: [
    {
      id: "transparency",
      title: "Minh bạch & thẳng thắn",
      description:
        "Tư vấn dựa trên số liệu, không tô hồng, giúp bạn có bức tranh đúng với thực tế.",
    },
    {
      id: "simplicity",
      title: "Nói chuyện dễ hiểu",
      description:
        "Không dùng jargon, ưu tiên ví dụ thực tế. Chúng tôi \"dịch\" số liệu sang ngôn ngữ của bạn.",
    },
    {
      id: "partnership",
      title: "Đồng hành dài hạn",
      description:
        "Không chỉ làm xong báo cáo là xong. Chúng tôi đồng hành để bạn ra quyết định tự tin hơn.",
    },
  ],
  team: [
    {
      id: "member-1",
      name: "Nguyễn Văn A",
      role: "Founder & Cố vấn tài chính",
      credentials: ["Ex-Big4", "ACCA", "CPA"],
      bio: "Hơn 8 năm kinh nghiệm trong lĩnh vực kiểm toán và tư vấn tài chính tại các firm Big4. Chuyên sâu về tư vấn dòng tiền, kiểm soát nội bộ và quản trị rủi ro cho doanh nghiệp SME.",
      avatarUrl: undefined,
      linkedInUrl: undefined,
    },
    {
      id: "member-2",
      name: "Trần Thị B",
      role: "Cố vấn tài chính & Thuế",
      credentials: ["Ex-Big4", "ACCA"],
      bio: "Chuyên gia về kế toán và thuế doanh nghiệp, đã hỗ trợ hàng trăm doanh nghiệp vừa và nhỏ trong việc tối ưu nghĩa vụ thuế và xây dựng hệ thống kế toán bài bản.",
      avatarUrl: undefined,
      linkedInUrl: undefined,
    },
  ],
};

