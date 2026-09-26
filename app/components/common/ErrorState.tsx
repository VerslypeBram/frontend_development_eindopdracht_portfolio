'use client'

import { useEffect } from 'react'

interface ErrorStateProps {
  error: Error & { digest?: string }
  reset: () => void
  message: string
}

/** Shared UI for the route-group error boundaries */
export default function ErrorState({ error, reset, message }: ErrorStateProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold">Oops, something went wrong!</h2>
      <p className="max-w-md text-neutral-600 dark:text-neutral-300">
        {message}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 rounded-md bg-amber-500 px-6 py-2 font-semibold text-neutral-950 transition-colors hover:bg-amber-400 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
      >
        Try again
      </button>
    </div>
  )
}
