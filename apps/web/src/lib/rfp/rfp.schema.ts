/**
 * RFP Form Schema
 * 
 * Zod schema for Request Proposal form validation.
 */

import * as z from "zod";
import { RFP_SERVICES } from "@/content/rfp.options";

// File upload validation
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
];

const ALLOWED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx", ".xlsx", ".png", ".jpg"];

/**
 * File validation schema (for client-side)
 */
export const rfpFileSchema = z
  .instanceof(File, { message: "Vui lòng chọn file" })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`
  )
  .refine(
    (file) => {
      const extension = "." + file.name.split(".").pop()?.toLowerCase();
      return ALLOWED_FILE_EXTENSIONS.includes(extension);
    },
    `Chỉ chấp nhận file: ${ALLOWED_FILE_EXTENSIONS.join(", ")}`
  )
  .optional();

/**
 * RFP Form Schema
 */
export const rfpFormSchema = z.object({
  // Service selection (required)
  service: z
    .string({
      message: "Vui lòng chọn dịch vụ",
    })
    .min(1, "Vui lòng chọn dịch vụ")
    .refine(
      (val) => RFP_SERVICES.some((s) => s.value === val),
      "Dịch vụ không hợp lệ"
    ),

  // Contact information (required)
  title: z.string().min(1, "Vui lòng chọn danh xưng"),
  firstName: z.string().min(1, "Vui lòng nhập tên").min(2, "Tên cần ít nhất 2 ký tự"),
  lastName: z.string().min(1, "Vui lòng nhập họ").min(2, "Họ cần ít nhất 2 ký tự"),
  jobTitle: z.string().optional(),
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email("Email không đúng định dạng"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, "Số điện thoại không hợp lệ")
    .optional()
    .or(z.literal("")),

  // Company information (required selective)
  companyLocation: z.string().min(1, "Vui lòng chọn địa điểm doanh nghiệp"),
  industry: z.string().min(1, "Vui lòng chọn ngành nghề"),
  companyName: z.string().optional(),
  yearlyRevenue: z.string().optional(),

  // Documents & requirements (required partial)
  attachment: rfpFileSchema,
  comments: z
    .string()
    .min(1, "Vui lòng nhập nội dung yêu cầu")
    .min(30, "Nội dung yêu cầu cần ít nhất 30 ký tự"),

  // Terms & privacy (required)
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Bạn cần đồng ý với điều khoản sử dụng"),

  // Hidden fields (tracking)
  honeypot: z.string().optional(), // Anti-spam
});

export type RfpFormValues = z.infer<typeof rfpFormSchema>;

/**
 * Server-side validation schema (for API route)
 * More lenient for file (can be File or string path)
 */
export const rfpSubmissionSchema = rfpFormSchema.extend({
  attachment: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`
    )
    .refine(
      (file) => {
        const mimeType = file.type;
        return ALLOWED_FILE_TYPES.includes(mimeType);
      },
      `Chỉ chấp nhận file: ${ALLOWED_FILE_EXTENSIONS.join(", ")}`
    )
    .optional(),
});

export type RfpSubmission = z.infer<typeof rfpSubmissionSchema>;

/**
 * File validation constants (export for use in components)
 */
export const RFP_FILE_CONSTRAINTS = {
  maxSize: MAX_FILE_SIZE,
  maxSizeMB: MAX_FILE_SIZE / 1024 / 1024,
  allowedTypes: ALLOWED_FILE_TYPES,
  allowedExtensions: ALLOWED_FILE_EXTENSIONS,
} as const;

