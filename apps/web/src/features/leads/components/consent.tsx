/**
 * Consent Component
 * 
 * Consent checkbox với timestamp.
 * Attach consent object vào attribution/payload.
 */

"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface ConsentProps {
  marketing?: boolean;
  privacyHref?: string;
  onConsentChange?: (consent: { marketing: boolean; privacyAccepted: boolean; timestamp: string }) => void;
  required?: boolean;
}

export function Consent({
  marketing = false,
  privacyHref = "/privacy",
  onConsentChange,
  required = true,
}: ConsentProps) {
  const [marketingConsent, setMarketingConsent] = useState(marketing);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  const handleMarketingChange = (checked: boolean) => {
    setMarketingConsent(checked);
    notifyConsentChange(checked, privacyAccepted);
  };

  const handlePrivacyChange = (checked: boolean) => {
    setPrivacyAccepted(checked);
    notifyConsentChange(marketingConsent, checked);
  };

  const notifyConsentChange = (marketing: boolean, privacy: boolean) => {
    onConsentChange?.({
      marketing,
      privacyAccepted: privacy,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-3">
      {required && (
        <div className="flex items-start gap-2">
          <Checkbox
            id="privacy-consent"
            checked={privacyAccepted}
            onCheckedChange={(checked) => handlePrivacyChange(checked === true)}
            required={required}
          />
          <Label htmlFor="privacy-consent" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Tôi đồng ý với{" "}
            <Link href={privacyHref} className="underline hover:no-underline">
              Chính sách bảo mật
            </Link>
            {required && " *"}
          </Label>
        </div>
      )}

      {marketing && (
        <div className="flex items-start gap-2">
          <Checkbox
            id="marketing-consent"
            checked={marketingConsent}
            onCheckedChange={(checked) => handleMarketingChange(checked === true)}
          />
          <Label htmlFor="marketing-consent" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Tôi đồng ý nhận thông tin marketing từ ProsFIN
          </Label>
        </div>
      )}
    </div>
  );
}

