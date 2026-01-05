/**
 * Service Presets Helpers
 * 
 * Helpers to load and process preset content data.
 */

import { SERVICE_PRESETS_CONTENT, type ServicePresetContent } from "@/content/services-presets";
import { getAllServices, getServiceBySlug } from "@/lib/content/services";
import type { Service } from "@/types/content";

/**
 * Get preset by slug
 * 
 * @param slug - Preset slug
 * @returns Preset content or undefined
 */
export function getPresetBySlug(slug: string): ServicePresetContent | undefined {
  return SERVICE_PRESETS_CONTENT.find((preset) => preset.slug === slug);
}

/**
 * Get all presets
 * 
 * @returns All preset content
 */
export function getAllPresets(): ServicePresetContent[] {
  return SERVICE_PRESETS_CONTENT;
}

/**
 * Get services for a preset
 * 
 * @param preset - Preset content
 * @returns Array of services matching preset's serviceSlugs
 */
export function getServicesForPreset(preset: ServicePresetContent): Service[] {
  const allServices = getAllServices();
  const services: Service[] = [];

  preset.serviceSlugs.forEach((slug) => {
    const service = getServiceBySlug(slug);
    if (service) {
      services.push(service);
    }
  });

  return services;
}

/**
 * Get preset static params for generateStaticParams
 * 
 * @returns Array of preset slugs for static generation
 */
export function getPresetStaticParams(): Array<{ preset: string }> {
  return SERVICE_PRESETS_CONTENT.map((preset) => ({
    preset: preset.slug,
  }));
}

