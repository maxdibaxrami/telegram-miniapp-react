import {
    cn,
    Radio,
    RadioGroup,
  } from "@nextui-org/react";
import { useEffect, useState } from "react";
  

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
  
const HeightAuth = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  
    const [selected, setSelected] = useState(user.height);

    useEffect(()=>{
      if(selected !==""){
        setSlideAvailable("height",selected)
      }else{
        setSlideUnAvailable("height",selected)
      }
  
    },[selected])
    
    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup value={selected} onValueChange={setSelected} description="Selected plan can be changed at any time." label="Height:">
                {HeightOptions.map((value)=> {
                    return <CustomRadio  value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
                

            </RadioGroup>
        </form>
      </div>
    );
  };
  

  
  export default HeightAuth;
  

  const HeightOptions = [
    { key: "145", label: "4'9\" (145 cm)" },
    { key: "150", label: "4'11\" (150 cm)" },
    { key: "155", label: "5'1\" (155 cm)" },
    { key: "160", label: "5'3\" (160 cm)" },
    { key: "165", label: "5'5\" (165 cm)" },
    { key: "170", label: "5'7\" (170 cm)" },
    { key: "175", label: "5'9\" (175 cm)" },
    { key: "180", label: "5'11\" (180 cm)" },
    { key: "185", label: "6'1\" (185 cm)" },
    { key: "190", label: "6'3\" (190 cm)" },
    { key: "195", label: "6'5\" (195 cm)" },
    { key: "200", label: "6'7\" (200 cm)" },
    { key: "205", label: "6'9\" (205 cm)" },
    { key: "210", label: "6'11\" (210 cm)" },
    { key: "215", label: "7'1\" (215 cm)" }
  ];
  