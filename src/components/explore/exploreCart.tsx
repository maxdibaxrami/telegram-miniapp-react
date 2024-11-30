import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { Card, CardFooter, Chip, Image } from "@nextui-org/react";

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

import ParallaxText from '@/components/animate/text-slider'

import { HeightIcon, HeartIconOutLine, LanguageIcon, BabyIcon, WorkAndStudyIconSolid, SexualityIcon } from '@/Icons/index'

const ExploreCard = (props) => {
  const swiper = useSwiper();
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
      clamp: false
    });

  const variantsFrontCard = {
      animate: { scale: 1, y: 0, opacity: 1 },
      exit: (custom) => ({
          x: custom,
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.2 }
      })
  };
  const variantsBackCard = {
      initial: { scale: 0, y: 105, opacity: 0 },
      animate: { scale: 0.75, y: 30, opacity: 0.5 }
  };

  function handleDragEnd(_, info) {
      if (info.offset.x < -100) {
          setExitX(-250);
          props.setIndex(props.index + 1);
      }
      if (info.offset.x > 100) {
          setExitX(250);
          props.setIndex(props.index + 1);
      }
  }


    return (
      <>
        <motion.div
          style={{
          width: "calc(100%)",
          height: "100vh",
          maxHeight: "100%",
          overflow:"scroll",
          position: "absolute",
          top: 0,
          x,
          rotate,
          cursor: "grab",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
          }}
          whileTap={{ cursor: "grabbing" }}
          onDragEnd={handleDragEnd}
          // Animation
          drag={props.drag}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          variants={props.frontCard ? variantsFrontCard : variantsBackCard}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={exitX}
          transition={
              props.frontCard
                  ? { type: "spring", stiffness: 300, damping: 20 }
                  : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
          }
        >
             <div style={{width:"calc(100% - 3rem)"}}>
             <Card isFooterBlurred className="w-full col-span-12 sm:col-span-7">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                    clickable: false,
                    }}
                    navigation={false}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                      }}
                >
                    <SwiperSlide>
                        <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            classNames={{
                                wrapper: "w-full maxcontentimportant",
                            }}
                            onClick={() => swiper.slideNext()}
                            loading="lazy"
                            src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                            style={{
                                borderRadius: "20px",
                                objectFit: "cover",
                                padding: "0px 0px 5px 0px",
                            }}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            classNames={{
                                wrapper: "w-full maxcontentimportant",
                            }}
                            onClick={() => swiper.slideNext()}
                            loading="lazy"
                            src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                            style={{
                                borderRadius: "20px",
                                objectFit: "cover",
                                padding: "0px 0px 5px 0px",
                            }}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            classNames={{
                                wrapper: "w-full maxcontentimportant",
                            }}
                            onClick={() => swiper.slideNext()}
                            loading="lazy"
                            src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                            style={{
                                borderRadius: "20px",
                                objectFit: "cover",
                                padding: "0px 0px 5px 0px",
                            }}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            classNames={{
                                wrapper: "w-full maxcontentimportant",
                            }}
                            onClick={() => swiper.slideNext()}
                            loading="lazy"
                            src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                            style={{
                                borderRadius: "20px",
                                objectFit: "cover",
                                padding: "0px 0px 5px 0px",
                            }}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            classNames={{
                                wrapper: "w-full maxcontentimportant",
                            }}
                            onClick={() => swiper.slideNext()}
                            loading="lazy"
                            src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                            style={{
                                borderRadius: "20px",
                                objectFit: "cover",
                                padding: "0px 0px 5px 0px",
                            }}
                        />
                    </SwiperSlide>
                </Swiper>

                    <div className="absolute" style={{bottom:"72px",zIndex:10}}>
                        <ParallaxText baseVelocity={2}>
                            <Chip
                                variant="solid"
                                color="primary"
                                size="md"
                                style={{marginRight:"10px"}}
                                startContent={<HeartIconOutLine fill="#FFF" className="size-4"/>}

                            >
                                {props.profile.relationStatus}
                            </Chip>

                            <Chip
                                variant="solid"
                                color="primary"
                                size="md"
                                style={{marginRight:"10px"}}
                                startContent={<HeightIcon fill="#FFF" className="size-4"/>}
                            >
                                {props.profile.height}
                            </Chip>

                            <Chip
                                variant="solid"
                                color="primary"
                                size="md"
                                style={{marginRight:"10px"}}
                                startContent={<BabyIcon fill="#FFF" className="size-4"/>}

                            >
                                {props.profile.kids}
                            </Chip>

                            <Chip
                                variant="solid"
                                color="primary"
                                size="md"
                                startContent={<LanguageIcon className="size-4"/>}
                                style={{marginRight:"10px"}}
                            >
                                {props.profile.language}
                            </Chip>

                            <Chip
                                variant="solid"
                                color="primary"
                                size="md"
                                style={{marginRight:"10px"}}
                                startContent={<SexualityIcon className="size-4"/>}

                            >
                                {props.profile.sexuality}
                            </Chip>

                            
                        </ParallaxText>
                    </div>

                    <div className="absolute" style={{bottom:"103px",zIndex:10}}>
                        <ParallaxText baseVelocity={-2}>
                            <Chip
                                variant="solid"
                                color="success"
                                size="md"
                                style={{marginRight:"10px"}}
                                startContent={<WorkAndStudyIconSolid className="size-5"/>}
                            >
                                {props.profile.workAndEducation}
                            </Chip>
                        </ParallaxText>
                    </div>

                <CardFooter className="absolute items-start	 flex-col py-3 backdrop-blur bg-background/80 backdrop-saturate-150  bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2">
                        <div className="flex flex-col">
                            <p className="text-foreground/90 font-medium text-xl">{props.profile.name} , {props.profile.age}</p>
                            <p className="text-tiny text-foreground/80">{props.profile.aboutMe}</p>
                        </div>
                    </div>
                </CardFooter>
              </Card>
            </div>
        </motion.div>
      
        </>
    );
};

export default ExploreCard;


    