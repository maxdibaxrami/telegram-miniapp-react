"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Card,
  CardFooter,
} from "@nextui-org/react";
import { Chip, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useImperativeHandle } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArowDownIcon, ArowUpIcon, BabyIcon, CloseCircleIcon, HeartIconOutLine, HeightIcon, LanguageIcon, LikeIcon, LocationIcon, SexualityIcon, VerifyIconFill } from "@/Icons/index";
import { Pagination, Autoplay } from 'swiper/modules';

import { ArrowRight } from "@/Icons/index";
import { ExploreChat } from "@/Icons/index";

import NearByMatchModal from "./NearByMatchModal";
import {NotLikeImoji, HeartEyesImoji} from './NearByMotionIcons'
import ParallaxText from "../animate/text-slider";
import ExploreCartData from "../explore/exploreCartData";
import SwiperImages from "../explore/swiperImage";
import { heartConfetti } from "../explore/buttonEffect";

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

const variantsFrontCard = {
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: (custom) => ({
    x: custom,
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.2 }
  })
};

const NearByUserModal = forwardRef((props:any, ref) => {

  const [openFooter, setOpenFooter] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideCountrt, setSlideCounter] = useState<number>(1);

  const imageData = [props.profile.mainImage, props.profile.secondImage, props.profile.thirdImage,]

  const toggleFooter = () => setOpenFooter(!openFooter);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useImperativeHandle(ref, () => ({
    callChildFunction: onOpen,
  }));

  const OnLikeButtonClick = (dataId) => {

    if (dataId.id === 4 || dataId.id === 8) {
      openModal();

    } else {
      heartConfetti();
    }

  }

  return (
    <>
    <Modal 
      placement={"center"} 
      size={"full"}  
      classNames={{"wrapper":"bg-transparent p-0","base":"bg-transparent p-0","body":"p-0"}} 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody>
          <motion.div
            style={{
              width: "calc(100%)",
              maxHeight: "100%",
              overflow: "scroll",
              position: "absolute",
              top: 0,
              cursor: "grab",
              display: "flex",
              justifyContent: "center",
              marginTop: "calc(5.5rem)"
            }}
            whileTap={{ cursor: "grabbing" }}
            variants={ variantsFrontCard }
            initial="initial"
            animate="animate"
            exit="exit"
            transition={
              props.frontCard
                ? { type: "spring", stiffness: 300, damping: 20 }
                : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
            }
        >
          <div style={{ width: "calc(100% - 3rem)" }}>
            <Card isFooterBlurred className="w-full col-span-12 sm:col-span-7">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: false }}
                navigation={false}
                autoplay={{
                  delay: 3000, // 3 seconds
                  disableOnInteraction: false, // Keep auto-play after user interaction
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                onSlideChange={() => setSlideCounter(slideCountrt + 1)}
              >
                {imageData.map((value, index) => (
                  <SwiperSlide key={index}>
                   <SwiperImages value={value} />
                 </SwiperSlide>
                ))}
              </Swiper>
              
              <div className="absolute" style={{ bottom: "155px", zIndex: 10 }}>
                  <Chip
                    variant="solid"
                    color="secondary"
                    size="md"
                    style={{ marginLeft: "10px" }}
                    startContent={<LocationIcon fill="#FFF" className="size-4" />}
                  >
                    {props.profile.location}
                  </Chip>
              </div>
              <div className="absolute" style={{ bottom: "120px", zIndex: 10 }}>
                <ParallaxText baseVelocity={2}>
                  <Chip
                    variant="solid"
                    color="primary"
                    size="md"
                    style={{ marginRight: "10px" }}
                    startContent={<HeartIconOutLine fill="#FFF" className="size-4" />}
                  >
                    {props.profile.relationStatus}
                  </Chip>

                  <Chip
                    variant="solid"
                    color="primary"
                    size="md"
                    style={{ marginRight: "10px" }}
                    startContent={<HeightIcon fill="#FFF" className="size-4" />}
                  >
                    {props.profile.height}
                  </Chip>

                  <Chip
                    variant="solid"
                    color="primary"
                    size="md"
                    style={{ marginRight: "10px" }}
                    startContent={<BabyIcon fill="#FFF" className="size-4" />}
                  >
                    {props.profile.kids}
                  </Chip>

                  <Chip
                    variant="solid"
                    color="primary"
                    size="md"
                    startContent={<LanguageIcon className="size-4" />}
                    style={{ marginRight: "10px" }}
                  >
                    {props.profile.language}
                  </Chip>

                  <Chip
                    variant="solid"
                    color="primary"
                    size="md"
                    style={{ marginRight: "10px" }}
                    startContent={<SexualityIcon className="size-4" />}
                  >
                    {props.profile.sexuality}
                  </Chip>
                </ParallaxText>
              </div>

              <motion.div
                initial={{ height: "110px" }}
                animate={{ height: openFooter ? "100%" : "110px" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
                className="absolute bottom-0 z-10 w-full"
              >
                <div className="relative h-full w-full">
                  <CardFooter
                    style={openFooter? { height: "100%", maxHeight:"100%" , overflow:"scroll"}:{ height: "100%", maxHeight:"100%" , overflow:"hidden"}}
                    className="items-start flex-col py-3 backdrop-blur bg-background/80 backdrop-saturate-150"
                  >
                    <div className="flex flex-grow gap-2 w-full">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full mb-1">
                          <div className="flex items-center">
                            <p className="text-foreground font-bold  text-xl">
                              {props.profile.name}, {props.profile.age} 
                            </p>
                            <VerifyIconFill fill="#016fee" className="ml-2 size-6"/>

                          </div>
                          <Button
                            onClick={toggleFooter}
                            size="sm"
                            isIconOnly
                            color="primary"
                            variant="solid"
                            aria-label="Toggle Footer"
                          >
                            {openFooter ? <ArowUpIcon className="size-7" /> : <ArowDownIcon className="size-7" />}
                          </Button>
                        </div>

                        <ExploreCartData openFooter={openFooter} slideCount={slideCountrt} profile={props.profile} />
                      </div>
                    </div>
                  </CardFooter>
                </div>
              </motion.div>
            </Card>
          </div>
          </motion.div>
        </ModalBody>
      </ModalContent>

      <div>
            <motion.div
                  className="card backdrop-blur bg-background/80 backdrop-saturate-150 p-2 footerswipcard fixed"
                  animate={{ bottom: "20px", zIndex:50, right:"50%" }}
                  style={{right:"51%"}}
                  transition={{ type: "tween" }}
                  {...getAnimationProps()}
                >
                  <Button onClick={openModal} style={{width:"72px", height:"72px"}} size="lg" isIconOnly color="primary" variant="shadow">
                    <CloseCircleIcon className="size-9"/>
                  </Button>
            </motion.div>

              <motion.div
                  className="card backdrop-blur bg-background/80 backdrop-saturate-150 p-2 footerswipcard fixed"
                  transition={{ type: "tween" }}
                  style={{left:"51%"}}
                  animate={{ bottom: "20px", zIndex:50 ,left:"50%" }}

                  {...getAnimationProps()}
                >
                  <Button radius="lg" style={{width:"72px", height:"72px"}} size="lg" isIconOnly onPress={()=> OnLikeButtonClick(props.profile)} color="primary" variant="shadow">
                    <LikeIcon className="size-9"/>
                  </Button>
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
                <Button className="color-white" onPress={onClose} isIconOnly color="primary" style={{borderRadius:"20%"}} size="md" aria-label="Like">
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
                <Button className="color-white" onPress={onClose} isIconOnly color="primary" style={{borderRadius:"20%"}} size="md" aria-label="Like">
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
