import { setupServer } from "msw/node"
import { handlers } from "./handlers"

/**
 * MSW Server Setup
 * This configures MSW to intercept requests in Node.js (for SSR/testing)
 */
export const server = setupServer(...handlers)

