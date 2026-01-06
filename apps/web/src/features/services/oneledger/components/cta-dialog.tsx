"use client";

import { useMemo, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildOneLedgerLeadRequest } from "./oneledger-lead.mapper";
import { postLead } from "@/features/leads/client/leads-api.client";
import { useProsfinToast } from "@/components/shared/toast/toast-provider";
import type { FormField } from "@/content/services/types";
import type { OneLedgerScanResult } from "./oneledger-lead.mapper";
import { TurnstileField } from "@/components/shared/forms/turnstile-field";
import { ERROR_CODES } from "@/lib/leads/error-codes";

export interface LeadCtaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: FormField[];
  step2Fields?: FormField[];
  submitCopy: string;
  successMessage: string;
  payload?: Record<string, unknown>;
  title?: string;
  description?: string;
}

type FormState = Record<string, string>;

export function LeadCtaDialog({
  open,
  onOpenChange,
  fields,
  step2Fields,
  submitCopy,
  successMessage,
  payload,
  title = "Đăng ký khảo sát OneLedger™",
  description = "Để lại thông tin, chúng tôi sẽ liên hệ trong 24–48h.",
}: LeadCtaDialogProps) {
  const toast = useProsfinToast();
  const allFields = useMemo(() => [...fields, ...(step2Fields || [])], [fields, step2Fields]);
  const [state, setState] = useState<FormState>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [retryAfterSec, setRetryAfterSec] = useState<number | null>(null);

  // Prefill scan result from payload
  const scanResult = useMemo<OneLedgerScanResult | undefined>(() => {
    if (payload?.scan && typeof payload.scan === "object") {
      return payload.scan as OneLedgerScanResult;
    }
    return undefined;
  }, [payload]);

  const sourceDetail = (payload?.sourceDetail as string) || "hero_primary";

  const handleChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = {
        name: state.name || "",
        company: state.company || "",
        email: state.email || "",
        phone: state.phone || "",
        persona: state.persona,
        revenueRange: state.revenueRange,
        triggerEvents: state.triggerEvents ? state.triggerEvents.split(",") : [],
        priorities: state.priorities ? state.priorities.split(",") : [],
        notes: state.notes,
      };

      const request = buildOneLedgerLeadRequest({
        form: formData,
        scan: scanResult,
        sourceDetail,
        turnstileToken: turnstileToken || undefined,
        pagePath: typeof window !== "undefined" ? window.location.pathname : undefined,
      });

      const response = await postLead(request);

      if (response.ok) {
        // Phase 5: Handle duplicate lead
        if (response.duplicateOf) {
          setIsDuplicate(true);
          toast.toast({
            description: "Chúng tôi đã nhận thông tin trước đó. Đội ngũ sẽ liên hệ…",
            variant: "success",
          });
        } else {
          setSubmitted(true);
          toast.toast({
            description: successMessage,
            variant: "success",
          });
        }
      } else {
        // Phase 5: Map error codes to UI states
        const errorCode = response.code;
        if (errorCode === ERROR_CODES.RATE_LIMITED) {
          setRetryAfterSec(response.retryAfterSec || 60);
        } else if (errorCode === ERROR_CODES.BOT_SUSPECTED) {
          setTurnstileError(true);
          setError("Xác thực không thành công. Vui lòng thử lại.");
        } else if (errorCode === ERROR_CODES.VALIDATION_ERROR) {
          setError(response.message || "Vui lòng kiểm tra lại các trường bắt buộc.");
        } else {
          setError(response.message || "Có lỗi xảy ra khi gửi yêu cầu.");
        }
        toast.toast({
          description: response.message || "Có lỗi xảy ra khi gửi yêu cầu.",
          variant: "error",
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Có lỗi xảy ra khi gửi yêu cầu.";
      setError(message);
      toast.toast({
        description: message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: FormField) => {
    const common = {
      id: field.name,
      name: field.name,
      required: field.required,
      value: state[field.name] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        handleChange(field.name, e.target.value),
      placeholder: field.placeholder,
    };

    if (field.type === "textarea") {
      return <Textarea {...common} />;
    }

    if (field.type === "select" || field.type === "multiselect") {
      return (
        <select
          {...common}
          multiple={field.type === "multiselect"}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
          value={
            field.type === "multiselect"
              ? (state[field.name]?.split(",") ?? [])
              : state[field.name] || ""
          }
          onChange={(e) => {
            if (field.type === "multiselect") {
              const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
              handleChange(field.name, values.join(","));
            } else {
              handleChange(field.name, e.target.value);
            }
          }}
        >
          {field.type === "select" && <option value="">Chọn</option>}
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "file") {
      return (
        <Input
          id={field.name}
          name={field.name}
          type="file"
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      );
    }

    const inputType = field.type === "phone" ? "tel" : field.type === "email" ? "email" : "text";
    return <Input {...common} type={inputType} />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-primary">{successMessage}</p>
            <p className="text-muted-foreground">Chúng tôi đã nhận được thông tin của bạn.</p>
          </div>
        ) : isDuplicate ? (
          <div className="space-y-4 text-sm">
            <div className="space-y-2 text-muted-foreground">
              <p className="font-semibold text-primary">Chúng tôi đã nhận thông tin trước đó. Đội ngũ sẽ liên hệ…</p>
              <p>Bạn có muốn cập nhật thêm ghi chú không?</p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDuplicate(false);
                  setState((prev) => ({ ...prev, notes: "" }));
                }}
              >
                Cập nhật ghi chú
              </Button>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Đóng
              </Button>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {allFields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-sm font-medium" htmlFor={field.name}>
                  {field.label} {field.required ? "*" : ""}
                </label>
                {renderField(field)}
              </div>
            ))}
            <div className="space-y-1">
              <TurnstileField
                onVerify={(token) => {
                  setTurnstileToken(token);
                  setTurnstileError(false);
                }}
                onError={() => {
                  setTurnstileToken(null);
                  setTurnstileError(true);
                }}
              />
              {turnstileError && (
                <p className="text-xs text-destructive">Vui lòng xác thực lại.</p>
              )}
            </div>
            {error && (
              <div className="space-y-1">
                <p className="text-sm text-destructive">{error}</p>
                {retryAfterSec !== null && (
                  <p className="text-xs text-muted-foreground">
                    Vui lòng đợi {retryAfterSec} giây trước khi thử lại.
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
                Đóng
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Đang gửi..." : submitCopy}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

