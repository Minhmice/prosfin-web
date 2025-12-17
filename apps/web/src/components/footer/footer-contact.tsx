import * as React from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { contactSectionContent } from "@/data/contact-content";
import { cn } from "@/lib/utils";

export interface FooterContactProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * FooterContact - Contact info component cho footer
 * 
 * Component riêng của Footer.
 * Tái sử dụng contactSectionContent.contactInfo để hiển thị email/phone.
 */
export function FooterContact({ className }: FooterContactProps) {
  const { contactInfo } = contactSectionContent;

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-foreground">Liên hệ</h3>
      <div className="space-y-2">
        {contactInfo.email && (
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>{contactInfo.email}</span>
          </a>
        )}
        {contactInfo.phone && (
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{contactInfo.phone}</span>
          </a>
        )}
        {contactInfo.address && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{contactInfo.address}</span>
          </div>
        )}
        {contactInfo.linkedin && (
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
}

