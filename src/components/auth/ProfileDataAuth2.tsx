import {Calendar} from "@nextui-org/react";

const ProfileDataAuth2 = () => {
  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">

        <p className="mb-1 text-left">Select date of birth: </p>
        <Calendar style={{width:"100%"}} showMonthAndYearPickers aria-label="Date (Show Month and Year Picker)" />
        
      </form>
    </div>
  );
};

export default ProfileDataAuth2;
