import {
    cn,
    Radio,
    RadioGroup,
  } from "@nextui-org/react";
import { useEffect, useState } from "react";
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
  
const RealationStatusAuth = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  const [selected, setSelected] = useState(user.relationStatus);
  const { t } = useTranslation();

  const RealationStatus = [
    { key: "Single", label: t("Single") },
    { key: "Taken", label: t("Taken") },
    { key: "open", label: t("open") },
    { key: "ratthernotsay", label: t("Irathernotsay") },
  ];
  

  useEffect(()=>{
    if(selected !==""){
      setSlideAvailable("relationStatus",selected)
    }else{
      setSlideUnAvailable("relationStatus",selected)
    }

  },[selected])
    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup classNames={{"label":"font-medium","description":"font-medium"}}  value={selected} onValueChange={setSelected} description={t('Selectedplancanbechangedatanytime')} label={t('RealationStatus')}>
                {RealationStatus.map((value)=> {
                    return <CustomRadio value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
                

            </RadioGroup>
        </form>
      </div>
    );
  };
  

  
  export default RealationStatusAuth;
  

  