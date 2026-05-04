'use client'

import React from "react";
import RequestCallBtn from "./RequestCallBtn";
import { useTranslations } from 'next-intl';


const Hero = () => {

  const t=useTranslations('hero')
  return (
    <section className="bg-[url(/hero.png)] bg-center h-[92vh] bg-cover flex flex-col justify-end gap-20 pl-25 pb-20 max-md:pl-0 max-md:items-center max-md:text-center relative">
      <div className="absolute inset-0 bg-linear-to-b from-[#66666670] to-[#00000080]" />
      <h1 className="text-6xl md:text-6xl  lg:text-7xl z-10 leading-[110%] tracking-[2%]">
      {t('chooseApartment')}<br /> ახალი გამზირი
      </h1>
      <RequestCallBtn text={"მოითხოვე ზარი"} background={"bg-[#E8E6DD]/15"} />
    </section>
  );
};

export default Hero;
