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
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold">Oeps, er is iets misgegaan!</h2>
      <p className="max-w-md text-gray-500">
        We konden de gegevens niet ophalen. Probeer het opnieuw of kom later
        terug.
      </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="mt-4 rounded-md bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
      >
        Probeer opnieuw
      </button>
    </div>
  )
}
