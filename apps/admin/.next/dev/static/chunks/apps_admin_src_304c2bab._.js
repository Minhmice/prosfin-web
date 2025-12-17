(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/admin/src/mocks/leads.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockLeads",
    ()=>mockLeads
]);
const mockLeads = [
    {
        id: "lead-1",
        name: "Nguyễn Văn A",
        company: "Công ty ABC",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        interest: "Tư vấn tài chính",
        status: "new",
        source: "Google Ads",
        utm_campaign: "summer-2024",
        attribution: {
            landingPath: "/",
            referrer: "https://google.com",
            utm_source: "google",
            utm_medium: "cpc",
            utm_campaign: "summer-2024",
            timestamp: "2024-01-15T10:30:00Z"
        },
        timeline: [
            {
                id: "event-1",
                type: "submitted",
                title: "Form submitted",
                timestamp: "2024-01-15T10:30:00Z"
            }
        ],
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: "lead-2",
        name: "Trần Thị B",
        company: "Studio XYZ",
        email: "tranthib@example.com",
        phone: "0912345678",
        interest: "Báo cáo tài chính",
        status: "contacted",
        source: "Facebook",
        utm_campaign: "fb-q1-2024",
        attribution: {
            landingPath: "/services",
            referrer: "https://facebook.com",
            utm_source: "facebook",
            utm_medium: "social",
            utm_campaign: "fb-q1-2024",
            timestamp: "2024-01-14T14:20:00Z"
        },
        timeline: [
            {
                id: "event-2",
                type: "submitted",
                title: "Form submitted",
                timestamp: "2024-01-14T14:20:00Z"
            },
            {
                id: "event-3",
                type: "contacted",
                title: "Contacted via email",
                timestamp: "2024-01-14T15:00:00Z"
            }
        ],
        createdAt: "2024-01-14T14:20:00Z",
        updatedAt: "2024-01-14T15:00:00Z"
    },
    {
        id: "lead-3",
        name: "Lê Văn C",
        company: "Startup Tech",
        email: "levanc@example.com",
        phone: "0923456789",
        interest: "Dòng tiền",
        status: "qualified",
        source: "LinkedIn",
        utm_campaign: "linkedin-b2b",
        attribution: {
            landingPath: "/contact",
            referrer: "https://linkedin.com",
            utm_source: "linkedin",
            utm_medium: "social",
            utm_campaign: "linkedin-b2b",
            timestamp: "2024-01-13T09:15:00Z"
        },
        timeline: [
            {
                id: "event-4",
                type: "submitted",
                title: "Form submitted",
                timestamp: "2024-01-13T09:15:00Z"
            },
            {
                id: "event-5",
                type: "contacted",
                title: "Contacted via phone",
                timestamp: "2024-01-13T10:00:00Z"
            },
            {
                id: "event-6",
                type: "qualified",
                title: "Qualified as hot lead",
                timestamp: "2024-01-13T11:00:00Z"
            }
        ],
        createdAt: "2024-01-13T09:15:00Z",
        updatedAt: "2024-01-13T11:00:00Z"
    },
    {
        id: "lead-4",
        name: "Phạm Thị D",
        company: "DN Sản xuất",
        email: "phamthid@example.com",
        phone: "0934567890",
        interest: "Kiểm soát chi phí",
        status: "meeting_scheduled",
        source: "Direct",
        attribution: {
            landingPath: "/",
            timestamp: "2024-01-12T16:45:00Z"
        },
        timeline: [
            {
                id: "event-7",
                type: "submitted",
                title: "Form submitted",
                timestamp: "2024-01-12T16:45:00Z"
            },
            {
                id: "event-8",
                type: "qualified",
                title: "Qualified",
                timestamp: "2024-01-12T17:00:00Z"
            },
            {
                id: "event-9",
                type: "meeting",
                title: "Meeting scheduled for Jan 20",
                timestamp: "2024-01-12T17:30:00Z"
            }
        ],
        createdAt: "2024-01-12T16:45:00Z",
        updatedAt: "2024-01-12T17:30:00Z"
    },
    {
        id: "lead-5",
        name: "Hoàng Văn E",
        company: "Công ty E",
        email: "hoangvane@example.com",
        phone: "0945678901",
        interest: "Tư vấn thuế",
        status: "converted",
        source: "Referral",
        attribution: {
            landingPath: "/services",
            timestamp: "2024-01-10T11:20:00Z"
        },
        timeline: [
            {
                id: "event-10",
                type: "submitted",
                title: "Form submitted",
                timestamp: "2024-01-10T11:20:00Z"
            },
            {
                id: "event-11",
                type: "converted",
                title: "Converted to client",
                timestamp: "2024-01-11T10:00:00Z"
            }
        ],
        createdAt: "2024-01-10T11:20:00Z",
        updatedAt: "2024-01-11T10:00:00Z"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/lib/data/leads.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertLeadToClient",
    ()=>convertLeadToClient,
    "getLead",
    ()=>getLead,
    "listLeads",
    ()=>listLeads,
    "updateLeadStatus",
    ()=>updateLeadStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$mocks$2f$leads$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/mocks/leads.ts [app-client] (ecmascript)");
;
/**
 * Data adapter cho Leads
 * 
 * UI components chỉ import từ đây, không import mocks trực tiếp.
 * Có thể swap sang API calls trong Phase 3.
 */ let leadsData = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$mocks$2f$leads$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockLeads"]
];
async function listLeads() {
    // Simulate API delay
    await new Promise((resolve)=>setTimeout(resolve, 100));
    return [
        ...leadsData
    ];
}
async function getLead(id) {
    await new Promise((resolve)=>setTimeout(resolve, 50));
    return leadsData.find((lead)=>lead.id === id) || null;
}
async function updateLeadStatus(id, status) {
    await new Promise((resolve)=>setTimeout(resolve, 100));
    const lead = leadsData.find((l)=>l.id === id);
    if (!lead) {
        throw new Error(`Lead with id ${id} not found`);
    }
    const updated = {
        ...lead,
        status,
        updatedAt: new Date().toISOString()
    };
    leadsData = leadsData.map((l)=>l.id === id ? updated : l);
    return updated;
}
async function convertLeadToClient(leadId) {
    await new Promise((resolve)=>setTimeout(resolve, 100));
    const lead = leadsData.find((l)=>l.id === leadId);
    if (!lead) {
        throw new Error(`Lead with id ${leadId} not found`);
    }
    // Update lead status to converted
    await updateLeadStatus(leadId, "converted");
// In Phase 3, this would create a client record in DB
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/app/(app)/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$page$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/admin/admin-page-shell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$section$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/admin/admin-section-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$leads$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/lib/data/leads.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function DashboardPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "0b15bd50fc04ac51113ae76c50b92b4a22d01887b967f8db9d5e673093787b2e") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0b15bd50fc04ac51113ae76c50b92b4a22d01887b967f8db9d5e673093787b2e";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            leadsThisWeek: 0,
            conversionRate: 0,
            topSource: "-",
            pipeline: 0
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [stats, setStats] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](t0);
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "DashboardPage[useEffect()]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$leads$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listLeads"])().then({
                    "DashboardPage[useEffect() > (anonymous)()]": (leads)=>{
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        const leadsThisWeek = leads.filter({
                            "DashboardPage[useEffect() > (anonymous)() > leads.filter()]": (lead)=>new Date(lead.createdAt) >= weekAgo
                        }["DashboardPage[useEffect() > (anonymous)() > leads.filter()]"]).length;
                        const converted = leads.filter(_DashboardPageUseEffectAnonymousLeadsFilter).length;
                        const conversionRate = leads.length > 0 ? converted / leads.length * 100 : 0;
                        const sourceCounts = {};
                        leads.forEach({
                            "DashboardPage[useEffect() > (anonymous)() > leads.forEach()]": (lead_0)=>{
                                sourceCounts[lead_0.source] = (sourceCounts[lead_0.source] || 0) + 1;
                            }
                        }["DashboardPage[useEffect() > (anonymous)() > leads.forEach()]"]);
                        const topSource = Object.entries(sourceCounts).sort(_DashboardPageUseEffectAnonymousAnonymous)[0]?.[0] || "-";
                        setStats({
                            leadsThisWeek,
                            conversionRate: Math.round(conversionRate * 10) / 10,
                            topSource,
                            pipeline: leads.filter(_DashboardPageUseEffectAnonymousLeadsFilter2).length
                        });
                    }
                }["DashboardPage[useEffect() > (anonymous)()]"]);
            }
        })["DashboardPage[useEffect()]"];
        t2 = [];
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](t1, t2);
    let t3;
    if ($[4] !== stats.leadsThisWeek) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-2xl font-bold",
            children: stats.leadsThisWeek
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[4] = stats.leadsThisWeek;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-muted-foreground text-xs",
            children: "New leads"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 77,
            columnNumber: 10
        }, this);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== t3) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$section$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminSectionCard"], {
            title: "Leads This Week",
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== stats.conversionRate) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-2xl font-bold",
            children: [
                stats.conversionRate,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[9] = stats.conversionRate;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-muted-foreground text-xs",
            children: "Last 30 days"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 100,
            columnNumber: 10
        }, this);
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t6) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$section$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminSectionCard"], {
            title: "Conversion Rate",
            children: [
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[12] = t6;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== stats.topSource) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-2xl font-bold",
            children: stats.topSource
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[14] = stats.topSource;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-muted-foreground text-xs",
            children: "Most effective"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$section$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminSectionCard"], {
            title: "Top Source",
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[17] = t9;
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== stats.pipeline) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-2xl font-bold",
            children: stats.pipeline
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 138,
            columnNumber: 11
        }, this);
        $[19] = stats.pipeline;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-muted-foreground text-xs",
            children: "Active deals"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    let t14;
    if ($[22] !== t12) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$section$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminSectionCard"], {
            title: "Pipeline",
            children: [
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[22] = t12;
        $[23] = t14;
    } else {
        t14 = $[23];
    }
    let t15;
    if ($[24] !== t11 || $[25] !== t14 || $[26] !== t5 || $[27] !== t8) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
            children: [
                t5,
                t8,
                t11,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[24] = t11;
        $[25] = t14;
        $[26] = t5;
        $[27] = t8;
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$section$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminSectionCard"], {
            title: "Leads Over Time",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-64 items-center justify-center text-muted-foreground",
                children: "Chart placeholder"
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
                lineNumber: 172,
                columnNumber: 53
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[29] = t16;
    } else {
        t16 = $[29];
    }
    let t17;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-6 md:grid-cols-2",
            children: [
                t16,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$section$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminSectionCard"], {
                    title: "Source Distribution",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-64 items-center justify-center text-muted-foreground",
                        children: "Chart placeholder"
                    }, void 0, false, {
                        fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
                        lineNumber: 179,
                        columnNumber: 105
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
                    lineNumber: 179,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 179,
            columnNumber: 11
        }, this);
        $[30] = t17;
    } else {
        t17 = $[30];
    }
    let t18;
    if ($[31] !== t15) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$admin$2f$admin$2d$page$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminPageShell"], {
            title: "Dashboard",
            description: "Overview of your business metrics",
            children: [
                t15,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/app/(app)/dashboard/page.tsx",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[31] = t15;
        $[32] = t18;
    } else {
        t18 = $[32];
    }
    return t18;
}
_s(DashboardPage, "4tpvAwWDAEZQM/ffiHlnO5uFZE4=");
_c = DashboardPage;
function _DashboardPageUseEffectAnonymousLeadsFilter2(l_0) {
    return l_0.status === "qualified" || l_0.status === "meeting_scheduled";
}
function _DashboardPageUseEffectAnonymousAnonymous(a, b) {
    return b[1] - a[1];
}
function _DashboardPageUseEffectAnonymousLeadsFilter(l) {
    return l.status === "converted";
}
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_admin_src_304c2bab._.js.map