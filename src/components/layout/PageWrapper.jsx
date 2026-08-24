// Wraps every routed page: shared route-transition animation + scroll reset.
//
// The scroll reset lives in a mount effect on purpose: AnimatePresence runs in
// mode="wait", so this component mounts only after the previous page has fully
// exited — scrolling here avoids a visible jump mid-transition.
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { pageVariants } from '../../utils/animations'

export default function PageWrapper({ children, className = '' }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}
