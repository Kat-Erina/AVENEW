import { Noto_Serif } from 'next/font/google';
import { AppProvider } from "@/context/AppContext";
import { NextIntlClientProvider } from "next-intl";
import {locales} from '@/i18n'
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';



const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
   variable: '--font-noto',
});

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${notoSerif.variable} ${notoSerif.className} antialiased`}>
        <AppProvider>
             <Toaster position="top-right" />
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>                  
  );
}
