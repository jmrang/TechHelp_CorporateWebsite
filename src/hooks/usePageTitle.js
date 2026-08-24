/**
 * Sets the browser tab title per page, e.g. usePageTitle('About') becomes
 * "About · TechHelp". Called without arguments it restores the full brand title.
 */
import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · TechHelp`
      : 'TechHelp — Software Consulting Company'
  }, [title])
}
