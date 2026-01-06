import type { ServicePageConfig, ServiceSlug } from "./types";
import { oneledgerConfig } from "./oneledger/config";

const registry: Record<ServiceSlug, ServicePageConfig> = {
  [oneledgerConfig.slug]: oneledgerConfig,
};

export function getServicePageConfig(slug: ServiceSlug): ServicePageConfig | undefined {
  return registry[slug];
}

export function getServiceConfig(slug: ServiceSlug): ServicePageConfig | null {
  return registry[slug] ?? null;
}

export function getServiceLayoutVariant(slug: ServiceSlug) {
  return registry[slug]?.layoutVariant;
}

export function listServiceConfigs(): ServicePageConfig[] {
  return Object.values(registry);
}

export function hasServiceConfig(slug: ServiceSlug) {
  return Boolean(registry[slug]);
}

