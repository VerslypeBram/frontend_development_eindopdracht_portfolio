export function HeroSkeleton() {
  return (
    <section className="min-h-hero relative mx-auto flex w-full max-w-6xl animate-pulse flex-col items-center justify-center gap-16 px-6 md:flex-row">
      <div className="flex w-full flex-1 flex-col items-start gap-6">
        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="h-16 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="h-24 w-full rounded bg-gray-200 dark:bg-gray-800"></div>
        <div className="mt-2 flex gap-4">
          <div className="h-12 w-36 rounded bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-12 w-32 rounded bg-gray-200 dark:bg-gray-800"></div>
        </div>
      </div>
      <div className="relative h-80 w-72 shrink-0 rounded-2xl bg-gray-200 md:h-96 md:w-80 dark:bg-gray-800"></div>
    </section>
  )
}

export function AboutMeSkeleton() {
  return (
    <section className="w-full animate-pulse bg-neutral-100 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-3 h-4 w-24 rounded bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-12 w-64 rounded bg-gray-200 dark:bg-gray-800"></div>
        </div>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full justify-center lg:w-1/2 lg:justify-start">
            <div className="h-96 w-72 rounded-2xl bg-gray-200 dark:bg-gray-800"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="h-64 w-full rounded-2xl bg-gray-200 dark:bg-gray-800"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SkillsSkeleton() {
  return (
    <section className="w-full animate-pulse bg-white py-24 dark:bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-3 h-4 w-24 rounded bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-12 w-64 rounded bg-gray-200 dark:bg-gray-800"></div>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800"></div>
        </div>
      </div>
    </section>
  )
}

export function ProjectsSkeleton() {
  return (
    <section className="w-full animate-pulse bg-neutral-100 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-3 h-4 w-24 rounded bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-12 w-64 rounded bg-gray-200 dark:bg-gray-800"></div>
        </div>
        <div className="flex gap-6 overflow-hidden">
          <div className="h-125 w-75 shrink-0 rounded-2xl bg-gray-200 md:w-100 dark:bg-gray-800"></div>
          <div className="hidden h-125 w-75 shrink-0 rounded-2xl bg-gray-200 md:block md:w-100 dark:bg-gray-800"></div>
          <div className="hidden h-125 w-75 shrink-0 rounded-2xl bg-gray-200 md:w-100 lg:block dark:bg-gray-800"></div>
        </div>
      </div>
    </section>
  )
}
