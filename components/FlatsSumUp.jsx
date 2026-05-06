'use client'
import { useMessages, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { Fragment } from 'react'

const FlatsSumUp = () => {
   const t = useTranslations('flatSumUp');
   const messages = useMessages();
   
   const items = messages.flatSumUp.items; 
   const images=['/icons/Isolation_Mode.svg', '/icons/Vector.svg','/icons/Isolation_Mode (1).svg']
 
      return (
      <div className="flex flex-col md:flex-row justify-around items-center bg-dark-red">
        
{items.map((_, i) => (
  <Fragment key={i}>
    <div className="flex-1 flex items-center justify-center p-6 md:p-10">
      <div className="flex flex-col items-center justify-center gap-3 text-gray-500 text-center">
        <Image src={images[i]} width={50} height={50} alt='' />
        <h3 className="text-[40px] text-yellowish font-regular leading-none uppercase">
          {t(`items.${i}.title`)}
        </h3>
        <p className="text-[16px] uppercase text-yellowish font-normal ">
          {t(`items.${i}.text`)}
        </p>
      </div>
    </div>

    {i < items.length - 1 && (
      <div className="flex items-center justify-center">
        <div className="w-32 h-px md:w-px md:h-32 bg-gray-300" />
      </div>
    )}
  </Fragment>
))}
      </div>
      );
  
}

export default FlatsSumUp