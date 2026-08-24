// Auto-advancing testimonial carousel with manual controls; pauses on hover.
// Slides transition directionally based on which way the user navigated.
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import testimonials from '../../data/testimonials.json'

const AUTO_ADVANCE_MS = 6500

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction >= 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction >= 0 ? -48 : 48 }),
}

export default function TestimonialCarousel() {
  // [activeIndex, direction] — direction drives the slide animation.
  const [[index, direction], setActive] = useState([0, 0])
  const [paused, setPaused] = useState(false)

  const paginate = useCallback((step) => {
    setActive(([current]) => [(current + step + testimonials.length) % testimonials.length, step])
  }, [])

  const goTo = (target) => {
    setActive(([current]) => [target, target > current ? 1 : -1])
  }

  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(() => paginate(1), AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, index, paginate])

  const testimonial = testimonials[index]

  return (
    <section className="bg-slate-50/60 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Client love"
          title="Don't take our word for it"
          subtitle="Founders, CTOs and product leads on what it's like to build with TechHelp."
          className="mb-14"
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto h-10 w-10 text-indigo-200" aria-hidden="true" />

          {/* Fixed min-height keeps controls stable between quotes of different lengths */}
          <div className="mt-6 min-h-[260px] sm:min-h-[230px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-center"
              >
                <div
                  className="flex justify-center gap-1"
                  aria-label={`Rated ${testimonial.rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, star) => (
                    <Star
                      key={star}
                      className={
                        star < testimonial.rating
                          ? 'h-5 w-5 fill-amber-400 text-amber-400'
                          : 'h-5 w-5 fill-slate-200 text-slate-200'
                      }
                    />
                  ))}
                </div>

                <blockquote className="mt-5 text-xl leading-relaxed font-medium text-slate-900 sm:text-2xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-7 flex items-center justify-center gap-3">
                  <Avatar name={testimonial.name} size="lg" />
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-slate-900">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-slate-500">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Prev / next controls */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-4 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all hover:-translate-x-0.5 hover:text-indigo-600 lg:-left-16 sm:grid"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-4 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all hover:translate-x-0.5 hover:text-indigo-600 lg:-right-16 sm:grid"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((item, dotIndex) => (
              <button
                key={item.name}
                type="button"
                onClick={() => goTo(dotIndex)}
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIndex === index ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
