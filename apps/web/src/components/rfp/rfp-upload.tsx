"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RFP_FILE_CONSTRAINTS } from "@/lib/rfp/rfp.schema";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";

export interface RfpUploadProps {
  className?: string;
}

/**
 * RfpUpload - File upload component for RFP form
 */
export function RfpUpload({ className }: RfpUploadProps) {
  const { control, watch, setValue } = useFormContext();
  const file = watch("attachment");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setValue("attachment", selectedFile, { shouldValidate: true });
    }
  };

  const handleRemoveFile = () => {
    setValue("attachment", undefined, { shouldValidate: true });
  };

  return (
    <FormField
      control={control}
      name="attachment"
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem className={className}>
          <FormLabel>Tài liệu đính kèm (tùy chọn)</FormLabel>
          <div className="space-y-2">
            {!value ? (
              <div className="flex items-center gap-2">
                <Input
                  {...field}
                  type="file"
                  accept={RFP_FILE_CONSTRAINTS.allowedExtensions.join(",")}
                  onChange={(e) => {
                    handleFileChange(e);
                    onChange(e.target.files?.[0]);
                  }}
                  className="cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border bg-muted p-3">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{value.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Chấp nhận: {RFP_FILE_CONSTRAINTS.allowedExtensions.join(", ")} (tối đa{" "}
              {RFP_FILE_CONSTRAINTS.maxSizeMB}MB)
            </p>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

