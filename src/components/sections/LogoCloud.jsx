// "Trusted by" strip of client wordmarks (placeholder logos — see README).
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import company from '../../data/company.json'
import { getIcon } from '../../utils/icons'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export default function LogoCloud() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-10">
      <Container>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase"
        >
          Trusted by product teams at
        </motion.p>

        <motion.ul
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {company.clients.map((client) => {
            const Icon = getIcon(client.icon)
            return (
              <motion.li key={client.name} variants={fadeInUp}>
                <span className="flex cursor-default items-center gap-2 text-lg font-bold text-slate-400 transition-all duration-300 hover:scale-105 hover:text-slate-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {client.name}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
      </Container>
    </section>
  )
}
