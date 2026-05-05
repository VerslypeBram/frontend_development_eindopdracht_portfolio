import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { env } from '@/env'
import { client } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== env.SANITY_PREVIEW_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  const project = await client.fetch<{ slug: string } | null>(
    `*[_type == "project" && slug.current == $slug][0]{ "slug": slug.current }`,
    { slug },
  )

  const draft = await draftMode()
  draft.enable()

  redirect(project ? `/projects/${project.slug}` : '/')
}
