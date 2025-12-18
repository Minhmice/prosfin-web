module.exports = [
"[project]/apps/web/src/app/favicon.ico.mjs { IMAGE => \"[project]/apps/web/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/app/favicon.ico.mjs { IMAGE => \"[project]/apps/web/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/web/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/web/src/data/heroContent.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Hero Section Content Data
 * 
 * This file contains all content for the Hero section.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "heroContent",
    ()=>heroContent
]);
const heroContent = {
    eyebrow: "Tư vấn tài chính doanh nghiệp chuẩn Big4",
    headline: "Đọc vị tài chính doanh nghiệp rõ như bảng điều khiển",
    subheadline: "ProsFIN đồng hành chủ doanh nghiệp SME, startup và hộ kinh doanh trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế. Từ dữ liệu kế toán rời rạc, chúng tôi giúp bạn có bức tranh tài chính rõ ràng, dễ hiểu và có thể hành động ngay, theo phương pháp bài bản của các firm Big4.",
    primaryCta: {
        label: "Đặt lịch khám sức khỏe tài chính miễn phí",
        href: "#lead-form"
    },
    secondaryCta: {
        label: "Xem các dịch vụ ProsFIN",
        href: "#services"
    },
    note: "Buổi tư vấn đầu tiên 30 phút, miễn phí. ProsFIN sẽ giúp bạn hiểu rõ tình hình tài chính hiện tại và đưa ra gợi ý cụ thể.",
    stats: [
        {
            label: "DN đã đồng hành",
            value: "+120"
        },
        {
            label: "Năm kinh nghiệm",
            value: "8+"
        }
    ],
    heroImage: "/images/hero-dashboard-mockup.png"
};
}),
"[project]/apps/web/src/data/problem-content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Problem Section Content Data
 * 
 * This file contains all content for the Problem/Pain Points section.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "problemSectionContent",
    ()=>problemSectionContent
]);
const problemSectionContent = {
    eyebrow: "Vấn đề",
    title: "Kinh doanh có doanh thu, nhưng tài chính luôn trong trạng thái \"mù mờ\"",
    subtitle: "Phần lớn chủ doanh nghiệp chỉ xem doanh thu và số dư tài khoản. Nhưng đằng sau đó là lãi – lỗ, dòng tiền, thuế và rủi ro mà nếu bỏ qua quá lâu, doanh nghiệp sẽ rất dễ hụt hơi.",
    problems: [
        {
            id: "profit-no-cash",
            title: "Lãi trên báo cáo, nhưng tài khoản luôn cạn",
            description: "Báo cáo kế toán cho thấy lãi, nhưng tiền mặt trong tài khoản không tăng. Bạn không biết tiền đang \"kẹt\" ở đâu trong chuỗi hoạt động.",
            impact: "Thiếu vốn lưu động để mở rộng hoặc xử lý các khoản phải trả."
        },
        {
            id: "cost-overrun",
            title: "Chi phí phình to mà không biết đang lãng phí ở đâu",
            description: "Tổng chi phí tăng đều đặn, nhưng bạn không thể chỉ ra được khoản nào đang \"ăn\" lợi nhuận. Không có báo cáo phân tích chi phí theo từng hạng mục.",
            impact: "Lợi nhuận bị bào mòn dần, khó cạnh tranh về giá."
        },
        {
            id: "tax-anxiety",
            title: "Mỗi kỳ quyết toán thuế là một lần thấp thỏm",
            description: "Lo lắng về việc bị truy thu, phạt chậm nộp, hoặc không biết mình đã khai báo đúng chưa. Hồ sơ thuế rời rạc, không có hệ thống.",
            impact: "Rủi ro pháp lý và tâm lý căng thẳng mỗi kỳ quyết toán."
        },
        {
            id: "no-data-decision",
            title: "Không có hệ thống số liệu để ra quyết định đầu tư/mở rộng",
            description: "Muốn mở rộng kinh doanh, thuê thêm nhân sự, hoặc đầu tư thiết bị, nhưng không có báo cáo tài chính đáng tin cậy để đánh giá khả năng tài chính.",
            impact: "Bỏ lỡ cơ hội tăng trưởng hoặc đầu tư sai hướng."
        }
    ],
    cta: {
        label: "Tôi gặp ít nhất 1 trong các vấn đề trên",
        href: "#lead-form"
    }
};
}),
"[project]/apps/web/src/data/services-content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Services Section Content Data
 * 
 * This file contains all content for the Services section.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "servicesSectionContent",
    ()=>servicesSectionContent
]);
const servicesSectionContent = {
    eyebrow: "Giải pháp",
    title: "Dịch vụ ProsFIN đồng hành cùng tài chính doanh nghiệp",
    subtitle: "Tùy vào giai đoạn tăng trưởng, chúng tôi thiết kế gói dịch vụ phù hợp – từ sổ sách kế toán, dòng tiền đến hệ thống kiểm soát nội bộ và vai trò CFO đồng hành.",
    services: [
        {
            id: "finance-advisory",
            name: "Tư vấn tài chính & dòng tiền doanh nghiệp",
            shortDescription: "Giúp chủ doanh nghiệp hiểu rõ lãi – lỗ, dòng tiền, điểm hòa vốn, kế hoạch dòng tiền 3–6 tháng.",
            pillBenefits: [
                "Báo cáo tài chính dễ hiểu, hành động được",
                "Dự báo dòng tiền 3–6 tháng",
                "Xác định điểm hòa vốn và kế hoạch tài chính"
            ],
            idealClient: "Doanh nghiệp đang tăng trưởng, cần hiểu rõ tình hình tài chính",
            ctaLabel: "Trao đổi về dịch vụ này",
            ctaType: "modal",
            ctaTarget: "#lead-form"
        },
        {
            id: "accounting-tax",
            name: "Dịch vụ kế toán & thuế cho SME",
            shortDescription: "Đảm bảo sổ sách chuẩn, giảm rủi ro khi quyết toán, tối ưu nghĩa vụ thuế trong khuôn khổ pháp luật.",
            pillBenefits: [
                "Sổ sách kế toán chuẩn, đầy đủ",
                "Giảm rủi ro quyết toán thuế",
                "Tối ưu nghĩa vụ thuế hợp pháp"
            ],
            idealClient: "SME, startup, hộ kinh doanh cần hệ thống kế toán bài bản",
            ctaLabel: "Trao đổi về dịch vụ này",
            ctaType: "modal",
            ctaTarget: "#lead-form"
        },
        {
            id: "internal-control",
            name: "Thiết kế & vận hành hệ thống kiểm soát nội bộ",
            shortDescription: "Xây quy trình phê duyệt, phân quyền, hạn chế thất thoát, gian lận, sai sót.",
            pillBenefits: [
                "Quy trình phê duyệt rõ ràng",
                "Phân quyền và kiểm soát truy cập",
                "Giảm thiểu rủi ro thất thoát, gian lận"
            ],
            idealClient: "Doanh nghiệp cần hệ thống kiểm soát nội bộ chặt chẽ",
            ctaLabel: "Trao đổi về dịch vụ này",
            ctaType: "modal",
            ctaTarget: "#lead-form"
        },
        {
            id: "cfo-part-time",
            name: "CFO đồng hành bán thời gian",
            shortDescription: "Role \"CFO part-time\" cho các công ty chưa đủ nguồn lực thuê CFO full-time nhưng cần người đi cùng với CEO về tài chính.",
            pillBenefits: [
                "Tư vấn chiến lược tài chính",
                "Đồng hành ra quyết định đầu tư/mở rộng",
                "Tiết kiệm chi phí so với CFO full-time"
            ],
            idealClient: "Doanh nghiệp đang mở rộng, cần tư vấn tài chính cấp cao",
            ctaLabel: "Trao đổi về dịch vụ này",
            ctaType: "modal",
            ctaTarget: "#lead-form"
        }
    ]
};
}),
"[project]/apps/web/src/data/process-content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Process Section Content Data
 * 
 * This file contains all content for the Process section.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "processSectionContent",
    ()=>processSectionContent
]);
const processSectionContent = {
    eyebrow: "Quy trình",
    title: "Cách ProsFIN đồng hành cùng doanh nghiệp bạn",
    subtitle: "Mọi hợp tác đều bắt đầu bằng việc lắng nghe câu chuyện của bạn, sau đó là đọc số liệu, xây kế hoạch và đồng hành triển khai.",
    steps: [
        {
            id: "step-1",
            order: 1,
            title: "Khám phá vấn đề (Discovery Call)",
            description: "Bạn chia sẻ tình hình hiện tại, mục tiêu, mối lo về tài chính – kế toán – thuế. Chúng tôi lắng nghe để hiểu rõ bối cảnh và nhu cầu thực sự của doanh nghiệp.",
            outcome: "Bạn rõ ràng về bức tranh tài chính hiện tại và những điểm cần cải thiện."
        },
        {
            id: "step-2",
            order: 2,
            title: "Đọc & soi số liệu (Financial Health Check)",
            description: "ProsFIN xem sổ sách, báo cáo, dòng tiền để \"chẩn đoán\" vấn đề cốt lõi. Chúng tôi phân tích chi tiết để tìm ra nguyên nhân gốc rễ của các vấn đề tài chính.",
            outcome: "Bạn có báo cáo đánh giá tài chính chi tiết, chỉ ra điểm mạnh và điểm yếu."
        },
        {
            id: "step-3",
            order: 3,
            title: "Đề xuất lộ trình & giải pháp (Action Plan)",
            description: "Đưa ra phương án tối ưu: điều chỉnh dòng tiền, tối ưu chi phí, xử lý rủi ro thuế, hoàn thiện hệ thống. Mỗi giải pháp được thiết kế phù hợp với tình hình thực tế của bạn.",
            outcome: "Bạn có lộ trình hành động cụ thể, ưu tiên và timeline rõ ràng."
        },
        {
            id: "step-4",
            order: 4,
            title: "Đồng hành triển khai & theo dõi (Ongoing Support)",
            description: "Theo dõi định kỳ, cập nhật số liệu, tư vấn khi bạn cần ra quyết định lớn. Chúng tôi đồng hành để đảm bảo các giải pháp được triển khai hiệu quả.",
            outcome: "Bạn có người đồng hành tin cậy, luôn sẵn sàng hỗ trợ khi cần."
        }
    ]
};
}),
"[project]/apps/web/src/data/faq-content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * FAQ Section Content Data
 * 
 * This file contains all content for the FAQ section.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "faqSectionContent",
    ()=>faqSectionContent
]);
const faqSectionContent = {
    eyebrow: "FAQ",
    title: "Những câu hỏi ProsFIN thường nhận được",
    subtitle: "Dưới đây là các câu hỏi thường gặp về dịch vụ, quy trình và cách làm việc của ProsFIN.",
    items: [
        {
            id: "faq-1",
            category: "Quy trình",
            question: "Quy trình làm việc với ProsFIN diễn ra như thế nào?",
            answer: "Quy trình bắt đầu bằng buổi trao đổi đầu tiên (Discovery Call) để chúng tôi hiểu tình hình và nhu cầu của bạn. Sau đó, chúng tôi sẽ xem xét số liệu tài chính hiện tại (Financial Health Check), đưa ra lộ trình và giải pháp cụ thể (Action Plan), và đồng hành triển khai cùng bạn (Ongoing Support). Mỗi bước đều được trao đổi rõ ràng và bạn có quyền quyết định."
        },
        {
            id: "faq-2",
            category: "Quy trình",
            question: "Mình cần chuẩn bị gì trước buổi tư vấn đầu tiên?",
            answer: "Bạn không cần chuẩn bị gì phức tạp. Chỉ cần sẵn sàng chia sẻ về tình hình kinh doanh hiện tại, những vấn đề tài chính bạn đang gặp phải, và mục tiêu bạn muốn đạt được. Nếu có sẵn báo cáo tài chính gần nhất, bạn có thể chia sẻ, nhưng không bắt buộc. Buổi đầu tiên chủ yếu là để chúng tôi lắng nghe và hiểu bạn."
        },
        {
            id: "faq-3",
            category: "Phí & cam kết",
            question: "Phí dịch vụ được tính như thế nào?",
            answer: "Phí dịch vụ của ProsFIN được tính dựa trên phạm vi công việc và thời gian triển khai. Chúng tôi sẽ báo giá cụ thể sau khi đánh giá nhu cầu của bạn trong buổi trao đổi đầu tiên. Buổi tư vấn đầu tiên 30 phút là miễn phí để bạn đánh giá sơ bộ. Không có phí ẩn, mọi thứ đều minh bạch từ đầu."
        },
        {
            id: "faq-4",
            category: "Phí & cam kết",
            question: "Có ràng buộc hợp đồng tối thiểu không?",
            answer: "Không. ProsFIN không yêu cầu hợp đồng dài hạn bắt buộc. Bạn có thể chọn làm việc theo dự án hoặc theo tháng, tùy vào nhu cầu. Chúng tôi tin rằng giá trị dịch vụ sẽ tự nói lên, và bạn sẽ muốn tiếp tục đồng hành vì thấy được kết quả thực tế."
        },
        {
            id: "faq-5",
            category: "Bảo mật & dữ liệu",
            question: "ProsFIN bảo mật số liệu tài chính của doanh nghiệp ra sao?",
            answer: "Bảo mật thông tin là ưu tiên hàng đầu của ProsFIN. Tất cả dữ liệu tài chính được xử lý với mức độ bảo mật cao, chỉ những người trực tiếp làm việc với bạn mới có quyền truy cập. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo mật dữ liệu và có cam kết không chia sẻ thông tin với bên thứ ba mà không có sự đồng ý của bạn."
        },
        {
            id: "faq-6",
            category: "Bảo mật & dữ liệu",
            question: "Ai có quyền truy cập vào dữ liệu của tôi?",
            answer: "Chỉ đội ngũ ProsFIN trực tiếp làm việc với bạn mới có quyền truy cập vào dữ liệu. Chúng tôi không chia sẻ thông tin với bất kỳ bên thứ ba nào. Tất cả thành viên trong đội ngũ đều ký cam kết bảo mật và tuân thủ các quy định về bảo vệ dữ liệu."
        },
        {
            id: "faq-7",
            category: "Phạm vi dịch vụ",
            question: "ProsFIN có thay kế toán nội bộ / dịch vụ kê khai thuế không?",
            answer: "ProsFIN tập trung vào tư vấn tài chính, kiểm soát nội bộ và đồng hành quản trị tài chính. Chúng tôi không thay thế kế toán nội bộ hay làm dịch vụ kê khai thuế trực tiếp, nhưng có thể hỗ trợ bạn xây dựng hệ thống kế toán và tối ưu quy trình để kế toán nội bộ hoặc đối tác kế toán của bạn làm việc hiệu quả hơn."
        },
        {
            id: "faq-8",
            category: "Phạm vi dịch vụ",
            question: "ProsFIN phù hợp với doanh nghiệp ở giai đoạn nào?",
            answer: "ProsFIN phù hợp với doanh nghiệp ở nhiều giai đoạn: từ startup đang tìm hướng tài chính, SME đang tăng trưởng cần kiểm soát tốt hơn, đến các công ty đã ổn định nhưng muốn tối ưu và mở rộng. Chúng tôi thiết kế dịch vụ linh hoạt để phù hợp với từng giai đoạn phát triển của doanh nghiệp."
        },
        {
            id: "faq-9",
            category: "Pháp lý / kỳ vọng",
            question: "ProsFIN có cam kết lợi nhuận / kết quả cụ thể không?",
            answer: "Không. ProsFIN không cam kết hay hứa hẹn về lợi nhuận hay kết quả tài chính cụ thể. Chúng tôi cung cấp tư vấn dựa trên số liệu thực tế và kinh nghiệm, giúp bạn có bức tranh tài chính rõ ràng và đưa ra quyết định sáng suốt hơn. Mọi quyết định cuối cùng đều thuộc về bạn, và kết quả phụ thuộc vào nhiều yếu tố ngoài tầm kiểm soát của chúng tôi."
        }
    ]
};
}),
"[project]/apps/web/src/data/contact-content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Contact Section Content Data
 * 
 * This file contains all content for the Final CTA/Contact section.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "contactSectionContent",
    ()=>contactSectionContent
]);
const contactSectionContent = {
    eyebrow: "Bắt đầu",
    title: "Đặt lịch buổi khám sức khỏe tài chính cùng ProsFIN",
    subtitle: "Buổi tư vấn đầu tiên 30 phút, miễn phí. Chúng tôi sẽ giúp bạn hiểu rõ tình hình tài chính hiện tại và đưa ra gợi ý cụ thể.",
    bullets: [
        "Hiểu nhanh lãi – lỗ và dòng tiền hiện tại",
        "Nhận gợi ý ưu tiên 3 việc cần làm trong 30–90 ngày tới",
        "Tất cả trao đổi được bảo mật thông tin"
    ],
    primaryCtaLabel: "Đặt lịch tư vấn",
    notePrivacy: "Chúng tôi cam kết bảo mật thông tin của bạn. Dữ liệu chỉ được sử dụng để liên hệ và tư vấn, không chia sẻ với bên thứ ba.",
    contactInfo: {
        email: "hello@prosfin.vn",
        phone: "+84 123 456 789",
        address: "Hà Nội, Việt Nam",
        linkedin: "https://linkedin.com/company/prosfin"
    }
};
}),
"[project]/apps/web/src/data/trust-bar-content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Trust Bar Content Data
 * 
 * Data cho phần trust bar hiển thị logos của các đối tác/khách hàng.
 */ __turbopack_context__.s([
    "trustBarContent",
    ()=>trustBarContent
]);
const trustBarContent = {
    title: "Được tin tưởng bởi",
    logos: [
        {
            name: "Client 1",
            logo: "/images/logo-placeholder.svg",
            url: "https://example.com"
        },
        {
            name: "Client 2",
            logo: "/images/logo-placeholder.svg",
            url: "https://example.com"
        },
        {
            name: "Client 3",
            logo: "/images/logo-placeholder.svg"
        },
        {
            name: "Client 4",
            logo: "/images/logo-placeholder.svg"
        },
        {
            name: "Client 5",
            logo: "/images/logo-placeholder.svg"
        },
        {
            name: "Client 6",
            logo: "/images/logo-placeholder.svg"
        },
        {
            name: "Client 7",
            logo: "/images/logo-placeholder.svg"
        },
        {
            name: "Client 8",
            logo: "/images/logo-placeholder.svg"
        }
    ]
};
}),
"[project]/apps/web/src/lib/content/landing.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Landing Content Adapter
 * 
 * Content adapter layer for landing page.
 * Currently reads from data files, but can be swapped for DB/API in Phase 3.
 */ __turbopack_context__.s([
    "getLandingContent",
    ()=>getLandingContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/heroContent.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/problem-content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$services$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/services-content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$process$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/process-content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$faq$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/faq-content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$contact$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/contact-content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$trust$2d$bar$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/trust-bar-content.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
function getLandingContent() {
    return {
        hero: {
            eyebrow: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].eyebrow,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].headline,
            subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].subheadline,
            stats: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].stats,
            heroImage: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].heroImage,
            cta: {
                label: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].primaryCta.label,
                href: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].primaryCta.href,
                variant: "primary",
                type: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$heroContent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["heroContent"].primaryCta.href.startsWith("#") ? "scroll" : "link"
            }
        },
        trust: {
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$trust$2d$bar$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trustBarContent"].title,
            logos: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$trust$2d$bar$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trustBarContent"].logos
        },
        solutions: {
            eyebrow: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["problemSectionContent"].eyebrow,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["problemSectionContent"].title,
            subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["problemSectionContent"].subtitle,
            items: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["problemSectionContent"].problems.map((p)=>({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    link: undefined
                })),
            cta: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["problemSectionContent"].cta ? {
                label: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["problemSectionContent"].cta.label,
                href: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$problem$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["problemSectionContent"].cta.href,
                variant: "primary"
            } : undefined
        },
        servicesPreview: {
            eyebrow: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$services$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["servicesSectionContent"].eyebrow,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$services$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["servicesSectionContent"].title,
            subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$services$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["servicesSectionContent"].subtitle,
            services: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$services$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["servicesSectionContent"].services.map((s)=>({
                    id: s.id,
                    slug: s.id,
                    title: s.name,
                    summary: s.shortDescription,
                    shortDescription: s.shortDescription,
                    idealClient: s.idealClient,
                    pillBenefits: s.pillBenefits,
                    ctaLabel: s.ctaLabel,
                    ctaType: s.ctaType,
                    ctaTarget: s.ctaTarget,
                    tags: []
                })),
            cta: {
                label: "Xem toàn bộ dịch vụ",
                href: "/services",
                variant: "outline"
            }
        },
        processPreview: {
            eyebrow: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$process$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processSectionContent"].eyebrow,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$process$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processSectionContent"].title,
            subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$process$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processSectionContent"].subtitle,
            steps: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$process$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processSectionContent"].steps.map((s, idx)=>({
                    id: s.id || `step-${idx + 1}`,
                    order: idx + 1,
                    title: s.title,
                    description: s.description,
                    deliverables: "deliverables" in s && Array.isArray(s.deliverables) ? s.deliverables : []
                })),
            cta: {
                label: "Xem quy trình chi tiết",
                href: "/process",
                variant: "outline"
            }
        },
        faq: {
            eyebrow: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$faq$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["faqSectionContent"].eyebrow,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$faq$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["faqSectionContent"].title,
            subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$faq$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["faqSectionContent"].subtitle,
            items: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$faq$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["faqSectionContent"].items,
            cta: {
                label: "Xem thêm câu hỏi",
                href: "/faq",
                variant: "outline"
            }
        },
        proof: {
            eyebrow: "Câu chuyện khách hàng",
            title: "Kết quả thực tế từ các doanh nghiệp đã đồng hành",
            subtitle: "Một số tình huống ProsFIN đã hỗ trợ (được ẩn danh để bảo mật)",
            items: [
                {
                    id: "proof-1",
                    industry: "Sản xuất",
                    result: "Giảm áp lực dòng tiền trong 3 tháng",
                    description: "DN sản xuất 25 nhân sự đã cải thiện dòng tiền và có báo cáo tài chính rõ ràng hơn.",
                    link: "/case-studies/example-1"
                },
                {
                    id: "proof-2",
                    industry: "Dịch vụ",
                    result: "Tối ưu chi phí và tăng lợi nhuận 15%",
                    description: "Studio dịch vụ sáng tạo đã xác định được các khoản chi phí không cần thiết và tối ưu hóa ngân sách.",
                    link: "/case-studies/example-2"
                },
                {
                    id: "proof-3",
                    industry: "Thương mại",
                    result: "Tối ưu chi phí và tăng lợi nhuận 15%",
                    description: "Studio dịch vụ sáng tạo đã xác định được các khoản chi phí không cần thiết và tối ưu hóa ngân sách.",
                    link: "/case-studies/example-3"
                }
            ],
            cta: {
                label: "Xem thêm câu chuyện khách hàng",
                href: "/case-studies",
                variant: "outline"
            }
        },
        finalCta: {
            eyebrow: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$contact$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contactSectionContent"].eyebrow,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$contact$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contactSectionContent"].title,
            subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$contact$2d$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contactSectionContent"].subtitle,
            formFields: undefined
        }
    };
}
}),
"[project]/apps/web/src/components/landing/hero/hero-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroSection() from the server but HeroSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/hero/hero-section.tsx <module evaluation>", "HeroSection");
}),
"[project]/apps/web/src/components/landing/hero/hero-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HeroSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HeroSection() from the server but HeroSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/hero/hero-section.tsx", "HeroSection");
}),
"[project]/apps/web/src/components/landing/hero/hero-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$hero$2f$hero$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/hero/hero-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$hero$2f$hero$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/hero/hero-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$hero$2f$hero$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "TrustBarSection",
    ()=>TrustBarSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const TrustBarSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TrustBarSection() from the server but TrustBarSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx <module evaluation>", "TrustBarSection");
}),
"[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "TrustBarSection",
    ()=>TrustBarSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const TrustBarSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TrustBarSection() from the server but TrustBarSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx", "TrustBarSection");
}),
"[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$trust$2d$bar$2f$trust$2d$bar$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$trust$2d$bar$2f$trust$2d$bar$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$trust$2d$bar$2f$trust$2d$bar$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/solutions/solutions-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SolutionsSection",
    ()=>SolutionsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SolutionsSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SolutionsSection() from the server but SolutionsSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/solutions/solutions-section.tsx <module evaluation>", "SolutionsSection");
}),
"[project]/apps/web/src/components/landing/solutions/solutions-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SolutionsSection",
    ()=>SolutionsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SolutionsSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SolutionsSection() from the server but SolutionsSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/solutions/solutions-section.tsx", "SolutionsSection");
}),
"[project]/apps/web/src/components/landing/solutions/solutions-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$solutions$2f$solutions$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/solutions/solutions-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$solutions$2f$solutions$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/solutions/solutions-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$solutions$2f$solutions$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ServicesPreviewSection",
    ()=>ServicesPreviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ServicesPreviewSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ServicesPreviewSection() from the server but ServicesPreviewSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx <module evaluation>", "ServicesPreviewSection");
}),
"[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ServicesPreviewSection",
    ()=>ServicesPreviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ServicesPreviewSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ServicesPreviewSection() from the server but ServicesPreviewSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx", "ServicesPreviewSection");
}),
"[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$services$2d$preview$2f$services$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$services$2d$preview$2f$services$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$services$2d$preview$2f$services$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ProcessPreviewSection",
    ()=>ProcessPreviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProcessPreviewSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProcessPreviewSection() from the server but ProcessPreviewSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx <module evaluation>", "ProcessPreviewSection");
}),
"[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ProcessPreviewSection",
    ()=>ProcessPreviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProcessPreviewSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProcessPreviewSection() from the server but ProcessPreviewSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx", "ProcessPreviewSection");
}),
"[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$process$2d$preview$2f$process$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$process$2d$preview$2f$process$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$process$2d$preview$2f$process$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/proof/proof-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ProofSection",
    ()=>ProofSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProofSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProofSection() from the server but ProofSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/proof/proof-section.tsx <module evaluation>", "ProofSection");
}),
"[project]/apps/web/src/components/landing/proof/proof-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ProofSection",
    ()=>ProofSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProofSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProofSection() from the server but ProofSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/proof/proof-section.tsx", "ProofSection");
}),
"[project]/apps/web/src/components/landing/proof/proof-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$proof$2f$proof$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/proof/proof-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$proof$2f$proof$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/proof/proof-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$proof$2f$proof$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ContentPreviewSection",
    ()=>ContentPreviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ContentPreviewSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ContentPreviewSection() from the server but ContentPreviewSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx <module evaluation>", "ContentPreviewSection");
}),
"[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ContentPreviewSection",
    ()=>ContentPreviewSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ContentPreviewSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ContentPreviewSection() from the server but ContentPreviewSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx", "ContentPreviewSection");
}),
"[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$content$2d$preview$2f$content$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$content$2d$preview$2f$content$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$content$2d$preview$2f$content$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/faq/faq-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FaqSection",
    ()=>FaqSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FaqSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FaqSection() from the server but FaqSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/faq/faq-section.tsx <module evaluation>", "FaqSection");
}),
"[project]/apps/web/src/components/landing/faq/faq-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FaqSection",
    ()=>FaqSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FaqSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FaqSection() from the server but FaqSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/faq/faq-section.tsx", "FaqSection");
}),
"[project]/apps/web/src/components/landing/faq/faq-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$faq$2f$faq$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/faq/faq-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$faq$2f$faq$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/faq/faq-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$faq$2f$faq$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FinalCtaSection",
    ()=>FinalCtaSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FinalCtaSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FinalCtaSection() from the server but FinalCtaSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx <module evaluation>", "FinalCtaSection");
}),
"[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FinalCtaSection",
    ()=>FinalCtaSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FinalCtaSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FinalCtaSection() from the server but FinalCtaSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx", "FinalCtaSection");
}),
"[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$final$2d$cta$2f$final$2d$cta$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$final$2d$cta$2f$final$2d$cta$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$final$2d$cta$2f$final$2d$cta$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Landing Page
 * 
 * Main landing page composition using content adapter layer.
 * All content comes from getLandingContent() - can be swapped for DB/API in Phase 3.
 */ __turbopack_context__.s([
    "default",
    ()=>Home,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$content$2f$landing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/content/landing.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$hero$2f$hero$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/hero/hero-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$trust$2d$bar$2f$trust$2d$bar$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/trust-bar/trust-bar-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$solutions$2f$solutions$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/solutions/solutions-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$services$2d$preview$2f$services$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/services-preview/services-preview-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$process$2d$preview$2f$process$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/process-preview/process-preview-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$proof$2f$proof$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/proof/proof-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$content$2d$preview$2f$content$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/content-preview/content-preview-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$faq$2f$faq$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/faq/faq-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$final$2d$cta$2f$final$2d$cta$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/landing/final-cta/final-cta-section.tsx [app-rsc] (ecmascript)");
;
;
const metadata = {
    title: "Trang chủ",
    description: "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
    openGraph: {
        title: "ProsFIN - Tư vấn tài chính doanh nghiệp chuẩn Big4",
        description: "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
        url: "/"
    }
};
;
;
;
;
;
;
;
;
;
function Home() {
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$content$2f$landing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLandingContent"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$hero$2f$hero$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HeroSection"], {
                content: content.hero
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$trust$2d$bar$2f$trust$2d$bar$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TrustBarSection"], {
                content: content.trust
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$solutions$2f$solutions$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SolutionsSection"], {
                content: content.solutions
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$services$2d$preview$2f$services$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ServicesPreviewSection"], {
                content: content.servicesPreview
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$process$2d$preview$2f$process$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProcessPreviewSection"], {
                content: content.processPreview
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$proof$2f$proof$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProofSection"], {
                content: content.proof
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$content$2d$preview$2f$content$2d$preview$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ContentPreviewSection"], {
                content: content.contentPreview
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$faq$2f$faq$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FaqSection"], {
                content: content.faq
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$landing$2f$final$2d$cta$2f$final$2d$cta$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FinalCtaSection"], {
                content: content.finalCta
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/apps/web/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b07bf5eb._.js.map