// Case studies index: filterable grid of client work by industry.
import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/layout/PageWrapper'
import Container from '../components/ui/Container'
import Badge from '../components/ui/Badge'
import CaseStudyCard from '../components/sections/CaseStudyCard'
import CTASection from '../components/sections/CTASection'
import caseStudies from '../data/caseStudies.json'
import usePageTitle from '../hooks/usePageTitle'
import { EASE } from '../utils/animations'

export default function CaseStudies() {
  usePageTitle('Case Studies')

  const industries = ['All', ...new Set(caseStudies.map((study) => study.industry))]
  const [activeIndustry, setActiveIndustry] = useState('All')

  const visibleStudies =
    activeIndustry === 'All'
      ? caseStudies
      : caseStudies.filter((study) => study.industry === activeIndustry)

  return (
    <PageWrapper>
      {/* Intro + industry filter */}
      <section className="pt-28 pb-14 sm:pt-36">
        <Container>
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <Badge>Our work</Badge>
            </motion.span>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
            >
              Proof over promises
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600"
            >
              Every engagement below shipped to production and is still running today. Filter by
              industry to find the story closest to yours.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mt-10 flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Filter case studies by industry"
            >
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => setActiveIndustry(industry)}
                  aria-pressed={activeIndustry === industry}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                    activeIndustry === industry
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Cards grid */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <motion.div
            layout
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="visible" /* animate (not whileInView) so filters re-run the stagger */
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {visibleStudies.map((study) => (
              <CaseStudyCard key={study.slug} caseStudy={study} />
            ))}
          </motion.div>
        </Container>
      </section>

      <CTASection
        title="Want results like these?"
        subtitle="Every project above started with a free consultation and an honest conversation about fit."
      />
    </PageWrapper>
  )
}
