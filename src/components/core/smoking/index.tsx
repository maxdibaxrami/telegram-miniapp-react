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
  
const SmokingListSelector = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  
  const [selected, setSelected] = useState(user.moreAboutMe.smoking);
  const { t } = useTranslation();

  useEffect(()=>{
    if(selected !== ""){
      setSlideAvailable("smoking",selected)
    }else{
      setSlideUnAvailable("smoking",selected)
    }

  },[selected])
  
  const SmokingStatus = [
    { key: "smokes_regularly", label: t("smokes_regularly") },
    { key: "occasionally_smokes", label: t("occasionally_smokes") },
    { key: "does_not_smoke", label: t("does_not_smoke") },
    { key: "trying_to_quit_smoking", label: t("trying_to_quit_smoking") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];

    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup classNames={{"label":"font-medium","description":"font-medium"}}  value={selected} onValueChange={setSelected} description={t("Selectedplancanbechangedatanytime")} label={t("SmokingStatus")}>
                {SmokingStatus.map((value)=> {
                    return <CustomRadio  value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
            </RadioGroup>
        </form>
      </div>
    );
  };
  

  
  export default SmokingListSelector;
  

