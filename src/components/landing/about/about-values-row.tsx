import * as React from "react";
import { ValueItem } from "@/data/about-content";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AboutValuesRowProps {
  /**
   * Array of values/working style items
   */
  values?: ValueItem[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * AboutValuesRow - Row hiển thị values/working style
 * 
 * Component riêng của About Section.
 * Sử dụng Card để hiển thị từng value item.
 */
export function AboutValuesRow({
  values,
  className,
}: AboutValuesRowProps) {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        className
      )}
    >
      {values.map((value) => (
        <Card key={value.id} className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">{value.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {value.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

