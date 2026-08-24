// Gradient initials avatar used anywhere a photo would appear in production
// (testimonials, blog authors, team). Swap for real headshots or CMS URLs later.
import { gradientFor } from '../../utils/gradients'

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
}

function initialsFor(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export default function Avatar({ name, size = 'md', className = '' }) {
  return (
    <span
      aria-hidden="true"
      title={name}
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full bg-linear-to-br font-semibold text-white ${gradientFor(name)} ${SIZES[size]} ${className}`}
    >
      {initialsFor(name)}
    </span>
  )
}
