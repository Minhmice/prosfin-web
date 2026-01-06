/**
 * ToolInputPanel - Input form panel for tool
 * 
 * React Hook Form + Zod validation, numeric masking, preset quick-fill, autosave draft.
 */

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MoneyInput } from "@/components/shared/inputs/money-input";
import type { ToolDefinition, ToolInput } from "@/types/tools";
import { parseToolParams, buildToolParams } from "@/lib/tools/url-state";
import { useRouter, useSearchParams } from "next/navigation";

interface ToolInputPanelProps {
  tool: ToolDefinition;
  initialInput?: ToolInput;
  onInputChange: (input: ToolInput) => void;
}

const DRAFT_STORAGE_KEY = "prosfin_tool_draft_";

/**
 * ToolInputPanel - Input form for tool
 */
export function ToolInputPanel({
  tool,
  initialInput,
  onInputChange,
}: ToolInputPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Parse initial input from URL or localStorage draft
  const getInitialValues = (): ToolInput => {
    if (initialInput) return initialInput;
    
    // Try URL params first
    const urlInput = parseToolParams(new URLSearchParams(searchParams.toString()));
    if (Object.keys(urlInput).length > 0) return urlInput;
    
    // Try localStorage draft
    if (typeof window !== "undefined") {
      const draft = localStorage.getItem(`${DRAFT_STORAGE_KEY}${tool.slug}`);
      if (draft) {
        try {
          return JSON.parse(draft);
        } catch {
          // Ignore parse errors
        }
      }
    }
    
    return {};
  };

  const form = useForm<ToolInput>({
    resolver: zodResolver(tool.inputs.schema),
    defaultValues: getInitialValues(),
  });

  // Hydrate form after mount
  React.useEffect(() => {
    setIsHydrated(true);
    const values = getInitialValues();
    if (Object.keys(values).length > 0) {
      form.reset(values);
    }
  }, []);

  // Autosave draft to localStorage (debounced)
  React.useEffect(() => {
    if (!isHydrated) return;
    
    const subscription = form.watch((values) => {
      const timeoutId = setTimeout(() => {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `${DRAFT_STORAGE_KEY}${tool.slug}`,
            JSON.stringify(values)
          );
        }
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    });
    
    return () => subscription.unsubscribe();
  }, [form, isHydrated, tool.slug]);

  // Sync URL and notify parent
  React.useEffect(() => {
    if (!isHydrated) return;
    
    const values = form.getValues();
    const params = buildToolParams(values, false);
    
    // Update URL without navigation
    const newUrl = new URL(window.location.href);
    newUrl.search = params.toString();
    router.replace(newUrl.pathname + newUrl.search, { scroll: false });
    
    // Notify parent
    onInputChange(values);
  }, [form.watch(), isHydrated, router, onInputChange]);

  const handlePresetClick = (preset: NonNullable<ToolDefinition["inputs"]["presets"]>[0]) => {
    form.reset(preset.values);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Nhập thông tin</h2>
        <p className="text-muted-foreground mt-2">
          Điền các thông tin cần thiết để tính toán
        </p>
      </div>

      {/* Presets */}
      {tool.inputs.presets && tool.inputs.presets.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Mẫu nhanh:</p>
          <div className="flex flex-wrap gap-2">
            {tool.inputs.presets.map((preset) => (
              <Button
                key={preset.name}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <Form {...form}>
        <form className="space-y-4">
          {tool.inputs.fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </FormLabel>
                  <FormControl>
                    {field.type === "number" ? (
                      <MoneyInput
                        {...formField}
                        value={formField.value as number}
                        onValueChange={(value) => formField.onChange(value)}
                        placeholder={field.placeholder}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        value={String(formField.value || "")}
                        onValueChange={formField.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formField.value as boolean}
                          onCheckedChange={formField.onChange}
                        />
                        <label className="text-sm font-normal">
                          {field.helpText}
                        </label>
                      </div>
                    ) : (
                      <Input
                        {...formField}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formField.value as string | number | readonly string[] | undefined}
                      />
                    )}
                  </FormControl>
                  {field.helpText && field.type !== "checkbox" && (
                    <p className="text-xs text-muted-foreground">
                      {field.helpText}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </div>
  );
}

