/**
 * Tiny convenience wrapper around Framer Motion's built-in scroll-reveal props.
 *
 * Spread it onto any motion element for a one-shot fade/slide-in when it
 * enters the viewport:
 *
 *   const reveal = useScrollAnimation()
 *   <motion.div {...reveal}>…</motion.div>
 *
 * Pass `{ variant }` to swap the motion variant or
 * `{ viewport }` to tweak when the reveal triggers.
 */
import { fadeInUp, viewportOnce } from '../utils/animations'

export default function useScrollAnimation({ variant = fadeInUp, viewport } = {}) {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { ...viewportOnce, ...viewport },
    variants: variant,
  }
}
