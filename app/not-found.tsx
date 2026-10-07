import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <p className="text-sm font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-500">
        404
      </p>
      <h1 className="font-heading text-3xl font-bold text-balance md:text-4xl">
        Page Not Found
      </h1>
      <p className="max-w-md text-neutral-600 dark:text-neutral-300">
        This page doesn&rsquo;t exist (anymore). Take a look at my projects
        instead.
      </p>
      <Link
        href="/#projects"
        className="mt-4 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Back to Projects
      </Link>
    </main>
  )
}
