'use client';

import { useState } from 'react';
import { useMessages, useTranslations } from 'next-intl';
import toast from 'react-hot-toast';


const bedroomOptions = ['1', '2', '3', '4', '5'];


const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState(null);





  return (
    <div className="relative w-full">
      <div
        className="h-14 px-4 border-b border-white/30 flex items-center justify-between cursor-pointer text-yellowish"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm tracking-widest uppercase text-[16px] font-normal  font-helvetica-geo "> {!value ? placeholder : value}</span>
        <span className="text-lg text-yellowish"> {open ? '︿' : '﹀'}</span>
      </div>
      {open && (
        <div className="absolute z-10 w-full bg-dark-red border border-white/20">
          {options.map((opt) => (
            <div
              key={opt}
              className="px-4 py-3 hover:bg-white/10 cursor-pointer text-yellowish text-sm tracking-widest uppercase"
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Form = ({ width = 'max-w-md' }) => {
  const t = useTranslations('form');
     const messages = useMessages();
 const languageOptions = messages.form.languageOptions;
  const contactOptions = messages.form.contactOptions;
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [bedrooms, setBedrooms] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [contact, setContact] = useState(contactOptions[0]);




  const [errors, setErrors] = useState({});
const handleSubmit = () => {
  if (!validate()) return;
    toast.success(t('successMessage'));
      setName('');
  setTel('');
  setBedrooms(null);
  setLanguage(languageOptions[0]);
  setContact(contactOptions[0]);
  setErrors({});

};
const validate = () => {
  const newErrors = {};
  if (!name.trim()) newErrors.name = t('errors.nameRequired');
  if (!tel.trim()) newErrors.tel = t('errors.telRequired');
  else if (!/^\+?[0-9\s\-]+$/.test(tel)) newErrors.tel = t('errors.telInvalid');
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  return (

    <div style={{ maxWidth: width }} className="w-full mx-auto bg-[#331516] flex flex-col pt-13 pb-10">

<div className="flex items-center border-b border-white/30 h-14 px-4 w-full">
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder={t('name')}
    className="font-normal  font-helvetica-geo flex-1 bg-transparent text-yellowish text-[16px] tracking-widest uppercase placeholder:text-yellowish outline-none"
  />
  <span className="text-yellowish">*</span>
</div>
{errors.name && <p className="text-red-400 text-xs px-4 py-1">{errors.name}</p>}


  

      <div className="flex items-center border-b border-white/30 h-14 px-4">
  <input
    type="text"
    value={tel}
    onChange={(e) => setTel(e.target.value)}
    placeholder={t('tel')}
    className="font-normal  font-helvetica-geo flex-1 bg-transparent text-yellowish text-[16px] tracking-widest uppercase placeholder:text-yellowish outline-none"
  />
  <span className="text-yellowish">*</span>
</div>
{errors.tel && <p className="text-red-400 text-xs px-4 py-1">{errors.tel}</p>}


      <div className="border-b border-white/30">
        <CustomSelect options={bedroomOptions} value={bedrooms} onChange={setBedrooms} placeholder={t('bedrooms')}/>
      </div>

      <div className="flex gap-[12px] ">
        <div className="flex-1">
          <CustomSelect options={languageOptions} value={language} onChange={setLanguage} />
        </div>
        <div className="flex-2">
          <CustomSelect options={contactOptions} value={contact} onChange={setContact} />
        </div>
      </div>

      <div className="h-14 mt-4" />

      <button onClick={()=>{handleSubmit()}} className="font-normal  font-helvetica-geo h-14 border border-white/30 text-yellowish text-[16px] tracking-widest uppercase hover:bg-white/10 transition-colors">
        {t('requestACall')}
      </button>

      
    </div>
    
  );
};

export default Form;