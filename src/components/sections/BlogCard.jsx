// Blog post teaser card: gradient cover, category tag, meta and author row.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import CoverArt from '../ui/CoverArt'
import { fadeInUp } from '../../utils/animations'
import { formatDate } from '../../utils/format'

export default function BlogCard({ post }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <CoverArt seed={post.slug} className="aspect-[16/9]" />
          <Badge variant="light" className="absolute top-4 left-4">
            {post.category}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>

          <h3 className="mt-3 text-lg leading-snug font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="flex items-center gap-2.5">
              <Avatar name={post.author.name} size="sm" />
              <span className="text-sm font-medium text-slate-700">{post.author.name}</span>
            </span>
            <ArrowRight
              className="h-4 w-4 text-indigo-600 transition-all duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
