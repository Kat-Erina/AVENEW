'use client'

import React, { useState } from "react";
import RequestCallBtn from "./RequestCallBtn";
import { useTranslations } from 'next-intl';
import Form from "./Form";
import Image from "next/image";


const Hero = () => {
 const [modalOpen, setModalOpen] = useState(false);
  const t=useTranslations('hero')
  return (
    <section className=" h-[92vh] relative ">
     
      <div className="absolute inset-0 bg-linear-to-b from-[#66666670] to-[#00000080] z-10" />
       <div className=" !text-white h-full flex flex-col justify-end gap-20 pl-25 pb-20 max-md:pl-0 max-md:items-center max-md:text-center  
       ">

{/* <img src='/mob2.webp' className="inset-0 h-full w-full absolute top-0 left-0 object-cover"></img> */}
<Image
  src='/mob2.webp'
  fill
  alt='hero'
  className="w-full  lg:hidden absolute top-0 left-0"
/>


<Image
  src='/hero.webp'
  fill
  alt=''
  className="object-cover hidden lg:block
  absolute top-0 left-0"
/>

      <h1 className="text-6xl md:text-6xl font-light  lg:text-[66px] !text-white z-10 leading-[110%] uppercase">
      {t('city')}<br /> {t('avenue')}
      </h1>
      <RequestCallBtn onClick={()=>{setModalOpen(true)}} text={t('requestCall')} background={"bg-[#E8E6DD]/15"} />

              {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 "
          onClick={() => setModalOpen(false)}
        >
          <div style={{ maxWidth: '553px'  }} className="w-full bg-dark-red p-[20px] h-[480px]" onClick={(e) => e.stopPropagation()}>
            <div className="w-full flex justify-end mt-[15px] mb-[-40px]">
               <Image onClick={()=>setModalOpen(false)} alt='icon' height={20} width={20} src={'/icons/Icon.png'}></Image>
            </div>
           
            <Form width="377px" />
          </div>
        </div>
        
      )}
      </div>
    </section>
    
  );
};

export default Hero;
