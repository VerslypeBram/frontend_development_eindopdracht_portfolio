import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2026-04-10'),
  SANITY_API_READ_TOKEN: z.string().optional(),
  SANITY_REVALIDATE_SECRET: z.string().optional(),
  SANITY_PREVIEW_SECRET: z.string().optional(),
})

// Throw early with a readable message — fail-fast at startup.
export const env = envSchema.parse(process.env)
