import * as z from "zod";
import { formContent } from "@/data/form-content";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(
      2,
      formContent.contactForm.fields.fullName.errorMessages.minLength ||
        "Họ tên cần ít nhất 2 ký tự"
    ),
  email: z
    .string()
    .min(
      1,
      formContent.contactForm.fields.email.errorMessages.required ||
        "Vui lòng nhập email"
    )
    .email(
      formContent.contactForm.fields.email.errorMessages.invalid ||
        "Email không đúng định dạng"
    ),
  phone: z
    .string()
    .min(
      10,
      formContent.contactForm.fields.phone.errorMessages.minLength ||
        "Số điện thoại cần ít nhất 10 số"
    )
    .regex(
      /^[0-9+\-\s()]+$/,
      formContent.contactForm.fields.phone.errorMessages.pattern ||
        "Số điện thoại không hợp lệ"
    ),
  company: z.string().optional(),
  concern: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;


