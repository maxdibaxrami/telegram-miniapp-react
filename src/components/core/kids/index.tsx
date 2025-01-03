import {
    cn,
    Radio,
    RadioGroup,
  } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
  

  export const CustomRadio = (props) => {
    const {children, ...otherProps} = props;
  
    return (
      <Radio
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
      </Radio>
    );
  };
  
const KidsListSelector = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  
  const [selected, setSelected] = useState(user.moreAboutMe.kids);
  const { t } = useTranslation();

  useEffect(()=>{
    if(selected !== ""){
      setSlideAvailable("kids",selected)
    }else{
      setSlideUnAvailable("kids",selected)
    }

  },[selected])
  
  const KidStatus = [
    { key: "has_kids", label: t("has_kids") },
    { key: "no_kids", label: t("no_kids") },
    { key: "wants_kids", label: t("wants_kids") },
    { key: "does_not_want_kids", label: t("does_not_want_kids") },
    { key: "open_to_kids", label: t("open_to_kids") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];

    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup classNames={{"label":"font-medium","description":"font-medium"}}  value={selected} onValueChange={setSelected} description={t("Selectedplancanbechangedatanytime")} label={t("kids")}>
                {KidStatus.map((value)=> {
                    return <CustomRadio  value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
            </RadioGroup>
        </form>
      </div>
    );
  };
  

  
  export default KidsListSelector;
  

