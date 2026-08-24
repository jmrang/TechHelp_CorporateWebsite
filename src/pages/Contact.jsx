// Contact page: validated form (mock submission), company contact details,
// an API-free map placeholder and a "what happens next" reassurance section.
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Container from '../components/ui/Container'
import Badge from '../components/ui/Badge'
import SectionHeading from '../components/ui/SectionHeading'
import ContactForm from '../components/sections/ContactForm'
import MapPlaceholder from '../components/sections/MapPlaceholder'
import FAQAccordion from '../components/sections/FAQAccordion'
import company from '../data/company.json'
import faqs from '../data/faqs.json'
import usePageTitle from '../hooks/usePageTitle'
import { fadeInUp, staggerContainer } from '../utils/animations'

/** "What happens after you submit" reassurance steps. */
const NEXT_STEPS = [
  {
    title: 'We read it properly',
    detail: 'Your message lands with a senior consultant — never a ticket queue.',
  },
  {
    title: 'Reply within one business day',
    detail: 'Expect a thoughtful response, not an auto-responder.',
  },
  {
    title: 'Free 30-minute consultation',
    detail: 'A no-obligation call to map your goals to the right approach.',
  },
]

export default function Contact() {
  usePageTitle('Contact')

  // Reassurance FAQ: process-focused subset of the global FAQ list.
  const processFaqs = faqs.filter((faq) => faq.category === 'Process').slice(0, 3)

  return (
    <PageWrapper>
      {/* Intro */}
      <section className="pt-28 pb-12 sm:pt-36">
        <Container>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <motion.span variants={fadeInUp}>
              <Badge>Contact</Badge>
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
            >
              Let's build something together
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-5 text-lg leading-relaxed text-slate-600">
              Tell us about your project and we'll respond within one business day. Prefer email?
              Reach us directly at{' '}
              <a
                href={`mailto:${company.email}`}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {company.email}
              </a>
              .
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Form + info */}
      <section className="pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {/* Left: reassurance steps + the form itself */}
            <div>
              <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
                <h2 className="text-sm font-semibold tracking-wider text-indigo-700 uppercase">
                  What happens after you submit
                </h2>
                <ol className="mt-4 space-y-4">
                  {NEXT_STEPS.map((step, index) => (
                    <li key={step.title} className="flex gap-3.5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-900">{step.title}</span>
                        <span className="block text-sm text-slate-600">{step.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <ContactForm />
            </div>

            {/* Right: contact info, map, mini FAQ */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-semibold text-slate-900">Company details</h2>
                <ul className="mt-5 space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium text-slate-900">Office</span>
                      <span className="block text-slate-600">
                        {company.address[0]}, {company.address[1]}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium text-slate-900">Phone</span>
                      <a
                        href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
                        className="block text-slate-600 hover:text-indigo-600"
                      >
                        {company.phone}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium text-slate-900">Email</span>
                      <a
                        href={`mailto:${company.email}`}
                        className="block text-slate-600 hover:text-indigo-600"
                      >
                        {company.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-medium text-slate-900">Business hours</span>
                      {company.hours.map((line) => (
                        <span key={line} className="block text-slate-600">
                          {line}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>

              <MapPlaceholder />

              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Good to know"
                  title="Before you hit send"
                  level={3}
                  className="mb-6"
                />
                <FAQAccordion items={processFaqs} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  )
}
