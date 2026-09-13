# TechHelp — Corporate Website

A polished, portfolio-ready corporate marketing site for **TechHelp**, a fictional software
consulting company. Built as a demo of a professional client deliverable: responsive,
animated, CMS-shaped content, and a contact form that's one function away from going live.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-6-A855F7?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=reactrouter&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-BB6BD9?logo=framer&logoColor=white)

## Live Demo

> 🔗 [TechHelp — Software Consulting Company](https://teach-help-corp-web.netlify.app/)

## Tech Stack

| Concern     | Choice                                        |
| ----------- | --------------------------------------------- |
| Framework   | React 18 (plain JavaScript) + Vite 6          |
| Styling     | Tailwind CSS 4 (`@tailwindcss/vite` plugin)   |
| Routing     | React Router v6                               |
| Animation   | Framer Motion                                 |
| Icons       | lucide-react                                  |

## Getting Started

```bash
npm install    # install dependencies
npm run dev    # start dev server → http://localhost:5173
npm run build  # production build → dist/
npm run lint   # ESLint
npm run preview# serve the production build locally
```

## Folder Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, PageWrapper (route transitions), RootLayout
│   ├── sections/        # Hero, LogoCloud, StatsCounter, ServiceCard, CaseStudyCard,
│   │                    # BlogCard, TestimonialCarousel, PricingTable, FAQAccordion,
│   │                    # CTASection, ContactForm, MapPlaceholder
│   └── ui/              # Button, Badge, SectionHeading, Container, Avatar, CoverArt
├── pages/               # Home, About, Services, CaseStudies(+Detail), Blog(+Post),
│                        # Contact, NotFound
├── data/                # Mock "CMS" content (see below)
├── hooks/               # useContactForm, useScrollAnimation, usePageTitle
└── utils/               # animations.js, gradients.js, icons.js, api.js, format.js
```

### Where to Edit Content

All copy/content lives in `src/data/*.json`, shaped like a headless-CMS response so swapping
in Contentful/Sanity/a real API later is a data-layer change only:

| File               | Contents                                                        |
| ------------------ | --------------------------------------------------------------- |
| `company.json`     | Global settings: name, contact info, socials, stats, values, client logos, timeline milestones |
| `services.json`    | Service offerings with icon names, taglines and feature bullets |
| `pricing.json`     | Pricing tiers (`featured: true` renders the highlighted card)   |
| `testimonials.json`| Quotes with name/role/company/rating                            |
| `faqs.json`        | FAQ items with categories (`Process` items also appear on the Contact page) |
| `caseStudies.json` | Full case studies: challenge/solution/results paragraphs, metrics, quotes |
| `team.json`        | Team members with bios and social links                         |
| `blogPosts.json`   | Posts as structured blocks (`p` / `h2` / `list` / `quote`)      |

**Icons** are stored as string names (e.g. `"code2"`) and resolved via the registry in
`src/utils/icons.js`. To use another icon: import it from `lucide-react`, add it to the map.

To rebrand this template for a different company:

1. Replace the contents of `src/data/company.json` (name, contact details, stats…)
2. Update or trim the other data files
3. Search for remaining brand strings ("TechHelp") in `index.html`,
   `src/components/layout/{Navbar,Footer}.jsx` and the page headings

## Placeholder vs Production-Ready

| Part                                   | Status                                             |
| -------------------------------------- | -------------------------------------------------- |
| Layout, navigation, routing            | ✅ Production-ready                                |
| Responsive design & animations         | ✅ Production-ready                                |
| Contact form validation & states       | ✅ Production-ready UI                             |
| **Contact form submission**            | 🟡 Mocked in `src/utils/api.js` (logs payload). Swap one function for [Formspree](https://formspree.io) / EmailJS / your API — examples included in that file's header comment |
| **Cover images, logos, team photos**   | 🟡 Deterministic gradient placeholders (`CoverArt`, `Avatar`). Swap for real assets or CMS URLs |
| **Blog/case-study content**            | 🟡 Realistic mock copy                             |
| Newsletter signup                      | 🟡 UI only (no endpoint)                           |
| Map                                    | 🟡 Static placeholder — drop in an iframe embed    |

## Design Notes

- **Accent**: indigo-600 on white/slate neutrals; Inter typeface.
- **Section rhythm**: every section follows *eyebrow → heading → subtitle → content* via the
  shared `SectionHeading` primitive.
- **Motion**: centralized variants in `src/utils/animations.js`; scroll reveals use Framer
  Motion's `whileInView`, route changes fade through `PageWrapper`. Durations stay within
  150–400ms for a fast, tasteful feel.
