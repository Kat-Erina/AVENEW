import { getRequestConfig } from "next-intl/server";
import { locales } from "../i18n";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    return {
      locale: "ka",
      messages: (await import(`../messages/ka.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
