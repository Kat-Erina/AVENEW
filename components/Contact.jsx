'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Contact = () => {
    const t=useTranslations('contact')
  const socials = [
    {
      icon: "/icons/Group 9.svg",
      link: "https://www.facebook.com/",
    },
    {
      icon: "/icons/Group 10.svg",
      link: "https://www.instagram.com/",
    },
    { icon: "/icons/Group 12.svg", link: "https://www.tiktok.com/" },
  ];

  return (
    <div className="py-12 bg-white relative ">
      <section className="bg-creamy flex py-12 justify-center items-center flex-col">
        <h3 className="text-[#776F40]  text-[26px] uppercase text-center flex flex-col ">
          <span>{t('title')}</span>
          
          <span className="-mt-[8px]"> {t('info')}</span>
        </h3>
        <div className="flex mt-[38px] flex-col items-center mb-10 uppercase ">
          <p className="text-[#776F40] uppercase font-normal text-[16px]">0322 20 40 20</p>
          <p className="text-[#776F40] uppercase font-normal text-[16px] ">{t('address')}</p>
        </div>
        <p className="text-[#776F40] font-normal font-normal text-[16px]">info@avenew.ge</p>
      </section>
      <section className="flex absolute right-[30px] top-[30%] flex-col gap-[33px]">
        {socials.map((item) => {
          return <Link href={item.link} key={item.icon}>
            <Image src={item.icon} height={34} width={34} alt={item.link}></Image>
          </Link>
        })}
      </section>
    </div>
  );
};

export default Contact;
