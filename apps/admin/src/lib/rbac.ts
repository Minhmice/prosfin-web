/**
 * Role-Based Access Control (RBAC)
 */

import { Session } from "next-auth"
import { NextResponse } from "next/server"

export type Role = "admin" | "crm_manager" | "content_editor" | "viewer"

const roleHierarchy: Record<Role, Role[]> = {
  admin: ["admin", "crm_manager", "content_editor", "viewer"],
  crm_manager: ["crm_manager", "viewer"],
  content_editor: ["content_editor", "viewer"],
  viewer: ["viewer"],
}

/**
 * Check if user has required role(s)
 */
export function checkRole(session: Session | null, requiredRoles: Role | Role[]): boolean {
  if (!session?.user) {
    return false
  }

  const userRoles = session.user.roles as Role[]
  const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]

  // Admin has access to everything
  if (userRoles.includes("admin")) {
    return true
  }

  // Check if user has any of the required roles
  return required.some((role) => {
    const allowedRoles = roleHierarchy[role] || []
    return userRoles.some((userRole) => allowedRoles.includes(userRole))
  })
}

/**
 * Require role(s) or throw error response
 */
export function requireRole(
  session: Session | null,
  requiredRoles: Role | Role[]
): void {
  if (!checkRole(session, requiredRoles)) {
    throw new Error("Unauthorized")
  }
}

/**
 * Create unauthorized response
 */
export function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
}

/**
 * Role mappings for endpoints
 */
export const endpointRoles: Record<string, Role[]> = {
  // CRM endpoints
  "/api/crm/clients": ["admin", "crm_manager"],
  "/api/crm/leads": ["admin", "crm_manager"],
  
  // Content endpoints
  "/api/content/posts": ["admin", "content_editor"],
  "/api/content/media": ["admin", "content_editor"],
  "/api/content/comments": ["admin", "content_editor"],
}

