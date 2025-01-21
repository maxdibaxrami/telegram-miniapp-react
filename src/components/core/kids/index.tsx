import { getKidStatus } from "@/constant";
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
            "inline-flex m-0 bg-neutral/20 hover:bg-content items-center justify-between",
            "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary data-[selected=true]:bg-primary/10"
     
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
  
  const KidStatus = getKidStatus(t)

    return (
      <div className="flex  justify-between flex-col px-6 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup value={selected} onValueChange={setSelected} description={t("Selectedplancanbechangedatanytime")}>
                {KidStatus.map((value,index)=> {
                    return <CustomRadio key={index} value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
            </RadioGroup>
        </form>
      </div>
    );
  };
  

  
  export default KidsListSelector;
  

