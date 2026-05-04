import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black flex flex-col md:flex-row justify-between md:items-center px-6 md:px-10 py-6 md:h-20 text-[#E5E0CA] font-medium gap-5 md:gap-0'>
      
      <div className='flex items-center justify-between md:gap-35'>
        <Image src={'/logo.png'} width={180} height={100} alt='' className='w-24 md:w-36 lg:w-44' />
        <div className='flex items-center gap-2 text-sm md:text-base'>
          <p>© Ave.New</p>
          <p>2026</p>
        </div>
      </div>

      <p className='text-sm md:text-base text-center md:text-right'>ყველა უფლება დაცულია</p>

    </footer>
  )
}

export default Footer