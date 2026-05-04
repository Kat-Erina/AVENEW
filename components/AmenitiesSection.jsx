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
    image: "/amenities-3.webp",
     position: "object-center"
  },
];




const AmenitiesSection = () => {
    const t = useTranslations('amenities');

  return (
    <section className="bg-white flex justify-center gap-5 max-md:gap-20 items-center  max-md:flex-col pt-16 pb-30 max-md:px-3">
      {amenties.map((item,i) => (
        <div key={item.id} className="relative max-w-110 w-full h-110  ">
          <Image
            src={item.image}
            fill
            alt={t(`items.${i}.title`)}
            className={`object-cover ${item.position}`}
          />
          {/* Overlay text at bottom */}
          <div className="absolute -bottom-17 left-0 right-0 flex justify-center">
            <div className="bg-white p-4 text-center w-fit">
              <h2 className="text-black font-bold text-2xl mb-2 whitespace-pre-line">{t(`items.${i}.title`)}</h2>
              <p className="text-[#676767] text-lg">{t(`items.${i}.text`)}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AmenitiesSection;
