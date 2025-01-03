import {
    CheckboxGroup,
    cn,
    Checkbox,
  } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
  

  export const CustomCheckBox = (props) => {
    const {children, ...otherProps} = props;
  
    return (
      <Checkbox
        {...otherProps}
        classNames={{
          base: cn(
            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
            "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary",
          ),
        }}
      >
        {children}
      </Checkbox>
    );
  };
  
const LanguageAuth = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  const [selected, setSelected] = useState(user.moreAboutMe.languages);
  const { t } = useTranslation();

  useEffect(()=>{
    if(selected.length !== 0){
      setSlideAvailable("languages", selected)
    }else{
      setSlideUnAvailable("languages", selected)
    }

  },[selected])
  
  const languages = [
    { key: "en", label: t("en") },
    { key: "zh", label: t("zh") },
    { key: "es", label: t("es") },
    { key: "hi", label: t("hi") },
    { key: "ar", label: t("ar") },
    { key: "bn", label: t("bn") },
    { key: "fr", label: t("fr") },
    { key: "ru", label: t("ru") },
    { key: "pt", label: t("pt") },
    { key: "id", label: t("id") },
    { key: "ja", label: t("ja") },
    { key: "de", label: t("de") },
    { key: "pa", label: t("pa") },
    { key: "ur", label: t("ur") },
    { key: "ko", label: t("ko") },
    { key: "vi", label: t("vi") },
    { key: "fa", label: t("fa") },
    { key: "tr", label: t("tr") },
    { key: "ta", label: t("ta") },
    { key: "it", label: t("it") },
  ];
  
    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <CheckboxGroup classNames={{"label":"font-medium","description":"font-medium"}}  value={selected} onChange={setSelected} description={t("Selectedplancanbechangedatanytime")} label={t("Language")}>
                {languages.map((value)=> {
                    return <CustomCheckBox value={value.key}>
                    {value.label}
                </CustomCheckBox>
                })}
            
            </CheckboxGroup>
        </form>
      </div>
    );
  };
  

  
  export default LanguageAuth;
  

  
  
  