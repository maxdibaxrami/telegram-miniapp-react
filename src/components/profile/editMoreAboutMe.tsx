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
import KidsListSelector from "../core/kids";
import SmokingListSelector from "../core/smoking";
import DrinkListSelector from "../core/drink";
import PetsListSelector from "../core/pets";

interface MoreAboutMe {
  languages: string[];
  height: number;
  relationStatus: string;
  sexuality: string;
  kids: string | null;
  smoking: string | null;
  drink: string | null;
  pets: string | null;
}

const EditMoreAboutMeModal = forwardRef((props:any, ref)=> {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [data , setData ] = useState<MoreAboutMe>({
    height: props.user.moreAboutMe.height,
    languages: props.user.moreAboutMe.languages,
    relationStatus: props.user.moreAboutMe.relationStatus,
    sexuality: props.user.moreAboutMe.sexuality,
    kids: props.user.moreAboutMe.kids,
    smoking: props.user.moreAboutMe.smoking,
    drink: props.user.moreAboutMe.drink,
    pets: props.user.moreAboutMe.pets,

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

      if (data.kids !== props.user.kids) {
        updatedData.kids = data.kids ;
      }

      if (data.smoking !== props.user.smoking) {
        updatedData.smoking = data.smoking ;
      }

      if (data.drink !== props.user.drink) {
        updatedData.drink = data.drink ;
      }
      if (data.pets !== props.user.pets) {
        updatedData.pets = data.pets ;
      }
  
      
      if (Object.keys(updatedData).length > 0) {
        // Dispatch the update action only if there are changes
        await dispatch(updateUserData({ userId: props.user.id, updatedData }));
      }
  
      onClose(); // Close the modal after saving
    };

  return (
    <>
      <Modal classNames={{"base":"px-0 backdrop-saturate-150 backdrop-blur-lg bg-background/60"}} hideCloseButton scrollBehavior="inside" backdrop="blur" isOpen={isOpen} size={"2xl"} onClose={onClose}>
        <ModalContent>

          <ModalBody className="px-0" style={props.selectedItem === "height" ? {maxHeight:"150px"}:{maxHeight:"600px"}}>
            <ScrollShadow size={100} hideScrollBar className={props.selectedItem === "height" ? "h-[150px]": "h-[600px]"}>

              {props.selectedItem === "height" && <HeightAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "RealationStatus" && <RealationStatusAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "languages" && <LanguageAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "SexualityStatus" && <SexualityStatusAuth user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "kids" && <KidsListSelector user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "smoking" && <SmokingListSelector user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "drink" && <DrinkListSelector user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}
              {props.selectedItem === "pets" && <PetsListSelector user={props.user} setSlideAvailable={onSetData} setSlideUnAvailable={onSetData}/>}

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

