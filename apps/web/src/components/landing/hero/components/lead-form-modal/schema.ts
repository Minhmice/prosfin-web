import * as z from "zod";
import { formContent } from "@/data/form-content";

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(
      2,
      formContent.leadForm.fields.fullName.errorMessages.minLength ||
        "Họ tên cần ít nhất 2 ký tự"
    ),
  email: z
    .string()
    .min(
      1,
      formContent.leadForm.fields.email.errorMessages.required ||
        "Vui lòng nhập email"
    )
    .email(
      formContent.leadForm.fields.email.errorMessages.invalid ||
        "Email không đúng định dạng"
    ),
  phone: z
    .string()
    .min(
      10,
      formContent.leadForm.fields.phone.errorMessages.minLength ||
        "Số điện thoại cần ít nhất 10 số"
    )
    .regex(
      /^[0-9+\-\s()]+$/,
      formContent.leadForm.fields.phone.errorMessages.pattern ||
        "Số điện thoại không hợp lệ"
    ),
  companyName: z.string().optional(),
  concern: z.string().min(
    1,
    formContent.leadForm.fields.concern.errorMessages.required ||
      "Vui lòng chọn vấn đề bạn quan tâm"
  ),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const CONCERN_OPTIONS = [
  { value: "cash-flow", label: "Dòng tiền" },
  { value: "profit", label: "Lợi nhuận" },
  { value: "tax", label: "Thuế & kiểm soát" },
  { value: "other", label: "Khác" },
] as const;


