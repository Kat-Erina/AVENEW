import { useMessages } from "next-intl";




export function useCountries() {
  const messages = useMessages();
  const COUNTRIES = messages.form.countryCodes.map(c => ({
    name: c.name,
    code: c.code,
    flag: c.flag
  }));
  const GEORGIA = COUNTRIES.find(c => c.code === '+995');
  return { COUNTRIES, GEORGIA };
}