import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button, Card, CardFooter, Chip } from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperImages from './swiperImage';
import { Pagination, Autoplay } from 'swiper/modules';
import ParallaxText from '@/components/animate/text-slider';
import { HeartIconOutLine, HeightIcon, LanguageIcon, SexualityIcon, ArowUpIcon, VerifyIconFill, HashtagIcon } from '@/Icons/index';
import ExploreCartData from './exploreCartData';
import { useTranslation } from 'react-i18next';
import { gethobbies, getlanguages, getRealationStatus, getSexualityStatus } from '@/constant';

const ExploreCard = (props) => {

  const [openFooter, setOpenFooter] = useState(false);
  const [exitX, setExitX] = useState(1);
  
  const [slideCountrt, setSlideCounter] = useState<number>(1);
  
  const { t } = useTranslation();  // Initialize translation hook


  const x = useMotionValue(0);
  const y = useMotionValue(30);
  const rotate = useTransform(x, [-400, 0, 400], [-5, 0, 5], { clamp: false });

  // Detecting when the drag motion reaches max left or right
  const handleDragEnd = (_, info) => {
      if (info.offset.x < -130) {
        setExitX(-130);
        props.setIndex(props.index - 1); // Move to next slide
        props.handleNotLike();
      } else if (info.offset.x > 130) {
        setExitX(130);
        props.setIndex(props.index - 1); // Move to next slide
        props.handleNotLike();
      }
      
      // Reset `y` to its initial value after drag ends
      y.set(30); 
    
  };

  const toggleFooter = () => setOpenFooter(!openFooter);

  const carsAnimate = {
    variantsFrontCard : {
      animate: { scale: 1, y: 30, opacity: 1 },
      exit: (custom) => ({
        x: custom,
        opacity: 0,
        transition: { duration: 0.2 }
      })
    },

    variantsBackCard : {
      initial: { scale: 0, y: 0, opacity: 0 },
      animate: { scale: 0.9, y: -10, opacity: 0.9 }
    },

    variantsBackCardThird : {
      initial: { scale: 0, y: 0, opacity: 0 },
      animate: { scale: 0.70, y: -70, opacity: 0.8 }
    }

  }
  

  const RealationStatus = getRealationStatus(t)

  const languages = getlanguages(t)

  const SexualityStatus = getSexualityStatus(t)

  const hobbies = gethobbies(t)


  return (
    <>
      <motion.div
        style={{
          width: "calc(100%)",
          maxHeight: "100%",
          overflow: "scroll",
          position: "absolute",
          top: 0,
          x,
          y,
          rotate,
          cursor: "grab",
          display: "flex",
          justifyContent: "center",
          marginTop: "3.5rem"
        }}
        whileTap={{ cursor: "grabbing" }}
        onDragEnd={handleDragEnd} // Handling drag end with slide transition
        drag={"x"} // Disable dragging when footer is open
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        variants={carsAnimate[props.frontCard]}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={exitX}
        transition={
          props.frontCard ==="variantsFrontCard"
            ? { type: "spring", stiffness: 300, damping: 20 }
            : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
        }
      >
        <div className='py-4' style={{ width: "calc(100% - 3rem)" }}>
          <Card radius="sm" isFooterBlurred className="w-full col-span-12 sm:col-span-7">
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
                  {props?.profile?.photos.length === 0 ?
                    <SwiperSlide key={0}>
                      <SwiperImages url={"https://via.placeholder.com/400x500"} />
                    </SwiperSlide>
                
                  :
                    props?.profile?.photos?.map((value, index) => (
                      <SwiperSlide key={index}>
                        <SwiperImages url={value.url} />
                      </SwiperSlide>
                    ))
                  }
                  
            </Swiper>


            <div className="absolute" style={{ bottom: "163px", zIndex: 10 }}>
              <ParallaxText baseVelocity={-1}>
                {Array.isArray(props.profile.interests) && props.profile.interests.length > 0?
                  props.profile.interests.map((value)=>{
                    return <Chip
                              variant="solid"
                              size="md"
                              className="mx-2 backdrop-blur bg-neutral/40 backdrop-saturate-150"
                              style={{ marginRight: "10px" }}
                              startContent={<HashtagIcon className="size-4  mx-1" />}
                            >
                              {hobbies.find(hobbie => hobbie.id == parseInt(value)).name}
                          </Chip>
                        })
                        : null
                }
                
              </ParallaxText>

            </div>

            <div className="absolute" style={{ bottom: "130px", zIndex: 10 }}>
              <ParallaxText baseVelocity={1}>
                <Chip
                  variant="solid"
                  size="md"
                  color="primary"
                  className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"
                  style={{ marginRight: "10px" }}
                  startContent={<HeartIconOutLine fill="#FFF" className="size-4  mx-1" />}
                >
                  {RealationStatus.find(RealationStatus => RealationStatus.key == props.profile.moreAboutMe.relationStatus).label}
                </Chip>

                <Chip
                  variant="solid"
                  color="primary"
                  size="md"
                  style={{ marginRight: "10px" }}
                  className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"

                  startContent={<HeightIcon fill="#FFF" className="size-4  mx-1" />}
                >
                  {props.profile.moreAboutMe.height}
                </Chip>

                    {props.profile.moreAboutMe.languages.map((value)=> languages.find(languages => languages.key === value).label).map((value,index)=>{
                          return <Chip
                          variant="solid"
                          color="primary"
                          className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"
                          key={index}
                          size="md"
                          startContent={<LanguageIcon className="size-4  mx-1" />}
                        >
                          {value}
      
                        </Chip>
                      })}


                <Chip
                  variant="solid"
                  color="primary"
                  size="md"
                  className="mx-2 backdrop-blur bg-primary/60 backdrop-saturate-150"
                  style={{ marginRight: "10px" }}
                  startContent={<SexualityIcon className="size-4  mx-1" />}
                >
                        {SexualityStatus.find(SexualityStatus => SexualityStatus.key === props.profile.moreAboutMe.sexuality).label}
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
                    className="items-start flex-col py-3 backdrop-blur bg-background/70 backdrop-saturate-150"
                >
                  <div className="flex flex-grow gap-2 w-full">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between w-full mb-1">
                        <div className="flex items-center">
                          <p className="text-foreground capitalize font-bold  text-xl">
                            {props.profile.firstName}, {props.profile.age}
                          </p>
                          {props.profile.verifiedAccount && <VerifyIconFill fill="#21b6a8" className="ml-2 size-6"/>}
                          
                        </div>
                        <Button
                          onClick={toggleFooter}
                          size="sm"
                          isIconOnly
                          color="primary"
                          radius="full"
                          variant="solid"
                          aria-label="Toggle Footer"
                          className='transition-all'
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

    </>
  );
};

export default ExploreCard;
