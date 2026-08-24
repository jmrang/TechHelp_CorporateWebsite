// Home hero: headline, dual CTAs and an animated product-art composition with
// floating stat cards. Entrance is staggered; the art drifts on a slow loop.
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Star, TrendingUp, Users } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import CoverArt from '../ui/CoverArt'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Ambient background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />
        <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute top-40 left-[-12%] h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
      </div>

      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-14 lg:grid-cols-2"
        >
          {/* Copy */}
          <motion.div variants={fadeInUp} className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
              </span>
              Accepting new projects for Q4 2026
            </span>

            <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Software consulting that moves your business{' '}
              <span className="bg-linear-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                forward
              </span>
              .
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              TechHelp partners with startups and enterprises to design, build and scale
              world-class web and mobile products — from first prototype to planet-scale platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact" size="lg">
                Book a Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/case-studies" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex gap-0.5" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">4.9/5</span> average across 80+
                client reviews
              </p>
            </div>
          </motion.div>

          {/* Visual composition */}
          <motion.div
            variants={fadeInUp}
            className="relative mx-auto hidden w-full max-w-lg sm:block lg:max-w-none"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <CoverArt
                seed="hero-showcase"
                icon="code2"
                className="aspect-[4/3] w-full rotate-1 rounded-3xl shadow-2xl shadow-indigo-200"
              />
            </motion.div>

            {/* Floating metric card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-10 -left-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-8"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900">+38%</span>
                  <span className="block text-xs text-slate-500">conversion uplift</span>
                </span>
              </div>
            </motion.div>

            {/* Floating delivery card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -right-2 bottom-24 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-6"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-9 w-9 text-indigo-600" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold text-slate-900">Deployed weekly</span>
                  <span className="block text-xs text-slate-500">CI/CD · zero-downtime</span>
                </span>
              </div>
            </motion.div>

            {/* Floating team card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -bottom-6 left-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900">120+ projects</span>
                  <span className="block text-xs text-slate-500">delivered since 2014</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
