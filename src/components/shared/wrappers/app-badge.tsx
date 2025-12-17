/**
 * AppBadge - Wrapper cho Badge component
 * 
 * Wrapper này wrap ProsfinBadge (đã wrap shadcn Badge).
 * Đảm bảo không sửa trực tiếp src/components/ui/badge.tsx
 */

import { ProsfinBadge, type ProsfinBadgeProps } from "../badge/badge";

export type AppBadgeProps = ProsfinBadgeProps;

/**
 * AppBadge - Main badge wrapper component
 * 
 * @example
 * ```tsx
 * <AppBadge badgeVariant="primary">New</AppBadge>
 * ```
 */
export function AppBadge(props: AppBadgeProps) {
  return <ProsfinBadge {...props} />;
}

