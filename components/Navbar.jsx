'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
   const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('navbar');

  const switchLocale = (newLocale) => {

    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    router.refresh();
  };





  return (
    <header className='bg-black h-20 flex justify-between items-center px-10 !text-white'>

        <Link href={`/${locale}`}>
          <Image src={'/ave.svg'} width={180} height={100} alt='' className="w-40" />
        </Link>

<div className='flex items-center gap-6'>
  <Link href={`/${locale}/contact`} className='font-apecru !text-white'>
    {t('contact')}
  </Link>
  <button
   onClick={() => switchLocale(locale === 'ka' ? 'en' : 'ka')}
    style={{ position: 'relative', zIndex: 9999 }} className='font-apecru !text-white'
  >
     {locale === 'ka' ? 'ENG' : 'GEO'}
  </button>
</div>

    </header>
  )
}

export default Navbar