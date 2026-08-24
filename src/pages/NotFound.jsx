// 404 safety net — also reused by detail pages for unknown slugs.
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/ui/Button'
import usePageTitle from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <PageWrapper className="grid place-items-center px-6 py-48 text-center">
      <div>
        <p className="bg-linear-to-r from-indigo-600 to-cyan-500 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">This page took a personal day.</h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-600">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </PageWrapper>
  )
}
