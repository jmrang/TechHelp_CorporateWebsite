/**
 * Centralized Framer Motion variants shared across every page and component.
 * Keeping the motion language in one file keeps animation timing consistent
 * site-wide and makes global feel/timing tweaks a one-file change.
 */

/** Signature easing curve — fast start, gentle settle. */
export const EASE = [0.16, 1, 0.3, 1]

/** Shared viewport config: reveal once, when ~20% of the element is visible. */
export const viewportOnce = { once: true, amount: 0.2 }

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

/**
 * Parent container that staggers its children's `hidden → visible`
 * transitions. Children should use one of the item variants above.
 */
export const staggerContainer = (stagger = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/** Page-level route transition (used by PageWrapper). */
export const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}
