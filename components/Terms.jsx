'use client';
import React from 'react'
import { useMessages, useTranslations } from 'next-intl';
import { Fragment } from 'react';
const Terms = () => {
  const t = useTranslations('terms');
  const messages = useMessages();
  
  const items = messages.terms.items; 

  return (
  <div className="flex flex-col md:flex-row justify-around items-center bg-dark-red">
    {items.map((_, i) => (
      <Fragment key={i}>
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <p className="flex flex-col lg:flex-row items-center justify-center gap-3 text-gray-500 text-center">
            <span className="text-[62px] lg:text-[72px] text-yellowish font-medium leading-none">
              {t(`items.${i}.title`)}
            </span>
            <span className="text-[22px] font-normal  font-helvetica-geo  uppercase text-yellowish">
              {t(`items.${i}.text`)}
            </span>
          </p>
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

export default Terms