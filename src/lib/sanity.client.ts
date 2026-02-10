// lib/sanity.client.ts
import { createClient, type QueryParams } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // 'xxxxxx'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // true for fast response, false for real-time fresh data
})

export async function sanityFetch<const QueryString extends string, T = unknown>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
  fallback,
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
  fallback?: T
}): Promise<T> {
  if (process.env.SANITY_OFFLINE === '1') {
    if (fallback !== undefined) return fallback
    throw new Error('SANITY_OFFLINE=1 but no fallback provided.')
  }

  return client.fetch(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  }) as Promise<T>
}
