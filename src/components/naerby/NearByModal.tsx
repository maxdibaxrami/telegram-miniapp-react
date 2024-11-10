"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { Listbox, ListboxItem, ListboxSection, Chip, Button, Image } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useImperativeHandle } from "react";

import { HeartIcon, LocationIconSmall, VerifyIcon } from "@/Icons/index";
import ExploreCardOption from "../explore/exploreCardOption";
import {
  SearchIcon,
  HashtagIcon,
  AboutMeIcon,
  WorkAndStudyIcon,
  WhyYouAreHereIcon,
} from "@/Icons/index";

import { ArrowRight } from "@/Icons/index";
import { ExploreChat } from "@/Icons/index";

import NearByMatchModal from "./NearByMatchModal";
import {NotLikeImoji, HeartEyesImoji} from './NearByMotionIcons'

const getAnimationProps = () => {
  return {
    whileTap: {
      scale: 0.85,
    },
  };
};

const getAnimationProps2 = () => {
  return {
    whileTap: {
      rotate: -18, // Rotate to 348 degrees
    },
  };
};

const NearByUserModal = forwardRef((props:any, ref) => {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useImperativeHandle(ref, () => ({
    callChildFunction: onOpen,
  }));

  return (
    <>
    <Modal classNames={{"closeButton":"z-50"}} backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent style={{height:"95vh", backgroundColor:"#ffffffd9"}} className="backdrop-blur">
        <ModalBody
                style={{
                    width: "100%",
                    borderRadius: 16,
                    padding: "12px",
                    left: 0,
                    right: 0,
                    margin: "auto",
                    marginTop: "1.5rem",
                    overflow:"scroll"
                }}
                className=" bg-transparent"
            >
                   <div className="relative">
                    <ExploreCardOption />
                    <div className="flex w-full flex-col">
                      <div className="w-full" >
                        <Image
                          alt="Profile hero Image"
                          className="w-full h-full"
                          classNames={{
                            wrapper: "w-full maxcontentimportant",
                          }}
                          
                          loading="lazy"
                          src={props.profile.mainImage} // dynamic image URL
                          style={{
                            borderRadius: "20px",
                            objectFit: "cover",
                            height: "100%",

                          }}
                        />
                      </div>

                      <div className="flex">
                        <div className="w-full">
                          <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            classNames={{
                              wrapper: "w-full maxcontentimportant",
                            }}
                            src={props.profile.secondImage}  // dynamic image URL
                            style={{
                              objectFit: "cover",
                              borderRadius: "20px",
                              padding: "5px 5px 0px 0px",
                              height: "100%",
                              widows:"100%"
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            loading="lazy"
                            classNames={{
                              wrapper: "w-full maxcontentimportant",
                            }}
                            src={props.profile.thirdImage}  // dynamic image URL
                            style={{
                              objectFit: "cover",
                              borderRadius: "20px",
                              padding: "5px 0px 0px 5px",
                              height: "100%",
                              width:"100%"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ zIndex: 10, marginLeft: "8px", padding: "8px", marginBottom: "6px" }} className="w-[calc(100%_-_16px)] background-black--blue flex flex-col items-start gap-1 absolute border-white/20 border-1 py-1 rounded-large bottom-1 shadow-small">
                        <h4 className="flex items-center text-small text-white font-semibold">{props.profile.name} , {props.profile.age} <VerifyIcon stroke="#fff" /></h4>
                        <h5 className="flex items-center text-small text-white"><LocationIconSmall fill="#fff" /> {props.profile.location}</h5>
                    </div>
                </div>

                <User
                    className="bg-white w-full justify-start pl-4 border-color--carts---modal"
                    name="Ready for relationship"
                    style={{ marginTop: "1rem" }}
                    classNames={{ wrapper: "py-3", base: "px-1" }}
                    description="@jrgarciadev"
                    avatarProps={{ color: "secondary", icon: <HeartIcon stroke="#fff" fill="#FFF" /> }}
                />

                {/* Additional User components can be added here */}

                <div className="w-full mb-4 mt-2">
                <Listbox
                  className="bg-white px-2 py-2 border-color--carts---modal"
                  style={{borderRadius:"8px"}}
                  aria-label="Listbox menu with sections"
                  variant="solid"
                >
                  <ListboxSection
                    showDivider
                    className="relative"
                    title="Profile"
                  >
                    <ListboxItem
                      key="2"
                      isReadOnly
                      description={props.profile.workAndEducation}
                      startContent={<WorkAndStudyIcon />}
                    >
                      Work and education
                    </ListboxItem>

                    <ListboxItem
                      key="3"
                      isReadOnly
                      description={props.profile.whyHere}
                      startContent={<WhyYouAreHereIcon />}
                    >
                      Why you are here?
                    </ListboxItem>

                    <ListboxItem
                      key="4"
                      isReadOnly
                      description={props.profile.aboutMe}
                      startContent={<AboutMeIcon />}
                    >
                      About me
                    </ListboxItem>

                    <ListboxItem
                      key="5"
                      isReadOnly
                      description={props.profile.lookingFor}
                      startContent={<SearchIcon />}
                    >
                      Looking for?
                    </ListboxItem>
                  </ListboxSection>

                  <ListboxSection className="relative" title="More about me!">
                    <ListboxItem
                      key="7"
                      isReadOnly
                      description={props.profile.relationStatus}
                    >
                      Relation status
                    </ListboxItem>
                    <ListboxItem
                      key="8"
                      isReadOnly
                      description={props.profile.height}
                    >
                      Height
                    </ListboxItem>
                    <ListboxItem
                      key="9"
                      isReadOnly
                      description={props.profile.kids}
                    >
                      Kids
                    </ListboxItem>
                    <ListboxItem
                      key="10"
                      isReadOnly
                      description={props.profile.language}
                    >
                      Language
                    </ListboxItem>
                    <ListboxItem
                      key="11"
                      isReadOnly
                      description={props.profile.sexuality}
                    >
                      Sexuality
                    </ListboxItem>
                  </ListboxSection>

                  <ListboxSection className="relative" title="Interesting">
                    <ListboxItem key={"1"} isReadOnly>
                      <div
                        className="flex flex-wrap"
                        style={{ paddingBottom: "40px" }}
                      >
                        {Array.isArray(props.profile.interests) &&
                        props.profile.interests.length > 0
                          ? props.profile.interests.map((value, index) => (
                              <Chip
                                key={index}
                                className="m-1"
                                color="success"
                                startContent={<HashtagIcon />}
                                variant="solid"
                              >
                                {value}
                              </Chip>
                            ))
                          : null}
                      </div>
                    </ListboxItem>
                    <ListboxItem
                      key="13"
                      isReadOnly
                      className="absolute"
                      style={{
                        top: "-8px",
                        right: "0px",
                        width: "45px",
                        height: "45px",
                      }}
                    />
                  </ListboxSection>
                </Listbox>
              </div>

        </ModalBody>
      </ModalContent>

      <div>
          <motion.div
            className="card background-drop--whitebase p-1 footerswipcard border-1 fixed backdrop-blur-sm	"
            animate={{ bottom: "70px", zIndex:50, right:"51%",scale:1 }}
            initial={{right:"51%",scale:0.7}}
            exit={{right:"51%",scale:0.7,bottom:"-50px",opacity:0}}
            transition={{ type: "tween" }}
            {...getAnimationProps2()}
          >
            <NotLikeImoji />
          </motion.div>

          <motion.div
            className="card background-drop--whitebase p-1 footerswipcard border-1 fixed backdrop-blur-sm	"
            transition={{ type: "tween" }}
            initial={{left:"51%",scale:0.7}}
            exit={{left:"51%",scale:0.7,bottom:"-50px",opacity:0}}
            animate={{ bottom: "70px", zIndex:50 ,left:"51%",scale:1 }}

            {...getAnimationProps()}
          >
            <HeartEyesImoji
              dataId={props.profile}
              openModal={openModal}
            />
          </motion.div>

      </div>
    </Modal>
          <NearByMatchModal
            isOpen={isModalOpen}
            modalData={props.profile}
            onClose={closeModal}
          />

        <AnimatePresence>
          {isOpen && (
              <motion.div
                style={{zIndex:999}}
                className="fixed background-drop--whitebase backdrop-blur-sm	 p-2"
                initial={{ opacity: 0 , right:"-80px", bottom:"-80px", scale: 0.5 }}
                animate={{ opacity: 1 , right:"20px" , bottom:"20px", scale: 1.1 }}
                exit={{ opacity: 0 , right:"-80px", bottom:"-80px", scale: 0.5 }}
                transition={{
                  ease: "linear",
                  duration: 0.25,
                }}
              >
                <Button className="color-white" onPress={onClose} isIconOnly color="primary" style={{borderRadius:"20%"}} size="lg" aria-label="Like">
                  <ArrowRight stroke="#FFF"/>
                </Button>  
              </motion.div>
          )}
        </AnimatePresence>


        <AnimatePresence>
          {isOpen && (
              <motion.div
                style={{zIndex:999}}
                className="fixed background-drop--whitebase p-2 backdrop-blur-sm	"
                initial={{ opacity: 0 , left:"-80px", bottom:"-80px", scale: 0.5 }}
                animate={{ opacity: 1 , left:"20px" , bottom:"20px", scale: 1.1 }}
                exit={{ opacity: 0 , left:"-80px", bottom:"-80px", scale: 0.5 }}
                transition={{
                  ease: "linear",
                  duration: 0.25,
                }}
              >
                <Button className="color-white" onPress={onClose} isIconOnly color="primary" style={{borderRadius:"20%"}} size="lg" aria-label="Like">
                  <ExploreChat fill="#FFF"/>
                </Button>  
              </motion.div>
          )}
        </AnimatePresence>


      </>  
  );
});

NearByUserModal.displayName = "NearByUserModal";

export default NearByUserModal;
