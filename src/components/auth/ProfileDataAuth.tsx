import {
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const ProfileDataAuth = ({setSlideAvailable, setSlideUnAvailable}) => {

  const [name , setName] = useState('')
  const [description, setDescription] = useState('')
  const [workAndEducation, setWorkAndEducation] = useState('')

  useEffect(()=>{
    if(name.length> 3 && description.length>3 , workAndEducation.length>3){
      setSlideAvailable()
      return
    }
    setSlideUnAvailable()
  },[name, description, workAndEducation])

  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 text-left">Fill profile data : </p>

        <Input value={name} onChange={(e)=> setName(e.target.value)} isRequired label="Name" type="text" />
        
        <Textarea
          className="w-full"
          label="About me"
          isRequired
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
          placeholder="Enter your description"
        />

        <Textarea
          className="w-full"
          label="Work and education"
          isRequired
          value={workAndEducation}
          onChange={(e)=> setWorkAndEducation(e.target.value)}
          placeholder="Enter your Work and education status"
        />

      </form>
    </div>
  );
};

export default ProfileDataAuth;

