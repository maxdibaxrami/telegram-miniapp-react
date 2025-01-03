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
  
const DrinkListSelector = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  
  const [selected, setSelected] = useState(user.moreAboutMe.drink);
  const { t } = useTranslation();

  useEffect(()=>{
    if(selected !== ""){
      setSlideAvailable("drink",selected)
    }else{
      setSlideUnAvailable("drink",selected)
    }

  },[selected])
  
  const DrinkStatus = [
    { key: "drinks_regularly", label: t("drinks_regularly") },
    { key: "occasionally_drinks", label: t("occasionally_drinks") },
    { key: "does_not_drink", label: t("does_not_drink") },
    { key: "trying_to_quit_drinking", label: t("trying_to_quit_drinking") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];

    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup classNames={{"label":"font-medium","description":"font-medium"}}  value={selected} onValueChange={setSelected} description={t("Selectedplancanbechangedatanytime")} label={t("DrinkStatus")}>
                {DrinkStatus.map((value)=> {
                    return <CustomRadio key={value.key} value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
            </RadioGroup>
        </form>
      </div>
    );
  };
  

  
  export default DrinkListSelector;
  

