import type { Post, PostStatus, ContentBucket } from "@/types/content";

/**
 * Mock posts data
 * 
 * Sample posts across all buckets and statuses for testing
 */

const mockAuthor = {
  id: "user-1",
  name: "Admin User",
  email: "admin@prosfin.vn",
};

// Helper to create a simple Lexical editor state
function createEditorState(text: string): Post["content"] {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text,
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
}

// Base mock posts
const baseMockPosts: Post[] = [
  // Insights - Published
  {
    id: "post-1",
    bucket: "insights",
    title: "5 Cách Tối Ưu Tài Chính Doanh Nghiệp Năm 2024",
    slug: "5-cach-toi-uu-tai-chinh-doanh-nghiep-nam-2024",
    excerpt: "Khám phá các chiến lược tài chính hiệu quả giúp doanh nghiệp tăng trưởng bền vững trong năm 2024.",
    cover: "/brand/prosfin-logo.svg",
    tags: ["tài chính", "doanh nghiệp", "tối ưu"],
    content: createEditorState(
      "Trong bối cảnh kinh tế đầy biến động, việc tối ưu tài chính doanh nghiệp trở nên quan trọng hơn bao giờ hết. Bài viết này sẽ giúp bạn khám phá 5 cách hiệu quả để quản lý tài chính tốt hơn."
    ),
    seoTitle: "5 Cách Tối Ưu Tài Chính Doanh Nghiệp 2024 | ProsFin",
    seoDescription: "Khám phá các chiến lược tài chính hiệu quả giúp doanh nghiệp tăng trưởng bền vững trong năm 2024.",
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-10T08:00:00Z",
    author: mockAuthor,
    status: "published",
  },
  // Insights - Draft (missing cover - for "Needs attention" filter)
  {
    id: "post-2",
    bucket: "insights",
    title: "Xu Hướng Đầu Tư Bất Động Sản 2024",
    slug: "xu-huong-dau-tu-bat-dong-san-2024",
    excerpt: "Phân tích các xu hướng đầu tư bất động sản đáng chú ý trong năm 2024.",
    tags: ["đầu tư", "bất động sản", "xu hướng"],
    content: createEditorState(
      "Thị trường bất động sản năm 2024 đang có nhiều biến động thú vị. Các nhà đầu tư cần nắm bắt các xu hướng mới để đưa ra quyết định đúng đắn."
    ),
    // Missing cover - for testing "Needs attention" filter
    updatedAt: "2024-01-20T14:30:00Z",
    createdAt: "2024-01-18T09:00:00Z",
    author: mockAuthor,
    status: "draft",
  },
  // Insights - Scheduled (future date)
  {
    id: "post-3",
    bucket: "insights",
    title: "Hướng Dẫn Quản Lý Dòng Tiền Cho Startup",
    slug: "huong-dan-quan-ly-dong-tien-cho-startup",
    excerpt: "Các bước cơ bản để quản lý dòng tiền hiệu quả cho các startup mới thành lập.",
    cover: "/brand/prosfin-logo.svg",
    tags: ["startup", "quản lý dòng tiền", "tài chính"],
    content: createEditorState(
      "Quản lý dòng tiền là một trong những thách thức lớn nhất đối với các startup. Bài viết này sẽ hướng dẫn bạn các phương pháp quản lý dòng tiền hiệu quả."
    ),
    seoTitle: "Hướng Dẫn Quản Lý Dòng Tiền Cho Startup | ProsFin",
    seoDescription: "Các bước cơ bản để quản lý dòng tiền hiệu quả cho các startup mới thành lập.",
    updatedAt: "2024-01-25T16:00:00Z",
    createdAt: "2024-01-25T16:00:00Z",
    author: mockAuthor,
    status: "scheduled",
    scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  },
  // Insights - Scheduled (near future)
  {
    id: "post-9",
    bucket: "insights",
    title: "Chiến Lược Tài Chính Cho Doanh Nghiệp Vừa Và Nhỏ",
    slug: "chien-luoc-tai-chinh-cho-doanh-nghiep-vua-va-nho",
    excerpt: "Khám phá các chiến lược tài chính phù hợp cho doanh nghiệp vừa và nhỏ.",
    tags: ["chiến lược", "tài chính", "SME"],
    content: createEditorState(
      "Doanh nghiệp vừa và nhỏ cần có chiến lược tài chính riêng phù hợp với quy mô và nguồn lực của mình."
    ),
    updatedAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    author: mockAuthor,
    status: "scheduled",
    scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
  },
  // Resources - Published
  {
    id: "post-4",
    bucket: "resources",
    title: "Template Báo Cáo Tài Chính Miễn Phí",
    slug: "template-bao-cao-tai-chinh-mien-phi",
    excerpt: "Tải xuống template báo cáo tài chính chuyên nghiệp, sẵn sàng sử dụng.",
    cover: "/brand/prosfin-logo.svg",
    tags: ["template", "báo cáo", "tài chính"],
    content: createEditorState(
      "Chúng tôi cung cấp template báo cáo tài chính miễn phí, được thiết kế chuyên nghiệp và dễ sử dụng. Template này phù hợp cho mọi loại hình doanh nghiệp."
    ),
    seoTitle: "Template Báo Cáo Tài Chính Miễn Phí | ProsFin",
    seoDescription: "Tải xuống template báo cáo tài chính chuyên nghiệp, sẵn sàng sử dụng cho doanh nghiệp của bạn.",
    publishedAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
    createdAt: "2024-01-08T08:00:00Z",
    author: mockAuthor,
    status: "published",
  },
  // Resources - Draft (missing SEO - for "Needs attention" filter)
  {
    id: "post-5",
    bucket: "resources",
    title: "Checklist Kiểm Tra Tài Chính Định Kỳ",
    slug: "checklist-kiem-tra-tai-chinh-dinh-ky",
    excerpt: "Danh sách kiểm tra toàn diện để đánh giá tình hình tài chính doanh nghiệp.",
    cover: "/brand/prosfin-logo.svg",
    tags: ["checklist", "kiểm tra", "tài chính"],
    content: createEditorState(
      "Kiểm tra tài chính định kỳ là việc làm cần thiết để đảm bảo doanh nghiệp hoạt động hiệu quả. Checklist này sẽ giúp bạn không bỏ sót bất kỳ yếu tố quan trọng nào."
    ),
    // Missing seoTitle and seoDescription - for testing "Needs attention" filter
    updatedAt: "2024-01-22T11:00:00Z",
    createdAt: "2024-01-20T10:00:00Z",
    author: mockAuthor,
    status: "draft",
  },
  // Knowledge - Published
  {
    id: "post-6",
    bucket: "knowledge",
    title: "Hiểu Về Thuế VAT: Hướng Dẫn Cho Doanh Nghiệp",
    slug: "hieu-ve-thue-vat-huong-dan-cho-doanh-nghiep",
    excerpt: "Tổng quan về thuế VAT và cách áp dụng đúng cho doanh nghiệp Việt Nam.",
    cover: "/brand/prosfin-logo.svg",
    tags: ["thuế", "VAT", "kiến thức"],
    content: createEditorState(
      "Thuế VAT là một trong những loại thuế quan trọng nhất mà doanh nghiệp cần nắm vững. Bài viết này sẽ giải thích chi tiết về thuế VAT và cách áp dụng."
    ),
    seoTitle: "Hiểu Về Thuế VAT: Hướng Dẫn Cho Doanh Nghiệp | ProsFin",
    seoDescription: "Tổng quan về thuế VAT và cách áp dụng đúng cho doanh nghiệp Việt Nam.",
    publishedAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
    createdAt: "2024-01-05T08:00:00Z",
    author: mockAuthor,
    status: "published",
  },
  // Knowledge - Archived
  {
    id: "post-7",
    bucket: "knowledge",
    title: "Quy Trình Kế Toán Cơ Bản (Cũ)",
    slug: "quy-trinh-ke-toan-co-ban-cu",
    excerpt: "Bài viết cũ về quy trình kế toán cơ bản - đã được thay thế bằng phiên bản mới.",
    tags: ["kế toán", "quy trình", "cũ"],
    content: createEditorState(
      "Bài viết này đã được lưu trữ và thay thế bằng phiên bản mới cập nhật hơn."
    ),
    publishedAt: "2023-12-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
    createdAt: "2023-11-15T08:00:00Z",
    author: mockAuthor,
    status: "archived",
  },
  // Resources - Published
  {
    id: "post-8",
    bucket: "resources",
    title: "Ebook: Hướng Dẫn Quản Lý Tài Chính Doanh Nghiệp",
    slug: "ebook-huong-dan-quan-ly-tai-chinh-doanh-nghiep",
    excerpt: "Tải xuống ebook miễn phí với hướng dẫn chi tiết về quản lý tài chính doanh nghiệp.",
    cover: "/brand/prosfin-logo.svg",
    tags: ["ebook", "tài chính", "tài liệu"],
    content: createEditorState(
      "Ebook này cung cấp hướng dẫn toàn diện về quản lý tài chính doanh nghiệp, từ cơ bản đến nâng cao. Phù hợp cho các doanh nghiệp vừa và nhỏ."
    ),
    seoTitle: "Ebook: Hướng Dẫn Quản Lý Tài Chính Doanh Nghiệp | ProsFin",
    seoDescription: "Tải xuống ebook miễn phí với hướng dẫn chi tiết về quản lý tài chính doanh nghiệp.",
    publishedAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
    createdAt: "2024-01-01T08:00:00Z",
    author: mockAuthor,
    status: "published",
  },
];

// Generate additional mock posts for performance testing (200+ total)
function generateMockPosts(): Post[] {
  const buckets: ContentBucket[] = ["insights", "resources", "knowledge"];
  const statuses: PostStatus[] = ["draft", "published", "scheduled", "archived"];
  const topics = [
    "Tài chính", "Kế toán", "Thuế", "Đầu tư", "Quản lý", "Kinh doanh",
    "Marketing", "Bán hàng", "Nhân sự", "Công nghệ", "Pháp lý", "Chiến lược"
  ];
  const adjectives = [
    "Hiệu quả", "Tối ưu", "Chuyên nghiệp", "Toàn diện", "Chi tiết", "Thực tế",
    "Mới nhất", "Cập nhật", "Chuyên sâu", "Cơ bản", "Nâng cao", "Thực hành"
  ];

  const generated: Post[] = [];
  const now = Date.now();
  
  for (let i = 9; i <= 250; i++) {
    const bucket = buckets[Math.floor(Math.random() * buckets.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const title = `${adj} ${topic} ${i}`;
    const slug = `${adj.toLowerCase()}-${topic.toLowerCase()}-${i}`.replace(/\s+/g, "-");
    
    const daysAgo = Math.floor(Math.random() * 365);
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    const updatedAt = new Date(now - Math.floor(Math.random() * daysAgo) * 24 * 60 * 60 * 1000).toISOString();
    let publishedAt: string | undefined;
    let scheduledFor: string | undefined;
    
    if (status === "published") {
      publishedAt = new Date(now - Math.floor(Math.random() * daysAgo) * 24 * 60 * 60 * 1000).toISOString();
    } else if (status === "scheduled") {
      // Scheduled posts should have future dates
      const daysInFuture = Math.floor(Math.random() * 30) + 1; // 1-30 days from now
      scheduledFor = new Date(now + daysInFuture * 24 * 60 * 60 * 1000).toISOString();
      publishedAt = scheduledFor; // For scheduled posts, publishedAt = scheduledFor
    }
    
    const tags = [
      topic.toLowerCase(),
      ...topics.slice(0, Math.floor(Math.random() * 3) + 1).map(t => t.toLowerCase())
    ].slice(0, Math.min(5, Math.floor(Math.random() * 4) + 1));

    generated.push({
      id: `post-${i}`,
      bucket,
      title,
      slug,
      excerpt: `Bài viết về ${topic.toLowerCase()} - ${adj.toLowerCase()}`,
      cover: Math.random() > 0.5 ? "/brand/prosfin-logo.svg" : undefined,
      tags: Array.from(new Set(tags)),
      content: createEditorState(`Nội dung bài viết về ${topic.toLowerCase()}. ${adj} hướng dẫn và thông tin chi tiết.`),
      seoTitle: status === "published" ? `${title} | ProsFin` : undefined,
      seoDescription: status === "published" ? `Bài viết về ${topic.toLowerCase()}` : undefined,
      publishedAt,
      updatedAt,
      createdAt,
      author: mockAuthor,
      status,
      scheduledFor,
    });
  }
  
  return generated;
}

export const mockPosts: Post[] = [
  ...baseMockPosts,
  ...generateMockPosts(),
];

