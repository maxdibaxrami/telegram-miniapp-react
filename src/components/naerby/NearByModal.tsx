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

import { ArowDownIcon, ArowUpIcon, CloseCircleIcon, HeartEyesImoji, HeartIconOutLine, HeightIcon, LanguageIcon, LikeIcon, LocationIcon, SexualityIcon, VerifyIconFill } from "@/Icons/index";
import { Pagination, Autoplay } from 'swiper/modules';

import ParallaxText from "../animate/text-slider";
import ExploreCartData from "../explore/exploreCartData";
import SwiperImages from "../explore/swiperImage";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { likeUser } from "@/features/likeSlice";
import { AppDispatch, RootState } from "@/store";

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
  const [slideCountrt, setSlideCounter] = useState<number>(1);
  const dispatch: AppDispatch = useDispatch();  // Use the correct AppDispatch type from your store

  const { requestLoading } = useSelector((state: RootState) => state.like);  // Assuming the like slice is in state.like


  const { t } = useTranslation();  // Initialize translation hook
  
  const toggleFooter = () => setOpenFooter(!openFooter);


  useImperativeHandle(ref, () => ({
    callChildFunction: onOpen,
    callChildOnClose: onClose,

  }));

  const RealationStatus = [
    { key: "Single", label: t("Single") },
    { key: "Taken", label: t("Taken") },
    { key: "open", label: t("open") },
    { key: "ratthernotsay", label: t("Irathernotsay") },
  ];

  const languages = [
    { key: "en", label: t("en") },
    { key: "zh", label: t("zh") },
    { key: "es", label: t("es") },
    { key: "hi", label: t("hi") },
    { key: "ar", label: t("ar") },
    { key: "bn", label: t("bn") },
    { key: "fr", label: t("fr") },
    { key: "ru", label: t("ru") },
    { key: "pt", label: t("pt") },
    { key: "id", label: t("id") },
    { key: "ja", label: t("ja") },
    { key: "de", label: t("de") },
    { key: "pa", label: t("pa") },
    { key: "ur", label: t("ur") },
    { key: "ko", label: t("ko") },
    { key: "vi", label: t("vi") },
    { key: "fa", label: t("fa") },
    { key: "tr", label: t("tr") },
    { key: "ta", label: t("ta") },
    { key: "it", label: t("it") },
  ];

  const SexualityStatus = [
    { key: "straight", label: t("straight") },
    { key: "gay", label: t("gay") },
    { key: "lesbian", label: t("lesbian") },
    { key: "bisexual", label: t("bisexual") },
    { key: "asexual", label: t("asexual") },
    { key: "pansexual", label: t("pansexual") },
    { key: "queer", label: t("queer") },
    { key: "questioning", label: t("questioning") },
  ];



  const handleLikeUser = async () => {
    try {
      // Dispatch the action and unwrap the result
      const resultAction = await dispatch(likeUser({ userId: props.userId , likedUserId: props.profile.id }));

      if (resultAction.payload.isMatch === true) {
        props.openModal()
      }

      onClose()

    } catch (error) {
      console.error('Failed to like user:', error);
    }
  };

  return (
    <>

    <Modal 
      placement={"center"} 
      size={"full"}  
      style={{position:"relative"}}
      classNames={{"wrapper":"bg-transparent p-0","base":"bg-transparent p-0","body":"p-0"}} 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
    >
        {props?.profile && (
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
                    {props?.profile?.photos?.map((value, index) => (
                      <SwiperSlide key={index}>
                       <SwiperImages url={value.url} />
                     </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  <div className="absolute" style={{ bottom: "170px", zIndex: 10 }}>
                      <Chip
                        variant="solid"
                        color="secondary"
                        size="md"
                        className="mx-2 backdrop-blur bg-secondary/60 backdrop-saturate-150"                        
                        startContent={<LocationIcon fill="#FFF" className="size-4 mx-1" />}
                      >
                        {`${props.profile.country}, ${props.profile.city}`}
                      </Chip>
                  </div>
                  <div className="absolute" style={{ bottom: "135px", zIndex: 10, direction:"ltr" }}>
                    <ParallaxText baseVelocity={2}>
                      <Chip
                        variant="solid"
                        color="primary"
                        size="md"
                        className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"
                        startContent={<HeartIconOutLine fill="#FFF" className="size-4 mx-1" />}
                      >
                        {RealationStatus.find(RealationStatus => RealationStatus.key === props.profile.relationStatus).label}
                      </Chip>
    
                      <Chip
                        variant="solid"
                        color="primary"
                        size="md"
                        className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"
                        startContent={<HeightIcon fill="#FFF" className="size-4 mx-1" />}
                      >
                        {props.profile.height}
                      </Chip>
    
                      {props.profile.languages.map((value)=> languages.find(languages => languages.key === value).label).map((value,index)=>{
                          return <Chip
                          variant="solid"
                          color="primary"
                          key={index}
                          size="md"
                          startContent={<LanguageIcon className="size-4 mx-1" />}
                          className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"
                          >
                          {value}
      
                        </Chip>
                      })}
                     
                      
                      <Chip
                        variant="solid"
                        color="primary"
                        size="md"
                        className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"
                        startContent={<SexualityIcon className="size-4 mx-1" />}
                      >
                        {SexualityStatus.find(SexualityStatus => SexualityStatus.key === props.profile.sexuality).label}
                      </Chip>
                    </ParallaxText>
                  </div>
    
                  <motion.div
                    initial={{ height: "120px" }}
                    animate={{ height: openFooter ? "100%" : "120px" }}
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
                                  {props.profile.firstName}, {props.profile.age} , {props.profile.id} 
                                </p>
                                <VerifyIconFill fill="#016fee" className="ml-2 size-6"/>
    
                              </div>
                              <Button
                                onClick={toggleFooter}
                                size="sm"
                                isIconOnly
                                color="primary"
                                variant="solid"
                                radius="full"
                                aria-label="Toggle Footer"
                                style={openFooter? {transform: "rotate(180deg)"}:{transform: "rotate(0deg)"}}

                              >
                                 <ArowUpIcon className="size-7" /> 
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
    
    
            <AnimatePresence>
              {isOpen && (<>
                  <motion.div
                      className="card backdrop-blur bg-primary/10 backdrop-saturate-150  z-50 p-2 footerswipcard fixed"
                      style={{ zIndex:999,right:"51%" , bottom: "20px", borderRadius:"50%" }}
                      transition={{ type: "tween" }}
                    >
                      <Button className="bg-primary/90 backdrop-saturate-150 backdrop-blur" onPress={()=> onClose()} style={{width:"72px", height:"72px", zIndex:999}} size="lg" radius="full" isIconOnly color="primary" variant="shadow">
                        <CloseCircleIcon style={{width:"2.5rem",height:"2.5rem"}} className="size-9" />
                      </Button>
                  </motion.div>
    
                  <motion.div
                      className="card backdrop-blur bg-primary/10 backdrop-saturate-150  p-2 footerswipcard fixed"
                      transition={{ type: "tween" }}
                      style={{ bottom: "20px",left:"51%", zIndex:999, borderRadius:"50%" }}
                    >
                      <Button className="flex items-center justify-center" isLoading={requestLoading} radius="full" style={{width:"72px", height:"72px", zIndex:999}} size="lg" isIconOnly onPress={handleLikeUser} color="success" variant="shadow">
                        <HeartEyesImoji className="w-full h-full"/>
                      </Button>
                  </motion.div>
                </>)}
            </AnimatePresence>
    
          </ModalContent>
    )}

    </Modal>
      


      </>  
  );
});

NearByUserModal.displayName = "NearByUserModal";

export default NearByUserModal;
