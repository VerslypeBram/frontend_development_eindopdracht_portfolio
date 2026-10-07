'use client'

import ErrorState from '@/app/components/common/ErrorState'

export default function Error(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorState
      {...props}
      message="We couldn’t fetch the data. Please try again or come back later."
    />
  )
}
