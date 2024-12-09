import { RadioGroup, Radio, cn, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const [selectedLanguage,setSelectedLanguage] = useState(i18n.language);

  useEffect(()=>{
    i18n.changeLanguage(selectedLanguage); // Change the language based on user selection
  },[selectedLanguage])
  return (
    <>
      {/* Radio Group Example if needed */}
      <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} label={t('language')}>
        <CustomRadio value="en">
          <Avatar name="en" size="md" src="https://flagcdn.com/gb.svg" />
          <p className="text-bold mx-2">English</p>
        </CustomRadio>
        <CustomRadio value="ru">
        <Avatar name="en" size="md" src="https://flagcdn.com/ru.svg" />
          <p className="text-bold mx-2">Russian</p>
        </CustomRadio>
        <CustomRadio value="fa">
        <Avatar name="en" size="md" src="https://flagcdn.com/ir.svg" />
          <p className="text-bold mx-2">Farsi</p>
        </CustomRadio>
        <CustomRadio value="ar">
        <Avatar name="en" size="md" src="https://flagcdn.com/sa.svg" />
           <p className="text-bold mx-2">Arabic</p>
        </CustomRadio>
      </RadioGroup>
    </>
  );
}
