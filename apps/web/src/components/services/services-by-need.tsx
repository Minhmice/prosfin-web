"use client";

import type { Service } from "@/types/content";
import { ServiceCard } from "./service-card";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import {
  getServicesGroupedByAudience,
  getServicesGroupedByGoal,
  getServicesGroupedByFormat,
  type ServiceGroup,
} from "@/lib/content/services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServicesByNeedProps {
  title?: string;
}

/**
 * ServicesByNeed - Display services grouped by audience/goal/format
 * 
 * Component hiển thị services được group theo 3 cách:
 * - By Audience (đối tượng)
 * - By Goal (mục tiêu)
 * - By Format (hình thức)
 */
export function ServicesByNeed({ title = "Tìm dịch vụ phù hợp" }: ServicesByNeedProps) {
  const groupsByAudience = getServicesGroupedByAudience();
  const groupsByGoal = getServicesGroupedByGoal();
  const groupsByFormat = getServicesGroupedByFormat();

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading
        title={title}
        subtitle="Chọn cách xem phù hợp với nhu cầu của bạn"
        align="left"
        titleSize="lg"
      />

      <Tabs defaultValue="audience" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audience">Theo đối tượng</TabsTrigger>
          <TabsTrigger value="goal">Theo mục tiêu</TabsTrigger>
          <TabsTrigger value="format">Theo hình thức</TabsTrigger>
        </TabsList>

        <TabsContent value="audience" className="space-y-8 mt-6">
          {groupsByAudience.map((group) => (
            <ServiceGroupSection key={group.key} group={group} />
          ))}
        </TabsContent>

        <TabsContent value="goal" className="space-y-8 mt-6">
          {groupsByGoal.map((group) => (
            <ServiceGroupSection key={group.key} group={group} />
          ))}
        </TabsContent>

        <TabsContent value="format" className="space-y-8 mt-6">
          {groupsByFormat.map((group) => (
            <ServiceGroupSection key={group.key} group={group} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ServiceGroupSectionProps {
  group: ServiceGroup;
}

function ServiceGroupSection({ group }: ServiceGroupSectionProps) {
  if (group.services.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{group.label}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {group.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

