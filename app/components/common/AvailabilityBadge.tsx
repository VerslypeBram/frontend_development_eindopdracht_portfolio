/** Pill with a green status dot, e.g. "Looking for an internship · Feb–Jun 2027" */
export default function AvailabilityBadge({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300 ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {children}
    </p>
  )
}
