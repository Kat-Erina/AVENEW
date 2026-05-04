import Image from "next/image";
import React from "react";

const amenties = [
  {
    id: 1,
    image: "/amenities-1.webp",
    title: "პირველი რეკრეაციული\nხიდი",
    subtitle: "ყოველდღიური განტვირთვისთვის",
     position: "object-center"
  },
  {
    id: 2,
    image: "/amenities-2.webp",
    title: "აგროჰაბი კომპლექსის\nტერიტორიაზე",
    subtitle: "საოჯახო საყიდლებისთვის",
     position: "object-[25%]"
  },
  {
    id: 3,
    image: "/amenities-3.webp",
    title: "სპორტულ-გასართობი\nსივრცეები",
    subtitle: "აქტიური ცხოვრებისთვის",
     position: "object-center"
  },
];

const AmenitiesSection = () => {
  return (
    <section className="bg-white flex justify-center gap-5 max-md:gap-20 items-center  max-md:flex-col pt-16 pb-30 max-md:px-3">
      {amenties.map((item) => (
        <div key={item.id} className="relative max-w-110 w-full h-110  ">
          <Image
            src={item.image}
            fill
            alt={item.title}
            className={`object-cover ${item.position}`}
          />
          {/* Overlay text at bottom */}
          <div className="absolute -bottom-17 left-0 right-0 flex justify-center">
            <div className="bg-white p-4 text-center w-fit">
              <h2 className="text-black font-bold text-2xl mb-2 whitespace-pre-line">{item.title}</h2>
              <p className="text-[#676767] text-lg">{item.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AmenitiesSection;
