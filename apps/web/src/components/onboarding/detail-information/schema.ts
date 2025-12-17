import * as z from "zod";

export const detailSchema = z.object({
  industry: z.string().min(1, "Vui lòng nhập ngành/nghề"),
  companySize: z.enum(["1-5", "6-20", "21-50", "51-200", "200+"]),
  revenueRange: z.enum(["lt-1b", "1-5b", "5-20b", "20-100b", "gt-100b"]),
  yearsActive: z.enum(["0-1", "1-3", "3-7", "7+"]),
  goal: z.string().min(1, "Vui lòng nhập mục tiêu"),
  painPoints: z.string().min(1, "Vui lòng mô tả vấn đề chính"),
});

export type DetailValues = z.infer<typeof detailSchema>;


