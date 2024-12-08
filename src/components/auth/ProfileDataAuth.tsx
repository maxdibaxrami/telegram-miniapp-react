import {
  Input,
  Select,
  SelectItem,
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

      <Select isOpen={true} isRequired label="Select gender">
        {gender.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
        
      </form>
    </div>
  );
};

export default ProfileDataAuth;

export const gender = [
  {key: "Male", label: "Male"},
  {key: "Female", label: "Female"},
];

