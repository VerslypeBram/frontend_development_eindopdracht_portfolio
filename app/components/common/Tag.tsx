interface TagProps {
  children: React.ReactNode
  className?: string
}

/** Technology / skill chip used on project cards, project pages and skills */
export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 ${className}`}
    >
      {children}
    </span>
  )
}
