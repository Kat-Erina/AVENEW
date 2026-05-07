import { locales } from "@/i18n";
import './globals.css';



export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children }) {
  return children;
}
