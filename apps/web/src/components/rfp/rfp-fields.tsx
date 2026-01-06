"use client";

import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RFP_SERVICES } from "@/content/rfp.options";
import type { RfpFormValues } from "@/lib/rfp/rfp.schema";

export interface RfpFieldsProps {
  control: Control<RfpFormValues>;
  preselectedService?: string;
}

const TITLE_OPTIONS = [
  { value: "mr", label: "Ông" },
  { value: "mrs", label: "Bà" },
  { value: "ms", label: "Cô" },
  { value: "dr", label: "Tiến sĩ" },
];

const LOCATION_OPTIONS = [
  { value: "hanoi", label: "Hà Nội" },
  { value: "hcm", label: "TP. Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  { value: "other", label: "Tỉnh/Thành phố khác" },
];

const INDUSTRY_OPTIONS = [
  { value: "manufacturing", label: "Sản xuất" },
  { value: "trading", label: "Thương mại" },
  { value: "f&b", label: "F&B" },
  { value: "retail", label: "Bán lẻ" },
  { value: "services", label: "Dịch vụ" },
  { value: "tech", label: "Công nghệ" },
  { value: "other", label: "Ngành khác" },
];

const REVENUE_OPTIONS = [
  { value: "under-1b", label: "Dưới 1 tỷ VNĐ" },
  { value: "1b-10b", label: "1-10 tỷ VNĐ" },
  { value: "10b-50b", label: "10-50 tỷ VNĐ" },
  { value: "50b-100b", label: "50-100 tỷ VNĐ" },
  { value: "over-100b", label: "Trên 100 tỷ VNĐ" },
];

/**
 * RfpFields - Field groups for RFP form
 */
export function RfpFields({ control, preselectedService }: RfpFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Service Selection */}
      <FormField
        control={control}
        name="service"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Tôi muốn liên hệ về <span className="text-destructive">*</span>
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value || preselectedService || ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dịch vụ" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {RFP_SERVICES.map((service) => (
                  <SelectItem key={service.id} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Danh xưng <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh xưng" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TITLE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Họ <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập họ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chức danh/Vị trí</FormLabel>
                <FormControl>
                  <Input placeholder="VD: CEO, CFO, Kế toán trưởng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+84..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Company Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thông tin doanh nghiệp</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="companyLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Địa điểm doanh nghiệp <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn địa điểm" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LOCATION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Ngành nghề <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngành nghề" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên công ty/Tổ chức</FormLabel>
                <FormControl>
                  <Input placeholder="Tên công ty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="yearlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doanh thu hằng năm</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoảng doanh thu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REVENUE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Documents & Requirements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tài liệu & Yêu cầu</h3>
        
        <FormField
          control={control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nội dung yêu cầu &/hoặc hướng dẫn{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả chi tiết yêu cầu của bạn (tối thiểu 30 ký tự)..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                {field.value?.length || 0} / 30 ký tự tối thiểu
              </p>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

