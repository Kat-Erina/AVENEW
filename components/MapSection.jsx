'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const MapSection = ({locale}) => {
  const mapUrl="https://www.google.com/maps?q=41.790672,44.769482"
  return (
<Link href={mapUrl} target="_blank" rel="noopener noreferrer"  className="block">

  <div className="h-[500px] sm:h-180 overflow-hidden ">
    <motion.img
      src={locale==='ka'? "/map2.webp":"/map1.webp"}
      alt={locale==='ka' ? 'რუკაზე მდებარეობა' : 'Location on the map'}
      className="w-full h-full object-cover origin-center"
      initial={{ scale: 1.08 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />

  </div>

 </Link>

  )
}

export default MapSection