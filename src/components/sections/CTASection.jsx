// Reusable closing call-to-action banner used near the foot of most pages.
// Sits on a brand-gradient panel with decorative shapes; content is configurable.
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export default function CTASection({
  eyebrow = 'Ready when you are',
  title = 'Ready to start your project?',
  subtitle = 'Tell us where you want to go — we will bring the map, the team and the momentum. Initial consultations are free and come with zero obligation.',
  primaryLabel = 'Book a Consultation',
  primaryTo = '/contact',
  secondaryLabel = 'View Our Work',
  secondaryTo = '/case-studies',
}) {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-600 px-6 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Decorative shapes */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute inset-0 bg-grid-pattern opacity-20 mix-blend-overlay" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold tracking-[0.2em] text-indigo-200 uppercase"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg leading-relaxed text-indigo-100">
              {subtitle}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Button to={primaryTo} variant="light" size="lg">
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryTo && (
                <Button to={secondaryTo} variant="on-dark" size="lg">
                  {secondaryLabel}
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
