/**
 * AppCard - Wrapper cho Card component
 * 
 * Wrapper này wrap ProsfinCard (đã wrap shadcn Card).
 * Đảm bảo không sửa trực tiếp src/components/ui/card.tsx
 */

import { ProsfinCard, type ProsfinCardProps } from "../card/brand-card";

export type AppCardProps = ProsfinCardProps;

/**
 * AppCard - Main card wrapper component
 * 
 * @example
 * ```tsx
 * <AppCard variant="elevated">
 *   <AppCardHeader>
 *     <AppCardTitle>Title</AppCardTitle>
 *   </AppCardHeader>
 * </AppCard>
 * ```
 */
export function AppCard(props: AppCardProps) {
  return <ProsfinCard {...props} />;
}

// Re-export sub-components
export {
  ProsfinCardHeader as AppCardHeader,
  ProsfinCardFooter as AppCardFooter,
  ProsfinCardTitle as AppCardTitle,
  ProsfinCardAction as AppCardAction,
  ProsfinCardDescription as AppCardDescription,
  ProsfinCardContent as AppCardContent,
} from "../card/brand-card";

