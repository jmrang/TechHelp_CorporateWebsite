// Animated impact counters — numbers count up once when scrolled into view.
import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import Container from '../ui/Container'
import company from '../../data/company.json'
import { EASE, fadeInUp, staggerContainer } from '../../utils/animations'

/** Counts from zero to `value` the first time it enters the viewport. */
function Counter({ value, suffix }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return undefined

    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={ref}>
      {displayValue}
      <span className="text-indigo-300">{suffix}</span>
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-3xl bg-slate-900 p-10 sm:p-14 lg:grid-cols-4"
        >
          {company.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
