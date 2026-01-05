/**
 * MSW Initialization
 * 
 * Initialize MSW worker in browser environment
 * This should be called once when the app loads
 */

export async function initMSW() {
  if (typeof window === "undefined") {
    // Server-side: don't initialize MSW
    return
  }

  // Only initialize in development
  if (process.env.NODE_ENV !== "development") {
    return
  }

  // Check if MSW is enabled (optional env var)
  if (process.env.NEXT_PUBLIC_USE_MSW === "false") {
    return
  }

  try {
    const { worker } = await import("@/mocks/browser")
    await worker.start({
      onUnhandledRequest: "bypass", // Don't warn about unhandled requests
      serviceWorker: {
        url: "/mockServiceWorker.js", // MSW service worker path
      },
    })
    console.log("✅ MSW started")
  } catch (error) {
    console.warn("⚠️ MSW failed to start:", error)
  }
}

