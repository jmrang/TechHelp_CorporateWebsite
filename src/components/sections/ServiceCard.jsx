// Service summary card — compact on Home, with feature list on the Services
// page (`showFeatures`). Doubles as the anchor target for deep links.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { getIcon } from '../../utils/icons'
import { fadeInUp } from '../../utils/animations'

export default function ServiceCard({ service, showFeatures = false }) {
  const Icon = getIcon(service.icon)

  return (
    <motion.article
      id={`service-${service.id}`}
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative flex h-full scroll-mt-24 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-indigo-200 hover:shadow-lg sm:p-8"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <h3 className="mt-5 text-lg font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {showFeatures ? service.description : service.tagline}
      </p>

      {showFeatures && (
        <ul className="mt-6 space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/services"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-indigo-600 transition-all duration-200 group-hover:gap-2.5 group-hover:text-indigo-500"
      >
        Learn more
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.article>
  )
}
