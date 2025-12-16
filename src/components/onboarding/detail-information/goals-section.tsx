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
import { Textarea } from "@/components/ui/textarea";
import type { DetailValues } from "./schema";
import type { Control } from "react-hook-form";

export function GoalsSection({ control }: { control: Control<DetailValues> }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 className="text-base font-semibold">Mục tiêu & vấn đề</h2>
      <div className="mt-4 space-y-4">
        <FormField
          control={control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mục tiêu bạn muốn đạt *</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: ổn định dòng tiền 3 tháng tới..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="painPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vấn đề chính cần hỗ trợ *</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Mô tả ngắn bối cảnh và khó khăn..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}


