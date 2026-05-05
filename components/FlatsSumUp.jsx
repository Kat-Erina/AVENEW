'use client'
import { useMessages, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { Fragment } from 'react'

const FlatsSumUp = () => {
   const t = useTranslations('flatSumUp');
   const messages = useMessages();
   
   const items = messages.flatSumUp.items; 
   const images=['/Vector (2).png', '/Vector (3).png', '/Vector (4).png']
 
      return (
      <div className="flex flex-col md:flex-row justify-around items-center bg-dark-red">
        
{items.map((_, i) => (
  <Fragment key={i}>
    <div className="flex-1 flex items-center justify-center p-6 md:p-10">
      <div className="flex flex-col items-center justify-center gap-3 text-gray-500 text-center">
        <Image src={images[i]} width={50} height={50} alt='' />
        <p className="text-[40px] text-yellowish font-medium leading-none">
          {t(`items.${i}.title`)}
        </p>
        <p className="text-[22px] uppercase text-yellowish font-normal  font-helvetica-geo">
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