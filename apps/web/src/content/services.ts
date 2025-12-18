/**
 * Services Content Data
 * 
 * Single source of truth for all service content.
 * In the future, this data can be fetched from CMS/backend API.
 */

import type { Service } from "@/types/content";

export const SERVICES: Service[] = [
  {
    id: "s23-advisor",
    slug: "advisor",
    title: "Cố vấn tài chính chiến lược",
    excerpt: "Đồng hành dài hạn với doanh nghiệp trong các quyết định tài chính quan trọng, từ chiến lược đến triển khai.",
    shortDescription: "Cố vấn tài chính chiến lược cho doanh nghiệp",
    layoutVariant: "advisor",
    tags: ["Chiến lược", "Tư vấn", "CFO"],
    category: "Tư vấn",
    coverImage: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Tư vấn", "Quản lý", "Chiến lược"],
    cta: {
      label: "Đặt lịch tư vấn",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Cố vấn tài chính chiến lược",
        subtitle: "Đồng hành dài hạn với doanh nghiệp trong các quyết định tài chính quan trọng",
        content: "ProsFIN cung cấp dịch vụ cố vấn tài chính chiến lược, giúp doanh nghiệp có bức tranh tài chính rõ ràng và đưa ra quyết định sáng suốt.",
      },
      {
        type: "highlights",
        title: "Dịch vụ cố vấn gồm",
        highlights: [
          { label: "Tư vấn chiến lược tài chính", value: "Dài hạn" },
          { label: "Đồng hành ra quyết định", value: "Thực tế" },
          { label: "Xây dựng hệ thống báo cáo", value: "Chuyên nghiệp" },
        ],
      },
      {
        type: "list",
        title: "Các dịch vụ cố vấn",
        items: [
          "Tư vấn cấu trúc vốn và tài chính",
          "Đánh giá và tối ưu hiệu quả tài chính",
          "Hỗ trợ quyết định đầu tư và mở rộng",
          "Xây dựng hệ thống báo cáo quản trị",
          "Đồng hành trong các giao dịch M&A",
        ],
      },
      {
        type: "ctaInline",
        cta: {
          label: "Đặt lịch tư vấn",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-1", "post-2"],
    peopleIds: ["person-1", "person-2"],
  },
  {
    id: "s24-execution-coaching",
    slug: "execution-coaching",
    title: "Coaching triển khai tài chính",
    excerpt: "Đồng hành 4 giai đoạn từ đánh giá đến triển khai, giúp doanh nghiệp thực thi các giải pháp tài chính hiệu quả.",
    shortDescription: "Coaching triển khai tài chính cho doanh nghiệp",
    layoutVariant: "execution-coaching",
    tags: ["Coaching", "Triển khai", "Thực thi"],
    category: "Coaching",
    coverImage: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Triển khai", "Quy trình", "Coaching"],
    cta: {
      label: "Tìm hiểu thêm",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Coaching triển khai tài chính",
        subtitle: "Đồng hành 4 giai đoạn từ đánh giá đến triển khai",
        content: "ProsFIN cung cấp dịch vụ coaching triển khai, giúp doanh nghiệp thực thi các giải pháp tài chính một cách hiệu quả và bền vững.",
      },
      {
        type: "steps",
        title: "4 giai đoạn coaching",
        steps: [
          {
            title: "Giai đoạn 1: Đánh giá",
            description: "Phân tích tình hình tài chính hiện tại và xác định điểm mạnh, điểm yếu",
          },
          {
            title: "Giai đoạn 2: Lập kế hoạch",
            description: "Xây dựng roadmap chi tiết với các mốc thời gian và mục tiêu cụ thể",
          },
          {
            title: "Giai đoạn 3: Triển khai",
            description: "Đồng hành thực thi các giải pháp với hỗ trợ trực tiếp và đào tạo",
          },
          {
            title: "Giai đoạn 4: Tối ưu",
            description: "Đánh giá kết quả và điều chỉnh để đạt hiệu quả tối đa",
          },
        ],
      },
      {
        type: "ctaInline",
        cta: {
          label: "Tìm hiểu thêm",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-3", "post-4"],
    peopleIds: ["person-3", "person-4"],
  },
  {
    id: "s25-consulting",
    slug: "consulting",
    title: "Tư vấn tài chính chuyên sâu",
    excerpt: "Giải pháp tư vấn tài chính chuyên sâu cho các vấn đề cụ thể của doanh nghiệp.",
    shortDescription: "Tư vấn tài chính chuyên sâu",
    layoutVariant: "consulting",
    tags: ["Tư vấn", "Chuyên sâu"],
    category: "Tư vấn",
    coverImage: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Tư vấn", "Chuyên sâu"],
    cta: {
      label: "Liên hệ tư vấn",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Tư vấn tài chính chuyên sâu",
        subtitle: "Giải pháp tư vấn cho các vấn đề cụ thể",
        content: "ProsFIN cung cấp dịch vụ tư vấn tài chính chuyên sâu, tập trung vào giải quyết các vấn đề cụ thể của doanh nghiệp.",
      },
      {
        type: "list",
        title: "Các lĩnh vực tư vấn",
        items: [
          "Tối ưu cấu trúc vốn",
          "Quản lý dòng tiền",
          "Kiểm soát chi phí",
          "Tối ưu thuế",
          "Đánh giá rủi ro tài chính",
        ],
      },
      {
        type: "ctaInline",
        cta: {
          label: "Liên hệ tư vấn",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-5"],
    peopleIds: ["person-5"],
  },
  {
    id: "s26-mentor",
    slug: "mentor",
    title: "Mentoring tài chính",
    excerpt: "Đồng hành và hướng dẫn đội ngũ tài chính nội bộ phát triển năng lực chuyên môn.",
    shortDescription: "Mentoring tài chính cho đội ngũ nội bộ",
    layoutVariant: "mentor",
    tags: ["Mentoring", "Đào tạo"],
    category: "Đào tạo",
    coverImage: "https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Mentoring", "Phát triển", "Đào tạo"],
    cta: {
      label: "Tìm hiểu chương trình",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Mentoring tài chính",
        subtitle: "Đồng hành phát triển đội ngũ tài chính nội bộ",
        content: "ProsFIN cung cấp dịch vụ mentoring, giúp đội ngũ tài chính nội bộ phát triển năng lực và tự tin hơn trong công việc.",
      },
      {
        type: "narrative",
        title: "Chương trình mentoring",
        content: "Chương trình mentoring được thiết kế phù hợp với từng cấp độ, từ kế toán viên đến CFO, giúp nâng cao năng lực và hiệu quả làm việc.",
      },
      {
        type: "ctaInline",
        cta: {
          label: "Tìm hiểu chương trình",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-6"],
    peopleIds: ["person-6"],
  },
  {
    id: "s27-headhunt",
    slug: "headhunt",
    title: "Tuyển dụng tài chính",
    excerpt: "Hỗ trợ doanh nghiệp tìm kiếm và tuyển dụng nhân sự tài chính phù hợp.",
    shortDescription: "Tuyển dụng nhân sự tài chính",
    layoutVariant: "headhunt",
    tags: ["Tuyển dụng", "HR"],
    category: "Tuyển dụng",
    coverImage: "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Tuyển dụng", "HR"],
    cta: {
      label: "Liên hệ tuyển dụng",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Tuyển dụng tài chính",
        subtitle: "Tìm kiếm nhân sự tài chính phù hợp",
        content: "ProsFIN hỗ trợ doanh nghiệp tìm kiếm và tuyển dụng nhân sự tài chính chất lượng cao, phù hợp với văn hóa và yêu cầu công việc.",
      },
      {
        type: "list",
        title: "Các vị trí tuyển dụng",
        items: [
          "Kế toán trưởng",
          "CFO",
          "Chuyên viên tài chính",
          "Kiểm soát viên nội bộ",
          "Chuyên viên thuế",
        ],
      },
      {
        type: "ctaInline",
        cta: {
          label: "Liên hệ tuyển dụng",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-7"],
    peopleIds: ["person-7"],
  },
  {
    id: "s28-test",
    slug: "test",
    title: "Kiểm tra và đánh giá tài chính",
    excerpt: "Dịch vụ kiểm tra và đánh giá toàn diện tình hình tài chính doanh nghiệp.",
    shortDescription: "Kiểm tra và đánh giá tài chính",
    layoutVariant: "test",
    tags: ["Đánh giá", "Kiểm tra"],
    category: "Đánh giá",
    coverImage: "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Đánh giá", "Phân tích"],
    cta: {
      label: "Đặt lịch đánh giá",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Kiểm tra và đánh giá tài chính",
        subtitle: "Đánh giá toàn diện tình hình tài chính",
        content: "ProsFIN cung cấp dịch vụ kiểm tra và đánh giá tài chính toàn diện, giúp doanh nghiệp hiểu rõ tình hình và có kế hoạch cải thiện.",
      },
      {
        type: "highlights",
        title: "Các hạng mục đánh giá",
        highlights: [
          { label: "Tình hình tài chính", value: "Toàn diện" },
          { label: "Hiệu quả hoạt động", value: "Chi tiết" },
          { label: "Rủi ro tài chính", value: "Đầy đủ" },
        ],
      },
      {
        type: "ctaInline",
        cta: {
          label: "Đặt lịch đánh giá",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-8"],
    peopleIds: ["person-8"],
  },
  {
    id: "s29-audit",
    slug: "audit",
    title: "Kiểm toán nội bộ",
    excerpt: "Dịch vụ kiểm toán nội bộ giúp doanh nghiệp đảm bảo tính chính xác và tuân thủ trong quản lý tài chính.",
    shortDescription: "Kiểm toán nội bộ tài chính",
    layoutVariant: "audit",
    tags: ["Kiểm toán", "Nội bộ"],
    category: "Kiểm toán",
    coverImage: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Kiểm toán", "Nội bộ"],
    cta: {
      label: "Liên hệ kiểm toán",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Kiểm toán nội bộ",
        subtitle: "Đảm bảo tính chính xác và tuân thủ",
        content: "ProsFIN cung cấp dịch vụ kiểm toán nội bộ, giúp doanh nghiệp đảm bảo tính chính xác, minh bạch và tuân thủ trong quản lý tài chính.",
      },
      {
        type: "list",
        title: "Phạm vi kiểm toán",
        items: [
          "Kiểm tra sổ sách kế toán",
          "Đánh giá hệ thống kiểm soát nội bộ",
          "Rà soát tuân thủ quy định",
          "Phát hiện và đề xuất cải thiện",
        ],
      },
      {
        type: "ctaInline",
        cta: {
          label: "Liên hệ kiểm toán",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-9"],
    peopleIds: ["person-9"],
  },
  {
    id: "seminar-p3",
    slug: "seminar",
    title: "Hội thảo và đào tạo tài chính",
    excerpt: "Tổ chức hội thảo và chương trình đào tạo về quản lý tài chính cho doanh nghiệp.",
    shortDescription: "Hội thảo và đào tạo tài chính",
    layoutVariant: "seminar",
    tags: ["Hội thảo", "Đào tạo"],
    category: "Đào tạo",
    coverImage: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
    relatedPostTags: ["Hội thảo", "Đào tạo"],
    cta: {
      label: "Đăng ký hội thảo",
      href: "/contact",
      variant: "primary",
    },
    sections: [
      {
        type: "hero",
        title: "Hội thảo và đào tạo tài chính",
        subtitle: "Nâng cao kiến thức quản lý tài chính",
        content: "ProsFIN tổ chức các hội thảo và chương trình đào tạo về quản lý tài chính, giúp doanh nghiệp nâng cao kiến thức và kỹ năng.",
      },
      {
        type: "list",
        title: "Các chủ đề hội thảo",
        items: [
          "Quản lý dòng tiền hiệu quả",
          "Đọc hiểu báo cáo tài chính",
          "Tối ưu chi phí và thuế",
          "Xây dựng hệ thống báo cáo quản trị",
        ],
      },
      {
        type: "ctaInline",
        cta: {
          label: "Đăng ký hội thảo",
          href: "/contact",
          variant: "primary",
        },
      },
    ],
    relatedPostIds: ["post-1", "post-5"],
    peopleIds: ["person-1", "person-5"],
  },
];

