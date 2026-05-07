import Link from 'next/link'
import React from 'react'

const MapSection = () => {
  return (
<Link href={'https://www.google.com/maps/@41.7044819,44.8703534,15z?authuser=0&entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D'}  className="block">

  <div className="h-[500px] sm:h-180 overflow-hidden">
    <img 
      src="/cta.png" 
      className="w-full h-full object-cover  sm:scale-100 origin-center"
    />
  </div>

 </Link>
   
  )
}

export default MapSection