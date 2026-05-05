import { env } from '@/env'

// Re-export from the validated schema so there is one source of truth.
export const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION
export const dataset = env.NEXT_PUBLIC_SANITY_DATASET
export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
