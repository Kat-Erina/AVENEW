'use client'
import { useMessages, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { Fragment } from 'react'
import { motion } from 'framer-motion';

const itemContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const iconVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};
const textVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const FlatsSumUp = () => {
   const t = useTranslations('flatSumUp');
   const messages = useMessages();

   const items = messages.flatSumUp.items;
   const images=['/icons/Isolation_Mode.svg', '/icons/Vector (2).svg','/icons/Isolation_Mode (1).svg']

      return (
      <div className="flex flex-col md:flex-row justify-around items-center bg-dark-red">

{items.map((_, i) => (
  <Fragment key={i}>
    <div className="flex-1 flex items-center justify-center p-6 md:p-10">
      <motion.div
        className="flex flex-col items-center justify-center gap-3 text-gray-500 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={itemContainer}
      >
        <motion.div variants={iconVariant} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          <Image src={images[i]} width={50} height={50} alt='' className='h-[48px]' style={{ width: 'auto' }} />
        </motion.div>
        <motion.h3
          variants={textVariant}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] text-yellowish font-regular leading-none uppercase"
        >
          {t(`items.${i}.title`)}
        </motion.h3>
        <motion.p
          variants={textVariant}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] uppercase text-yellowish font-normal "
        >
          {t(`items.${i}.text`)}
        </motion.p>
      </motion.div>
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