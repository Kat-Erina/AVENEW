import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-black h-20 flex justify-between items-center px-10'>

        <Image src={'/logo.png'} width={180} height={100} alt='' />

        <span>ENG</span>

    </header>
  )
}

export default Navbar