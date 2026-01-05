/**
 * MSW Mock Service Worker Setup
 * 
 * MSW intercepts HTTP requests and returns mock responses.
 * This allows frontend-only development with realistic API behavior.
 * 
 * Usage:
 * - Browser: Import and start worker in app entry point
 * - Server/Testing: Import server for SSR or tests
 */

export { handlers } from "./handlers"
export { worker } from "./browser"
export { server } from "./server"

