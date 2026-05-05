// Note: this file runs under the Sanity CLI (not Next.js), so we read
// process.env directly instead of going through the Zod-validated env module.
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset } })
