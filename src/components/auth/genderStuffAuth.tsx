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
  
const GenderStuffAuth = () => {
  
    return (
      <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
        <form className="flex w-full flex-col gap-4">
            <RadioGroup description="Selected plan can be changed at any time." label="I am :">
                {Gender.map((value)=> {
                    return <CustomRadio value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
                

            </RadioGroup>


            <RadioGroup description="Selected plan can be changed at any time." label="Looking for :">
                {Gender.map((value)=> {
                    return <CustomRadio  value={value.key}>
                    {value.label}
                </CustomRadio>
                })}
                

            </RadioGroup>

        </form>
      </div>
    );
  };
  

  
  export default GenderStuffAuth;
  

  export const Gender = [
    { key: "Male", label: "Male" },
    { key: "Female", label: "Female" },
  ];
