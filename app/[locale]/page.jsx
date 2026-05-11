import AmenitiesSection from "@/components/AmenitiesSection";
import AnimatedSection from "@/components/AnimatedSection";
import Contact from "@/components/Contact";
import FlatCarousel from "@/components/FlatCarousel";
import FlatsSumUp from "@/components/FlatsSumUp";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import Navbar from "@/components/Navbar";
import Terms from "@/components/Terms";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: "website",
     siteName: "Avenew",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ka': '/ka'
      }
    },

      appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Avenew",
  },
    
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#192748'
}


const Home = async ({ params }) => {
  const { locale } = await params;
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <AnimatedSection direction="left" delay={0.2}>
        <Terms />
      </AnimatedSection>
      <AnimatedSection direction="right" delay={0.2}>
        <AmenitiesSection />
      </AnimatedSection>

      <div className="relative flex justify-center bg-dark-red h-[483px] p-6 lg:p-0">
        <div className="hidden xl:block absolute bottom-0 lg:left-37.75 w-33.25 h-106.25">
          <Image src="/Vector (1).png" fill alt=""></Image>
        </div>
        <Form width="483px"></Form>
      </div>
      <AnimatedSection direction="left" delay={0.2}>
        <FlatCarousel />
      </AnimatedSection>
      <FlatsSumUp />
      <AnimatedSection direction="right" delay={0.2}>
        <Contact />
      </AnimatedSection>
      <AnimatedSection direction="left" delay={0.2}>
        <div className="pb-12 bg-white">
          <div className="h-[650px] lg:h-[566px] py-10 relative flex justify-center items-center bg-[url(/img4.webp)] bg-bottom   md:bg-cover">
            <div className="absolute inset-0 bg-black/40" />
            <div className="hidden xl:block absolute bottom-0 lg:right-37.75 w-33.25 h-106.25">
              <Image src="/Vector (5).png" fill alt="" />
            </div>
            <div className="w-[494px] h-[494px] bg-dark-red flex justify-center items-center z-10 p-6 lg:p-0">
              <Form width="377px" />
            </div>
          </div>
        </div>
      </AnimatedSection>
      <MapSection locale={locale}></MapSection>

      <Footer />
    </div>
  );
};

export default Home;
