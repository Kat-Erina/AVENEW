'use client';
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
const amenties = [
  {
    id: 1,
    image: "/amenities-1.webp",
     position: "object-center"
  },
  {
    id: 2,
    image: "/amenities-2.webp",
     position: "object-[25%]"
  },
  {
    id: 3,
    image: "/padell.webp",
     position: "object-center"
  },
];




const AmenitiesSection = () => {
    const t = useTranslations('amenities');

  return (
    <section className="bg-white flex justify-center gap-5 max-md:gap-20 items-center  max-md:flex-col pt-16 pb-30 max-lg:px-3   ">
      {amenties.map((item,i) => (
        <div key={item.id} className="relative max-w-115 w-full h-110 transition duration-200 hover:scale-105 hover:shadow-2xl">
          <Image
            src={item.image}
            fill
            alt={t(`items.${i}.title`)}
            className={`object-cover ${item.position}`}
          />
          {/* Overlay text at bottom */}
          <div className="absolute top-full bottom-50px   left-[5%] flex justify-center -translate-y-[40px] w-[90%]">
            <div className="bg-white p-3 md:p-3 text-center w-fit">
              <h2 className="text-black font-bold text-lg  md:text-[24px] leading-[1.1] mb-2 whitespace-pre-line">{t(`items.${i}.title`)}</h2>
              <p className="font-normal  text-[#676767] text-[16px] md:text-lg">{t(`items.${i}.text`)}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AmenitiesSection;
