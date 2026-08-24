/**
 * Deterministic gradient assignment for placeholder visuals.
 *
 * Every cover image and avatar derives its colors from a stable seed string
 * (a slug or person name), so the mock content looks intentionally designed
 * without requiring any binary assets. Swap these components for real imagery
 * or CMS-provided URLs later — see README.md ("Placeholder assets").
 */

const PALETTES = [
  ['from-indigo-500', 'to-cyan-400'],
  ['from-violet-500', 'to-fuchsia-400'],
  ['from-blue-600', 'to-emerald-400'],
  ['from-fuchsia-500', 'to-orange-300'],
  ['from-cyan-500', 'to-blue-600'],
  ['from-emerald-500', 'to-teal-300'],
  ['from-orange-500', 'to-amber-300'],
  ['from-indigo-600', 'to-violet-400'],
]

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000
  }
  return hash
}

/** Returns a Tailwind gradient pair, e.g. "from-indigo-500 to-cyan-400". */
export function gradientFor(seed) {
  return PALETTES[hashString(String(seed)) % PALETTES.length].join(' ')
}
