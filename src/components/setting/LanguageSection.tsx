import { RadioGroup, Radio, cn, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cloudStorage } from '@telegram-apps/sdk';

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[100%] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      <div className="flex items-center">
        {children}
      </div>
      
    </Radio>
  );
};

export default function LanguageSection() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // default to English

  // Function to get the stored language from cloud storage
  const GetStoreLanguage = async () => {
    if (cloudStorage.isSupported()) {
      const lang = await cloudStorage.getItem('lang');
      return lang;
    }
    return null; // fallback if cloud storage is not available
  };

  // Function to store the selected language in cloud storage
  const StoreLanguage = async (lang) => {
    if (cloudStorage.isSupported()) {
      await cloudStorage.setItem('lang', lang);
    }
  };

  // Use effect to load the language from storage and set it in the state
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await GetStoreLanguage();
      if (storedLang) {
        setSelectedLanguage(storedLang);  // Set the stored language as default
        i18n.changeLanguage(storedLang);  // Apply the stored language
      }
    };

    loadLanguage();
  }, []);

  // Use effect to change language and store the new language whenever it changes
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage); // Change the language in i18n
    StoreLanguage(selectedLanguage);       // Store the selected language
  }, [selectedLanguage]);

  return (
    <>
      <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} label={t('language')}>
        <CustomRadio value="en">
          <Avatar name="en" size="md" src="https://flagcdn.com/gb.svg" />
          <p className="text-bold mx-2">English</p>
        </CustomRadio>
        <CustomRadio value="ru">
          <Avatar name="ru" size="md" src="https://flagcdn.com/ru.svg" />
          <p className="text-bold mx-2">Russian</p>
        </CustomRadio>
        <CustomRadio value="fa">
          <Avatar name="fa" size="md" src="https://flagcdn.com/ir.svg" />
          <p className="text-bold mx-2">Farsi</p>
        </CustomRadio>
        <CustomRadio value="ar">
          <Avatar name="ar" size="md" src="https://flagcdn.com/sa.svg" />
          <p className="text-bold mx-2">Arabic</p>
        </CustomRadio>
      </RadioGroup>
    </>
  );
}
