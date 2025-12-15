import * as React from "react";
import { ProsfinContactCardWrapper } from "@/components/shared/card/prosfin-contact-card-wrapper";
import { ContactForm } from "./contact-form";
import { ContactInfoBlock } from "./contact-info-block";
import { ContactInfo } from "@/data/contact-content";

export interface ContactPanelProps {
  /**
   * Contact information
   */
  contactInfo: ContactInfo;
  /**
   * Form submit handler
   */
  onSubmitLead?: (data: unknown) => void;
  /**
   * Submit button label
   */
  submitLabel?: string;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ContactPanel - Panel component chứa form và contact info
 * 
 * Component riêng của Contact Section.
 * Sử dụng ProsfinContactCardWrapper để wrap form và info.
 */
export function ContactPanel({
  contactInfo,
  onSubmitLead,
  submitLabel,
  className,
}: ContactPanelProps) {
  return (
    <ProsfinContactCardWrapper className={className}>
      <ContactForm onSubmit={onSubmitLead} submitLabel={submitLabel} />
      <ContactInfoBlock contactInfo={contactInfo} />
    </ProsfinContactCardWrapper>
  );
}

