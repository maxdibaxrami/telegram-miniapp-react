import {
  Input,
  Textarea,
} from "@nextui-org/react";

const ProfileDataAuth = () => {


  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 text-left">Fill profile data : </p>

        <Input isRequired label="Name" type="text" />
        
        <Textarea
          className="w-full"
          label="About me"
          isRequired
          placeholder="Enter your description"
        />

        <Textarea
          className="w-full"
          label="Work and education"
          isRequired
          placeholder="Enter your Work and education status"
        />

      </form>
    </div>
  );
};

export default ProfileDataAuth;

