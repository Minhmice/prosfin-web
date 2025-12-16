"use client";

import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "./select";
import type { DetailValues } from "./schema";
import type { Control } from "react-hook-form";

export function CompanyInfoSection({ control }: { control: Control<DetailValues> }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 className="text-base font-semibold">Thông tin doanh nghiệp</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngành/nghề *</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: dịch vụ sáng tạo, sản xuất..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quy mô (nhân sự) *</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="1-5">1–5</option>
                  <option value="6-20">6–20</option>
                  <option value="21-50">21–50</option>
                  <option value="51-200">51–200</option>
                  <option value="200+">200+</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="revenueRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doanh thu/năm (ước tính) *</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="lt-1b">&lt; 1 tỷ</option>
                  <option value="1-5b">1–5 tỷ</option>
                  <option value="5-20b">5–20 tỷ</option>
                  <option value="20-100b">20–100 tỷ</option>
                  <option value="gt-100b">&gt; 100 tỷ</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="yearsActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số năm hoạt động *</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="0-1">0–1</option>
                  <option value="1-3">1–3</option>
                  <option value="3-7">3–7</option>
                  <option value="7+">7+</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}


