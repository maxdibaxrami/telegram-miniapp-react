import {
    cn,
    Radio,
    RadioGroup,
  } from "@nextui-org/react";
  

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
  
const SexualityStatusAuth = () => {
  
    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup  description="Selected plan can be changed at any time." label="Sexuality Status:">
                
                {SexualityStatus.map((value)=> {
                    return <CustomRadio  value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
                

            </RadioGroup>
        </form>
      </div>
    );
  };
  

  
  export default SexualityStatusAuth;
  

  const SexualityStatus = [
    { key: "straight", label: "Straight" },
    { key: "gay", label: "Gay" },
    { key: "lesbian", label: "Lesbian" },
    { key: "bisexual", label: "Bisexual" },
    { key: "asexual", label: "Asexual" },
    { key: "pansexual", label: "Pansexual" },
    { key: "queer", label: "Queer" },
    { key: "questioning", label: "Questioning" },
  ];