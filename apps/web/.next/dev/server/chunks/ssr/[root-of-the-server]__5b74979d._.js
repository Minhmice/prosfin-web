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
"[project]/apps/web/src/data/services-page.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Services Page Content Data
 * 
 * This file contains all content for the /services page.
 * In the future, this data can be fetched from CMS/backend API.
 */ __turbopack_context__.s([
    "servicesPageContent",
    ()=>servicesPageContent
]);
const servicesPageContent = {
    hero: {
        eyebrow: "Dịch vụ ProsFIN",
        title: "Các giải pháp ProsFIN đồng hành cùng tài chính doanh nghiệp",
        subtitle: "Từ khám sức khỏe tài chính đến đồng hành dài hạn, ProsFIN thiết kế gói dịch vụ phù hợp với từng giai đoạn phát triển của doanh nghiệp.",
        primaryCta: {
            label: "Đặt lịch khám sức khỏe tài chính miễn phí",
            href: "/contact"
        },
        secondaryCta: {
            label: "Trao đổi để chọn gói phù hợp",
            href: "/contact"
        }
    },
    packages: [
        {
            id: "health-check",
            slug: "health-check-360",
            title: "Khám sức khỏe tài chính 360°",
            targetAudience: [
                "SME",
                "Startup",
                "DN đang tăng trưởng"
            ],
            benefits: [
                "Báo cáo đánh giá tài chính toàn diện",
                "Xác định 3 vấn đề trọng tâm cần xử lý",
                "Roadmap ưu tiên 30-90 ngày",
                "Buổi trao đổi 1:1 với cố vấn"
            ],
            duration: "2-3 tuần",
            scope: "Đánh giá toàn diện, không triển khai"
        },
        {
            id: "cash-flow",
            slug: "cash-flow-partnership",
            title: "Đồng hành dòng tiền 3-6 tháng",
            targetAudience: [
                "SME",
                "DN có vấn đề dòng tiền"
            ],
            benefits: [
                "Dự báo dòng tiền 3-6 tháng",
                "Theo dõi và cảnh báo sớm",
                "Tối ưu chu kỳ công nợ",
                "Hỗ trợ quyết định đầu tư/mở rộng"
            ],
            duration: "3-6 tháng",
            scope: "Đồng hành định kỳ, review hàng tháng"
        },
        {
            id: "cfo-part-time",
            slug: "cfo-part-time",
            title: "Cố vấn tài chính nội bộ bán thời gian",
            targetAudience: [
                "DN đang mở rộng",
                "DN cần tư vấn cấp cao"
            ],
            benefits: [
                "Tư vấn chiến lược tài chính",
                "Đồng hành ra quyết định lớn",
                "Xây dựng hệ thống báo cáo nội bộ",
                "Tiết kiệm so với CFO full-time"
            ],
            duration: "6-12 tháng",
            scope: "Đồng hành dài hạn, linh hoạt"
        }
    ],
    segments: [
        {
            id: "sme-owner",
            label: "Chủ doanh nghiệp SME",
            pains: [
                "Lãi trên báo cáo nhưng không thấy tiền",
                "Không biết chi phí nào đang 'ăn' lợi nhuận",
                "Lo lắng về thuế và quyết toán"
            ],
            recommendedPackages: [
                "health-check",
                "cash-flow"
            ]
        },
        {
            id: "startup",
            label: "Startup / DN trẻ",
            pains: [
                "Chưa có hệ thống kế toán bài bản",
                "Cần hiểu số liệu để pitch investor",
                "Muốn mở rộng nhưng không chắc khả năng tài chính"
            ],
            recommendedPackages: [
                "health-check",
                "cfo-part-time"
            ]
        },
        {
            id: "accounting-team",
            label: "Kế toán / Bộ phận tài chính",
            pains: [
                "Báo cáo không được sử dụng để ra quyết định",
                "Thiếu hệ thống phân tích chi phí",
                "Cần người review và tư vấn nâng cao"
            ],
            recommendedPackages: [
                "health-check",
                "cash-flow"
            ]
        }
    ],
    valueProps: [
        {
            id: "simple-language",
            title: "Ngôn ngữ dễ hiểu",
            description: "Chúng tôi 'dịch' số liệu tài chính sang ngôn ngữ của bạn, không dùng jargon khó hiểu."
        },
        {
            id: "systematized",
            title: "Hệ thống hóa số liệu",
            description: "Từ dữ liệu rời rạc, chúng tôi giúp bạn có bức tranh tài chính rõ ràng, có thể hành động ngay."
        },
        {
            id: "action-first",
            title: "Action-first",
            description: "Mỗi báo cáo đều kèm 3 việc cần làm tuần này/tháng này, không chỉ là số liệu."
        },
        {
            id: "partnership",
            title: "Đồng hành dài hạn",
            description: "Không chỉ tư vấn xong là thôi. Chúng tôi đồng hành để bạn ra quyết định tự tin hơn."
        }
    ],
    miniCases: [
        {
            id: "case-1",
            slug: "dich-vu-sang-tao",
            situation: "DN dịch vụ sáng tạo 25 nhân sự, tăng trưởng nhanh nhưng dòng tiền luôn căng thẳng",
            result: "Sau 3 tháng, có dự báo dòng tiền 6 tháng và quy trình theo dõi hàng tuần"
        },
        {
            id: "case-2",
            slug: "san-xuat-nho",
            situation: "DN sản xuất nhỏ, lãi trên báo cáo nhưng không biết tiền đi đâu",
            result: "Xác định được 3 khoản chi phí 'ẩn' và có kế hoạch tối ưu trong 90 ngày"
        }
    ],
    faqs: [
        {
            id: "faq-1",
            question: "Phí tư vấn được tính thế nào?",
            answer: "Phí dịch vụ được tính dựa trên phạm vi công việc và thời gian triển khai. Chúng tôi sẽ báo giá cụ thể sau khi đánh giá nhu cầu của bạn trong buổi trao đổi đầu tiên. Buổi tư vấn đầu tiên 30 phút là miễn phí."
        },
        {
            id: "faq-2",
            question: "ProsFIN có cam kết kết quả không?",
            answer: "Không. ProsFIN không cam kết hay hứa hẹn về lợi nhuận hay kết quả tài chính cụ thể. Chúng tôi cung cấp tư vấn dựa trên số liệu thực tế và kinh nghiệm, giúp bạn có bức tranh tài chính rõ ràng và đưa ra quyết định sáng suốt hơn."
        },
        {
            id: "faq-3",
            question: "ProsFIN có thay thế vai trò kế toán không?",
            answer: "ProsFIN tập trung vào tư vấn tài chính, kiểm soát nội bộ và đồng hành quản trị tài chính. Chúng tôi không thay thế kế toán nội bộ hay làm dịch vụ kê khai thuế trực tiếp, nhưng có thể hỗ trợ bạn xây dựng hệ thống kế toán và tối ưu quy trình."
        }
    ]
};
}),
"[project]/apps/web/src/app/(marketing)/services/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServicesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$services$2d$page$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/data/services-page.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/typography/headings.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/section/section-wrapper.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$heading$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/section/section-heading-block.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$primary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/button/primary-button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$secondary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/button/secondary-button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$card$2f$service$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/card/service-card-wrapper.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/shared/typography/text.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
function ServicesPage() {
    const { hero, packages, valueProps, miniCases, faqs } = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$data$2f$services$2d$page$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["servicesPageContent"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                background: "muted",
                padding: "lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$heading$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionHeading"], {
                        eyebrow: hero.eyebrow,
                        title: hero.title,
                        subtitle: hero.subtitle,
                        align: "center",
                        titleSize: "xl"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$primary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinPrimaryButton"], {
                                href: hero.primaryCta.href,
                                size: "lg",
                                children: hero.primaryCta.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$secondary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSecondaryButton"], {
                                href: hero.secondaryCta.href,
                                size: "lg",
                                children: hero.secondaryCta.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["H2"], {
                            className: "mb-8",
                            children: "Các gói dịch vụ"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3",
                            children: packages.map((pkg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$card$2f$service$2d$card$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinServiceCardWrapper"], {
                                    title: pkg.title,
                                    description: pkg.scope,
                                    benefits: pkg.benefits,
                                    idealClient: pkg.targetAudience.join(", "),
                                    cta: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$secondary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSecondaryButton"], {
                                        href: `/services/${pkg.slug}`,
                                        className: "w-full",
                                        children: "Xem chi tiết"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 19
                                    }, void 0)
                                }, pkg.id, false, {
                                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                background: "muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["H2"], {
                            className: "mb-8",
                            children: "ProsFIN làm việc khác biệt như thế nào?"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4",
                            children: valueProps.map((prop)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border bg-card p-4 shadow-sm md:p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "large",
                                            className: "mb-2",
                                            children: prop.title
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "muted",
                                            className: "leading-relaxed",
                                            children: prop.description
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, prop.id, true, {
                                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["H2"], {
                            className: "mb-8",
                            children: "Câu chuyện khách hàng"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:gap-6 md:grid-cols-2",
                            children: miniCases.map((caseItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border bg-card p-4 shadow-sm md:p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "muted",
                                            className: "mb-2 font-medium",
                                            children: "Tình huống"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "body",
                                            className: "mb-4",
                                            children: caseItem.situation
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "muted",
                                            className: "mb-2 font-medium",
                                            children: "Kết quả"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "body",
                                            className: "mb-4",
                                            children: caseItem.result
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/case-studies/${caseItem.slug}`,
                                            className: "text-sm font-medium text-primary underline-offset-4 hover:underline",
                                            "aria-label": `Xem chi tiết case study: ${caseItem.slug}`,
                                            children: "Xem chi tiết →"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, caseItem.id, true, {
                                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$secondary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSecondaryButton"], {
                                href: "/case-studies",
                                children: "Xem thêm câu chuyện khách hàng"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$section$2f$section$2d$wrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSectionWrapper"], {
                background: "muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$headings$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["H2"], {
                            className: "mb-8",
                            children: "Câu hỏi thường gặp về dịch vụ"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: faqs.map((faq)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border bg-card p-4 shadow-sm md:p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "large",
                                            className: "mb-2",
                                            children: faq.question
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$typography$2f$text$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Text"], {
                                            as: "p",
                                            variant: "muted",
                                            className: "leading-relaxed",
                                            children: faq.answer
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, faq.id, true, {
                                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$shared$2f$button$2f$secondary$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProsfinSecondaryButton"], {
                                href: "/faq",
                                children: "Xem thêm câu hỏi thường gặp"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/(marketing)/services/page.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/apps/web/src/app/(marketing)/services/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/app/(marketing)/services/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5b74979d._.js.map