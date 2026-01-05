/**
 * Robots Meta Helpers
 * 
 * Site-wide helpers for generating robots metadata.
 */

import type { Metadata } from "next";

export interface RobotsConfig {
  index: boolean;
  follow: boolean;
}

/**
 * Generate robots metadata from config
 * 
 * @param config - Robots configuration
 * @returns Metadata robots object
 */
export function robotsForRoute(config: RobotsConfig): Metadata["robots"] {
  return {
    index: config.index,
    follow: config.follow,
    googleBot: {
      index: config.index,
      follow: config.follow,
      "max-video-preview": config.index ? -1 : undefined,
      "max-image-preview": config.index ? "large" : undefined,
      "max-snippet": config.index ? -1 : undefined,
    },
  };
}

