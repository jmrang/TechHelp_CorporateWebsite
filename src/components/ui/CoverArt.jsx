/**
 * Placeholder cover visual standing in for photography and illustration.
 *
 * Renders a deterministic brand gradient with a subtle grid texture and an
 * optional oversized watermark icon. Replace with real imagery or CMS-provided
 * URLs when moving to production — see README.md ("Placeholder assets").
 */
import { gradientFor } from '../../utils/gradients'
import { getIcon } from '../../utils/icons'

export default function CoverArt({
  seed,
  icon,
  label,
  className = '',
  iconClassName = '',
}) {
  const Icon = icon ? getIcon(icon) : null

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-linear-to-br ${gradientFor(seed)} ${className}`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay" />
      {Icon && (
        <Icon
          strokeWidth={1}
          className={`absolute -right-6 -bottom-6 opacity-25 drop-shadow-lg ${iconClassName || 'h-40 w-40'}`}
        />
      )}
      {label && (
        <span className="absolute bottom-4 left-4 max-w-[80%] truncate text-xs font-semibold tracking-wide text-white/90">
          {label}
        </span>
      )}
    </div>
  )
}
