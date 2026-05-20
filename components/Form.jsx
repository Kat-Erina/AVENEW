"use client";

import { useState } from "react";
import { useMessages, useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { useCountries } from "@/app/hooks/useCountries";

const bedroomOptions = [null, "1", "2", "3", "4", "5"];

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
  isOpen,
  onToggle,
  clearable,
  className = "w-full"
}) => {
  const t = useTranslations("form");

  return (
    <div className="relative w-full">
      <div
        className="h-14 px-4 border-b border-white/30 flex items-center justify-between cursor-pointer text-yellowish text-start"
        onClick={onToggle}
      >
        <span className="text-sm tracking-widest uppercase text-[16px] font-normal   ">
          {" "}
          {!value ? placeholder : value}
        </span>
        <span className="text-lg text-yellowish">
          {" "}
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-dark-red border border-white/20 max-h-48 overflow-y-auto hide-scrollbar">
          {options.map((opt) => (
            <div
              key={opt}
              className="px-4 py-2 hover:bg-white/10 cursor-pointer text-yellowish text-[16px] tracking-widest text-start"
              onClick={() => {
                onChange(opt);
                onToggle();
              }}
            >
              {opt ?? t("clear")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PhoneInput = ({
  phoneNumber,
  onPhoneChange,
  country,
  onCountryChange,
  onFocus,
  isOpen,
  onToggle,
  placeholder,
}) => {
  const { COUNTRIES } = useCountries();
  const t = useTranslations("form");

  const [search, setSearch] = useState("");

  const filtered = COUNTRIES.filter((c) => {
    const q = search.trim();
    if (!q) return true;
    const ql = q.toLowerCase();
    const normalizedQ = q.replace(/^\+/, "");
    return (
      c.name.toLowerCase().includes(ql) ||
      c.code.replace("+", "").startsWith(normalizedQ)
    );
  });

  const handleToggle = () => {
    if (isOpen) setSearch("");
    onToggle();
  };

  return (
    <div className="relative w-full">
      <div className="h-14   flex items-center gap-3 ">
        <button
          type="button"
          className="flex h-full border-b  border-white/20 items-center gap-1 text-yellowish shrink-0 cursor-pointer w-[32%] px-4  justify-between"
          onClick={handleToggle}
        >
          <span className="text-[16px] font-normal tracking-widest">
            {country.code}
          </span>
          <span className="text-lg text-yellowish">
            {" "}
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>{" "}
        </button>

        <div className="flex flex-row gap-1 border-b h-full px-4 items-center w-[68%] border-white/20">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneChange(e.target.value)}
            onFocus={() => {
              onFocus();
              if (isOpen) handleToggle();

              setSearch("");
            }}
            placeholder={placeholder}
            className="min-w-0 w-full bg-transparent text-yellowish text-[16px] tracking-widest uppercase placeholder:text-yellowish outline-none font-normal leading-[1.2] phone-input phone-input-xxs"
          />
          <span className="text-yellowish shrink-0">*</span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full bg-dark-red border border-white/20">
          <div className="flex items-center gap-2 px-4 py-[15px] border-b border-white/20">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder= {t('search')}
              className="flex-1 bg-transparent text-yellowish text-[16px] tracking-widest placeholder:text-yellowish outline-none font-normal "
            />
            {/* <Search className="w-4 h-4 text-yellowish shrink-0" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5219 7.72683C13.5219 10.9274 10.9273 13.522 7.72678 13.522C4.52625 13.522 1.9317 10.9274 1.9317 7.72683C1.9317 4.52627 4.52625 1.93171 7.72678 1.93171C10.9273 1.93171 13.5219 4.52627 13.5219 7.72683ZM12.465 13.8309C11.1564 14.848 9.51231 15.4537 7.72678 15.4537C3.4594 15.4537 0 11.9942 0 7.72683C0 3.45942 3.4594 0 7.72678 0C11.9942 0 15.4536 3.45942 15.4536 7.72683C15.4536 9.51237 14.8479 11.1565 13.8308 12.4649L20 18.6342L18.634 20L12.465 13.8309Z"
                fill="#E8E6DD"
              />
            </svg>
          </div>

          <div className="max-h-48 overflow-y-auto hide-scrollbar">
            {filtered.map((c) => {
              return (
                <div
                  key={c.flag + c.name}
                  className="flex items-center gap-3 px-4 py-[15px] hover:bg-white/10 cursor-pointer border border-white/30 "
                  onClick={() => {
                    onCountryChange(c);
                    setSearch("");
                    onToggle();
                  }}
                >
                  <span className={`fi fi-${c.flag} `}></span>
                  <span className="flex-1 text-yellowish text-[16px] tracking-widest ml-2">
                    {c.name}
                  </span>
                  <span className="text-yellowish text-[16px] tracking-widest">
                    {c.code}
                  </span>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-yellowish/60 text-[16px] tracking-widest">
               {t('noResult')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Form = ({ width = "max-w-md" }) => {
  const { GEORGIA } = useCountries();

  const t = useTranslations("form");
  const messages = useMessages();
  const languageOptions = messages.form.languageOptions;
  const contactOptions = messages.form.contactOptions;
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [telCountry, setTelCountry] = useState(GEORGIA);
  const [bedrooms, setBedrooms] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [contact, setContact] = useState(contactOptions[0]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openSelect, setOpenSelect] = useState(null);
  const [formStarted, setFormStarted] = useState(false);

  const trackFormStart = () => {
    if (formStarted) return;
    setFormStarted(true);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_start" });
    if (window.fbq) window.fbq("trackCustom", "FormStart");
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = t("errors.nameRequired");
    if (!tel.trim()) newErrors.tel = t("errors.telRequired");
    else if (!/^[0-9\s\-]+$/.test(tel)) newErrors.tel = t("errors.telInvalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const eventId = crypto.randomUUID();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          tel: telCountry.code + tel,
          bedrooms,
          language,
          contact,
          eventId,
        }),
      });
      if (!res.ok) throw new Error();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_submit" });
      if (window.fbq) window.fbq("track", "Lead", {}, { eventID: eventId });
      toast.success(t("successMessage"));
      setName("");
      setTel("");
      setTelCountry(GEORGIA);
      setBedrooms(null);
      setLanguage(languageOptions[0]);
      setContact(contactOptions[0]);
      setErrors({});
      setFormStarted(false);
    } catch {
      toast.error(t("errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: width }}
      className="w-full mx-auto h-[460px] bg-[#331516] flex flex-col pt-13 pb-10 z-10"
    >
      <div className="flex items-center border-b border-white/30 h-14 px-4 w-full">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={trackFormStart}
          placeholder={t("name")}
          className="font-normal
     flex-1 bg-transparent text-yellowish text-[16px] tracking-widest uppercase placeholder:text-yellowish outline-none leading-[1.2] "
        />
        <span className="text-yellowish">*</span>
      </div>
      {errors.name && (
        <p className="text-red-400 text-xs px-4 py-1">{errors.name}</p>
      )}

      <PhoneInput
        phoneNumber={tel}
        onPhoneChange={setTel}
        country={telCountry}
        onCountryChange={setTelCountry}
        onFocus={trackFormStart}
        isOpen={openSelect === "tel"}
        onToggle={() =>
          setOpenSelect((prev) => (prev === "tel" ? null : "tel"))
        }
        placeholder={t("tel")}
      />
      {errors.tel && (
        <p className="text-red-400 text-xs px-4 py-1">{errors.tel}</p>
      )}

      <div className="border-b border-white/30">
        <CustomSelect
          options={bedroomOptions}
          value={bedrooms}
          onChange={setBedrooms}
          placeholder={t("bedrooms")}
          isOpen={openSelect === "bedrooms"}
          onToggle={() =>
            setOpenSelect((prev) => (prev === "bedrooms" ? null : "bedrooms"))
          }
          clearable={true}
        />
      </div>

      <div className="flex gap-[12px] ">
        <div className="w-2/5 sm:w-[32%]">
          <CustomSelect
           
            options={languageOptions}
            value={language}
            onChange={setLanguage}
            isOpen={openSelect === "language"}
            onToggle={() =>
              setOpenSelect((prev) => (prev === "language" ? null : "language"))
            }
          />
        </div>
        <div className="w-4/5">
          <CustomSelect
            options={contactOptions}
            value={contact}
            onChange={setContact}
            isOpen={openSelect === "contact"}
             
            onToggle={() =>
              setOpenSelect((prev) => (prev === "contact" ? null : "contact"))
            }
          />
        </div>
      </div>

      <div className="h-14 mt-4" />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="font-normal h-14 border border-white/30 text-yellowish text-[16px] tracking-widest uppercase hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "..." : t("requestACall")}
      </button>
    </div>
  );
};

export default Form;
