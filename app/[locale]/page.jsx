import AmenitiesSection from '@/components/AmenitiesSection'
import FlatCarousel from '@/components/FlatCarousel'
import FlatsSumUp from '@/components/FlatsSumUp'
import Footer from '@/components/Footer'
import Form from '@/components/Form'
import Hero from '@/components/Hero'
import MapSection from '@/components/MapSection'
import Navbar from '@/components/Navbar'
import Terms from '@/components/Terms'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <Terms/>
        <AmenitiesSection/>
     
      <div className='relative flex justify-center bg-dark-red'>
        <div className='hidden xl:block absolute bottom-0 lg:left-37.75 w-33.25 h-106.25' >
             <Image src='/Vector (1).png' fill alt=''></Image></div>       
         <Form width='483px'></Form>
      </div>
      
         <FlatCarousel />
          <FlatsSumUp/>
          <div className='py-12 bg-white'>
            <div className='h-[566px] py-10 relative flex justify-center bg-[url(/Content.png)] bg-cover bg-center'>
        <div className='hidden xl:block absolute bottom-0 lg:right-37.75 w-33.25 h-106.25' >
             <Image src='/Vector (5).png' fill alt=''></Image></div>       
         <Form width='483px'></Form>
      </div>
          </div>
          <MapSection></MapSection>
          <Footer/>
    </div>
   
  )
}

export default Home