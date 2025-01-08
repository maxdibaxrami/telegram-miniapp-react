import useViewportHeight from "@/hooks/useViewPortHook";
import {
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProfileDataAuth = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  const { t } = useTranslation();

  const [name , setName] = useState(user.firstName)
  const [bio, setBio] = useState(user.bio)
  const [workAndEducation, setWorkAndEducation] = useState(user.education)

  const height = useViewportHeight()

  console.log(height)
  
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
        <p className="mb-1 font-medium">{t('Fillprofiledata')}</p>

        <Input value={name} onChange={(e)=> setName(e.target.value)} isRequired label={t('name')} type="text" />
        
        <Textarea
          className="w-full"
          label={t('Bio')}
          isRequired
          value={bio}
          onChange={(e)=> setBio(e.target.value)}
          placeholder={t('EnteryourBio')}
        />

        <Textarea
          className="w-full"
          label={t('Workandeducation')}
          isRequired
          value={workAndEducation}
          onChange={(e)=> setWorkAndEducation(e.target.value)}
          placeholder={t('EnteryourWorkandeducationstatus')}
        />

      </form>
    </div>
  );
};

export default ProfileDataAuth;

