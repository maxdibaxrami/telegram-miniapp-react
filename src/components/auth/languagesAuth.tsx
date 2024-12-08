import {
    CheckboxGroup,
    cn,
    Checkbox,
  } from "@nextui-org/react";
import { useEffect, useState } from "react";
  

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
  
const LanguageAuth = ({setSlideAvailable, setSlideUnAvailable}) => {
  const [selected, setSelected] = useState([]);
  
  useEffect(()=>{
    if(selected.length !== 0){
      setSlideAvailable()
    }else{
      setSlideUnAvailable()
    }

  },[selected])
  
    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <CheckboxGroup value={selected} onChange={setSelected} description="Selected plan can be changed at any time." label="Language:">
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
  

  const languages = [
    { key: "en", label: "English" },
    { key: "zh", label: "Chinese" },
    { key: "es", label: "Spanish" },
    { key: "hi", label: "Hindi" },
    { key: "ar", label: "Arabic" },
    { key: "bn", label: "Bengali" },
    { key: "fr", label: "French" },
    { key: "ru", label: "Russian" },
    { key: "pt", label: "Portuguese" },
    { key: "id", label: "Indonesian" },
    { key: "ja", label: "Japanese" },
    { key: "de", label: "German" },
    { key: "pa", label: "Punjabi" },
    { key: "ur", label: "Urdu" },
    { key: "ko", label: "Korean" },
    { key: "vi", label: "Vietnamese" },
    { key: "fa", label: "Persian" },
    { key: "tr", label: "Turkish" },
    { key: "ta", label: "Tamil" },
    { key: "it", label: "Italian" },
  ];
  
  