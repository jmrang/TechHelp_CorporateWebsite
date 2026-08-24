// Landing page: hero, social proof, services overview, impact stats,
// featured case studies, testimonials, pricing and a closing CTA.
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Hero from '../components/sections/Hero'
import LogoCloud from '../components/sections/LogoCloud'
import StatsCounter from '../components/sections/StatsCounter'
import TestimonialCarousel from '../components/sections/TestimonialCarousel'
import PricingTable from '../components/sections/PricingTable'
import CTASection from '../components/sections/CTASection'
import ServiceCard from '../components/sections/ServiceCard'
import CaseStudyCard from '../components/sections/CaseStudyCard'
import services from '../data/services.json'
import caseStudies from '../data/caseStudies.json'
import pricing from '../data/pricing.json'
import usePageTitle from '../hooks/usePageTitle'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { staggerContainer } from '../utils/animations'

export default function Home() {
  usePageTitle()
  const reveal = useScrollAnimation()

  return (
    <PageWrapper>
      <Hero />
      <LogoCloud />

      {/* Services overview */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Full-stack consulting, end to end"
            subtitle="From strategy through design, engineering and operations — one senior team owns your outcome."
            className="mb-14"
          />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {/* First three services; the full breakdown lives on /services */}
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
          <motion.div {...reveal} className="mt-12 text-center">
            <Button to="/services" variant="secondary">
              Explore all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>
        </Container>
      </section>

      <StatsCounter />

      {/* Featured case studies */}
      <section className="bg-slate-50/60 py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Featured work"
              title="Outcomes we're proud of"
              subtitle="A sample of recent engagements — every one shipped, measured and still in production."
            />
            <Button to="/case-studies" variant="secondary" size="sm" className="shrink-0">
              View all work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8"
          >
            {caseStudies.slice(0, 2).map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </motion.div>
        </Container>
      </section>

      <TestimonialCarousel />

      {/* Pricing */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent engagement tiers"
            subtitle="Fixed-scope projects or long-term partnerships — no hourly billing surprises. Every tier starts with a free consultation."
            className="mb-16"
          />
          <PricingTable plans={pricing} />
        </Container>
      </section>

      <CTASection />
    </PageWrapper>
  )
}
