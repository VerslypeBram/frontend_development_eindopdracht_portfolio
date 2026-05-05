'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold">Oops, something went wrong!</h2>
      <p className="max-w-md text-gray-500">
        We couldn&apos;t load this project. Please try again or come back later.
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
      >
        Try again
      </button>
    </div>
  )
}
