'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
   const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    router.refresh();
  };





  return (
    <header className='bg-black h-20 flex justify-between items-center px-10'>

        <Image src={'/logo.png'} width={180} height={100} alt='' />
<button 
 onClick={() => switchLocale(locale === 'ka' ? 'en' : 'ka')}
  style={{ position: 'relative', zIndex: 9999 }} className='font-apecru'
>
   {locale === 'ka' ? 'ENG' : 'GEO'}
</button>

    </header>
  )
}

export default Navbar