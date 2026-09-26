import Link from 'next/link'

type BaseProps = {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
}

type ButtonAsLink = BaseProps & {
  href: string
  /** Open in a new tab, e.g. for PDFs or other sites */
  external?: boolean
  onClick?: never
  type?: never
}

type ButtonAsButton = BaseProps & {
  href?: never
  external?: never
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

type ButtonProps = ButtonAsLink | ButtonAsButton

const variantClasses: Record<NonNullable<BaseProps['variant']>, string> = {
  primary: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900',
  outline:
    'border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white',
}

const base =
  'group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5'

export default function Button({
  variant = 'primary',
  children,
  className = '',
  href,
  external,
  onClick,
  type = 'button',
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
