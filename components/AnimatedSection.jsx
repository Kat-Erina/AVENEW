'use client'
import { motion } from 'framer-motion'

export default function AnimatedSection({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
