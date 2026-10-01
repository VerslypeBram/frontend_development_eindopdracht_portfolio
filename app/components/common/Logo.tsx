/**
 * Wordmark: "bram verslype" in lowercase with an amber terminal cursor.
 * The cursor blinks a few times on load and then rests (WCAG 2.2.2: nothing
 * may blink for more than five seconds), and not at all under reduced motion.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-heading inline-flex items-end font-bold tracking-tight ${className}`}
    >
      bram verslype
      <span
        aria-hidden="true"
        className="logo-cursor mb-[0.2em] ml-[0.12em] inline-block h-[0.14em] w-[0.55em] rounded-[1px] bg-amber-500"
      />
    </span>
  )
}
