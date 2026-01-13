import * as z from "zod";

/**
 * ClearData Form Schema
 * 
 * Validation schema cho ClearData service form.
 * Name (required), Phone or Email (required - at least one), Revenue range (optional).
 */

export const clearDataFormSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên cần ít nhất 2 ký tự"),
    phone: z.string().optional(),
    email: z
      .string()
      .optional()
      .refine((val) => !val || val.trim().length === 0 || z.string().email().safeParse(val).success, {
        message: "Email không đúng định dạng",
      }),
    revenueRange: z.string().optional(),
  })
  .refine(
    (data) => {
      // At least one of phone or email must be provided
      const hasPhone = data.phone && data.phone.trim().length > 0;
      const hasEmail = data.email && data.email.trim().length > 0;
      return hasPhone || hasEmail;
    },
    {
      message: "Vui lòng nhập số điện thoại hoặc email",
      path: ["phone"], // Error will show on phone field
    }
  );

export type ClearDataFormValues = z.infer<typeof clearDataFormSchema>;

