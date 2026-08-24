// About page: company story, values grid, milestone timeline and team grid.
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Container from '../components/ui/Container'
import CoverArt from '../components/ui/CoverArt'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import SectionHeading from '../components/ui/SectionHeading'
import CTASection from '../components/sections/CTASection'
import company from '../data/company.json'
import team from '../data/team.json'
import usePageTitle from '../hooks/usePageTitle'
import { getIcon } from '../utils/icons'
import { fadeInUp, staggerContainer } from '../utils/animations'

export default function About() {
  usePageTitle('About us')

  return (
    <PageWrapper>
      {/* Story */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <Container>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-14 lg:grid-cols-2"
          >
            <motion.div variants={fadeInUp}>
              <Badge>Our story</Badge>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Senior hands. Honest advice. Software that ships.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                TechHelp was founded in {company.founded} on a simple frustration: too much
                consulting produced slideware instead of software. We set out to build the
                opposite — a small, senior team that codes, designs and ships alongside its
                clients.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Twelve years later the model hasn't changed. Every engagement is staffed by
                engineers and designers who have run their own products, every demo is of working
                software, and every project ends with our clients able to run it without us.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <CoverArt
                seed="about-story"
                icon="lightbulb"
                label="San Francisco · Lisbon · Remote-first"
                className="aspect-[4/3] rounded-3xl shadow-2xl shadow-indigo-100"
              />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-slate-50/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Principles"
            title="How we work"
            subtitle="Four values that decide everything from which projects we take to how we run sprints."
            className="mb-14"
          />
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {company.values.map((value) => {
              const Icon = getIcon(value.icon)
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Milestones"
            title="Twelve years of shipping"
            className="mb-14"
          />
          <motion.ol
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative mx-auto max-w-3xl border-l-2 border-slate-200 pl-8 sm:pl-10"
          >
            {company.milestones.map((milestone) => (
              <motion.li key={milestone.year} variants={fadeInUp} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[41px] h-3.5 w-3.5 rounded-full border-[3px] border-indigo-600 bg-white sm:-left-[49px]"
                />
                <Badge variant="dark">{milestone.year}</Badge>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{milestone.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{milestone.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-slate-50/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="The people behind the work"
            subtitle="No account managers, no bait-and-switch — the specialists you meet in the first call are the ones who build your product."
            className="mb-14"
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((member) => (
              <motion.article
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Placeholder headshot — swap for real photos or CMS URLs */}
                <div className="relative">
                  <CoverArt seed={member.name} className="aspect-square" />
                  <span className="absolute inset-x-0 -bottom-6 flex justify-center">
                    <Avatar name={member.name} size="xl" className="ring-4 ring-white" />
                  </span>
                </div>
                <div className="p-5 pt-8 text-center">
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-indigo-600">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <a
                      href={member.socials.linkedin}
                      aria-label={`${member.name} on LinkedIn`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.socials.twitter}
                      aria-label={`${member.name} on Twitter/X`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={member.socials.github}
                      aria-label={`${member.name} on GitHub`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTASection
        eyebrow="Join us or work with us"
        title="Like how we think?"
        subtitle="We're always glad to meet teams who care about shipping well — as clients, partners or future colleagues."
        primaryLabel="Work with us"
        secondaryLabel="Explore our services"
        secondaryTo="/services"
      />
    </PageWrapper>
  )
}
