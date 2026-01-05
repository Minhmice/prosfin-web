/**
 * IP Extractor
 * 
 * Best-effort IP extraction từ request headers.
 * Handle Vercel/proxy headers.
 */

/**
 * Extract IP address from request
 * 
 * Priority:
 * 1. X-Forwarded-For (first IP if multiple)
 * 2. X-Real-IP
 * 3. CF-Connecting-IP (Cloudflare)
 * 4. Request IP (fallback)
 */
export function extractIp(request: Request): string {
  // Try X-Forwarded-For first (most common in proxies)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) {
      return firstIp;
    }
  }

  // Try X-Real-IP
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  // Try Cloudflare header
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) {
    return cfIp.trim();
  }

  // Fallback: try to get from request URL (for localhost/dev)
  try {
    const url = new URL(request.url);
    const hostname = url.hostname;
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return hostname;
    }
  } catch {
    // Ignore URL parsing errors
  }

  // Ultimate fallback
  return "unknown";
}

/**
 * Hash IP for logging (privacy)
 */
export function hashIp(ip: string): string {
  // Simple hash for privacy (not cryptographically secure, just for logging)
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `ip_${Math.abs(hash).toString(16)}`;
}

