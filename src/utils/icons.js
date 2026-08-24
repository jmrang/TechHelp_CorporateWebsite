/**
 * Icon registry — data files store icon *names* as strings (exactly how a CMS
 * like Contentful or Sanity would), and this map resolves them to lucide-react
 * components at render time. To support another icon, import it here and add
 * it to the map.
 */
import {
  Cloud,
  Code2,
  Database,
  Dna,
  Gauge,
  HeartHandshake,
  Hexagon,
  Lightbulb,
  MessagesSquare,
  Mountain,
  Palette,
  PenTool,
  ServerCog,
  ShieldCheck,
  Triangle,
} from 'lucide-react'

const ICONS = {
  cloud: Cloud,
  code2: Code2,
  database: Database,
  dna: Dna,
  gauge: Gauge,
  heartHandshake: HeartHandshake,
  hexagon: Hexagon,
  lightbulb: Lightbulb,
  messagesSquare: MessagesSquare,
  mountain: Mountain,
  palette: Palette,
  penTool: PenTool,
  serverCog: ServerCog,
  shieldCheck: ShieldCheck,
  triangle: Triangle,
}

/** Resolve an icon name (e.g. "code2") to its lucide-react component. */
export function getIcon(name) {
  return ICONS[name] ?? ShieldCheck
}
