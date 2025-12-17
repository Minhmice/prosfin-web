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
"[project]/apps/web/src/data/faq-page.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * FAQ Page Content Data
 * 
 * This file contains all content for the /faq page.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "faqPageContent",
    ()=>faqPageContent
]);
const faqPageContent = {
    hero: {
        eyebrow: "FAQ",
        title: "Câu hỏi thường gặp về ProsFIN",
        subtitle: "Nếu bạn chưa tìm thấy câu trả lời, hãy liên hệ trực tiếp với chúng tôi."
    },
    categories: [
        {
            id: "services",
            label: "Về dịch vụ ProsFIN"
        },
        {
            id: "process",
            label: "Về quy trình và cách làm"
        },
        {
            id: "pricing",
            label: "Về phí và thanh toán"
        },
        {
            id: "security",
            label: "Về bảo mật dữ liệu"
        },
        {
            id: "legal",
            label: "Về phạm vi trách nhiệm & pháp lý"
        }
    ],
    items: [
        {
            id: "faq-1",
            categoryId: "services",
            question: "ProsFIN có những dịch vụ gì?",
            answerLong: "ProsFIN cung cấp 3 gói dịch vụ chính: (1) Khám sức khỏe tài chính 360° - đánh giá toàn diện và roadmap, (2) Đồng hành dòng tiền 3-6 tháng - theo dõi và tối ưu dòng tiền, (3) Cố vấn tài chính nội bộ bán thời gian - đồng hành dài hạn như CFO part-time. Ngoài ra, chúng tôi cũng hỗ trợ thiết kế hệ thống kiểm soát nội bộ và xây dựng hệ thống báo cáo KPI tài chính."
        },
        {
            id: "faq-2",
            categoryId: "services",
            question: "ProsFIN có thay thế vai trò kế toán không?",
            answerLong: "Không. ProsFIN tập trung vào tư vấn tài chính, kiểm soát nội bộ và đồng hành quản trị tài chính. Chúng tôi không thay thế kế toán nội bộ hay làm dịch vụ kê khai thuế trực tiếp. Tuy nhiên, chúng tôi có thể hỗ trợ bạn xây dựng hệ thống kế toán và tối ưu quy trình để kế toán nội bộ hoặc đối tác kế toán của bạn làm việc hiệu quả hơn."
        },
        {
            id: "faq-3",
            categoryId: "process",
            question: "Quy trình làm việc với ProsFIN diễn ra như thế nào?",
            answerLong: "Quy trình bắt đầu bằng buổi trao đổi đầu tiên (Discovery Call) để chúng tôi hiểu tình hình và nhu cầu của bạn. Sau đó, chúng tôi sẽ xem xét số liệu tài chính hiện tại (Financial Health Check), đưa ra lộ trình và giải pháp cụ thể (Action Plan), và đồng hành triển khai cùng bạn (Ongoing Support). Mỗi bước đều được trao đổi rõ ràng và bạn có quyền quyết định. Thời gian thực hiện tùy thuộc vào gói dịch vụ, thường từ 2-4 tuần cho gói khám sức khỏe, và 3-6 tháng cho gói đồng hành."
        },
        {
            id: "faq-4",
            categoryId: "process",
            question: "Mình cần chuẩn bị gì trước buổi tư vấn đầu tiên?",
            answerLong: "Bạn không cần chuẩn bị gì phức tạp. Chỉ cần sẵn sàng chia sẻ về tình hình kinh doanh hiện tại, những vấn đề tài chính bạn đang gặp phải, và mục tiêu bạn muốn đạt được. Nếu có sẵn báo cáo tài chính gần nhất, bạn có thể chia sẻ, nhưng không bắt buộc. Buổi đầu tiên chủ yếu là để chúng tôi lắng nghe và hiểu bạn. Sau đó, chúng tôi sẽ gửi checklist chi tiết về những gì cần chuẩn bị cho các bước tiếp theo."
        },
        {
            id: "faq-5",
            categoryId: "pricing",
            question: "Phí dịch vụ được tính như thế nào?",
            answerLong: "Phí dịch vụ của ProsFIN được tính dựa trên phạm vi công việc và thời gian triển khai. Chúng tôi sẽ báo giá cụ thể sau khi đánh giá nhu cầu của bạn trong buổi trao đổi đầu tiên. Buổi tư vấn đầu tiên 30 phút là miễn phí để bạn đánh giá sơ bộ. Không có phí ẩn, mọi thứ đều minh bạch từ đầu. Ví dụ: Gói khám sức khỏe tài chính 360° có phí từ 15 triệu, gói đồng hành dòng tiền 3-6 tháng có phí từ 25 triệu/3 tháng, tùy theo quy mô và độ phức tạp của doanh nghiệp."
        },
        {
            id: "faq-6",
            categoryId: "pricing",
            question: "Có ràng buộc hợp đồng tối thiểu không?",
            answerLong: "Không. ProsFIN không yêu cầu hợp đồng dài hạn bắt buộc. Bạn có thể chọn làm việc theo dự án hoặc theo tháng, tùy vào nhu cầu. Chúng tôi tin rằng giá trị dịch vụ sẽ tự nói lên, và bạn sẽ muốn tiếp tục đồng hành vì thấy được kết quả thực tế. Nếu bạn muốn dừng gói giữa chừng, chúng tôi sẽ thanh toán theo tỷ lệ thời gian đã sử dụng."
        },
        {
            id: "faq-7",
            categoryId: "security",
            question: "ProsFIN bảo mật số liệu tài chính của doanh nghiệp ra sao?",
            answerLong: "Bảo mật thông tin là ưu tiên hàng đầu của ProsFIN. Tất cả dữ liệu tài chính được xử lý với mức độ bảo mật cao, chỉ những người trực tiếp làm việc với bạn mới có quyền truy cập. Chúng tôi tuân thủ nghiêm ngặt các quy định về bảo mật dữ liệu và có cam kết không chia sẻ thông tin với bên thứ ba mà không có sự đồng ý của bạn. Tất cả thành viên trong đội ngũ đều ký cam kết bảo mật và tuân thủ các quy định về bảo vệ dữ liệu."
        },
        {
            id: "faq-8",
            categoryId: "security",
            question: "Ai có quyền truy cập vào dữ liệu của tôi?",
            answerLong: "Chỉ đội ngũ ProsFIN trực tiếp làm việc với bạn mới có quyền truy cập vào dữ liệu. Chúng tôi không chia sẻ thông tin với bất kỳ bên thứ ba nào. Tất cả thành viên trong đội ngũ đều ký cam kết bảo mật và tuân thủ các quy định về bảo vệ dữ liệu. Dữ liệu được lưu trữ an toàn và chỉ được sử dụng cho mục đích tư vấn và hỗ trợ bạn."
        },
        {
            id: "faq-9",
            categoryId: "legal",
            question: "ProsFIN có cam kết lợi nhuận / kết quả cụ thể không?",
            answerLong: "Không. ProsFIN không cam kết hay hứa hẹn về lợi nhuận hay kết quả tài chính cụ thể. Chúng tôi cung cấp tư vấn dựa trên số liệu thực tế và kinh nghiệm, giúp bạn có bức tranh tài chính rõ ràng và đưa ra quyết định sáng suốt hơn. Mọi quyết định cuối cùng đều thuộc về bạn, và kết quả phụ thuộc vào nhiều yếu tố ngoài tầm kiểm soát của chúng tôi. Chúng tôi cam kết làm việc chuyên nghiệp và đưa ra khuyến nghị tốt nhất dựa trên số liệu thực tế."
        },
        {
            id: "faq-10",
            categoryId: "legal",
            question: "Phạm vi trách nhiệm của ProsFIN là gì?",
            answerLong: "ProsFIN cung cấp tư vấn tài chính và kế toán, không phải dịch vụ kế toán hay kê khai thuế trực tiếp. Chúng tôi không có quyền hạn pháp lý hay quản trị trong doanh nghiệp của bạn. ProsFIN tư vấn và đề xuất dựa trên số liệu thực tế, nhưng quyết định và triển khai thuộc về doanh nghiệp bạn. Chúng tôi không chịu trách nhiệm về các quyết định bạn đưa ra dựa trên tư vấn của chúng tôi. Tuy nhiên, chúng tôi cam kết làm việc chuyên nghiệp và đưa ra khuyến nghị tốt nhất dựa trên số liệu thực tế."
        }
    ]
};
}),
"[project]/apps/web/src/components/faq/faq-category-accordion.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FaqCategoryAccordion",
    ()=>FaqCategoryAccordion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._ec44244442018e0307372bcc14db556f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FaqCategoryAccordion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FaqCategoryAccordion() from the server but FaqCategoryAccordion is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/faq/faq-category-accordion.tsx <module evaluation>", "FaqCategoryAccordion");
}),
"[project]/apps/web/src/components/faq/faq-category-accordion.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FaqCategoryAccordion",
    ()=>FaqCategoryAccordion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._ec44244442018e0307372bcc14db556f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FaqCategoryAccordion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FaqCategoryAccordion() from the server but FaqCategoryAccordion is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/src/components/faq/faq-category-accordion.tsx", "FaqCategoryAccordion");
}),
"[project]/apps/web/src/components/faq/faq-category-accordion.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$faq$2f$faq$2d$category$2d$accordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/faq/faq-category-accordion.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$faq$2f$faq$2d$category$2d$accordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/faq/faq-category-accordion.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$faq$2f$faq$2d$category$2d$accordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/src/app/(marketing)/faq/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FaqPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._ec44244442018e0307372bcc14db556f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$faq$2d$page$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/faq-page.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/typography/headings.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/section/section-wrapper.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$heading$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/section/section-heading-block.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/typography/text.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$faq$2f$faq$2d$category$2d$accordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/faq/faq-category-accordion.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$secondary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/button/secondary-button.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
function FaqPage() {
    const { hero, categories, items } = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$faq$2d$page$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["faqPageContent"];
    // Group items by category
    const itemsByCategory = categories.map((category)=>({
            category,
            items: items.filter((item)=>item.categoryId === category.id)
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                background: "muted",
                padding: "lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$heading$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionHeading"], {
                    eyebrow: hero.eyebrow,
                    title: hero.title,
                    subtitle: hero.subtitle,
                    align: "center",
                    titleSize: "xl"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-12",
                    children: itemsByCategory.map(({ category, items: categoryItems })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["H2"], {
                                    className: "mb-6",
                                    children: category.label
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$faq$2f$faq$2d$category$2d$accordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FaqCategoryAccordion"], {
                                    items: categoryItems.map((item)=>({
                                            id: item.id,
                                            question: item.question,
                                            answer: item.answerLong
                                        }))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, category.id, true, {
                            fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                background: "muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["H2"], {
                            className: "mb-4",
                            children: "Vẫn còn câu hỏi riêng?"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                            as: "p",
                            variant: "lead",
                            className: "mb-6 mx-auto max-w-2xl",
                            children: "Nếu bạn vẫn còn câu hỏi riêng, hãy để lại thông tin. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_ec44244442018e0307372bcc14db556f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$secondary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSecondaryButton"], {
                            href: "/contact",
                            size: "lg",
                            children: "Liên hệ với ProsFIN"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(marketing)/faq/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/apps/web/src/app/(marketing)/faq/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/app/(marketing)/faq/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__382c4116._.js.map