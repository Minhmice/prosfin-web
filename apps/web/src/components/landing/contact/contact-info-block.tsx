import * as React from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { ContactInfo } from "@/data/contact-content";
import { cn } from "@/lib/utils";

export interface ContactInfoBlockProps {
  /**
   * Contact information
   */
  contactInfo: ContactInfo;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ContactInfoBlock - Component hiển thị thông tin liên hệ
 * 
 * Component riêng của Contact Section.
 * Hiển thị email, phone, address, social links.
 */
export function ContactInfoBlock({
  contactInfo,
  className,
}: ContactInfoBlockProps) {
  return (
    <div className={cn("mt-6 space-y-4 border-t pt-6", className)}>
      <p className="text-sm font-medium text-foreground">
        Hoặc liên hệ trực tiếp:
      </p>
      <div className="space-y-3">
        {contactInfo.email && (
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>{contactInfo.email}</span>
          </a>
        )}
        {contactInfo.phone && (
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{contactInfo.phone}</span>
          </a>
        )}
        {contactInfo.address && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{contactInfo.address}</span>
          </div>
        )}
        {contactInfo.linkedin && (
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
}

