import Link from 'next/link'
import React from 'react'

const MapSection = () => {

  const mapUrl="https://www.google.com/maps/place/198+Davit+Aghmashenebeli+Ave,+T'bilisi/@41.7198337,44.7898696,20.75z/data=!4m13!1m7!3m6!1s0x404472d30367b303:0x1b6b470c93fc0fc3!2s198+Davit+Aghmashenebeli+Ave,+T'bilisi!3b1!8m2!3d41.7199082!4d44.7895896!3m4!1s0x404472d30367b303:0x1b6b470c93fc0fc3!8m2!3d41.7199082!4d44.7895896!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D"
  return (
<Link href={mapUrl}  className="block">

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