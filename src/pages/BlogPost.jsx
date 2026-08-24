// Blog post detail: rendered structured content, author bio and related posts.
// Route: /blog/:slug — content blocks come from blogPosts.json (CMS-shaped).
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, Check, Clock, Quote } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Container from '../components/ui/Container'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import CoverArt from '../components/ui/CoverArt'
import BlogCard from '../components/sections/BlogCard'
import CTASection from '../components/sections/CTASection'
import NotFound from './NotFound'
import blogPosts from '../data/blogPosts.json'
import usePageTitle from '../hooks/usePageTitle'
import { formatDate } from '../utils/format'
import { fadeInUp, staggerContainer } from '../utils/animations'

/** Renders one content block from the post's `content` array. */
function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="mt-10 mb-3 text-2xl font-bold tracking-tight text-slate-900">{block.text}</h2>
      )
    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-indigo-500 pl-5 text-lg leading-relaxed font-medium text-slate-800 italic">
          <Quote className="mb-2 h-5 w-5 text-indigo-300" aria-hidden="true" />
          {block.text}
        </blockquote>
      )
    case 'list':
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-relaxed text-slate-600">
              <Check className="mt-1 h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'p':
    default:
      return <p className="my-5 leading-relaxed text-slate-700">{block.text}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  // Hooks must run before any early return.
  usePageTitle(post ? post.title : 'Post not found')

  // Unknown slug → reuse the 404 page.
  if (!post) return <NotFound />

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => (b.category === post.category ? 1 : 0) - (a.category === post.category ? 1 : 0))
    .slice(0, 3)

  return (
    <PageWrapper>
      {/* Article header */}
      <section className="pt-28 pb-10 sm:pt-36">
        <Container>
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-all hover:gap-2.5 hover:text-indigo-500"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All articles
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6">
              <Badge>{post.category}</Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            >
              {post.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-5 text-lg leading-relaxed text-slate-600">
              {post.excerpt}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6"
            >
              <span className="flex items-center gap-3">
                <Avatar name={post.author.name} size="md" />
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {post.author.name}
                  </span>
                  <span className="block text-xs text-slate-500">{post.author.role}</span>
                </span>
              </span>
              <span className="flex items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.readTime} min read
                </span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="mx-auto mt-10 max-w-4xl"
          >
            <CoverArt seed={post.slug} className="aspect-[21/9] rounded-3xl shadow-xl" />
          </motion.div>
        </Container>
      </section>

      {/* Article body */}
      <article className="pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {post.content.map((block) => (
              <ContentBlock key={block.text?.slice(0, 40) ?? block.items?.[0]} block={block} />
            ))}
          </div>

          {/* Author bio */}
          <aside className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row">
              <Avatar name={post.author.name} size="xl" />
              <div>
                <p className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
                  Written by
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {post.author.name}
                  <span className="ml-2 text-sm font-normal text-slate-500">{post.author.role}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.authorBio}</p>
              </div>
            </div>
          </aside>
        </Container>
      </article>

      {/* Related posts */}
      <section className="bg-slate-50/60 py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Keep reading
            </h2>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-all hover:gap-2.5 hover:text-indigo-500"
            >
              View all articles
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </motion.div>
        </Container>
      </section>

      <CTASection
        eyebrow="Apply it to your product"
        title="Turn ideas into shipped software"
        subtitle="If this article touched on a problem you have right now, let's talk about the fix."
      />
    </PageWrapper>
  )
}
