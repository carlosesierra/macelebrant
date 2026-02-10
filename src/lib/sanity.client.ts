// lib/sanity.client.ts
import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // 'xxxxxx'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // true for fast response, false for real-time fresh data
})
