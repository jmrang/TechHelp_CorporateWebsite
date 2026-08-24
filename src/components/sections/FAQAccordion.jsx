// Single-open FAQ accordion with smooth height transitions.
// Pass `items` (array of { question, answer }) — content comes from faqs.json.
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQAccordion({ items }) {
  // One panel open at a time; -1 means all closed.
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
      {items.map((item, itemIndex) => {
        const isOpen = openIndex === itemIndex

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : itemIndex)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${itemIndex}`}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50"
            >
              <span className="text-base font-semibold text-slate-900">{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-indigo-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${itemIndex}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
