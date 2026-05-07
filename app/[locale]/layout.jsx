import { AppProvider } from "@/context/AppContext";
import { NextIntlClientProvider } from "next-intl";
import {locales} from '@/i18n'
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';




export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`antialiased overflow-x-hidden` }>
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
