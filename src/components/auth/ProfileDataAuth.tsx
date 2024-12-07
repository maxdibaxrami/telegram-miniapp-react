import {
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const ProfileDataAuth = ({setSlideAvailable, setSlideUnAvailable, user}) => {

  const [name , setName] = useState(user.firstName)
  const [bio, setBio] = useState(user.bio)
  const [workAndEducation, setWorkAndEducation] = useState(user.education)

  useEffect(()=>{
    if(name.length> 3 && bio.length>3 , workAndEducation.length>3){
      setSlideAvailable("firstName",name)
      setSlideAvailable("bio", bio)
      setSlideAvailable("education", workAndEducation)

      return
    }
    setSlideUnAvailable()
    setSlideUnAvailable()
    setSlideUnAvailable()

  },[name, bio, workAndEducation])

  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 text-left">Fill profile data : </p>

        <Input value={name} onChange={(e)=> setName(e.target.value)} isRequired label="Name" type="text" />
        
        <Textarea
          className="w-full"
          label="Bio"
          isRequired
          value={bio}
          onChange={(e)=> setBio(e.target.value)}
          placeholder="Enter your Bio"
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

