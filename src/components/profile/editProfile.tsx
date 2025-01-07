import {
  Modal,
  ModalContent,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
  ModalBody,
  Textarea,
  forwardRef,
} from "@nextui-org/react";

import { useTranslation } from "react-i18next";

import { useEffect, useImperativeHandle, useState } from "react";
import LookingforList from "@/components/core/WhyIamHereAuthList";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { updateUserData } from "@/features/userSlice";


const EditProfile = forwardRef((props:any, ref)=> {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  // States to track editable fields
  const [whyIamHere, setWhyIamHere] = useState(props.user.profileData.lookingFor || ""); 
  const [firstName, setFirstName] = useState(props.user.firstName || "");
  const [bio, setBio] = useState(props.user.profileData.bio || "");
  const [workAndEducation, setWorkAndEducation] = useState(props.user.profileData.education || "");



  const HandlelookingForList = (_,b) => {
    setWhyIamHere(b)
  }
  // Update ref handlers for opening and closing modal
  useImperativeHandle(ref, () => ({
    openModal: onOpen,
    closeModal: onClose
  }));

  useEffect(()=>{console.log(whyIamHere)},[whyIamHere])
  // Dynamically create the payload with only modified fields
  const handleSaveData = async () => {
    const updatedData: any = {};
    console.log(whyIamHere.id)
    if (firstName !== props.user.firstName) {
      updatedData.firstName = firstName;
    }
    if (bio !== props.user.bio) {
      updatedData.bio = bio;
    }
    if (workAndEducation !== props.user.education) {
      updatedData.education = workAndEducation;
    }
    if (whyIamHere !== props.user.lookingFor) {
      updatedData.lookingFor = whyIamHere;
    }

    if (Object.keys(updatedData).length > 0) {
      // Dispatch the update action only if there are changes
      await dispatch(updateUserData({ userId: props.user.id, updatedData }));
    }

    onClose(); // Close the modal after saving
  };


  return (
    <>
      <Modal placement={props.selectedItem==="WhyIamhere"? "bottom":"center"} hideCloseButton classNames={{"base":"px-0 backdrop-saturate-150 backdrop-blur-lg bg-background/60"}} backdrop="blur" isOpen={isOpen} size={"5xl"} onClose={onClose}>
        <ModalContent>
          <ModalBody className={`pt-10 ${props.selectedItem==="WhyIamhere"? "px-0":""}`}>
            <form className="flex flex-col">
              {props.selectedItem==="name" &&  <Input autoFocus value={firstName} onChange={(e) => setFirstName(e.target.value)} label={t("Name")} type="text" /> }

              {props.selectedItem==="WhyIamhere" && <LookingforList user={props.user.profileData} setSlideAvailable={HandlelookingForList} setSlideUnAvailable={HandlelookingForList}/>}

              {props.selectedItem==="Bio" && <Textarea autoFocus value={bio} onChange={(e) => setBio(e.target.value)} className="w-full" label={t("Bio")} placeholder={t("EnteryourBio")}/>}

              {props.selectedItem==="Workandeducation" &&  <Input autoFocus value={workAndEducation} onChange={(e) => setWorkAndEducation(e.target.value)} label={t('Workandeducation')} type="text" /> }
            </form>
          </ModalBody>

          <ModalFooter>
            <Button color="default" variant="solid" onPress={onClose}>
              {t("Close")}
            </Button>
            <Button isLoading={props.loading} color="success" onPress={handleSaveData}>
              {t("Save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

EditProfile.displayName = "EditProfile";

export default EditProfile;
