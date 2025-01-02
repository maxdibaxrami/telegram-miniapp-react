import {
  Modal,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
  ModalBody,
  forwardRef,
  ScrollShadow,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useEffect, useImperativeHandle, useState } from "react";
import HeightAuth from "../auth/HeightAuth";
import RealationStatusAuth from "../auth/RealationStatusAuth";
import LanguageAuth from "../auth/languagesAuth";
import SexualityStatusAuth from "../auth/SexualityStatusAuth";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { updateUserData } from "@/features/userSlice";

interface UserData {
  height: number;
  languages: string[];
  relationStatus: string;
  sexuality: string;

}
const EditMoreAboutMeModal = forwardRef((props:any, ref)=> {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [data , setData ] = useState<UserData>({
    height: props.user.height,
    languages: props.user.languages,
    relationStatus: props.user.relationStatus,
    sexuality: props.user.sexuality,
  })

  useEffect(()=>{console.log(data)},[data])

  const onSetData = (key, value) => {
    setData((prevUser) => ({
      ...prevUser,  // Spread the previous state to keep other fields unchanged
      [key]: value, // Dynamically update the specific key with the new value
    }));
  }

    useImperativeHandle(ref, () => ({
      openModal: onOpen,
      closeModal: onClose
    }));
    
    const handleSaveData = async () => {
      const updatedData: any = {};

      if (data.height !== props.user.height) {
        updatedData.height = Number(data.height);
      }
      if (data.relationStatus !== props.user.realationShipStatus) {
        updatedData.relationStatus = data.relationStatus;
      }
      if (data.languages !== props.user.languages) {
        updatedData.languages = data.languages ;
      }
      if (data.sexuality !== props.user.sexuality) {
        updatedData.sexuality = data.sexuality ;
      }
  
      if (Object.keys(updatedData).length > 0) {
        // Dispatch the update action only if there are changes
        await dispatch(updateUserData({ userId: props.user.id, updatedData }));
      }
  
      onClose(); // Close the modal after saving
    };

  return (
    <>
      <Modal classNames={{"base":"px-0 backdrop-saturate-150 backdrop-blur-lg bg-background/70"}} hideCloseButton scrollBehavior="inside" backdrop="blur" isOpen={isOpen} size={"2xl"} onClose={onClose}>
        <ModalContent>

          <ModalBody className="px-0" style={{maxHeight:"600px"}}>
            <ScrollShadow size={100} hideScrollBar className="h-[600px]">
              {props.selectedItem === "height" && <HeightAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "RealationStatus" && <RealationStatusAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "languages" && <LanguageAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "SexualityStatus" && <SexualityStatusAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}

            </ScrollShadow>
          </ModalBody>

          <ModalFooter>
            <Button color="default" variant="solid" onPress={onClose}>
              {t("Close")}
            </Button>
            <Button isDisabled={data.languages.length === 0} isLoading={props.loading} color="success" onPress={handleSaveData}>
              {t("Save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});


EditMoreAboutMeModal.displayName = "EditMoreAboutMeModal";

export default EditMoreAboutMeModal;


export const KidStatus = [
  { key: "cat", label: "Some day" },
  { key: "dog", label: "i have already" },
  { key: "elephant", label: "I don’t want kids" },
  { key: "lion", label: "I’d rather not say" },
];
