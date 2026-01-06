import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProsfinServiceCardWrapperProps {
  /**
   * Card title (service name)
   */
  title: string;
  /**
   * Card description
   */
  description?: string;
  /**
   * List of benefits (bullet points)
   */
  benefits?: string[];
  /**
   * Optional icon (ReactNode)
   */
  icon?: React.ReactNode;
  /**
   * Optional cover image URL
   */
  coverImage?: string;
  /**
   * Optional ideal client description
   */
  idealClient?: string;
  /**
   * CTA button content (ReactNode)
   */
  cta?: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Card variant
   * @default "default"
   */
  variant?: "default" | "bordered" | "elevated";
  /**
   * Children content (custom content)
   */
  children?: React.ReactNode;
}

/**
 * ProsfinServiceCardWrapper - Wrapper component cho Service Cards
 * 
 * Wrap shadcn Card với style thống nhất cho mọi "ServiceCard".
 * Có chỗ cho title, description, benefits list, và CTA button.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinServiceCardWrapper({
  title,
  description,
  benefits,
  icon,
  coverImage,
  idealClient,
  cta,
  className,
  variant = "default",
  children,
}: ProsfinServiceCardWrapperProps) {
  const variantClasses = {
    default: "border-border shadow-sm",
    bordered: "border-2 border-border shadow-none",
    elevated: "border-border shadow-md",
  };

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:border-primary/50",
        variantClasses[variant],
        className
      )}
    >
      {coverImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="p-4 md:p-6">
        {icon && <div className="mb-3">{icon}</div>}
        <CardTitle className="text-base leading-tight md:text-xl">{title}</CardTitle>
        {description && (
          <CardDescription className="mt-2 text-sm leading-relaxed md:text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 p-4 md:gap-4 md:p-6">
        {/* Benefits List */}
        {benefits && benefits.length > 0 && (
          <ul className="flex flex-col gap-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 text-primary">•</span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Ideal Client */}
        {idealClient && (
          <div className="mt-auto rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
            <span className="font-medium">Phù hợp: </span>
            {idealClient}
          </div>
        )}

        {/* Custom children content */}
        {children}
      </CardContent>

      {/* CTA Footer */}
      {cta && <CardFooter className="p-4 pt-0 md:p-6 md:pt-4">{cta}</CardFooter>}
    </Card>
  );
}

