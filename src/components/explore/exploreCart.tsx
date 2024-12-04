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
import { HeartIconOutLine, HeightIcon, LanguageIcon, BabyIcon, SexualityIcon, ArowUpIcon, ArowDownIcon, VerifyIconFill } from '@/Icons/index';
import ExploreCartData from './exploreCartData';






const ExploreCard = (props) => {
  const [openFooter, setOpenFooter] = useState(false);
  const [exitX, setExitX] = useState(1);
  const [slideCountrt, setSlideCounter] = useState<number>(1);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 0, 180], [-7, 0, 7], { clamp: false });

  // Detecting when the drag motion reaches max left or right
  const handleDragEnd = (_, info) => {
    if (!openFooter) { // Disable swapping when footer is open
      if (info.offset.x < -100) {
        setExitX(-250);
        props.setIndex(props.index + 1); // Move to next slide
      } else if (info.offset.x > 100) {
        setExitX(250);
        props.setIndex(props.index + 1); // Move to next slide
      }
    }
  };

  const toggleFooter = () => setOpenFooter(!openFooter);

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
          rotate,
          cursor: "grab",
          display: "flex",
          justifyContent: "center",
          marginTop: "4.5rem"
        }}
        whileTap={{ cursor: "grabbing" }}
        onDragEnd={handleDragEnd} // Handling drag end with slide transition
        drag={!openFooter} // Disable dragging when footer is open
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
        <div style={{ width: "calc(100% - 3rem)" }}>
          <Card isFooterBlurred className="w-full col-span-12 sm:col-span-7">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{ clickable: false }}
              navigation={false}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
              onSlideChange={() => setSlideCounter(slideCountrt + 1)}
            >
              {[...Array(5)].map((_, index) => (
                <SwiperSlide key={index}>
                  <SwiperImages />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute" style={{ bottom: "105px", zIndex: 10 }}>
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
              initial={{ height: "100px" }}
              animate={{ height: openFooter ? "100%" : "100px" }}
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

    </>
  );
};

export default ExploreCard;
