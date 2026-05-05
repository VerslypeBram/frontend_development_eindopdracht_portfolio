import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { env } from '@/env'

const TAG_MAPPING: Record<string, string> = {
  project: 'projects',
  hero: 'hero',
  aboutMe: 'aboutMe',
  skills: 'skills',
  tag: 'tag',
}

export async function POST(req: NextRequest) {
  const secret = env.SANITY_REVALIDATE_SECRET
  if (secret) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const body = await req.json()
    const documentType = body?._type

    if (!documentType) {
      return NextResponse.json(
        { message: 'No _type field in webhook payload' },
        { status: 400 },
      )
    }

    const tagToRevalidate = TAG_MAPPING[documentType] || documentType
    revalidateTag(tagToRevalidate, 'default')

    return NextResponse.json({
      revalidated: true,
      tag: tagToRevalidate,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Revalidation error:', message)
    return NextResponse.json(
      { message: 'Error revalidating', error: message },
      { status: 500 },
    )
  }
}
