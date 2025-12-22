/**
 * Database Query Builder
 * Build Prisma queries from parsed filters
 */

import { Prisma } from "@prisma/client"
import type { ParsedQuery } from "./query-parser"

/**
 * Build Prisma where clause from filters
 */
export function buildWhereClause<T extends Record<string, any>>(
  filters: ParsedQuery["filters"],
  searchFields?: string[]
): Prisma.Enumerable<T> {
  const where: any = {}

  // Text search
  if (filters.q && searchFields && searchFields.length > 0) {
    where.OR = searchFields.map((field) => ({
      [field]: {
        contains: filters.q,
        mode: "insensitive" as const,
      },
    }))
  }

  // Apply other filters
  for (const [key, value] of Object.entries(filters)) {
    if (key === "q") continue

    if (Array.isArray(value)) {
      where[key] = { in: value }
    } else {
      where[key] = value
    }
  }

  return where as Prisma.Enumerable<T>
}

/**
 * Build Prisma orderBy from sort
 */
export function buildOrderBy(sort?: ParsedQuery["sort"]): any {
  if (!sort) {
    return { createdAt: "desc" }
  }

  return {
    [sort.field]: sort.direction,
  }
}

/**
 * Apply pagination to query
 */
export function paginateQuery<T>(
  query: T,
  page: number,
  pageSize: number
): T & { skip: number; take: number } {
  return {
    ...query,
    skip: (page - 1) * pageSize,
    take: pageSize,
  } as T & { skip: number; take: number }
}

