// Static, API-key-free stand-in for an embedded map.
// Swap the inner content for a real iframe (Google Maps embed or OpenStreetMap)
// when going to production — no other changes needed.
import { MapPin } from 'lucide-react'
import company from '../../data/company.json'

export default function MapPlaceholder() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
      {/* Blueprint grid + faux "roads" */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern" />
      <div aria-hidden="true" className="absolute top-1/2 right-0 left-0 h-3 -translate-y-1/2 rotate-2 bg-white/80" />
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-1/3 w-3 -rotate-6 bg-white/60" />

      {/* Pin marker */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-1.5 rounded-xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm">
          <MapPin className="h-6 w-6 text-indigo-600" aria-hidden="true" />
          <p className="max-w-[220px] text-center text-xs font-semibold text-slate-800">
            {company.address.join(', ')}
          </p>
        </div>
      </div>

      <span className="absolute right-3 bottom-3 rounded-md bg-white/85 px-2 py-1 text-[10px] font-medium text-slate-500">
        Interactive map placeholder
      </span>
    </div>
  )
}
