import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      siteName: "Avenew",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "/contact",
      languages: {
        en: "/en/contact",
        ka: "/ka/contact",
      },
    },
  };
}

export default function ContactLayout({ children }) {
  return children;
}
