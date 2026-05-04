import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-black h-20 flex justify-between items-center px-10'>

        <Image src={'/logo.png'} width={180} height={100} alt='' className='w-35 md:w-39 lg:w-44' />

        <span>ENG</span>

    </header>
  )
}

export default Navbar