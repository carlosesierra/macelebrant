import 'server-only'

import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from './sanity.client'

const token = process.env.SANITY_API_TOKEN

const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: token ? false : true,
  token,
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

  return serverClient.fetch(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  }) as Promise<T>
}
