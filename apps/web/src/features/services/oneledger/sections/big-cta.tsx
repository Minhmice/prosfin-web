"use client";

import { useState } from "react";
import type { BigCtaConfig } from "@/content/services/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildOneLedgerLeadRequest } from "../components/oneledger-lead.mapper";
import { postLead } from "@/features/leads/client/leads-api.client";
import { useProsfinToast } from "@/components/shared/toast/toast-provider";
import type { OneLedgerScanResult } from "../components/oneledger-lead.mapper";
import { TurnstileField } from "@/components/shared/forms/turnstile-field";
import { ERROR_CODES } from "@/lib/leads/error-codes";

interface BigCtaProps {
  config: { bigCta?: BigCtaConfig };
  scanResult?: OneLedgerScanResult;
}

export function BigCta({ config, scanResult }: BigCtaProps) {
  const cta = config.bigCta;
  const toast = useProsfinToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [state, setState] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [retryAfterSec, setRetryAfterSec] = useState<number | null>(null);

  if (!cta) return null;

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
        sourceDetail: "big_cta",
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
            description: cta.successMessage,
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

  const renderField = (field: NonNullable<BigCtaConfig["step1Fields"]>[number]) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      value: state[field.name] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        handleChange(field.name, e.target.value),
      placeholder: field.placeholder,
    };

    if (field.type === "textarea") {
      return <Textarea {...commonProps} />;
    }

    if (field.type === "select" || field.type === "multiselect") {
      return (
        <select
          {...commonProps}
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

    const inputType = field.type === "phone" ? "tel" : field.type === "email" ? "email" : "text";
    return <Input {...commonProps} type={inputType} />;
  };

  const stepFields = step === 1 ? cta.step1Fields : cta.step2Fields || [];

  return (
    <Card id="cta" className="border-primary/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng ký khảo sát OneLedger™</CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-primary">{cta.successMessage}</p>
            <p>Chúng tôi đã nhận được thông tin của bạn.</p>
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
              <Button type="button" variant="ghost" onClick={() => setSubmitted(true)}>
                Đóng
              </Button>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 md:grid-cols-2">
              {stepFields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    {field.label} {field.required ? "*" : ""}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            {step === (cta.step2Fields ? 2 : 1) && (
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
            )}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-muted-foreground">Step {step} / {cta.step2Fields ? 2 : 1}</div>
              <div className="flex gap-2">
                {step === 2 && (
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                    Quay lại
                  </Button>
                )}
                {step === 1 && cta.step2Fields ? (
                  <Button type="button" onClick={() => setStep(2)}>
                    Tiếp tục
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading}>
                    {loading ? "Đang gửi..." : cta.submitCopy}
                  </Button>
                )}
            {error && (
              <div className="col-span-full space-y-1">
                <p className="text-sm text-destructive">{error}</p>
                {retryAfterSec !== null && (
                  <p className="text-xs text-muted-foreground">
                    Vui lòng đợi {retryAfterSec} giây trước khi thử lại.
                  </p>
                )}
              </div>
            )}
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

