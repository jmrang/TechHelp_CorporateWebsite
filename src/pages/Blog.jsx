// Blog index: searchable, category-filterable grid of posts.
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Container from '../components/ui/Container'
import Badge from '../components/ui/Badge'
import BlogCard from '../components/sections/BlogCard'
import CTASection from '../components/sections/CTASection'
import blogPosts from '../data/blogPosts.json'
import usePageTitle from '../hooks/usePageTitle'
import { EASE } from '../utils/animations'

export default function Blog() {
  usePageTitle('Blog')

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...new Set(blogPosts.map((post) => post.category))],
    [],
  )

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <PageWrapper>
      {/* Intro + controls */}
      <section className="pt-28 pb-14 sm:pt-36">
        <Container>
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <Badge>Blog</Badge>
            </motion.span>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
            >
              Notes from the engine room
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600"
            >
              Practical writing on engineering leadership, design systems, cloud costs and the
              lessons our project work keeps teaching us.
            </motion.p>

            {/* Search */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="relative mt-10 w-full max-w-md"
            >
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-search"
                type="search"
                placeholder="Search articles…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-900 transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </motion.div>

            {/* Category filter */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mt-5 flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Filter articles by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                    activeCategory === category
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Posts grid */}
      <section className="pb-20 sm:pb-24">
        <Container>
          {visiblePosts.length > 0 ? (
            <motion.div
              layout
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              initial="hidden"
              animate="visible" /* animate (not whileInView) so filtering re-runs the stagger */
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {visiblePosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
              <p className="text-lg font-semibold text-slate-900">No articles found</p>
              <p className="mt-2 text-sm text-slate-600">
                Try a different search term or category — or ask us directly via the contact page.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All')
                }}
                className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>

      <CTASection
        eyebrow="From reading to doing"
        title="Prefer building to reading?"
        subtitle="If any of these ideas apply to your product, we'd enjoy turning them into a plan."
      />
    </PageWrapper>
  )
}
