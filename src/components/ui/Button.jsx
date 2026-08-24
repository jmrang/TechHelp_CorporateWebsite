/**
 * Shared button primitive — the only way buttons are rendered on the site.
 *
 * Renders a React Router <Link> when `to` is given, an anchor when `href` is
 * given, and a native <button> otherwise, with identical styling for all three.
 */
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary:
    'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 hover:shadow-md hover:-translate-y-px active:translate-y-0',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50',
  ghost: 'text-indigo-600 hover:bg-indigo-50',
  /* Variants designed to sit on dark/gradient surfaces (CTA banners, footer). */
  light: 'bg-white text-indigo-700 shadow-sm hover:bg-indigo-50',
  'on-dark': 'border border-white/40 text-white hover:border-white/70 hover:bg-white/10',
}

const SIZES = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    // Base
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-60',
    // Modifiers
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
