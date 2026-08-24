/** Small pill label used for categories, tags and highlight flags. */
const VARIANTS = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  accent: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  light: 'bg-white/90 text-slate-700 ring-white/60 backdrop-blur-sm',
  dark: 'bg-slate-900 text-white ring-slate-900',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export default function Badge({
  variant = 'accent',
  size = 'md',
  className = '',
  children,
}) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold tracking-wide uppercase ring-1 ${VARIANTS[variant]} ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  )
}
