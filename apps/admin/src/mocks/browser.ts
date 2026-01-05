import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

/**
 * MSW Browser Setup
 * This configures MSW to intercept requests in the browser
 */
export const worker = setupWorker(...handlers)

