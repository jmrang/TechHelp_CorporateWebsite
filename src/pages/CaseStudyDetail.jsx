// Case study detail: challenge → solution → results narrative with key
// metrics, client quote, gallery and related work. Route: /case-studies/:slug
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Container from '../components/ui/Container'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import CoverArt from '../components/ui/CoverArt'
import CaseStudyCard from '../components/sections/CaseStudyCard'
import CTASection from '../components/sections/CTASection'
import NotFound from './NotFound'
import caseStudies from '../data/caseStudies.json'
import usePageTitle from '../hooks/usePageTitle'
import { fadeInUp, staggerContainer } from '../utils/animations'

/** Narrative block used for Challenge / Solution / Results sections. */
function StoryBlock({ label, title, paragraphs, accent = false }) {
  return (
    <div className="mt-14 first:mt-0">
      <p className="text-xs font-semibold tracking-[0.2em] text-indigo-600 uppercase">{label}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {accent ? (
        <div className="mt-5 space-y-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 sm:p-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="leading-relaxed text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = caseStudies.find((item) => item.slug === slug)

  // Hooks must run before any early return.
  usePageTitle(study ? `${study.client} case study` : 'Page not found')

  // Unknown slug → reuse the 404 page rather than a bespoke empty state.
  if (!study) return <NotFound />

  // Related work: prefer same industry, then anything sharing a service.
  const related = caseStudies
    .filter((item) => item.slug !== study.slug)
    .sort((a, b) => {
      const scoreFor = (item) =>
        (item.industry === study.industry ? 2 : 0) +
        (item.services.some((service) => study.services.includes(service)) ? 1 : 0)
      return scoreFor(b) - scoreFor(a)
    })
    .slice(0, 3)

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-28 pb-12 sm:pt-36">
        <Container>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-all hover:gap-2.5 hover:text-indigo-500"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All case studies
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-2">
              <Badge>{study.industry}</Badge>
              <Badge variant="neutral">{study.year}</Badge>
              <Badge variant="neutral">{study.duration}</Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              {study.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-5 text-lg leading-relaxed text-slate-600">
              {study.summary}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-sm"
            >
              <span>
                <span className="block font-medium text-slate-900">Client</span>
                <span className="text-slate-500">{study.client}</span>
              </span>
              <span>
                <span className="block font-medium text-slate-900">Stack</span>
                <span className="text-slate-500">{study.stack.join(' · ')}</span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mx-auto mt-10 max-w-4xl">
            <CoverArt seed={study.slug} className="aspect-[21/9] rounded-3xl shadow-xl" />
          </motion.div>
        </Container>
      </section>

      {/* Key metrics band */}
      <section className="pb-4">
        <Container>
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 rounded-3xl bg-slate-900 p-10 sm:p-12 lg:grid-cols-4"
          >
            {study.metrics.map((metric) => (
              <motion.div key={metric.label} variants={fadeInUp} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-slate-400 sm:text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Narrative */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <StoryBlock
              label="The challenge"
              title="Where they started"
              paragraphs={study.challenge}
            />
            <StoryBlock
              label="Our solution"
              title="What we built"
              paragraphs={study.solution}
              accent
            />
            <StoryBlock
              label="The results"
              title="What changed"
              paragraphs={study.results}
            />
          </div>
        </Container>
      </section>

      {/* Client quote */}
      <section className="bg-slate-50/60 py-16">
        <Container>
          <figure className="mx-auto max-w-2xl text-center">
            <Quote className="mx-auto h-9 w-9 text-indigo-200" aria-hidden="true" />
            <blockquote className="mt-5 text-xl leading-relaxed font-medium text-slate-900 sm:text-2xl">
              &ldquo;{study.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3">
              <Avatar name={study.quote.name} size="lg" />
              <span className="text-left">
                <span className="block text-sm font-semibold text-slate-900">{study.quote.name}</span>
                <span className="block text-sm text-slate-500">{study.quote.role}</span>
              </span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Gallery (placeholder visuals — swap for real project imagery) */}
      <section className="py-16">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {['Discovery workshop', 'Architecture review', 'Launch day'].map((caption, index) => (
              <CoverArt
                key={caption}
                seed={`${study.slug}-gallery-${index}`}
                label={caption}
                icon="code2"
                className="aspect-[4/3] rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Related case studies */}
      <section className="bg-slate-50/60 py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              More work like this
            </h2>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-all hover:gap-2.5 hover:text-indigo-500"
            >
              View all case studies
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {related.map((item) => (
              <CaseStudyCard key={item.slug} caseStudy={item} />
            ))}
          </motion.div>
        </Container>
      </section>

      <CTASection
        eyebrow="Your project next"
        title={`Facing something similar to ${study.client}'s challenge?`}
        subtitle="We'd love to hear how it looks from your side — the first consultation is free."
      />
    </PageWrapper>
  )
}
