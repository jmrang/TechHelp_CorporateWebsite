// Services page: detailed service breakdown, pricing table and FAQ accordion.
import { motion } from 'framer-motion'
import PageWrapper from '../components/layout/PageWrapper'
import Container from '../components/ui/Container'
import Badge from '../components/ui/Badge'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/sections/ServiceCard'
import PricingTable from '../components/sections/PricingTable'
import FAQAccordion from '../components/sections/FAQAccordion'
import CTASection from '../components/sections/CTASection'
import services from '../data/services.json'
import pricing from '../data/pricing.json'
import faqs from '../data/faqs.json'
import usePageTitle from '../hooks/usePageTitle'

export default function Services() {
  usePageTitle('Services')

  return (
    <PageWrapper>
      {/* Page intro */}
      <section className="pt-28 pb-16 sm:pt-36">
        <Container>
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <Badge>Services</Badge>
            </motion.span>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
            >
              Everything you need to ship great software
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mt-5 text-lg leading-relaxed text-slate-600"
            >
              Five focused practices, one accountable team. Engage us for a single audit or the
              full journey from idea to operations.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Detailed service cards */}
      <section className="pb-20">
        <Container>
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} showFeatures />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 bg-slate-50/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Transparent tiers, no surprises"
            subtitle="Typical engagement ranges based on team size and scope. After a free consultation you receive a fixed proposal — the number we sign is the number you pay."
            className="mb-20"
          />
          <PricingTable plans={pricing} />
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            subtitle="The questions nearly every client asks before kickoff — answered up front."
            className="mb-12"
          />
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>

      <CTASection
        title="Not sure which tier fits?"
        subtitle="Book a free consultation — we'll map your goals to the right engagement model in thirty minutes, even if that answer is 'don't hire us yet.'"
      />
    </PageWrapper>
  )
}
