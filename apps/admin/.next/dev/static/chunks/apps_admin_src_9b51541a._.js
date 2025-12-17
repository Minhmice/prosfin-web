(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetadataPanel",
    ()=>MetadataPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/separator.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const bucketOptions = [
    {
        value: "insights",
        label: "Insights"
    },
    {
        value: "resources",
        label: "Resources"
    },
    {
        value: "knowledge",
        label: "Knowledge"
    }
];
const statusOptions = [
    {
        value: "draft",
        label: "Draft"
    },
    {
        value: "published",
        label: "Published"
    },
    {
        value: "scheduled",
        label: "Scheduled"
    },
    {
        value: "archived",
        label: "Archived"
    }
];
function MetadataPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(135);
    if ($[0] !== "735b83ec09d7295c4589d6532469b88113a6d7ff7ed648ab07cb73451dcb9d15") {
        for(let $i = 0; $i < 135; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "735b83ec09d7295c4589d6532469b88113a6d7ff7ed648ab07cb73451dcb9d15";
    }
    const { post, formData, onFormDataChange } = t0;
    let t1;
    if ($[1] !== post) {
        t1 = post ? {
            title: post.title,
            slug: post.slug,
            bucket: post.bucket,
            excerpt: post.excerpt,
            cover: post.cover,
            tags: post.tags,
            content: post.content,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            canonical: post.canonical,
            noindex: post.noindex,
            status: post.status,
            scheduledFor: post.scheduledFor
        } : {
            title: "",
            slug: "",
            bucket: "insights",
            excerpt: "",
            cover: "",
            tags: [],
            content: {
                root: {
                    children: [],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "root",
                    version: 1
                }
            },
            status: "draft"
        };
        $[1] = post;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [localData, setLocalData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](t1);
    let t2;
    let t3;
    if ($[3] !== formData) {
        t2 = ({
            "MetadataPanel[useEffect()]": ()=>{
                if (formData) {
                    setLocalData(formData);
                }
            }
        })["MetadataPanel[useEffect()]"];
        t3 = [
            formData
        ];
        $[3] = formData;
        $[4] = t2;
        $[5] = t3;
    } else {
        t2 = $[4];
        t3 = $[5];
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](t2, t3);
    let t4;
    if ($[6] !== localData || $[7] !== onFormDataChange) {
        t4 = ({
            "MetadataPanel[updateField]": (field, value)=>{
                const updated = {
                    ...localData,
                    [field]: value
                };
                setLocalData(updated);
                onFormDataChange(updated);
            }
        })["MetadataPanel[updateField]"];
        $[6] = localData;
        $[7] = onFormDataChange;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const updateField = t4;
    const generateSlug = _MetadataPanelGenerateSlug;
    let t5;
    if ($[9] !== localData.slug || $[10] !== post || $[11] !== updateField) {
        t5 = ({
            "MetadataPanel[handleTitleChange]": (value_0)=>{
                updateField("title", value_0);
                if (!post || !localData.slug) {
                    updateField("slug", generateSlug(value_0));
                }
            }
        })["MetadataPanel[handleTitleChange]"];
        $[9] = localData.slug;
        $[10] = post;
        $[11] = updateField;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    const handleTitleChange = t5;
    let t6;
    if ($[13] !== localData.tags || $[14] !== updateField) {
        t6 = ({
            "MetadataPanel[addTag]": (tag)=>{
                if (tag.trim() && !localData.tags?.includes(tag.trim())) {
                    updateField("tags", [
                        ...localData.tags || [],
                        tag.trim()
                    ]);
                }
            }
        })["MetadataPanel[addTag]"];
        $[13] = localData.tags;
        $[14] = updateField;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    const addTag = t6;
    let t7;
    if ($[16] !== localData.tags || $[17] !== updateField) {
        t7 = ({
            "MetadataPanel[removeTag]": (tag_0)=>{
                updateField("tags", localData.tags?.filter({
                    "MetadataPanel[removeTag > (anonymous)()]": (t)=>t !== tag_0
                }["MetadataPanel[removeTag > (anonymous)()]"]) || []);
            }
        })["MetadataPanel[removeTag]"];
        $[16] = localData.tags;
        $[17] = updateField;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    const removeTag = t7;
    let t8;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-semibold",
            children: "Basic Information"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 189,
            columnNumber: 10
        }, this);
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    let t9;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "title",
            children: "Title *"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 196,
            columnNumber: 10
        }, this);
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    const t10 = localData.title || "";
    let t11;
    if ($[21] !== handleTitleChange) {
        t11 = ({
            "MetadataPanel[<Input>.onChange]": (e)=>handleTitleChange(e.target.value)
        })["MetadataPanel[<Input>.onChange]"];
        $[21] = handleTitleChange;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    let t12;
    if ($[23] !== t10 || $[24] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    id: "title",
                    value: t10,
                    onChange: t11,
                    placeholder: "Enter post title"
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 214,
                    columnNumber: 42
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 214,
            columnNumber: 11
        }, this);
        $[23] = t10;
        $[24] = t11;
        $[25] = t12;
    } else {
        t12 = $[25];
    }
    let t13;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "slug",
            children: "Slug *"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 223,
            columnNumber: 11
        }, this);
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    const t14 = localData.slug || "";
    let t15;
    if ($[27] !== updateField) {
        t15 = ({
            "MetadataPanel[<Input>.onChange]": (e_0)=>updateField("slug", e_0.target.value)
        })["MetadataPanel[<Input>.onChange]"];
        $[27] = updateField;
        $[28] = t15;
    } else {
        t15 = $[28];
    }
    let t16;
    if ($[29] !== t14 || $[30] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "slug",
            value: t14,
            onChange: t15,
            placeholder: "post-slug"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 241,
            columnNumber: 11
        }, this);
        $[29] = t14;
        $[30] = t15;
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    let t17;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-muted-foreground",
            children: "URL-friendly version of the title"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 250,
            columnNumber: 11
        }, this);
        $[32] = t17;
    } else {
        t17 = $[32];
    }
    let t18;
    if ($[33] !== t16) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t13,
                t16,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[33] = t16;
        $[34] = t18;
    } else {
        t18 = $[34];
    }
    let t19;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "bucket",
            children: "Content Bucket"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 265,
            columnNumber: 11
        }, this);
        $[35] = t19;
    } else {
        t19 = $[35];
    }
    const t20 = localData.bucket || "insights";
    let t21;
    if ($[36] !== updateField) {
        t21 = ({
            "MetadataPanel[<select>.onChange]": (e_1)=>updateField("bucket", e_1.target.value)
        })["MetadataPanel[<select>.onChange]"];
        $[36] = updateField;
        $[37] = t21;
    } else {
        t21 = $[37];
    }
    let t22;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = bucketOptions.map(_MetadataPanelBucketOptionsMap);
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] !== t20 || $[40] !== t21) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t19,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    id: "bucket",
                    value: t20,
                    onChange: t21,
                    className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    children: t22
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 290,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 290,
            columnNumber: 11
        }, this);
        $[39] = t20;
        $[40] = t21;
        $[41] = t23;
    } else {
        t23 = $[41];
    }
    let t24;
    if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "excerpt",
            children: "Excerpt"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[42] = t24;
    } else {
        t24 = $[42];
    }
    const t25 = localData.excerpt || "";
    let t26;
    if ($[43] !== updateField) {
        t26 = ({
            "MetadataPanel[<Textarea>.onChange]": (e_2)=>updateField("excerpt", e_2.target.value)
        })["MetadataPanel[<Textarea>.onChange]"];
        $[43] = updateField;
        $[44] = t26;
    } else {
        t26 = $[44];
    }
    let t27;
    if ($[45] !== t25 || $[46] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                    id: "excerpt",
                    value: t25,
                    onChange: t26,
                    placeholder: "Brief description of the post",
                    rows: 3
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 317,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 317,
            columnNumber: 11
        }, this);
        $[45] = t25;
        $[46] = t26;
        $[47] = t27;
    } else {
        t27 = $[47];
    }
    let t28;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "cover",
            children: "Cover Image URL"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 326,
            columnNumber: 11
        }, this);
        $[48] = t28;
    } else {
        t28 = $[48];
    }
    const t29 = localData.cover || "";
    let t30;
    if ($[49] !== updateField) {
        t30 = ({
            "MetadataPanel[<Input>.onChange]": (e_3)=>updateField("cover", e_3.target.value)
        })["MetadataPanel[<Input>.onChange]"];
        $[49] = updateField;
        $[50] = t30;
    } else {
        t30 = $[50];
    }
    let t31;
    if ($[51] !== t29 || $[52] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t28,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    id: "cover",
                    value: t29,
                    onChange: t30,
                    placeholder: "https://example.com/image.jpg"
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 344,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 344,
            columnNumber: 11
        }, this);
        $[51] = t29;
        $[52] = t30;
        $[53] = t31;
    } else {
        t31 = $[53];
    }
    let t32;
    if ($[54] !== t12 || $[55] !== t18 || $[56] !== t23 || $[57] !== t27 || $[58] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t8,
                t12,
                t18,
                t23,
                t27,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 353,
            columnNumber: 11
        }, this);
        $[54] = t12;
        $[55] = t18;
        $[56] = t23;
        $[57] = t27;
        $[58] = t31;
        $[59] = t32;
    } else {
        t32 = $[59];
    }
    let t33;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 365,
            columnNumber: 11
        }, this);
        $[60] = t33;
    } else {
        t33 = $[60];
    }
    let t34;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-semibold",
            children: "Tags"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 372,
            columnNumber: 11
        }, this);
        $[61] = t34;
    } else {
        t34 = $[61];
    }
    let t35;
    if ($[62] !== localData.tags || $[63] !== removeTag) {
        t35 = localData.tags?.map({
            "MetadataPanel[(anonymous)()]": (tag_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                    variant: "secondary",
                    className: "cursor-pointer",
                    onClick: {
                        "MetadataPanel[(anonymous)() > <Badge>.onClick]": ()=>removeTag(tag_1)
                    }["MetadataPanel[(anonymous)() > <Badge>.onClick]"],
                    children: [
                        tag_1,
                        " ×"
                    ]
                }, tag_1, true, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 380,
                    columnNumber: 48
                }, this)
        }["MetadataPanel[(anonymous)()]"]);
        $[62] = localData.tags;
        $[63] = removeTag;
        $[64] = t35;
    } else {
        t35 = $[64];
    }
    let t36;
    if ($[65] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: t35
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 392,
            columnNumber: 11
        }, this);
        $[65] = t35;
        $[66] = t36;
    } else {
        t36 = $[66];
    }
    let t37;
    if ($[67] !== addTag) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                placeholder: "Add tag",
                onKeyDown: {
                    "MetadataPanel[<Input>.onKeyDown]": (e_4)=>{
                        if (e_4.key === "Enter") {
                            e_4.preventDefault();
                            addTag(e_4.currentTarget.value);
                            e_4.currentTarget.value = "";
                        }
                    }
                }["MetadataPanel[<Input>.onKeyDown]"]
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                lineNumber: 400,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 400,
            columnNumber: 11
        }, this);
        $[67] = addTag;
        $[68] = t37;
    } else {
        t37 = $[68];
    }
    let t38;
    if ($[69] !== t36 || $[70] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t34,
                t36,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 416,
            columnNumber: 11
        }, this);
        $[69] = t36;
        $[70] = t37;
        $[71] = t38;
    } else {
        t38 = $[71];
    }
    let t39;
    if ($[72] === Symbol.for("react.memo_cache_sentinel")) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 425,
            columnNumber: 11
        }, this);
        $[72] = t39;
    } else {
        t39 = $[72];
    }
    let t40;
    if ($[73] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-semibold",
            children: "Status"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 432,
            columnNumber: 11
        }, this);
        $[73] = t40;
    } else {
        t40 = $[73];
    }
    const t41 = localData.status || "draft";
    let t42;
    if ($[74] !== updateField) {
        t42 = ({
            "MetadataPanel[<select>.onChange]": (e_5)=>updateField("status", e_5.target.value)
        })["MetadataPanel[<select>.onChange]"];
        $[74] = updateField;
        $[75] = t42;
    } else {
        t42 = $[75];
    }
    let t43;
    if ($[76] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = statusOptions.map(_MetadataPanelStatusOptionsMap);
        $[76] = t43;
    } else {
        t43 = $[76];
    }
    let t44;
    if ($[77] !== t41 || $[78] !== t42) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            value: t41,
            onChange: t42,
            className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            children: t43
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 457,
            columnNumber: 11
        }, this);
        $[77] = t41;
        $[78] = t42;
        $[79] = t44;
    } else {
        t44 = $[79];
    }
    let t45;
    if ($[80] !== localData.scheduledFor || $[81] !== localData.status || $[82] !== updateField) {
        t45 = localData.status === "scheduled" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                    htmlFor: "scheduledFor",
                    children: "Schedule For"
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 466,
                    columnNumber: 74
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    id: "scheduledFor",
                    type: "datetime-local",
                    value: localData.scheduledFor ? new Date(localData.scheduledFor).toISOString().slice(0, 16) : "",
                    onChange: {
                        "MetadataPanel[<Input>.onChange]": (e_6)=>updateField("scheduledFor", e_6.target.value ? new Date(e_6.target.value).toISOString() : undefined)
                    }["MetadataPanel[<Input>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 466,
                    columnNumber: 124
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 466,
            columnNumber: 47
        }, this);
        $[80] = localData.scheduledFor;
        $[81] = localData.status;
        $[82] = updateField;
        $[83] = t45;
    } else {
        t45 = $[83];
    }
    let t46;
    if ($[84] !== t44 || $[85] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t40,
                t44,
                t45
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 478,
            columnNumber: 11
        }, this);
        $[84] = t44;
        $[85] = t45;
        $[86] = t46;
    } else {
        t46 = $[86];
    }
    let t47;
    if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 487,
            columnNumber: 11
        }, this);
        $[87] = t47;
    } else {
        t47 = $[87];
    }
    let t48;
    if ($[88] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-semibold",
            children: "SEO Settings"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 494,
            columnNumber: 11
        }, this);
        $[88] = t48;
    } else {
        t48 = $[88];
    }
    let t49;
    if ($[89] === Symbol.for("react.memo_cache_sentinel")) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "seoTitle",
            children: "SEO Title"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 501,
            columnNumber: 11
        }, this);
        $[89] = t49;
    } else {
        t49 = $[89];
    }
    const t50 = localData.seoTitle || "";
    let t51;
    if ($[90] !== updateField) {
        t51 = ({
            "MetadataPanel[<Input>.onChange]": (e_7)=>updateField("seoTitle", e_7.target.value)
        })["MetadataPanel[<Input>.onChange]"];
        $[90] = updateField;
        $[91] = t51;
    } else {
        t51 = $[91];
    }
    let t52;
    if ($[92] !== t50 || $[93] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "seoTitle",
            value: t50,
            onChange: t51,
            placeholder: "Custom title for search engines"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 519,
            columnNumber: 11
        }, this);
        $[92] = t50;
        $[93] = t51;
        $[94] = t52;
    } else {
        t52 = $[94];
    }
    const t53 = localData.seoTitle?.length || 0;
    let t54;
    if ($[95] !== t53) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-muted-foreground",
            children: [
                t53,
                "/60 characters"
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 529,
            columnNumber: 11
        }, this);
        $[95] = t53;
        $[96] = t54;
    } else {
        t54 = $[96];
    }
    let t55;
    if ($[97] !== t52 || $[98] !== t54) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t49,
                t52,
                t54
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 537,
            columnNumber: 11
        }, this);
        $[97] = t52;
        $[98] = t54;
        $[99] = t55;
    } else {
        t55 = $[99];
    }
    let t56;
    if ($[100] === Symbol.for("react.memo_cache_sentinel")) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "seoDescription",
            children: "SEO Description"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 546,
            columnNumber: 11
        }, this);
        $[100] = t56;
    } else {
        t56 = $[100];
    }
    const t57 = localData.seoDescription || "";
    let t58;
    if ($[101] !== updateField) {
        t58 = ({
            "MetadataPanel[<Textarea>.onChange]": (e_8)=>updateField("seoDescription", e_8.target.value)
        })["MetadataPanel[<Textarea>.onChange]"];
        $[101] = updateField;
        $[102] = t58;
    } else {
        t58 = $[102];
    }
    let t59;
    if ($[103] !== t57 || $[104] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
            id: "seoDescription",
            value: t57,
            onChange: t58,
            placeholder: "Meta description for search engines",
            rows: 3
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 564,
            columnNumber: 11
        }, this);
        $[103] = t57;
        $[104] = t58;
        $[105] = t59;
    } else {
        t59 = $[105];
    }
    const t60 = localData.seoDescription?.length || 0;
    let t61;
    if ($[106] !== t60) {
        t61 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-muted-foreground",
            children: [
                t60,
                "/160 characters"
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 574,
            columnNumber: 11
        }, this);
        $[106] = t60;
        $[107] = t61;
    } else {
        t61 = $[107];
    }
    let t62;
    if ($[108] !== t59 || $[109] !== t61) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t56,
                t59,
                t61
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 582,
            columnNumber: 11
        }, this);
        $[108] = t59;
        $[109] = t61;
        $[110] = t62;
    } else {
        t62 = $[110];
    }
    let t63;
    if ($[111] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "canonical",
            children: "Canonical URL"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 591,
            columnNumber: 11
        }, this);
        $[111] = t63;
    } else {
        t63 = $[111];
    }
    const t64 = localData.canonical || "";
    let t65;
    if ($[112] !== updateField) {
        t65 = ({
            "MetadataPanel[<Input>.onChange]": (e_9)=>updateField("canonical", e_9.target.value)
        })["MetadataPanel[<Input>.onChange]"];
        $[112] = updateField;
        $[113] = t65;
    } else {
        t65 = $[113];
    }
    let t66;
    if ($[114] !== t64 || $[115] !== t65) {
        t66 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t63,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    id: "canonical",
                    value: t64,
                    onChange: t65,
                    placeholder: "https://example.com/canonical-url"
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                    lineNumber: 609,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 609,
            columnNumber: 11
        }, this);
        $[114] = t64;
        $[115] = t65;
        $[116] = t66;
    } else {
        t66 = $[116];
    }
    const t67 = localData.noindex || false;
    let t68;
    if ($[117] !== updateField) {
        t68 = ({
            "MetadataPanel[<input>.onChange]": (e_10)=>updateField("noindex", e_10.target.checked)
        })["MetadataPanel[<input>.onChange]"];
        $[117] = updateField;
        $[118] = t68;
    } else {
        t68 = $[118];
    }
    let t69;
    if ($[119] !== t67 || $[120] !== t68) {
        t69 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            id: "noindex",
            checked: t67,
            onChange: t68,
            className: "size-4 rounded border-input"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 629,
            columnNumber: 11
        }, this);
        $[119] = t67;
        $[120] = t68;
        $[121] = t69;
    } else {
        t69 = $[121];
    }
    let t70;
    if ($[122] === Symbol.for("react.memo_cache_sentinel")) {
        t70 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "noindex",
            className: "cursor-pointer",
            children: "Noindex (prevent search engines from indexing)"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 638,
            columnNumber: 11
        }, this);
        $[122] = t70;
    } else {
        t70 = $[122];
    }
    let t71;
    if ($[123] !== t69) {
        t71 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t69,
                t70
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 645,
            columnNumber: 11
        }, this);
        $[123] = t69;
        $[124] = t71;
    } else {
        t71 = $[124];
    }
    let t72;
    if ($[125] !== t55 || $[126] !== t62 || $[127] !== t66 || $[128] !== t71) {
        t72 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                t48,
                t55,
                t62,
                t66,
                t71
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 653,
            columnNumber: 11
        }, this);
        $[125] = t55;
        $[126] = t62;
        $[127] = t66;
        $[128] = t71;
        $[129] = t72;
    } else {
        t72 = $[129];
    }
    let t73;
    if ($[130] !== t32 || $[131] !== t38 || $[132] !== t46 || $[133] !== t72) {
        t73 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col overflow-y-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 p-6",
                children: [
                    t32,
                    t33,
                    t38,
                    t39,
                    t46,
                    t47,
                    t72
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
                lineNumber: 664,
                columnNumber: 65
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
            lineNumber: 664,
            columnNumber: 11
        }, this);
        $[130] = t32;
        $[131] = t38;
        $[132] = t46;
        $[133] = t72;
        $[134] = t73;
    } else {
        t73 = $[134];
    }
    return t73;
}
_s(MetadataPanel, "V8aBRFTOxsBD/Cdogt2LsL2wVoM=");
_c = MetadataPanel;
function _MetadataPanelStatusOptionsMap(opt_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: opt_0.value,
        children: opt_0.label
    }, opt_0.value, false, {
        fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
        lineNumber: 676,
        columnNumber: 10
    }, this);
}
function _MetadataPanelBucketOptionsMap(opt) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: opt.value,
        children: opt.label
    }, opt.value, false, {
        fileName: "[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx",
        lineNumber: 679,
        columnNumber: 10
    }, this);
}
function _MetadataPanelGenerateSlug(title) {
    return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var _c;
__turbopack_context__.k.register(_c, "MetadataPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorShell",
    ()=>EditorShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$post$2d$editor$2f$metadata$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/components/content/post-editor/metadata-panel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function EditorShell({ post, onSave, onPublish, onSchedule, formData: externalFormData, onFormDataChange: externalOnFormDataChange, children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSaving, setIsSaving] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [isSaved, setIsSaved] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [internalFormData, setInternalFormData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const formData = externalFormData ?? internalFormData;
    const setFormData = externalOnFormDataChange ?? setInternalFormData;
    // Track unsaved changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EditorShell.useEffect": ()=>{
            const handleBeforeUnload = {
                "EditorShell.useEffect.handleBeforeUnload": (e)=>{
                    if (hasUnsavedChanges) {
                        e.preventDefault();
                        e.returnValue = "";
                    }
                }
            }["EditorShell.useEffect.handleBeforeUnload"];
            window.addEventListener("beforeunload", handleBeforeUnload);
            return ({
                "EditorShell.useEffect": ()=>window.removeEventListener("beforeunload", handleBeforeUnload)
            })["EditorShell.useEffect"];
        }
    }["EditorShell.useEffect"], [
        hasUnsavedChanges
    ]);
    // Auto-save to localStorage and trigger save callback
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EditorShell.useEffect": ()=>{
            if (formData && hasUnsavedChanges && formData.title) {
                const timer = setTimeout({
                    "EditorShell.useEffect.timer": async ()=>{
                        const key = post ? `post-draft-${post.id}` : "post-draft-new";
                        localStorage.setItem(key, JSON.stringify(formData));
                        // Auto-save draft (silent, don't show saved indicator)
                        try {
                            await onSave(formData);
                            setHasUnsavedChanges(false);
                        } catch (error) {
                            console.error("Auto-save failed:", error);
                        }
                    }
                }["EditorShell.useEffect.timer"], 3000); // Auto-save after 3 seconds of inactivity
                return ({
                    "EditorShell.useEffect": ()=>clearTimeout(timer)
                })["EditorShell.useEffect"];
            }
        }
    }["EditorShell.useEffect"], [
        formData,
        hasUnsavedChanges,
        post,
        onSave
    ]);
    const handleSave = async ()=>{
        if (!formData) return;
        setIsSaving(true);
        try {
            await onSave(formData);
            setIsSaved(true);
            setHasUnsavedChanges(false);
            setTimeout(()=>setIsSaved(false), 2000);
        } catch (error_0) {
            console.error("Failed to save:", error_0);
        } finally{
            setIsSaving(false);
        }
    };
    const handlePublish = async ()=>{
        if (!formData) return;
        setIsSaving(true);
        try {
            await onPublish?.(formData);
            router.push("/content");
        } catch (error_1) {
            console.error("Failed to publish:", error_1);
        } finally{
            setIsSaving(false);
        }
    };
    const handlePreview = ()=>{
        if (!formData || !post) return;
        const slug = formData.slug || post.slug;
        window.open(`/content/preview/${slug}`, "_blank");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-14 items-center justify-between px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/content",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                    orientation: "vertical",
                                    className: "h-6"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        isSaved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "size-4 text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Saved"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                            lineNumber: 109,
                                            columnNumber: 27
                                        }, this),
                                        hasUnsavedChanges && !isSaved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-muted-foreground",
                                            children: "Unsaved changes"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                            lineNumber: 113,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: handleSave,
                                    disabled: isSaving || !hasUnsavedChanges,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                            className: "mr-2 size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        isSaving ? "Saving..." : "Save Draft"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                post && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: handlePreview,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            className: "mr-2 size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this),
                                        "Preview"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                    lineNumber: 121,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handlePublish,
                                    disabled: isSaving || !formData,
                                    children: "Publish"
                                }, void 0, false, {
                                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto bg-background",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-4xl px-6 py-8",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-80 border-l bg-muted/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$post$2d$editor$2f$metadata$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetadataPanel"], {
                            post: post,
                            formData: formData,
                            onFormDataChange: (data)=>{
                                setFormData(data);
                                setHasUnsavedChanges(true);
                            },
                            onSchedule: onSchedule
                        }, void 0, false, {
                            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx",
        lineNumber: 97,
        columnNumber: 10
    }, this);
}
_s(EditorShell, "husu3Ouz8SQP/zQP0n7g6J0Lvn0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EditorShell;
var _c;
__turbopack_context__.k.register(_c, "EditorShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/lib/editor/editor-toolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorToolbar",
    ()=>EditorToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lexical@0.39.0/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$rich$2d$text$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+rich-text@0.39.0/node_modules/@lexical/rich-text/LexicalRichText.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$list$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+list@0.39.0/node_modules/@lexical/list/LexicalList.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$link$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+link@0.39.0/node_modules/@lexical/link/LexicalLink.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/bold.js [app-client] (ecmascript) <export default as Bold>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/italic.js [app-client] (ecmascript) <export default as Italic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/underline.js [app-client] (ecmascript) <export default as Underline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/list-ordered.js [app-client] (ecmascript) <export default as ListOrdered>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/quote.js [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading1$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/heading-1.js [app-client] (ecmascript) <export default as Heading1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/heading-2.js [app-client] (ecmascript) <export default as Heading2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading3$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/heading-3.js [app-client] (ecmascript) <export default as Heading3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.1/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
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
;
;
function EditorToolbar() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(98);
    if ($[0] !== "574d6141ef235b811dc9ebc21f878830b66db602e470840bb4b1bcc9ab64abc9") {
        for(let $i = 0; $i < 98; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "574d6141ef235b811dc9ebc21f878830b66db602e470840bb4b1bcc9ab64abc9";
    }
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    const [isBold, setIsBold] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [isItalic, setIsItalic] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [isUnderline, setIsUnderline] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "EditorToolbar[updateToolbar]": ()=>{
                const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                    setIsBold(selection.hasFormat("bold"));
                    setIsItalic(selection.hasFormat("italic"));
                    setIsUnderline(selection.hasFormat("underline"));
                }
            }
        })["EditorToolbar[updateToolbar]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const updateToolbar = t0;
    let t1;
    let t2;
    if ($[2] !== editor) {
        t1 = ({
            "EditorToolbar[useEffect()]": ()=>editor.registerUpdateListener({
                    "EditorToolbar[useEffect() > editor.registerUpdateListener()]": (t3)=>{
                        const { editorState } = t3;
                        editorState.read({
                            "EditorToolbar[useEffect() > editor.registerUpdateListener() > editorState.read()]": ()=>{
                                updateToolbar();
                            }
                        }["EditorToolbar[useEffect() > editor.registerUpdateListener() > editorState.read()]"]);
                    }
                }["EditorToolbar[useEffect() > editor.registerUpdateListener()]"])
        })["EditorToolbar[useEffect()]"];
        t2 = [
            editor,
            updateToolbar
        ];
        $[2] = editor;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](t1, t2);
    let t3;
    if ($[5] !== editor) {
        t3 = ({
            "EditorToolbar[formatHeading]": (headingSize)=>{
                editor.update({
                    "EditorToolbar[formatHeading > editor.update()]": ()=>{
                        const selection_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection_0)) {
                            const headingNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$rich$2d$text$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createHeadingNode"])(headingSize);
                            selection_0.insertNodes([
                                headingNode
                            ]);
                        }
                    }
                }["EditorToolbar[formatHeading > editor.update()]"]);
            }
        })["EditorToolbar[formatHeading]"];
        $[5] = editor;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const formatHeading = t3;
    let t4;
    if ($[7] !== editor) {
        t4 = ({
            "EditorToolbar[insertDivider]": ()=>{
                editor.update(_EditorToolbarInsertDividerEditorUpdate);
            }
        })["EditorToolbar[insertDivider]"];
        $[7] = editor;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const insertDivider = t4;
    const [linkDialogOpen, setLinkDialogOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [linkUrl, setLinkUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("");
    const [linkText, setLinkText] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("");
    let t5;
    if ($[9] !== editor || $[10] !== linkText || $[11] !== linkUrl) {
        t5 = ({
            "EditorToolbar[insertLink]": ()=>{
                editor.update({
                    "EditorToolbar[insertLink > editor.update()]": ()=>{
                        const selection_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection_1)) {
                            if (!selection_1.isCollapsed()) {
                                const url = linkUrl || "https://";
                                editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$link$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOGGLE_LINK_COMMAND"], url);
                            } else {
                                const linkNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$link$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createLinkNode"])(linkUrl || "https://", {
                                    target: "_blank"
                                });
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createParagraphNode"])();
                                if (linkText) {
                                    selection_1.insertNodes([
                                        linkNode
                                    ]);
                                } else {
                                    selection_1.insertNodes([
                                        linkNode
                                    ]);
                                }
                            }
                        }
                        setLinkDialogOpen(false);
                        setLinkUrl("");
                        setLinkText("");
                    }
                }["EditorToolbar[insertLink > editor.update()]"]);
            }
        })["EditorToolbar[insertLink]"];
        $[9] = editor;
        $[10] = linkText;
        $[11] = linkUrl;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    const insertLink = t5;
    let t6;
    if ($[13] !== editor) {
        t6 = ({
            "EditorToolbar[<Button>.onClick]": ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "bold")
        })["EditorToolbar[<Button>.onClick]"];
        $[13] = editor;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    const t7 = isBold ? "bg-muted" : "";
    let t8;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__["Bold"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 155,
            columnNumber: 10
        }, this);
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] !== t6 || $[17] !== t7) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t6,
            className: t7,
            children: t8
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 162,
            columnNumber: 10
        }, this);
        $[16] = t6;
        $[17] = t7;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== editor) {
        t10 = ({
            "EditorToolbar[<Button>.onClick]": ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "italic")
        })["EditorToolbar[<Button>.onClick]"];
        $[19] = editor;
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    const t11 = isItalic ? "bg-muted" : "";
    let t12;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__["Italic"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 182,
            columnNumber: 11
        }, this);
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] !== t10 || $[23] !== t11) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t10,
            className: t11,
            children: t12
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[22] = t10;
        $[23] = t11;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== editor) {
        t14 = ({
            "EditorToolbar[<Button>.onClick]": ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "underline")
        })["EditorToolbar[<Button>.onClick]"];
        $[25] = editor;
        $[26] = t14;
    } else {
        t14 = $[26];
    }
    const t15 = isUnderline ? "bg-muted" : "";
    let t16;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__["Underline"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    let t17;
    if ($[28] !== t14 || $[29] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t14,
            className: t15,
            children: t16
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 216,
            columnNumber: 11
        }, this);
        $[28] = t14;
        $[29] = t15;
        $[30] = t17;
    } else {
        t17 = $[30];
    }
    let t18;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-1 h-6 w-px bg-border"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 225,
            columnNumber: 11
        }, this);
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] !== formatHeading) {
        t19 = ({
            "EditorToolbar[<Button>.onClick]": ()=>formatHeading("h1")
        })["EditorToolbar[<Button>.onClick]"];
        $[32] = formatHeading;
        $[33] = t19;
    } else {
        t19 = $[33];
    }
    let t20;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading1$3e$__["Heading1"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 242,
            columnNumber: 11
        }, this);
        $[34] = t20;
    } else {
        t20 = $[34];
    }
    let t21;
    if ($[35] !== t19) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t19,
            title: "Heading 1",
            children: t20
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 249,
            columnNumber: 11
        }, this);
        $[35] = t19;
        $[36] = t21;
    } else {
        t21 = $[36];
    }
    let t22;
    if ($[37] !== formatHeading) {
        t22 = ({
            "EditorToolbar[<Button>.onClick]": ()=>formatHeading("h2")
        })["EditorToolbar[<Button>.onClick]"];
        $[37] = formatHeading;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading2$3e$__["Heading2"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[39] = t23;
    } else {
        t23 = $[39];
    }
    let t24;
    if ($[40] !== t22) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t22,
            title: "Heading 2",
            children: t23
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 274,
            columnNumber: 11
        }, this);
        $[40] = t22;
        $[41] = t24;
    } else {
        t24 = $[41];
    }
    let t25;
    if ($[42] !== formatHeading) {
        t25 = ({
            "EditorToolbar[<Button>.onClick]": ()=>formatHeading("h3")
        })["EditorToolbar[<Button>.onClick]"];
        $[42] = formatHeading;
        $[43] = t25;
    } else {
        t25 = $[43];
    }
    let t26;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading3$3e$__["Heading3"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[44] = t26;
    } else {
        t26 = $[44];
    }
    let t27;
    if ($[45] !== t25) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t25,
            title: "Heading 3",
            children: t26
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[45] = t25;
        $[46] = t27;
    } else {
        t27 = $[46];
    }
    let t28;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-1 h-6 w-px bg-border"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 307,
            columnNumber: 11
        }, this);
        $[47] = t28;
    } else {
        t28 = $[47];
    }
    let t29;
    if ($[48] !== editor) {
        t29 = ({
            "EditorToolbar[<Button>.onClick]": ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$list$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSERT_UNORDERED_LIST_COMMAND"], undefined)
        })["EditorToolbar[<Button>.onClick]"];
        $[48] = editor;
        $[49] = t29;
    } else {
        t29 = $[49];
    }
    let t30;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 324,
            columnNumber: 11
        }, this);
        $[50] = t30;
    } else {
        t30 = $[50];
    }
    let t31;
    if ($[51] !== t29) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t29,
            title: "Bullet List",
            children: t30
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 331,
            columnNumber: 11
        }, this);
        $[51] = t29;
        $[52] = t31;
    } else {
        t31 = $[52];
    }
    let t32;
    if ($[53] !== editor) {
        t32 = ({
            "EditorToolbar[<Button>.onClick]": ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$list$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSERT_ORDERED_LIST_COMMAND"], undefined)
        })["EditorToolbar[<Button>.onClick]"];
        $[53] = editor;
        $[54] = t32;
    } else {
        t32 = $[54];
    }
    let t33;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__["ListOrdered"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 349,
            columnNumber: 11
        }, this);
        $[55] = t33;
    } else {
        t33 = $[55];
    }
    let t34;
    if ($[56] !== t32) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t32,
            title: "Numbered List",
            children: t33
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 356,
            columnNumber: 11
        }, this);
        $[56] = t32;
        $[57] = t34;
    } else {
        t34 = $[57];
    }
    let t35;
    if ($[58] !== editor) {
        t35 = ({
            "EditorToolbar[<Button>.onClick]": ()=>{
                editor.update(_EditorToolbarButtonOnClickEditorUpdate);
            }
        })["EditorToolbar[<Button>.onClick]"];
        $[58] = editor;
        $[59] = t35;
    } else {
        t35 = $[59];
    }
    let t36;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 376,
            columnNumber: 11
        }, this);
        $[60] = t36;
    } else {
        t36 = $[60];
    }
    let t37;
    if ($[61] !== t35) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: t35,
            title: "Quote",
            children: t36
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 383,
            columnNumber: 11
        }, this);
        $[61] = t35;
        $[62] = t37;
    } else {
        t37 = $[62];
    }
    let t38;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-1 h-6 w-px bg-border"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 391,
            columnNumber: 11
        }, this);
        $[63] = t38;
    } else {
        t38 = $[63];
    }
    let t39;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                size: "icon",
                title: "Insert Link",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
                    lineNumber: 398,
                    columnNumber: 97
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
                lineNumber: 398,
                columnNumber: 41
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 398,
            columnNumber: 11
        }, this);
        $[64] = t39;
    } else {
        t39 = $[64];
    }
    let t40;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                children: "Insert Link"
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
                lineNumber: 405,
                columnNumber: 25
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 405,
            columnNumber: 11
        }, this);
        $[65] = t40;
    } else {
        t40 = $[65];
    }
    let t41;
    if ($[66] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "link-url",
            children: "URL"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 412,
            columnNumber: 11
        }, this);
        $[66] = t41;
    } else {
        t41 = $[66];
    }
    let t42;
    if ($[67] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = ({
            "EditorToolbar[<Input>.onChange]": (e)=>setLinkUrl(e.target.value)
        })["EditorToolbar[<Input>.onChange]"];
        $[67] = t42;
    } else {
        t42 = $[67];
    }
    let t43;
    if ($[68] !== linkUrl) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t41,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    id: "link-url",
                    type: "url",
                    placeholder: "https://example.com",
                    value: linkUrl,
                    onChange: t42
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
                    lineNumber: 428,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 428,
            columnNumber: 11
        }, this);
        $[68] = linkUrl;
        $[69] = t43;
    } else {
        t43 = $[69];
    }
    let t44;
    if ($[70] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "link-text",
            children: "Link Text (optional)"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 436,
            columnNumber: 11
        }, this);
        $[70] = t44;
    } else {
        t44 = $[70];
    }
    let t45;
    if ($[71] === Symbol.for("react.memo_cache_sentinel")) {
        t45 = ({
            "EditorToolbar[<Input>.onChange]": (e_0)=>setLinkText(e_0.target.value)
        })["EditorToolbar[<Input>.onChange]"];
        $[71] = t45;
    } else {
        t45 = $[71];
    }
    let t46;
    if ($[72] !== linkText) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t44,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    id: "link-text",
                    placeholder: "Link text",
                    value: linkText,
                    onChange: t45
                }, void 0, false, {
                    fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
                    lineNumber: 452,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 452,
            columnNumber: 11
        }, this);
        $[72] = linkText;
        $[73] = t46;
    } else {
        t46 = $[73];
    }
    let t47;
    if ($[74] !== insertLink) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            onClick: insertLink,
            className: "w-full",
            children: "Insert Link"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 460,
            columnNumber: 11
        }, this);
        $[74] = insertLink;
        $[75] = t47;
    } else {
        t47 = $[75];
    }
    let t48;
    if ($[76] !== t43 || $[77] !== t46 || $[78] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            children: [
                t40,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 py-4",
                    children: [
                        t43,
                        t46,
                        t47
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
                    lineNumber: 468,
                    columnNumber: 31
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 468,
            columnNumber: 11
        }, this);
        $[76] = t43;
        $[77] = t46;
        $[78] = t47;
        $[79] = t48;
    } else {
        t48 = $[79];
    }
    let t49;
    if ($[80] !== linkDialogOpen || $[81] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
            open: linkDialogOpen,
            onOpenChange: setLinkDialogOpen,
            children: [
                t39,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 478,
            columnNumber: 11
        }, this);
        $[80] = linkDialogOpen;
        $[81] = t48;
        $[82] = t49;
    } else {
        t49 = $[82];
    }
    let t50;
    if ($[83] === Symbol.for("react.memo_cache_sentinel")) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 487,
            columnNumber: 11
        }, this);
        $[83] = t50;
    } else {
        t50 = $[83];
    }
    let t51;
    if ($[84] !== insertDivider) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            onClick: insertDivider,
            title: "Divider",
            children: t50
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 494,
            columnNumber: 11
        }, this);
        $[84] = insertDivider;
        $[85] = t51;
    } else {
        t51 = $[85];
    }
    let t52;
    if ($[86] !== t13 || $[87] !== t17 || $[88] !== t21 || $[89] !== t24 || $[90] !== t27 || $[91] !== t31 || $[92] !== t34 || $[93] !== t37 || $[94] !== t49 || $[95] !== t51 || $[96] !== t9) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 border-b p-2",
            children: [
                t9,
                t13,
                t17,
                t18,
                t21,
                t24,
                t27,
                t28,
                t31,
                t34,
                t37,
                t38,
                t49,
                t51
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/lib/editor/editor-toolbar.tsx",
            lineNumber: 502,
            columnNumber: 11
        }, this);
        $[86] = t13;
        $[87] = t17;
        $[88] = t21;
        $[89] = t24;
        $[90] = t27;
        $[91] = t31;
        $[92] = t34;
        $[93] = t37;
        $[94] = t49;
        $[95] = t51;
        $[96] = t9;
        $[97] = t52;
    } else {
        t52 = $[97];
    }
    return t52;
}
_s(EditorToolbar, "SEmiZN00rGB1k/lW6kQS/J/ri+M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c = EditorToolbar;
function _EditorToolbarButtonOnClickEditorUpdate() {
    const selection_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection_2)) {
        const quoteNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$rich$2d$text$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createQuoteNode"])();
        selection_2.insertNodes([
            quoteNode
        ]);
    }
}
function _EditorToolbarInsertDividerEditorUpdate() {
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getRoot"])();
    const paragraph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createParagraphNode"])();
    root.append(paragraph);
    const divider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lexical$40$0$2e$39$2e$0$2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createParagraphNode"])();
    divider.setFormat("center");
    root.append(divider);
}
var _c;
__turbopack_context__.k.register(_c, "EditorToolbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/lib/editor/lexical-editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LexicalEditor",
    ()=>LexicalEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposer$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalComposer.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalRichTextPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalRichTextPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalContentEditable$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalContentEditable.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalHistoryPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalHistoryPlugin.dev.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalLinkPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalLinkPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalListPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalListPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+react@0.39.0_react-dom@19.2.1_react@19.2.1__react@19.2.1_yjs@13.6.27/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$rich$2d$text$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+rich-text@0.39.0/node_modules/@lexical/rich-text/LexicalRichText.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$list$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+list@0.39.0/node_modules/@lexical/list/LexicalList.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$link$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lexical+link@0.39.0/node_modules/@lexical/link/LexicalLink.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$editor$2f$editor$2d$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/lib/editor/editor-toolbar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
const theme = {
    paragraph: "mb-2",
    heading: {
        h1: "text-4xl font-bold mb-4",
        h2: "text-3xl font-bold mb-3",
        h3: "text-2xl font-bold mb-2"
    },
    quote: "border-l-4 border-gray-300 pl-4 italic my-4",
    list: {
        nested: {
            listitem: "ml-4"
        },
        ol: "list-decimal ml-6 my-2",
        ul: "list-disc ml-6 my-2",
        listitem: "my-1"
    },
    link: "text-blue-600 underline hover:text-blue-800",
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline"
    }
};
const initialConfig = {
    namespace: "ProsFinEditor",
    theme,
    nodes: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$rich$2d$text$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingNode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$rich$2d$text$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuoteNode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$list$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListNode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$list$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListItemNode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$link$40$0$2e$39$2e$0$2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkNode"]
    ],
    onError: (error)=>{
        console.error("Lexical error:", error);
    }
};
function EditorContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27";
    }
    const { placeholder } = t0;
    const placeholderText = placeholder || "Start writing...";
    let t1;
    if ($[1] !== placeholderText) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0 left-0 text-muted-foreground pointer-events-none",
            children: placeholderText
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[1] = placeholderText;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== placeholderText || $[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalContentEditable$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContentEditable"], {
            className: "min-h-[600px] outline-none prose prose-lg max-w-none",
            "aria-placeholder": placeholderText,
            placeholder: t1
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 87,
            columnNumber: 10
        }, this);
        $[3] = placeholderText;
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_c = EditorContent;
function OnChange(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27";
    }
    const { onChange } = t0;
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    let t1;
    let t2;
    if ($[1] !== editor || $[2] !== onChange) {
        t1 = ({
            "OnChange[useEffect()]": ()=>editor.registerUpdateListener({
                    "OnChange[useEffect() > editor.registerUpdateListener()]": (t3)=>{
                        const { editorState } = t3;
                        editorState.read({
                            "OnChange[useEffect() > editor.registerUpdateListener() > editorState.read()]": ()=>{
                                const json = editorState.toJSON();
                                onChange?.(json);
                            }
                        }["OnChange[useEffect() > editor.registerUpdateListener() > editorState.read()]"]);
                    }
                }["OnChange[useEffect() > editor.registerUpdateListener()]"])
        })["OnChange[useEffect()]"];
        t2 = [
            editor,
            onChange
        ];
        $[1] = editor;
        $[2] = onChange;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](t1, t2);
    return null;
}
_s(OnChange, "mCqe7sh4aC9mLBXPHfG3d/PNTaQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c1 = OnChange;
function InitialContentPlugin(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27";
    }
    const { initialContent } = t0;
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    const [hasSetInitial, setHasSetInitial] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    let t1;
    let t2;
    if ($[1] !== editor || $[2] !== hasSetInitial || $[3] !== initialContent) {
        t1 = ({
            "InitialContentPlugin[useEffect()]": ()=>{
                if (initialContent && !hasSetInitial && editor) {
                    ;
                    try {
                        const editorState = editor.parseEditorState(initialContent);
                        editor.setEditorState(editorState);
                        setHasSetInitial(true);
                    } catch (t3) {
                        const error = t3;
                        console.error("Failed to parse initial content:", error);
                    }
                }
            }
        })["InitialContentPlugin[useEffect()]"];
        t2 = [
            editor,
            initialContent,
            hasSetInitial
        ];
        $[1] = editor;
        $[2] = hasSetInitial;
        $[3] = initialContent;
        $[4] = t1;
        $[5] = t2;
    } else {
        t1 = $[4];
        t2 = $[5];
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](t1, t2);
    return null;
}
_s1(InitialContentPlugin, "5yHa/O/s25x/jAqxwK3YDeXQRxs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c2 = InitialContentPlugin;
function LexicalEditor(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "53767695509c700bdb6e156582878a94b235358efeec7c7ed5a353dfe5034b27";
    }
    const { initialContent, onChange, placeholder: t1, className } = t0;
    const placeholder = t1 === undefined ? "Start writing..." : t1;
    const t2 = `flex flex-col border rounded-lg ${className}`;
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$editor$2f$editor$2d$toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorToolbar"], {}, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 200,
            columnNumber: 10
        }, this);
        $[1] = t3;
    } else {
        t3 = $[1];
    }
    let t4;
    if ($[2] !== placeholder) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalRichTextPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextPlugin"], {
            contentEditable: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditorContent, {
                placeholder: placeholder
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
                lineNumber: 207,
                columnNumber: 43
            }, void 0),
            placeholder: null,
            ErrorBoundary: _LexicalEditorRichTextPluginErrorBoundary
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 207,
            columnNumber: 10
        }, this);
        $[2] = placeholder;
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    let t5;
    let t6;
    let t7;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalHistoryPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HistoryPlugin"], {}, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 217,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalLinkPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkPlugin"], {}, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 218,
            columnNumber: 10
        }, this);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalListPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListPlugin"], {}, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 219,
            columnNumber: 10
        }, this);
        $[4] = t5;
        $[5] = t6;
        $[6] = t7;
    } else {
        t5 = $[4];
        t6 = $[5];
        t7 = $[6];
    }
    let t8;
    if ($[7] !== onChange) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OnChange, {
            onChange: onChange
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 230,
            columnNumber: 10
        }, this);
        $[7] = onChange;
        $[8] = t8;
    } else {
        t8 = $[8];
    }
    let t9;
    if ($[9] !== initialContent) {
        t9 = initialContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialContentPlugin, {
            initialContent: initialContent
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 238,
            columnNumber: 28
        }, this);
        $[9] = initialContent;
        $[10] = t9;
    } else {
        t9 = $[10];
    }
    let t10;
    if ($[11] !== t4 || $[12] !== t8 || $[13] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: [
                t4,
                t5,
                t6,
                t7,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 246,
            columnNumber: 11
        }, this);
        $[11] = t4;
        $[12] = t8;
        $[13] = t9;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] !== t10 || $[16] !== t2) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lexical$2b$react$40$0$2e$39$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1_yjs$40$13$2e$6$2e$27$2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposer$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LexicalComposer"], {
            initialConfig: initialConfig,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t2,
                children: [
                    t3,
                    t10
                ]
            }, void 0, true, {
                fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
                lineNumber: 256,
                columnNumber: 58
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/lib/editor/lexical-editor.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[15] = t10;
        $[16] = t2;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    return t11;
}
_c3 = LexicalEditor;
function _LexicalEditorRichTextPluginErrorBoundary(t0) {
    const { children } = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "EditorContent");
__turbopack_context__.k.register(_c1, "OnChange");
__turbopack_context__.k.register(_c2, "InitialContentPlugin");
__turbopack_context__.k.register(_c3, "LexicalEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/admin/src/components/content/post-editor/editor-canvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorCanvas",
    ()=>EditorCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$editor$2f$lexical$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/lib/editor/lexical-editor.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function EditorCanvas(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "2480c2c929154e47f7cc6d831b7cd54e8e4cc020b5c84c71d7d908dea49a411d") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2480c2c929154e47f7cc6d831b7cd54e8e4cc020b5c84c71d7d908dea49a411d";
    }
    const { content, onChange } = t0;
    let t1;
    if ($[1] !== content || $[2] !== onChange) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$editor$2f$lexical$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LexicalEditor"], {
                initialContent: content,
                onChange: onChange,
                placeholder: "Start writing your post...",
                className: "min-h-[600px]"
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/components/content/post-editor/editor-canvas.tsx",
                lineNumber: 29,
                columnNumber: 37
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/components/content/post-editor/editor-canvas.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        $[1] = content;
        $[2] = onChange;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
}
_c = EditorCanvas;
var _c;
__turbopack_context__.k.register(_c, "EditorCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/apps/admin/src/app/(app)/content/[slug]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_babel-plugin-react-compiler@1.0.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$post$2d$editor$2f$editor$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/components/content/post-editor/editor-shell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$post$2d$editor$2f$editor$2d$canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/components/content/post-editor/editor-canvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/admin/src/lib/data/posts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function EditorPage({ params }) {
    _s();
    const { slug } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const [post, setPost] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const [formData, setFormData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EditorPage.useEffect": ()=>{
            if (slug === "new") {
                setIsLoading(false);
                setFormData({
                    title: "",
                    slug: "",
                    bucket: "insights",
                    excerpt: "",
                    cover: "",
                    tags: [],
                    content: {
                        root: {
                            children: [],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "root",
                            version: 1
                        }
                    },
                    status: "draft"
                });
                return;
            }
            // Find post by slug (we need to search all buckets)
            const loadPost = {
                "EditorPage.useEffect.loadPost": async ()=>{
                    try {
                        const { listPosts } = await __turbopack_context__.A("[project]/apps/admin/src/lib/data/posts.ts [app-client] (ecmascript, async loader)");
                        const allPosts = await listPosts();
                        const found = allPosts.find({
                            "EditorPage.useEffect.loadPost.found": (p)=>p.slug === slug
                        }["EditorPage.useEffect.loadPost.found"]);
                        if (found) {
                            const { getPostById } = await __turbopack_context__.A("[project]/apps/admin/src/lib/data/posts.ts [app-client] (ecmascript, async loader)");
                            const fullPost = await getPostById(found.id);
                            setPost(fullPost);
                            if (fullPost) {
                                setFormData({
                                    title: fullPost.title,
                                    slug: fullPost.slug,
                                    bucket: fullPost.bucket,
                                    excerpt: fullPost.excerpt,
                                    cover: fullPost.cover,
                                    tags: fullPost.tags,
                                    content: fullPost.content,
                                    seoTitle: fullPost.seoTitle,
                                    seoDescription: fullPost.seoDescription,
                                    canonical: fullPost.canonical,
                                    noindex: fullPost.noindex,
                                    status: fullPost.status,
                                    scheduledFor: fullPost.scheduledFor
                                });
                            }
                        }
                    } catch (error) {
                        console.error("Failed to load post:", error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["EditorPage.useEffect.loadPost"];
            loadPost();
        }
    }["EditorPage.useEffect"], [
        slug
    ]);
    const handleSave = async (data)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveDraft"])(data, post?.id);
        if (post) {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPostById"])(post.id);
            setPost(updated);
        }
    };
    const handlePublish = async (data_0)=>{
        if (post) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publish"])(post.id);
        } else {
            const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveDraft"])(data_0);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$lib$2f$data$2f$posts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publish"])(saved.id);
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/app/(app)/content/[slug]/page.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/content/[slug]/page.tsx",
            lineNumber: 104,
            columnNumber: 12
        }, this);
    }
    if (!formData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "Post not found"
            }, void 0, false, {
                fileName: "[project]/apps/admin/src/app/(app)/content/[slug]/page.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/content/[slug]/page.tsx",
            lineNumber: 109,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$post$2d$editor$2f$editor$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorShell"], {
        post: post || undefined,
        onSave: handleSave,
        onPublish: handlePublish,
        formData: formData,
        onFormDataChange: setFormData,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$28$2e$5_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$admin$2f$src$2f$components$2f$content$2f$post$2d$editor$2f$editor$2d$canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorCanvas"], {
            content: formData.content,
            onChange: (content)=>{
                setFormData({
                    ...formData,
                    content
                });
            }
        }, void 0, false, {
            fileName: "[project]/apps/admin/src/app/(app)/content/[slug]/page.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/admin/src/app/(app)/content/[slug]/page.tsx",
        lineNumber: 113,
        columnNumber: 10
    }, this);
}
_s(EditorPage, "EALErGC5vDfQFBVt+tmQpj0iJdo=");
_c = EditorPage;
var _c;
__turbopack_context__.k.register(_c, "EditorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_admin_src_9b51541a._.js.map