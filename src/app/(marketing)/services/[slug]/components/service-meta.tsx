import * as React from "react";
import { Text } from "@/components/shared";

export function ServiceMetaSection({
  timeline,
  format,
  pricingNote,
  requirementsFromClient,
}: {
  timeline: string;
  format: string;
  pricingNote?: string;
  requirementsFromClient: string[];
}) {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <Text as="p" variant="large" className="mb-2">
            Thời gian thực hiện
          </Text>
          <Text as="p" variant="lead" className="text-muted-foreground">
            {timeline}
          </Text>
        </div>

        <div>
          <Text as="p" variant="large" className="mb-2">
            Hình thức làm việc
          </Text>
          <Text as="p" variant="lead" className="text-muted-foreground">
            {format}
          </Text>
        </div>

        {pricingNote && (
          <div>
            <Text as="p" variant="large" className="mb-2">
              Phí tham khảo
            </Text>
            <Text as="p" variant="lead" className="text-muted-foreground">
              {pricingNote}
            </Text>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Text as="p" variant="large" className="mb-4">
          Khách cần chuẩn bị:
        </Text>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          {requirementsFromClient.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


