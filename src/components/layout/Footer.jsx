// Site footer: brand, sitemap links, services index, contact details and a
// UI-only newsletter signup. Rendered on every page via RootLayout.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Dribbble,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Container from '../ui/Container'
import company from '../../data/company.json'
import services from '../../data/services.json'

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  Twitter: Twitter,
  GitHub: Github,
  Dribbble: Dribbble,
}

const COMPANY_LINKS = [
  { label: 'About us', to: '/about' },
  { label: 'Case studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

/** Newsletter capture — UI only, no submission endpoint wired up. */
function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false)

  if (subscribed) {
    return (
      <p className="flex items-center gap-2 text-sm text-emerald-400">
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        Thanks — you're on the list!
      </p>
    )
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Monthly notes on shipping better software. No spam, unsubscribe anytime.
      </p>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.4fr] lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="TechHelp home">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-500 text-lg font-extrabold text-white">
                T
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                TechHelp<span className="text-indigo-400">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A software consulting company helping startups and enterprises design, build and
              scale world-class products since {company.founded}.
            </p>
            <div className="mt-6 flex gap-3">
              {company.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform]
                if (!Icon) return null
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    aria-label={social.platform}
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-800 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company links */}
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services links (deep links into Services page anchors) */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#service-${service.id}`}
                    className="transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
                <span>
                  {company.address[0]}
                  <br />
                  {company.address[1]}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
                <a
                  href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
                  className="transition-colors hover:text-white"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-white">
                  {company.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} TechHelp Software Consulting LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
