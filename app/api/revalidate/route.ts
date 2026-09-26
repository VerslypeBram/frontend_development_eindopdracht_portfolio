import { timingSafeEqual } from 'node:crypto'
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

/** Constant-time comparison so the secret can't be guessed via timing */
function isAuthorized(authHeader: string | null, secret: string) {
  const expected = Buffer.from(`Bearer ${secret}`)
  const received = Buffer.from(authHeader ?? '')
  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  )
}

export async function POST(req: NextRequest) {
  const secret = env.SANITY_REVALIDATE_SECRET

  // Fail closed: without a configured secret nobody may purge the cache
  if (!secret) {
    console.error('SANITY_REVALIDATE_SECRET is not set')
    return NextResponse.json(
      { message: 'Revalidation is not configured' },
      { status: 500 },
    )
  }

  if (!isAuthorized(req.headers.get('authorization'), secret)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const documentType = body?._type

    if (typeof documentType !== 'string') {
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
    // Log details server-side only; don't leak internals to the caller
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
