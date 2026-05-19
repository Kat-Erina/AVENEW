
import Link from 'next/link'
import React from 'react'

const MapSection = ({locale}) => {
  
  const mapUrl="https://www.google.com/maps?q=41.790672,44.769482"
  return (
<Link href={mapUrl} target="_blank" rel="noopener noreferrer"  className="block">

  <div className="h-[500px] sm:h-180 overflow-hidden ">
    <img 
      src={locale==='ka'? "/map2.webp":"/map1.webp"} 
      className="w-full h-full object-cover sm:scale-100 origin-center  "
    />

  </div>

 </Link>
   
  )
}

export default MapSection