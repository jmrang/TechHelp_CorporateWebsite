/** Formatting helpers shared across pages. */

/** Formats an ISO date string (e.g. "2026-07-18") as "Jul 18, 2026". */
export function formatDate(isoDate) {
  // Force local-time parsing so dates never shift by a day across time zones.
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00`))
}
