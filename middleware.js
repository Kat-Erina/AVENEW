import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.js';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' ,
  localeDetection: false
});

export const config = {
  matcher: ['/((?!admin|api|img|fonts|storage|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.svg).*)']
};