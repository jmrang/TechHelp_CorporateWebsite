// Three-tier pricing table. The featured tier is visually elevated and dark.
// Data comes from pricing.json — see README for how to edit tiers.
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export default function PricingTable({ plans }) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8"
    >
      {plans.map((plan) => (
        <motion.div
          key={plan.id}
          variants={fadeInUp}
          className={`relative flex flex-col rounded-2xl p-8 ${
            plan.featured
              ? 'bg-slate-900 text-white shadow-2xl ring-1 ring-slate-900 lg:-my-3 lg:py-11'
              : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-300'
          }`}
        >
          {plan.featured && plan.badge && (
            <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-sm">
              {plan.badge}
            </Badge>
          )}

          <h3
            className={`text-lg font-semibold ${plan.featured ? 'text-white' : 'text-slate-900'}`}
          >
            {plan.name}
          </h3>
          <p className={`mt-1.5 text-sm ${plan.featured ? 'text-slate-400' : 'text-slate-600'}`}>
            {plan.description}
          </p>

          <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
            <span
              className={`text-4xl font-bold tracking-tight ${
                plan.featured ? 'text-white' : 'text-slate-900'
              }`}
            >
              {plan.price}
            </span>
            <span className={`text-sm ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>
              {plan.priceNote}
            </span>
          </p>

          <ul className="mt-8 flex-1 space-y-3.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check
                  className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? 'text-indigo-400' : 'text-indigo-600'}`}
                  aria-hidden="true"
                />
                <span className={plan.featured ? 'text-slate-300' : 'text-slate-600'}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Button
            to="/contact"
            variant={plan.featured ? 'primary' : 'secondary'}
            className="mt-8 w-full"
          >
            {plan.ctaLabel}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
