/**
 * Client Schemas
 */

import { z } from "zod"
import { CLIENT_STATUSES } from "../constants"

export const clientStatusSchema = z.enum(CLIENT_STATUSES)

export const createClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  status: clientStatusSchema.default("active"),
  ownerId: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const updateClientSchema = createClientSchema.partial()

export const clientFilterSchema = z.object({
  q: z.string().optional(),
  status: clientStatusSchema.optional(),
  ownerId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(), // format: "field" or "-field"
})

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
export type ClientFilterInput = z.infer<typeof clientFilterSchema>

