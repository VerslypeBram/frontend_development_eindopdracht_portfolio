'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Studio = dynamic(() => import('./Studio').then(mod => mod.Studio), {
  ssr: false,
})

export default function StudioWrapper() {
  useEffect(() => {
    document.body.classList.add('sanity-studio')
    return () => document.body.classList.remove('sanity-studio')
  }, [])

  return <Studio />
}
