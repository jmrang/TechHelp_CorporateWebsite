/**
 * Standard section header enforcing the site-wide content rhythm:
 * eyebrow label → heading → supporting subtitle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  level = 2,
  className = '',
}) {
  const Tag = `h${level}`
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-indigo-600 uppercase">
          <span aria-hidden="true" className="h-px w-6 bg-indigo-400" />
          {eyebrow}
          {align === 'center' && <span aria-hidden="true" className="h-px w-6 bg-indigo-400" />}
        </span>
      )}
      <Tag className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </Tag>
      {subtitle && <p className="text-lg leading-relaxed text-slate-600">{subtitle}</p>}
    </div>
  )
}
