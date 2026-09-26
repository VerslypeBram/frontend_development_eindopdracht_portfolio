import { createClient } from 'next-sanity'

import { env } from '@/env'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: env.SANITY_API_READ_TOKEN,
})
