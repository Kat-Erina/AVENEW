'use client'
import { motion } from 'framer-motion'

export default function AnimatedSection({ children, direction = 'right', className, delay = 0 }) {
  const variants = {
    hidden: { opacity: 0, x: direction === 'right' ? 100 : -100 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}