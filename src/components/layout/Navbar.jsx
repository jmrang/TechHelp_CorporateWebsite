// Sticky site navigation: active-route indication, scroll-aware backdrop blur,
// and an animated mobile menu below the md breakpoint.
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const desktopLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-600'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

const mobileLinkClass = ({ isActive }) =>
  `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-600'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Track page scroll for the elevated header treatment.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-white/70 backdrop-blur-sm'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="TechHelp home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-500 text-lg font-extrabold text-white shadow-sm">
              T
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              TechHelp<span className="text-indigo-600">.</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={desktopLinkClass}>
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" size="sm" className="ml-3">
              Book a Consultation
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.to} to={link.to} className={mobileLinkClass}>
                    {link.label}
                  </NavLink>
                ))}
                <Button to="/contact" className="mt-3 w-full">
                  Book a Consultation
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
