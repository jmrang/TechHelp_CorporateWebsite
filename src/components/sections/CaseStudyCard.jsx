// Card teaser for a case study: gradient cover, industry tag, outcome summary.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'
import CoverArt from '../ui/CoverArt'
import { fadeInUp } from '../../utils/animations'

export default function CaseStudyCard({ caseStudy }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group h-full"
    >
      <Link
        to={`/case-studies/${caseStudy.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <CoverArt seed={caseStudy.slug} label={caseStudy.client} className="aspect-[16/10]" />
          <Badge variant="light" className="absolute top-4 left-4">
            {caseStudy.industry}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
            {caseStudy.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {caseStudy.summary}
          </p>
          <div className="mt-auto flex items-center justify-between pt-6 text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 transition-all duration-200 group-hover:gap-2.5">
              Read case study
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-slate-400">{caseStudy.year}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
