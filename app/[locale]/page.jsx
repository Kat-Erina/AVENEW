import AmenitiesSection from '@/components/AmenitiesSection'
import AnimatedSection from '@/components/AnimatedSection'
import Contact from '@/components/Contact'
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
        <AnimatedSection direction="left" delay={0.2}>
           <Terms/>
        </AnimatedSection>
       
       
        <AnimatedSection direction="right" delay={0.2}>
           <AmenitiesSection/>
        </AnimatedSection>
     
      <div className='relative flex justify-center bg-dark-red h-[483px]'>
        <div className='hidden xl:block absolute bottom-0 lg:left-37.75 w-33.25 h-106.25' >
             <Image src='/Vector (1).png' fill alt=''></Image></div>       
         <Form width='483px'></Form>
      </div>
      
               <AnimatedSection direction="left" delay={0.2}>
             <FlatCarousel />
          </AnimatedSection>
          <FlatsSumUp/>

                    <AnimatedSection direction="right" delay={0.2}>
            <Contact/>
          </AnimatedSection>
          <AnimatedSection direction='left' delay={0.2}>
                 <div className='pb-12 bg-white'>
                    

            <div className='h-[566px] py-10 relative flex justify-center bg-[url(/img4.png)] bg-cover'>
            
             <div className='absolute inset-0 bg-black/40' />
        <div className='hidden xl:block absolute bottom-0 lg:right-37.75 w-33.25 h-106.25' >
             <Image src='/Vector (5).png' fill alt=''></Image></div>       
   <div className='w-[494px] bg-dark-red flex justify-center z-20'><Form    width='377px'></Form></div>      
      </div>
          </div>
          </AnimatedSection>
     
          <MapSection></MapSection>

          <Footer/>
    </div>
   
  )
}

export default Home