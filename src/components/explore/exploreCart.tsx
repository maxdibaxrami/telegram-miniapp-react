import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {Image} from "@nextui-org/react";
import ExploreCardOption from "./exploreCardOption";


import { useTheme } from "next-themes";

const ExploreCard = (props) => {
  const theme = useTheme()
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
                    position:"relative",
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
                            draggable="false"
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
                            draggable="false"
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
                            draggable="false"
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


                {/* Additional User components can be added here */}


            </motion.div>
        </motion.div>
      
        </>
    );
};

export default ExploreCard;