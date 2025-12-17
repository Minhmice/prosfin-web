/**
 * AppSection - Wrapper cho Section component
 * 
 * Wrapper này wrap ProsfinSectionWrapper.
 * Đảm bảo spacing và anchor id nhất quán.
 */

import { ProsfinSectionWrapper, type ProsfinSectionWrapperProps } from "../section/section-wrapper";

export type AppSectionProps = ProsfinSectionWrapperProps;

/**
 * AppSection - Main section wrapper component
 * 
 * @example
 * ```tsx
 * <AppSection id="services" padding="lg" background="muted">
 *   <h2>Services</h2>
 * </AppSection>
 * ```
 */
export function AppSection(props: AppSectionProps) {
  return <ProsfinSectionWrapper {...props} />;
}

