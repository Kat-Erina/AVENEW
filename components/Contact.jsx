'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Contact = () => {
    const t=useTranslations('contact')
  const socials = [
    {
      icon: "/Group 9.png",
      link: "https://www.facebook.com/",
    },
    {
      icon: "/Group 10.png",
      link: "https://www.instagram.com/",
    },
    { icon: "/Group 12.png", link: "https://www.tiktok.com/" },
  ];

  return (
    <div className="py-12 bg-white relative">
      <section className="bg-creamy flex py-12 justify-center items-center flex-col">
        <h3 className="text-[#776F40] font-helvetica text-[26px] uppercase text-center">
          <span className="font-helvetica">{t('title')}</span>
          <br></br> {t('info')}
        </h3>
        <div className="flex mt-[38px] flex-col items-center mb-10 uppercase ">
          <p className="text-[#776F40] uppercase">0322 20 40 20</p>
          <p className="text-[#776F40] uppercase">{t('address')}</p>
        </div>
        <p className="text-[#776F40] font-helvetica">info@avenew.ge</p>
      </section>
      <section className="flex absolute right-[30px] top-[25%] flex-col gap-[33px]">
        {socials.map((item) => {
          return <Link href={item.link} key={item.icon}>
            <Image src={item.icon} height={50} width={50} alt={item.link}></Image>
          </Link>
        })}
      </section>
    </div>
  );
};

export default Contact;
