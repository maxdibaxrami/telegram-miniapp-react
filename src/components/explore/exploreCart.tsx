import { useState } from "react";
import {
    motion,
    useTransform,
    useMotionValue
  } from "framer-motion";

import {Image, User ,Chip} from "@nextui-org/react";
import { HeartIcon, VerifyIcon } from "@/Icons/index";

import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import ExploreCardOption from "./exploreCardOption";

import {
  SearchIcon,
  AboutMeIcon,
  WorkAndStudyIcon,
  WhyYouAreHereIcon,
  HashtagIcon,
  LocationIconSmall
} from "@/Icons/index";

import { useTheme } from "next-themes";

const ExploreCard = (props) => {
    const [exitX, setExitX] = useState(0);

    const theme = useTheme();
    const x = useMotionValue(0);

    const rotate = useTransform(x, [-20, 0, 20], [-15, 0, 15], {
        clamp: true
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
      <>
        <motion.div
          style={{
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          overflow:"scroll",
          position: "absolute",
          top: 0,
          x,
          rotate,
          cursor: "grab"
          }}
          whileTap={{ cursor: "grabbing" }}
          // Dragging
          draggable="false"
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          onDragEnd={handleDragEnd}
          // Animation
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
            {/* Inner content (no changes needed here) */}
            <motion.div
                style={{
                    width: "calc(100vw - 24px)",
                    borderRadius: 16,
                    padding: "12px",
                    left: 0,
                    right: 0,
                    margin: "auto",
                    marginTop: "1.5rem",
                    marginBottom:"60px",
                    backgroundColor: theme.theme === "light" ? "rgb(255 255 255 / 45%)" : "#e8e3ff",
                }}
                className="backdrop-blur border-color--carts"
            >
                <div >
                    <ExploreCardOption />
                    <div className="flex w-full flex-col">
                      <div className="w-full" style={{padding:"0rem 0rem 0.5rem 0rem"}} >
                          <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            classNames={{
                              wrapper: "w-full maxcontentimportant",
                            }}
                            
                            loading="lazy"
                            src={props.profile.mainImage} // dynamic image URL
                            style={{
                              borderRadius: "14px",
                              objectFit: "cover",
                              height: "100%",

                            }}
                          />
                      </div>
                      <div className="flex">
                        <div className="w-full p-2" style={{padding:"0.5rem 0.5rem 0.5rem 0rem"}}>
                          <Image
                            alt="Profile hero Image"
                            className="w-full h-full"
                            
                            classNames={{
                              wrapper: "w-full maxcontentimportant",
                            }}
                            src={props.profile.secondImage}  // dynamic image URL
                            style={{
                              objectFit: "cover",
                              borderRadius: "14px",
                              height: "100%",
                              width:"100%"

                            }}
                          />
                        </div>
                        <div className="w-full" style={{padding:"0.5rem 0rem 0.5rem 0.5rem"}}>
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
                              borderRadius: "14px",
                              height: "100%",
                              width:"100%"
                            }}
                          />
                        </div>
                      </div>
                    </div>

                </div>

            {/*   <div style={{ zIndex: 10, marginLeft: "8px", padding: "8px", marginBottom: "6px" }} className="w-[calc(100%_-_16px)] background-black--blue flex flex-col items-start gap-1  border-white/20 border-1 py-1 rounded-large shadow-small">
                        <h4 className="flex items-center text-small text-white font-semibold">{props.profile.name} , {props.profile.age} <VerifyIcon stroke="#fff" /></h4>
                        <h5 className="flex items-center text-small text-white"></h5>
                    </div>*/}  

                  <User
                    
                    className="w-full backgroundowhite text-black justify-start pl-4 border-color--carts"
                    name={<p className="flex items-center text-small font-semibold text-black">{props.profile.name} , {props.profile.age} <VerifyIcon stroke="#4596f2" /></p>}
                    style={{ marginTop: "0.8rem" }}
                    classNames={{ wrapper: "py-3", base: "px-1" }}
                    description={<p className="flex items-center text-black"><LocationIconSmall fill="#000" /> {props.profile.location}</p>}
                    avatarProps={{ classNames:{"base":"hidden"}} }
                />

                <User
                    
                    className="w-full backgroundowhite justify-start pl-4 border-color--carts"
                    name="Ready for relationship"
                    style={{ marginTop: "0.5rem" }}
                    classNames={{ wrapper: "py-3", base: "px-1" }}
                    description="@jrgarciadev"
                    avatarProps={{ color: "secondary", icon: <HeartIcon stroke="#fff" fill="#FFF" /> }}
                />

                {/* Additional User components can be added here */}

                <div className="w-full mb-4 mt-2 ">
                <Listbox
                  className=" px-2 py-2 border-color--carts"
                  style={{borderRadius:"8px", backgroundColor:"rgb(255 255 255 / 60%)"}}
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

            </motion.div>
        </motion.div>
      
        </>
    );
};

export default ExploreCard;