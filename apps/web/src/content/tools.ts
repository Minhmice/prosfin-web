/**
 * Tools Registry
 * 
 * Single source of truth for all finance tools.
 * Each tool definition includes inputs schema, compute function, and metadata.
 */

import { z } from "zod";
import type { ToolDefinition } from "@/types/tools";
import { computeCashflowRunway } from "@/lib/tools/compute/cashflow-runway";
import { computeProfitLevers } from "@/lib/tools/compute/profit-levers";
import { computeBreakEven } from "@/lib/tools/compute/break-even";
import { computeWorkingCapital } from "@/lib/tools/compute/working-capital";
import { computeTaxReadiness } from "@/lib/tools/compute/tax-readiness";
import { computeFinanceHealthCheck } from "@/lib/tools/compute/finance-health-check";

/**
 * Cashflow Runway Tool
 */
const cashflowRunwayTool: ToolDefinition = {
  slug: "cashflow-runway",
  title: "Cash Runway Calculator",
  description:
    "Tính toán thời gian còn lại trước khi hết tiền mặt (runway) và tốc độ đốt tiền (burn rate) của doanh nghiệp.",
  shortDescription: "Tính toán thời gian còn lại trước khi hết tiền mặt",
  category: "calculator",
  icon: "💰",
  inputs: {
    schema: z.object({
      currentCash: z.number().min(0, "Số tiền hiện tại phải >= 0"),
      monthlyRevenue: z.number().min(0, "Doanh thu hàng tháng phải >= 0"),
      monthlyCogs: z.number().min(0, "Giá vốn hàng tháng phải >= 0"),
      monthlyOpex: z.number().min(0, "Chi phí hoạt động hàng tháng phải >= 0"),
    }),
    fields: [
      {
        name: "currentCash",
        label: "Số tiền mặt hiện tại (VND)",
        type: "number",
        placeholder: "100000000",
        helpText: "Tổng số tiền mặt và tương đương tiền hiện có",
        required: true,
        min: 0,
      },
      {
        name: "monthlyRevenue",
        label: "Doanh thu hàng tháng (VND)",
        type: "number",
        placeholder: "50000000",
        helpText: "Doanh thu trung bình mỗi tháng",
        required: true,
        min: 0,
      },
      {
        name: "monthlyCogs",
        label: "Giá vốn hàng tháng (VND)",
        type: "number",
        placeholder: "30000000",
        helpText: "Chi phí trực tiếp để tạo ra doanh thu",
        required: true,
        min: 0,
      },
      {
        name: "monthlyOpex",
        label: "Chi phí hoạt động hàng tháng (VND)",
        type: "number",
        placeholder: "20000000",
        helpText: "Chi phí vận hành (lương, thuê văn phòng, marketing, etc.)",
        required: true,
        min: 0,
      },
    ],
    presets: [
      {
        name: "sme-retail",
        label: "SME Retail (Mẫu)",
        values: {
          currentCash: 200000000,
          monthlyRevenue: 100000000,
          monthlyCogs: 60000000,
          monthlyOpex: 30000000,
        },
      },
      {
        name: "sme-service",
        label: "SME Service (Mẫu)",
        values: {
          currentCash: 150000000,
          monthlyRevenue: 80000000,
          monthlyCogs: 20000000,
          monthlyOpex: 40000000,
        },
      },
    ],
  },
  compute: computeCashflowRunway,
  seo: {
    title: "Cash Runway Calculator | ProsFIN",
    description:
      "Tính toán thời gian còn lại trước khi hết tiền mặt và tốc độ đốt tiền của doanh nghiệp.",
    keywords: ["cash runway", "burn rate", "dòng tiền", "tài chính doanh nghiệp"],
  },
};

/**
 * Profit Levers Tool
 */
const profitLeversTool: ToolDefinition = {
  slug: "profit-levers",
  title: "Profit Levers Analysis",
  description:
    "Phân tích biên lợi nhuận (Gross/Net) và độ nhạy cảm với thay đổi giá bán, giá vốn, và chi phí.",
  shortDescription: "Phân tích biên lợi nhuận và độ nhạy cảm",
  category: "analysis",
  icon: "📈",
  inputs: {
    schema: z.object({
      revenue: z.number().min(0),
      cogs: z.number().min(0),
      opex: z.number().min(0),
    }),
    fields: [
      {
        name: "revenue",
        label: "Doanh thu (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "cogs",
        label: "Giá vốn (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "opex",
        label: "Chi phí hoạt động (VND)",
        type: "number",
        required: true,
        min: 0,
      },
    ],
  },
  compute: computeProfitLevers,
  seo: {
    title: "Profit Levers Analysis | ProsFIN",
    description: "Phân tích biên lợi nhuận và độ nhạy cảm với thay đổi giá bán, giá vốn, và chi phí.",
    keywords: ["profit margin", "gross margin", "net margin", "lợi nhuận"],
  },
};

/**
 * Break Even Tool
 */
const breakEvenTool: ToolDefinition = {
  slug: "break-even",
  title: "Break Even Calculator",
  description: "Tính toán điểm hòa vốn và contribution margin của doanh nghiệp.",
  shortDescription: "Tính toán điểm hòa vốn",
  category: "calculator",
  icon: "⚖️",
  inputs: {
    schema: z.object({
      fixedCosts: z.number().min(0),
      variableCostPerUnit: z.number().min(0),
      pricePerUnit: z.number().min(0),
    }),
    fields: [
      {
        name: "fixedCosts",
        label: "Chi phí cố định (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "variableCostPerUnit",
        label: "Chi phí biến đổi mỗi đơn vị (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "pricePerUnit",
        label: "Giá bán mỗi đơn vị (VND)",
        type: "number",
        required: true,
        min: 0,
      },
    ],
  },
  compute: computeBreakEven,
  seo: {
    title: "Break Even Calculator | ProsFIN",
    description: "Tính toán điểm hòa vốn và contribution margin của doanh nghiệp.",
    keywords: ["break even", "điểm hòa vốn", "contribution margin"],
  },
};

/**
 * Working Capital Tool
 */
const workingCapitalTool: ToolDefinition = {
  slug: "working-capital",
  title: "Working Capital & CCC Calculator",
  description:
    "Tính toán vốn lưu động và Cash Conversion Cycle (Days inventory/receivable/payable).",
  shortDescription: "Tính toán vốn lưu động và Cash Conversion Cycle",
  category: "calculator",
  icon: "🔄",
  inputs: {
    schema: z.object({
      inventory: z.number().min(0),
      receivables: z.number().min(0),
      payables: z.number().min(0),
      revenue: z.number().min(0),
      cogs: z.number().min(0),
    }),
    fields: [
      {
        name: "inventory",
        label: "Hàng tồn kho (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "receivables",
        label: "Phải thu (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "payables",
        label: "Phải trả (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "revenue",
        label: "Doanh thu (VND)",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "cogs",
        label: "Giá vốn (VND)",
        type: "number",
        required: true,
        min: 0,
      },
    ],
  },
  compute: computeWorkingCapital,
  seo: {
    title: "Working Capital Calculator | ProsFIN",
    description: "Tính toán vốn lưu động và Cash Conversion Cycle (Days inventory/receivable/payable).",
    keywords: ["working capital", "vốn lưu động", "CCC", "cash conversion cycle"],
  },
};

/**
 * Tax Readiness Tool
 */
const taxReadinessTool: ToolDefinition = {
  slug: "tax-readiness",
  title: "Tax Readiness Assessment",
  description: "Đánh giá mức độ sẵn sàng tuân thủ thuế và quản lý thuế của doanh nghiệp.",
  shortDescription: "Đánh giá mức độ sẵn sàng tuân thủ thuế",
  category: "assessment",
  icon: "🧾",
  inputs: {
    schema: z.object({
      hasAccountant: z.boolean(),
      hasTaxSoftware: z.boolean(),
      monthlyBookkeeping: z.boolean(),
      quarterlyReports: z.boolean(),
      taxDeductions: z.boolean(),
      complianceTraining: z.boolean(),
    }),
    fields: [
      {
        name: "hasAccountant",
        label: "Có kế toán chuyên nghiệp",
        type: "checkbox",
      },
      {
        name: "hasTaxSoftware",
        label: "Sử dụng phần mềm kế toán/thuế",
        type: "checkbox",
      },
      {
        name: "monthlyBookkeeping",
        label: "Ghi sổ sách hàng tháng đều đặn",
        type: "checkbox",
      },
      {
        name: "quarterlyReports",
        label: "Có báo cáo tài chính theo quý",
        type: "checkbox",
      },
      {
        name: "taxDeductions",
        label: "Hiểu và tận dụng các khoản giảm trừ thuế",
        type: "checkbox",
      },
      {
        name: "complianceTraining",
        label: "Đội ngũ được đào tạo về tuân thủ thuế",
        type: "checkbox",
      },
    ],
  },
  compute: computeTaxReadiness,
  seo: {
    title: "Tax Readiness Assessment | ProsFIN",
    description: "Đánh giá mức độ sẵn sàng tuân thủ thuế và quản lý thuế của doanh nghiệp.",
    keywords: ["tax readiness", "tuân thủ thuế", "quản lý thuế"],
  },
};

/**
 * Finance Health Check Tool
 */
const financeHealthCheckTool: ToolDefinition = {
  slug: "finance-health-check",
  title: "Financial Health Score",
  description: "Đánh giá sức khỏe tài chính tổng thể của doanh nghiệp theo persona.",
  shortDescription: "Đánh giá sức khỏe tài chính tổng thể",
  category: "assessment",
  icon: "🏥",
  inputs: {
    schema: z.object({
      persona: z.enum(["owner", "cfo", "finance_team"]),
      cashflowStable: z.boolean(),
      hasForecast: z.boolean(),
      hasControls: z.boolean(),
      hasReporting: z.boolean(),
      hasCompliance: z.boolean(),
    }),
    fields: [
      {
        name: "persona",
        label: "Bạn là",
        type: "select",
        options: [
          { value: "owner", label: "Chủ doanh nghiệp" },
          { value: "cfo", label: "CFO" },
          { value: "finance_team", label: "Đội ngũ tài chính" },
        ],
        required: true,
      },
      {
        name: "cashflowStable",
        label: "Dòng tiền ổn định và dự đoán được",
        type: "checkbox",
      },
      {
        name: "hasForecast",
        label: "Có dự báo tài chính",
        type: "checkbox",
      },
      {
        name: "hasControls",
        label: "Có hệ thống kiểm soát nội bộ",
        type: "checkbox",
      },
      {
        name: "hasReporting",
        label: "Có báo cáo tài chính đầy đủ",
        type: "checkbox",
      },
      {
        name: "hasCompliance",
        label: "Tuân thủ đầy đủ quy định",
        type: "checkbox",
      },
    ],
  },
  compute: computeFinanceHealthCheck,
  seo: {
    title: "Financial Health Score | ProsFIN",
    description: "Đánh giá sức khỏe tài chính tổng thể của doanh nghiệp theo persona.",
    keywords: ["financial health", "sức khỏe tài chính", "đánh giá tài chính"],
  },
};

/**
 * All Tools Registry
 */
export const TOOLS: ToolDefinition[] = [
  cashflowRunwayTool,
  profitLeversTool,
  breakEvenTool,
  workingCapitalTool,
  taxReadinessTool,
  financeHealthCheckTool,
];

