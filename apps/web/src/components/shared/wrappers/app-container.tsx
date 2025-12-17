/**
 * AppContainer - Wrapper cho Container component
 * 
 * Wrapper này wrap ProsfinContainer.
 * Đảm bảo max-width và padding nhất quán.
 */

import { ProsfinContainer, type ProsfinContainerProps } from "../../layout/container";

export type AppContainerProps = ProsfinContainerProps;

/**
 * AppContainer - Main container wrapper component
 * 
 * @example
 * ```tsx
 * <AppContainer maxWidth="xl">
 *   <h1>Content</h1>
 * </AppContainer>
 * ```
 */
export function AppContainer(props: AppContainerProps) {
  return <ProsfinContainer {...props} />;
}

