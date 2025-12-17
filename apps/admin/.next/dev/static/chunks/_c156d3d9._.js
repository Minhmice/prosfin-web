(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/admin/src/mocks/posts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockPosts",
    ()=>mockPosts
]);
/**
 * Mock posts data
 * 
 * Sample posts across all buckets and statuses for testing
 */ const mockAuthor = {
    id: "user-1",
    name: "Admin User",
    email: "admin@prosfin.vn"
};
// Helper to create a simple Lexical editor state
function createEditorState(text) {
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
                            version: 1
                        }
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "paragraph",
                    version: 1
                }
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1
        }
    };
}
// Base mock posts
const baseMockPosts = [
    // Insights - Published
    {
        id: "post-1",
        bucket: "insights",
        title: "5 Cách Tối Ưu Tài Chính Doanh Nghiệp Năm 2024",
        slug: "5-cach-toi-uu-tai-chinh-doanh-nghiep-nam-2024",
        excerpt: "Khám phá các chiến lược tài chính hiệu quả giúp doanh nghiệp tăng trưởng bền vững trong năm 2024.",
        cover: "/brand/prosfin-logo.svg",
        tags: [
            "tài chính",
            "doanh nghiệp",
            "tối ưu"
        ],
        content: createEditorState("Trong bối cảnh kinh tế đầy biến động, việc tối ưu tài chính doanh nghiệp trở nên quan trọng hơn bao giờ hết. Bài viết này sẽ giúp bạn khám phá 5 cách hiệu quả để quản lý tài chính tốt hơn."),
        seoTitle: "5 Cách Tối Ưu Tài Chính Doanh Nghiệp 2024 | ProsFin",
        seoDescription: "Khám phá các chiến lược tài chính hiệu quả giúp doanh nghiệp tăng trưởng bền vững trong năm 2024.",
        publishedAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        createdAt: "2024-01-10T08:00:00Z",
        author: mockAuthor,
        status: "published"
    },
    // Insights - Draft
    {
        id: "post-2",
        bucket: "insights",
        title: "Xu Hướng Đầu Tư Bất Động Sản 2024",
        slug: "xu-huong-dau-tu-bat-dong-san-2024",
        excerpt: "Phân tích các xu hướng đầu tư bất động sản đáng chú ý trong năm 2024.",
        tags: [
            "đầu tư",
            "bất động sản",
            "xu hướng"
        ],
        content: createEditorState("Thị trường bất động sản năm 2024 đang có nhiều biến động thú vị. Các nhà đầu tư cần nắm bắt các xu hướng mới để đưa ra quyết định đúng đắn."),
        updatedAt: "2024-01-20T14:30:00Z",
        createdAt: "2024-01-18T09:00:00Z",
        author: mockAuthor,
        status: "draft"
    },
    // Insights - Scheduled
    {
        id: "post-3",
        bucket: "insights",
        title: "Hướng Dẫn Quản Lý Dòng Tiền Cho Startup",
        slug: "huong-dan-quan-ly-dong-tien-cho-startup",
        excerpt: "Các bước cơ bản để quản lý dòng tiền hiệu quả cho các startup mới thành lập.",
        tags: [
            "startup",
            "quản lý dòng tiền",
            "tài chính"
        ],
        content: createEditorState("Quản lý dòng tiền là một trong những thách thức lớn nhất đối với các startup. Bài viết này sẽ hướng dẫn bạn các phương pháp quản lý dòng tiền hiệu quả."),
        publishedAt: "2024-02-01T08:00:00Z",
        updatedAt: "2024-01-25T16:00:00Z",
        createdAt: "2024-01-25T16:00:00Z",
        author: mockAuthor,
        status: "scheduled",
        scheduledFor: "2024-02-01T08:00:00Z"
    },
    // Resources - Published
    {
        id: "post-4",
        bucket: "resources",
        title: "Template Báo Cáo Tài Chính Miễn Phí",
        slug: "template-bao-cao-tai-chinh-mien-phi",
        excerpt: "Tải xuống template báo cáo tài chính chuyên nghiệp, sẵn sàng sử dụng.",
        cover: "/brand/prosfin-logo.svg",
        tags: [
            "template",
            "báo cáo",
            "tài chính"
        ],
        content: createEditorState("Chúng tôi cung cấp template báo cáo tài chính miễn phí, được thiết kế chuyên nghiệp và dễ sử dụng. Template này phù hợp cho mọi loại hình doanh nghiệp."),
        seoTitle: "Template Báo Cáo Tài Chính Miễn Phí | ProsFin",
        seoDescription: "Tải xuống template báo cáo tài chính chuyên nghiệp, sẵn sàng sử dụng cho doanh nghiệp của bạn.",
        publishedAt: "2024-01-12T10:00:00Z",
        updatedAt: "2024-01-12T10:00:00Z",
        createdAt: "2024-01-08T08:00:00Z",
        author: mockAuthor,
        status: "published"
    },
    // Resources - Draft
    {
        id: "post-5",
        bucket: "resources",
        title: "Checklist Kiểm Tra Tài Chính Định Kỳ",
        slug: "checklist-kiem-tra-tai-chinh-dinh-ky",
        excerpt: "Danh sách kiểm tra toàn diện để đánh giá tình hình tài chính doanh nghiệp.",
        tags: [
            "checklist",
            "kiểm tra",
            "tài chính"
        ],
        content: createEditorState("Kiểm tra tài chính định kỳ là việc làm cần thiết để đảm bảo doanh nghiệp hoạt động hiệu quả. Checklist này sẽ giúp bạn không bỏ sót bất kỳ yếu tố quan trọng nào."),
        updatedAt: "2024-01-22T11:00:00Z",
        createdAt: "2024-01-20T10:00:00Z",
        author: mockAuthor,
        status: "draft"
    },
    // Knowledge - Published
    {
        id: "post-6",
        bucket: "knowledge",
        title: "Hiểu Về Thuế VAT: Hướng Dẫn Cho Doanh Nghiệp",
        slug: "hieu-ve-thue-vat-huong-dan-cho-doanh-nghiep",
        excerpt: "Tổng quan về thuế VAT và cách áp dụng đúng cho doanh nghiệp Việt Nam.",
        cover: "/brand/prosfin-logo.svg",
        tags: [
            "thuế",
            "VAT",
            "kiến thức"
        ],
        content: createEditorState("Thuế VAT là một trong những loại thuế quan trọng nhất mà doanh nghiệp cần nắm vững. Bài viết này sẽ giải thích chi tiết về thuế VAT và cách áp dụng."),
        seoTitle: "Hiểu Về Thuế VAT: Hướng Dẫn Cho Doanh Nghiệp | ProsFin",
        seoDescription: "Tổng quan về thuế VAT và cách áp dụng đúng cho doanh nghiệp Việt Nam.",
        publishedAt: "2024-01-10T09:00:00Z",
        updatedAt: "2024-01-10T09:00:00Z",
        createdAt: "2024-01-05T08:00:00Z",
        author: mockAuthor,
        status: "published"
    },
    // Knowledge - Archived
    {
        id: "post-7",
        bucket: "knowledge",
        title: "Quy Trình Kế Toán Cơ Bản (Cũ)",
        slug: "quy-trinh-ke-toan-co-ban-cu",
        excerpt: "Bài viết cũ về quy trình kế toán cơ bản - đã được thay thế bằng phiên bản mới.",
        tags: [
            "kế toán",
            "quy trình",
            "cũ"
        ],
        content: createEditorState("Bài viết này đã được lưu trữ và thay thế bằng phiên bản mới cập nhật hơn."),
        publishedAt: "2023-12-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
        createdAt: "2023-11-15T08:00:00Z",
        author: mockAuthor,
        status: "archived"
    },
    // Resources - Published
    {
        id: "post-8",
        bucket: "resources",
        title: "Ebook: Hướng Dẫn Quản Lý Tài Chính Doanh Nghiệp",
        slug: "ebook-huong-dan-quan-ly-tai-chinh-doanh-nghiep",
        excerpt: "Tải xuống ebook miễn phí với hướng dẫn chi tiết về quản lý tài chính doanh nghiệp.",
        cover: "/brand/prosfin-logo.svg",
        tags: [
            "ebook",
            "tài chính",
            "tài liệu"
        ],
        content: createEditorState("Ebook này cung cấp hướng dẫn toàn diện về quản lý tài chính doanh nghiệp, từ cơ bản đến nâng cao. Phù hợp cho các doanh nghiệp vừa và nhỏ."),
        seoTitle: "Ebook: Hướng Dẫn Quản Lý Tài Chính Doanh Nghiệp | ProsFin",
        seoDescription: "Tải xuống ebook miễn phí với hướng dẫn chi tiết về quản lý tài chính doanh nghiệp.",
        publishedAt: "2024-01-08T10:00:00Z",
        updatedAt: "2024-01-08T10:00:00Z",
        createdAt: "2024-01-01T08:00:00Z",
        author: mockAuthor,
        status: "published"
    }
];
// Generate additional mock posts for performance testing (200+ total)
function generateMockPosts() {
    const buckets = [
        "insights",
        "resources",
        "knowledge"
    ];
    const statuses = [
        "draft",
        "published",
        "scheduled",
        "archived"
    ];
    const topics = [
        "Tài chính",
        "Kế toán",
        "Thuế",
        "Đầu tư",
        "Quản lý",
        "Kinh doanh",
        "Marketing",
        "Bán hàng",
        "Nhân sự",
        "Công nghệ",
        "Pháp lý",
        "Chiến lược"
    ];
    const adjectives = [
        "Hiệu quả",
        "Tối ưu",
        "Chuyên nghiệp",
        "Toàn diện",
        "Chi tiết",
        "Thực tế",
        "Mới nhất",
        "Cập nhật",
        "Chuyên sâu",
        "Cơ bản",
        "Nâng cao",
        "Thực hành"
    ];
    const generated = [];
    const now = Date.now();
    for(let i = 9; i <= 250; i++){
        const bucket = buckets[Math.floor(Math.random() * buckets.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const title = `${adj} ${topic} ${i}`;
        const slug = `${adj.toLowerCase()}-${topic.toLowerCase()}-${i}`.replace(/\s+/g, "-");
        const daysAgo = Math.floor(Math.random() * 365);
        const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();
        const updatedAt = new Date(now - Math.floor(Math.random() * daysAgo) * 24 * 60 * 60 * 1000).toISOString();
        const publishedAt = status === "published" || status === "scheduled" ? new Date(now - Math.floor(Math.random() * daysAgo) * 24 * 60 * 60 * 1000).toISOString() : undefined;
        const tags = [
            topic.toLowerCase(),
            ...topics.slice(0, Math.floor(Math.random() * 3) + 1).map((t)=>t.toLowerCase())
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
            scheduledFor: status === "scheduled" ? publishedAt : undefined
        });
    }
    return generated;
}
const mockPosts = [
    ...baseMockPosts,
    ...generateMockPosts()
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/lib/data/posts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deletePost",
    ()=>deletePost,
    "duplicatePost",
    ()=>duplicatePost,
    "getAllTags",
    ()=>getAllTags,
    "getPost",
    ()=>getPost,
    "getPostById",
    ()=>getPostById,
    "isSlugUnique",
    ()=>isSlugUnique,
    "listPosts",
    ()=>listPosts,
    "publish",
    ()=>publish,
    "saveDraft",
    ()=>saveDraft,
    "unpublish",
    ()=>unpublish,
    "updatePostStatus",
    ()=>updatePostStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$mocks$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/mocks/posts.ts [app-client] (ecmascript)");
;
/**
 * Data adapter cho Posts
 * 
 * UI components chỉ import từ đây, không import mocks trực tiếp.
 * Có thể swap sang API calls trong Phase 3.
 */ let postsData = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$mocks$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPosts"]
];
async function listPosts(bucket, filters) {
    // Simulate API delay
    await new Promise((resolve)=>setTimeout(resolve, 100));
    let filtered = [
        ...postsData
    ];
    // Filter by bucket
    if (bucket) {
        filtered = filtered.filter((post)=>post.bucket === bucket);
    }
    // Apply filters
    if (filters) {
        if (filters.status && filters.status.length > 0) {
            filtered = filtered.filter((post)=>filters.status.includes(post.status));
        }
        if (filters.bucket && filters.bucket.length > 0) {
            filtered = filtered.filter((post)=>filters.bucket.includes(post.bucket));
        }
        if (filters.tags && filters.tags.length > 0) {
            filtered = filtered.filter((post)=>filters.tags.some((tag)=>post.tags.includes(tag)));
        }
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter((post)=>post.title.toLowerCase().includes(searchLower) || post.excerpt?.toLowerCase().includes(searchLower) || post.slug.toLowerCase().includes(searchLower) || post.tags.some((tag)=>tag.toLowerCase().includes(searchLower)));
        }
        if (filters.dateFrom) {
            filtered = filtered.filter((post)=>post.updatedAt >= filters.dateFrom || post.createdAt >= filters.dateFrom);
        }
        if (filters.dateTo) {
            filtered = filtered.filter((post)=>post.updatedAt <= filters.dateTo || post.createdAt <= filters.dateTo);
        }
    }
    return filtered;
}
async function getPost(slug, bucket) {
    await new Promise((resolve)=>setTimeout(resolve, 50));
    return postsData.find((post)=>post.slug === slug && post.bucket === bucket) || null;
}
async function getPostById(id) {
    await new Promise((resolve)=>setTimeout(resolve, 50));
    return postsData.find((post)=>post.id === id) || null;
}
async function isSlugUnique(slug, bucket, excludeId) {
    await new Promise((resolve)=>setTimeout(resolve, 20));
    const existing = postsData.find((post)=>post.slug === slug && post.bucket === bucket && post.id !== excludeId);
    return !existing;
}
async function saveDraft(postData, existingId) {
    await new Promise((resolve)=>setTimeout(resolve, 200));
    const now = new Date().toISOString();
    if (existingId) {
        // Update existing
        const existing = postsData.find((p)=>p.id === existingId);
        if (!existing) {
            throw new Error(`Post with id ${existingId} not found`);
        }
        const updated = {
            ...existing,
            ...postData,
            id: existingId,
            updatedAt: now,
            // Preserve createdAt and author
            createdAt: existing.createdAt,
            author: existing.author
        };
        postsData = postsData.map((p)=>p.id === existingId ? updated : p);
        return updated;
    } else {
        // Create new
        const newPost = {
            ...postData,
            id: `post-${Date.now()}`,
            createdAt: now,
            updatedAt: now,
            author: {
                id: "user-1",
                name: "Admin User",
                email: "admin@prosfin.vn"
            }
        };
        postsData = [
            ...postsData,
            newPost
        ];
        return newPost;
    }
}
async function publish(id, scheduledFor) {
    await new Promise((resolve)=>setTimeout(resolve, 200));
    const post = postsData.find((p)=>p.id === id);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    const now = new Date().toISOString();
    const publishedAt = scheduledFor || now;
    const updated = {
        ...post,
        status: scheduledFor ? "scheduled" : "published",
        publishedAt,
        scheduledFor: scheduledFor || undefined,
        updatedAt: now
    };
    postsData = postsData.map((p)=>p.id === id ? updated : p);
    return updated;
}
async function unpublish(id) {
    await new Promise((resolve)=>setTimeout(resolve, 200));
    const post = postsData.find((p)=>p.id === id);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    const updated = {
        ...post,
        status: "draft",
        updatedAt: new Date().toISOString()
    };
    postsData = postsData.map((p)=>p.id === id ? updated : p);
    return updated;
}
async function duplicatePost(slug, bucket) {
    await new Promise((resolve)=>setTimeout(resolve, 200));
    const original = await getPost(slug, bucket);
    if (!original) {
        throw new Error(`Post with slug ${slug} in bucket ${bucket} not found`);
    }
    const now = new Date().toISOString();
    const newSlug = `${original.slug}-copy-${Date.now()}`;
    const duplicated = {
        ...original,
        id: `post-${Date.now()}`,
        slug: newSlug,
        title: `${original.title} (Copy)`,
        status: "draft",
        publishedAt: undefined,
        scheduledFor: undefined,
        createdAt: now,
        updatedAt: now
    };
    postsData = [
        ...postsData,
        duplicated
    ];
    return duplicated;
}
async function deletePost(id) {
    await new Promise((resolve)=>setTimeout(resolve, 100));
    const post = postsData.find((p)=>p.id === id);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    postsData = postsData.filter((p)=>p.id !== id);
}
async function updatePostStatus(id, status) {
    await new Promise((resolve)=>setTimeout(resolve, 100));
    const post = postsData.find((p)=>p.id === id);
    if (!post) {
        throw new Error(`Post with id ${id} not found`);
    }
    const updated = {
        ...post,
        status,
        updatedAt: new Date().toISOString()
    };
    postsData = postsData.map((p)=>p.id === id ? updated : p);
    return updated;
}
async function getAllTags() {
    await new Promise((resolve)=>setTimeout(resolve, 50));
    const allTags = postsData.flatMap((post)=>post.tags);
    return Array.from(new Set(allTags)).sort();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/components/content/preview/post-preview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostPreview",
    ()=>PostPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function PostPreview(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f3101b82fc3285a2357253f8f2010d9b68da7ce20422e997de3faf5eea3009c1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f3101b82fc3285a2357253f8f2010d9b68da7ce20422e997de3faf5eea3009c1";
    }
    const { content } = t0;
    let t1;
    let t2;
    let t3;
    if ($[1] !== content) {
        t3 = Symbol.for("react.early_return_sentinel");
        bb0: {
            const renderNode = {
                "PostPreview[renderNode]": (node, index)=>{
                    if (!node || typeof node !== "object") {
                        return null;
                    }
                    const { type, children, text, format, ...props } = node;
                    if (type === "text") {
                        let className = "";
                        if (format & 1) {
                            className = "font-bold ";
                        }
                        if (format & 2) {
                            className = className + "italic ";
                        }
                        if (format & 4) {
                            className = className + "underline ";
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: className,
                            children: text
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 62,
                            columnNumber: 20
                        }, this);
                    }
                    if (type === "paragraph") {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-4",
                            children: children?.map({
                                "PostPreview[renderNode > (anonymous)()]": (child, i)=>renderNode(child, i)
                            }["PostPreview[renderNode > (anonymous)()]"])
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 65,
                            columnNumber: 20
                        }, this);
                    }
                    if (type === "heading") {
                        const tag = props.tag || "h1";
                        const headingClasses = {
                            h1: "text-4xl font-bold mb-4 mt-8",
                            h2: "text-3xl font-bold mb-3 mt-6",
                            h3: "text-2xl font-bold mb-2 mt-4"
                        };
                        const className_0 = headingClasses[tag] || headingClasses.h1;
                        const content_0 = children?.map({
                            "PostPreview[renderNode > (anonymous)()]": (child_0, i_0)=>renderNode(child_0, i_0)
                        }["PostPreview[renderNode > (anonymous)()]"]);
                        if (tag === "h1") {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: className_0,
                                children: content_0
                            }, index, false, {
                                fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                                lineNumber: 81,
                                columnNumber: 22
                            }, this);
                        } else {
                            if (tag === "h2") {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: className_0,
                                    children: content_0
                                }, index, false, {
                                    fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                                    lineNumber: 84,
                                    columnNumber: 24
                                }, this);
                            } else {
                                if (tag === "h3") {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: className_0,
                                        children: content_0
                                    }, index, false, {
                                        fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                                        lineNumber: 87,
                                        columnNumber: 26
                                    }, this);
                                }
                            }
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: className_0,
                            children: content_0
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 91,
                            columnNumber: 20
                        }, this);
                    }
                    if (type === "quote") {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                            className: "border-l-4 border-gray-300 pl-4 italic my-4",
                            children: children?.map({
                                "PostPreview[renderNode > (anonymous)()]": (child_1, i_1)=>renderNode(child_1, i_1)
                            }["PostPreview[renderNode > (anonymous)()]"])
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 94,
                            columnNumber: 20
                        }, this);
                    }
                    if (type === "list") {
                        const Tag = props.listType === "number" ? "ol" : "ul";
                        const listClasses = props.listType === "number" ? "list-decimal ml-6 my-2" : "list-disc ml-6 my-2";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                            className: listClasses,
                            children: children?.map({
                                "PostPreview[renderNode > (anonymous)()]": (child_2, i_2)=>renderNode(child_2, i_2)
                            }["PostPreview[renderNode > (anonymous)()]"])
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 101,
                            columnNumber: 20
                        }, this);
                    }
                    if (type === "listitem") {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "my-1",
                            children: children?.map({
                                "PostPreview[renderNode > (anonymous)()]": (child_3, i_3)=>renderNode(child_3, i_3)
                            }["PostPreview[renderNode > (anonymous)()]"])
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 106,
                            columnNumber: 20
                        }, this);
                    }
                    if (type === "link") {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: props.url,
                            target: props.target || "_self",
                            rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
                            className: "text-blue-600 underline hover:text-blue-800",
                            children: children?.map({
                                "PostPreview[renderNode > (anonymous)()]": (child_4, i_4)=>renderNode(child_4, i_4)
                            }["PostPreview[renderNode > (anonymous)()]"])
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 111,
                            columnNumber: 20
                        }, this);
                    }
                    if (children) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: children.map({
                                "PostPreview[renderNode > children.map()]": (child_5, i_5)=>renderNode(child_5, i_5)
                            }["PostPreview[renderNode > children.map()]"])
                        }, index, false, {
                            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                            lineNumber: 116,
                            columnNumber: 20
                        }, this);
                    }
                    return null;
                }
            }["PostPreview[renderNode]"];
            if (!content?.root?.children) {
                let t4;
                if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
                    t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "No content"
                    }, void 0, false, {
                        fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
                        lineNumber: 126,
                        columnNumber: 16
                    }, this);
                    $[5] = t4;
                } else {
                    t4 = $[5];
                }
                t3 = t4;
                break bb0;
            }
            t1 = "prose prose-lg max-w-none";
            t2 = content.root.children.map({
                "PostPreview[content.root.children.map()]": (child_6, index_0)=>renderNode(child_6, index_0)
            }["PostPreview[content.root.children.map()]"]);
        }
        $[1] = content;
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
    } else {
        t1 = $[2];
        t2 = $[3];
        t3 = $[4];
    }
    if (t3 !== Symbol.for("react.early_return_sentinel")) {
        return t3;
    }
    let t4;
    if ($[6] !== t1 || $[7] !== t2) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/preview/post-preview.tsx",
            lineNumber: 153,
            columnNumber: 10
        }, this);
        $[6] = t1;
        $[7] = t2;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    return t4;
}
_c = PostPreview;
var _c;
__turbopack_context__.k.register(_c, "PostPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PreviewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/lib/data/posts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$preview$2f$post$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/components/content/preview/post-preview.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function PreviewPage({ params }) {
    _s();
    const { slug } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const [post, setPost] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PreviewPage.useEffect": ()=>{
            const loadPost = {
                "PreviewPage.useEffect.loadPost": async ()=>{
                    try {
                        const allPosts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listPosts"])();
                        const found = allPosts.find({
                            "PreviewPage.useEffect.loadPost.found": (p)=>p.slug === slug
                        }["PreviewPage.useEffect.loadPost.found"]);
                        setPost(found || null);
                    } catch (error) {
                        console.error("Failed to load post:", error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["PreviewPage.useEffect.loadPost"];
            loadPost();
        }
    }["PreviewPage.useEffect"], [
        slug
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
            lineNumber: 38,
            columnNumber: 12
        }, this);
    }
    if (!post) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "Post not found"
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
            lineNumber: 43,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto flex h-14 items-center justify-between px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/content/${post.slug}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "mr-2 size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    "Back to Editor"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-muted-foreground",
                            children: [
                                "Preview Mode • ",
                                post.status
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto max-w-4xl px-6 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold mb-4",
                            children: post.title
                        }, void 0, false, {
                            fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        post.excerpt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl text-muted-foreground mb-8",
                            children: post.excerpt
                        }, void 0, false, {
                            fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                            lineNumber: 64,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$preview$2f$post$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostPreview"], {
                            content: post.content
                        }, void 0, false, {
                            fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin/src/app/(app)/content/preview/[slug]/page.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_s(PreviewPage, "ciUuggrM9Rzya+BnnZR1SuFocBQ=");
_c = PreviewPage;
var _c;
__turbopack_context__.k.register(_c, "PreviewPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.561.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
];
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("arrow-left", __iconNode);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_c156d3d9._.js.map