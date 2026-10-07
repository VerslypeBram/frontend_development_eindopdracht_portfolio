interface SectionHeadingProps {
  /** Small uppercase label above the heading (not a heading itself) */
  eyebrow: string
  title: React.ReactNode
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  className = '',
}: SectionHeadingProps) {
  return (
    <>
      <p className="mb-3 text-sm font-semibold tracking-wider text-amber-700 uppercase dark:text-amber-500">
        {eyebrow}
      </p>
      <h2
        className={`font-heading text-4xl font-bold tracking-tight text-balance text-neutral-900 md:text-5xl dark:text-white ${className}`}
      >
        {title}
      </h2>
    </>
  )
}
