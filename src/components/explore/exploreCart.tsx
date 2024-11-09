import { useState, useRef } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    useScroll,
    useMotionValueEvent
} from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import {Pagination, User} from "@nextui-org/react";
import { HeartIcon, VerifyIcon } from "@/Icons/index";
import { LocationIcon } from "@/Icons/index";

import ExploreCardImage from './exploreCardImage'
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import ExploreCardOption from "./exploreCardOption";

import {
  SearchIcon,
  AboutMeIcon,
  WorkAndStudyIcon,
  WhyYouAreHereIcon,
} from "@/Icons/index";
import { useTheme } from "next-themes";

const ExploreCard = (props) => {
    const [exitX, setExitX] = useState(0);
    const [ActiveSlide, setActiveSlide] = useState(1); // Starting from slide 1
    const [openCard, setOpenCard] = useState(false);
    const divRef = useRef(null);

    // Set up scroll tracking on the ref
    const { scrollYProgress } = useScroll({ container: divRef });

    // Use an event listener to detect scrolling
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
      setOpenCard(false);

      if (latest > 0) {
        setOpenCard(true);
      }
    });

    const theme = useTheme();

    const x = useMotionValue(0);

    const scale = useTransform(x, [-80, 0, 80], [0.8, 1, 0.8], {
      clamp: true,
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom) => ({
            x: custom,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        })
    };
    const variantsBackCard = {
        initial: { scale: 0, y: 55, opacity: 0 },
        animate: { scale: 0.9, y: 30, opacity: 0.5 }
    };

    function handleDragEnd(_, info) {
        if (info.offset.x < -50) {
            setExitX(-60);
            props.setIndex(props.index + 1);
        }
        if (info.offset.x > 50) {
            setExitX(60);
            props.setIndex(props.index + 1);
        }
    }

    return (
        <motion.div
            style={{
                width: "100%",
                height: "100%",
                maxHeight: "100%",
                overflow: "scroll",
                position: "absolute",
                top: 0,
            }}
            whileTap={{ cursor: "grabbing" }}
            // Allow horizontal dragging only
            drag="x"
            onDragEnd={handleDragEnd}
            // Animation
            variants={props.frontCard ? variantsFrontCard : variantsBackCard}
            initial="initial"
            dragListener={false}
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                props.frontCard
                    ? { type: "spring", stiffness: 300, damping: 20 }
                    : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
            }
        >
            {/* Inner content (no changes needed here) */}
            <motion.div
                style={{
                    width: "calc(100vw - 26px)",
                    borderRadius: 16,
                    padding: "12px",
                    left: 0,
                    right: 0,
                    margin: "auto",
                    marginTop: "0.5rem",
                    scale,
                    height: "calc(100vh - 145px)",
                    overflow: "scroll",
                    backgroundColor: theme.theme === "dark" ? "#090031" : "#e8e3ff",
                }}
                animate={openCard ? { height: "calc(100vh - 30px)" } : { height: "calc(100vh - 147px)" }}
                ref={divRef}
                className="backdrop-blur"
            >
                <div className="relative">
                    <ExploreCardOption />
                    <Pagination
                        disableAnimation
                        classNames={{ wrapper: "flex-col flex", item: "exploreSipwePagination" }}
                        className="absolute z-50 right-2"
                        style={{ top: "40%" }}
                        total={3}
                        page={ActiveSlide + 1}
                        initialPage={1}
                        size={"sm"}
                    />
                    <Swiper
                        spaceBetween={30}
                        centeredSlides
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                        allowTouchMove={false}
                        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                    >
                        {[props.profile.mainImage, props.profile.secondImage, props.profile.thirdImage].map((image, index) => (
                            <SwiperSlide key={index}>
                                <ExploreCardImage
                                    classNames={{ wrapper: "max-w-none w-full h-full bg-transparent" }}
                                    className="w-full"
                                    alt={`Profile image ${index + 1}`}
                                    src={image}
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div style={{ zIndex: 10, marginLeft: "8px", padding: "8px", marginBottom: "6px" }} className="w-[calc(100%_-_16px)] flex flex-col items-start gap-1 absolute background-drop--bluebase backdrop-blur-sm border-white/20 border-1 py-1 rounded-large bottom-1 shadow-small">
                        <h4 className="flex items-center text-small text-white font-semibold">{props.profile.name} {props.profile.age} <VerifyIcon stroke="#fff" /></h4>
                        <h5 className="flex items-center text-small text-white"><LocationIcon fill="#fff" /> {props.profile.location}</h5>
                    </div>
                </div>

                <User
                    name="Ready for relationship"
                    style={{ marginTop: "1rem" }}
                    classNames={{ wrapper: "py-3", base: "px-1" }}
                    description="@jrgarciadev"
                    avatarProps={{ color: "secondary", icon: <HeartIcon stroke="#fff" fill="#FFF" /> }}
                />

                {/* Additional User components can be added here */}

                <div className="w-full mb-4 mt-2">
                    <Listbox aria-label="Listbox menu with sections" variant="solid">
                        {/* Profile Section */}
                        <ListboxSection showDivider title="Profile">
                            <ListboxItem key="2" isReadOnly description={props.profile.workAndEducation} startContent={<WorkAndStudyIcon />}>
                                Work and education
                            </ListboxItem>
                            <ListboxItem key="3" isReadOnly description={props.profile.whyHere} startContent={<WhyYouAreHereIcon />}>
                                Why you are here?
                            </ListboxItem>
                            <ListboxItem key="4" isReadOnly description={props.profile.aboutMe} startContent={<AboutMeIcon />}>
                                About me
                            </ListboxItem>
                            <ListboxItem key="5" isReadOnly description={props.profile.lookingFor} startContent={<SearchIcon />}>
                                Looking for?
                            </ListboxItem>
                        </ListboxSection>
                        {/* More Sections */}
                        {/* Add similar structure for 'More about me!' and 'Interesting' sections */}
                    </Listbox>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ExploreCard;