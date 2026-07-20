'use client';
import React from 'react'
import { useMessages, useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Terms = () => {
  const t = useTranslations('terms');
  const messages = useMessages();

  const items = messages.terms.items;

  return (
  <motion.div
    className="flex flex-col md:flex-row justify-around items-center bg-dark-red"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={container}
  >
    {items.map((_, i) => (
      <Fragment key={i}>
        <div className="flex-1 flex items-center justify-center p-6 md:py-[65px] md:px-[26px]">

          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-3 text-gray-500 text-center"
            variants={item}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
             <p className="text-[62px]  text-yellowish leading-none primary-cl font-normal">
              {t(`items.${i}.title`)}
            </p>
            <p className='flex flex-col text-center lg:text-start text-[22px] font-normal   uppercase text-yellowish leading-[1.2]'>
              <span>{t(`items.${i}.text`)}</span> <span>{t(`items.${i}.drop`)}</span>
             </p>
          </motion.div>
        </div>

        {i < items.length - 1 && (
          <div className="flex items-center justify-center">
            <div className="w-32 h-px md:w-px md:h-32 bg-gray-300" />
          </div>
        )}
      </Fragment>
    ))}
  </motion.div>
  );
}

export default Terms