export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10 aspect-16/7 w-full animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-8 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-8 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  )
}
