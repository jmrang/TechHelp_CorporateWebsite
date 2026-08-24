// Shared chrome rendered around every route: sticky navbar → routed content → footer.
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function RootLayout() {
  const location = useLocation()

  // Smooth-scroll to #hash targets (e.g. footer links into /services#service-x).
  // The delay accounts for the page-exit animation before the target mounts.
  useEffect(() => {
    if (!location.hash) return undefined
    const timer = setTimeout(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 400)
    return () => clearTimeout(timer)
  }, [location])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
