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

const ExploreCard = (props) => {

  const [openFooter, setOpenFooter] = useState(false);
  const [exitX, setExitX] = useState(1);
  const [slideCountrt, setSlideCounter] = useState<number>(1);
  
  const { t } = useTranslation();  // Initialize translation hook


  const x = useMotionValue(0);
  const rotate = useTransform(x, [-400, 0, 400], [-5, 0, 5], { clamp: false });

  // Detecting when the drag motion reaches max left or right
  const handleDragEnd = (_, info) => {
    if (!openFooter) { // Disable swapping when footer is open
      if (info.offset.x < -130) {
        setExitX(-130);
        props.setIndex(props.index - 1); // Move to next slide
        props.handleNotLike()
      } else if (info.offset.x > 130) {
        setExitX(130);
        props.setIndex(props.index - 1); // Move to next slide
        props.handleNotLike()

      }
    }
  };

  const toggleFooter = () => setOpenFooter(!openFooter);

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom) => ({
      x: custom,
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  const variantsBackCard = {
    initial: { scale: 0, y: 105, opacity: 0 },
    animate: { scale: 0.75, y: 30, opacity: 0.5 }
  };

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


  const hobbies = [
    { id: 1, name: t("Hiking") },
    { id: 2, name: t("Cooking") },
    { id: 3, name: t("Traveling") },
    { id: 4, name: t("Guitar") },
    { id: 5, name: t("Photography") },
    { id: 6, name: t("Yoga") },
    { id: 7, name: t("Painting") },
    { id: 8, name: t("Reading") },
    { id: 9, name: t("Running") },
    { id: 10, name: t("Meditation") },
    { id: 11, name: t("Cycling") },
    { id: 12, name: t("Surfing") },
    { id: 13, name: t("Gardening") },
    { id: 14, name: t("Fishing") },
    { id: 15, name: t("Rock Climbing") },
    { id: 16, name: t("Dancing") },
    { id: 17, name: t("Gaming") },
    { id: 18, name: t("Blogging") },
    { id: 19, name: t("Swimming") },
    { id: 20, name: t("Martial Arts") },
    { id: 21, name: t("Bird Watching") },
    { id: 22, name: t("Karaoke") },
    { id: 23, name: t("Skateboarding") },
    { id: 24, name: t("Board Games") },
    { id: 25, name: t("Archery") },
    { id: 26, name: t("Skydiving") },
    { id: 27, name: t("Scuba Diving") },
    { id: 28, name: t("Tennis") },
    { id: 29, name: t("Soccer") },
    { id: 30, name: t("Basketball") },
    { id: 31, name: t("Golf") },
    { id: 32, name: t("Skiing") },
    { id: 33, name: t("Snowboarding") },
    { id: 34, name: t("Bowling") },
    { id: 35, name: t("Wine Tasting") },
    { id: 36, name: t("Baking") },
    { id: 37, name: t("Knitting") },
    { id: 38, name: t("Sewing") },
    { id: 39, name: t("Pottery") },
    { id: 40, name: t("Astronomy") },
    { id: 41, name: t("Camping") },
    { id: 42, name: t("Woodworking") },
    { id: 43, name: t("Volunteering") },
    { id: 44, name: t("Writing") },
    { id: 45, name: t("Poetry") },
    { id: 46, name: t("Journaling") },
    { id: 47, name: t("Calligraphy") },
    { id: 48, name: t("Magic Tricks") },
    { id: 49, name: t("Stand-up Comedy") },
    { id: 50, name: t("Cosplay") },
    { id: 51, name: t("Tattoo Design") },
    { id: 52, name: t("Origami") },
    { id: 53, name: t("Chess") },
    { id: 54, name: t("Vegan Cooking") },
    { id: 55, name: t("Collecting Antiques") },
    { id: 56, name: t("Fencing") },
    { id: 57, name: t("Parkour") },
    { id: 58, name: t("Beekeeping") },
    { id: 59, name: t("Leather Crafting") },
    { id: 60, name: t("Mixology") },
    { id: 61, name: t("Ice Skating") },
    { id: 62, name: t("Puzzles") },
    { id: 63, name: t("Robotics") },
    { id: 64, name: t("Virtual Reality") },
    { id: 65, name: t("Home Brewing") },
    { id: 66, name: t("Carpentry") },
    { id: 67, name: t("Flower Arranging") },
    { id: 68, name: t("Metalworking") },
    { id: 69, name: t("Jewelry Making") },
    { id: 70, name: t("Animal Rescue") },
    { id: 71, name: t("Pilates") },
    { id: 72, name: t("Kayaking") },
    { id: 73, name: t("Bungee Jumping") },
    { id: 74, name: t("Running Marathons") },
    { id: 75, name: t("Dog Training") },
    { id: 76, name: t("Horseback Riding") },
    { id: 77, name: t("Sailing") },
    { id: 78, name: t("Stand-up Paddleboarding") },
    { id: 79, name: t("Weightlifting") },
    { id: 80, name: t("Bodybuilding") },
    { id: 81, name: t("Competitive Gaming") },
    { id: 82, name: t("Podcasting") },
    { id: 83, name: t("Vlogging") },
    { id: 84, name: t("Street Art") },
    { id: 85, name: t("Historical Reenactments") },
    { id: 86, name: t("Geocaching") },
    { id: 87, name: t("Hiking with Dogs") },
    { id: 88, name: t("DIY Projects") },
    { id: 89, name: t("Car Restoration") },
    { id: 90, name: t("Motorcycling") },
    { id: 91, name: t("4x4 Off-roading") },
    { id: 92, name: t("Mountain Biking") },
    { id: 93, name: t("Frisbee Golf") },
    { id: 94, name: t("LARPing") },
    { id: 95, name: t("Drone Racing") },
    { id: 96, name: t("Rollerblading") },
    { id: 97, name: t("Escape Rooms") },
    { id: 98, name: t("Trivia Nights") },
    { id: 99, name: t("Kite Surfing") },
    { id: 100, name: t("Astronaut Training") }
  ];


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
          marginTop: "3.5rem"
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
        <div className='py-4' style={{ width: "calc(100% - 3rem)" }}>
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
                              color="success"
                              size="md"
                              className="mx-2 backdrop-blur bg-success/90 backdrop-saturate-150"
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
                  color="primary"
                  size="md"
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
                          {props.profile.verifiedAccount && <VerifyIconFill fill="#016fee" className="ml-2 size-6"/>}
                          
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
