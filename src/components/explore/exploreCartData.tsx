import { WorkAndStudyIconSolid, AboutMeSolid, SearchIcon, WhyYouAreHereIcon } from "@/Icons";
import { Avatar } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { motion } from "framer-motion"

// Define a union of valid color strings

const ExploreCartData = (props) => {

    useEffect(()=> {console.log(props.slideCountrt)} , [props.slideCountrt])

    return <>
        {props.slideCountrt % 4 === 1 && (
            <AnimatePresence>
                <motion.div 
                    className="flex gap-3 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0  }}
                    transition={{
                    ease: "linear",
                    duration: 0.25,
                    }}
                    >
                    <Avatar
                        color={"danger"} // This will now be correctly recognized as 'secondary'
                        isBordered
                        radius="md"
                        icon={<WorkAndStudyIconSolid className="size-7" />}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">Work and education:</p>
                        <p className="text-small text-default-500">{props.profile.workAndEducation}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        )}

        {props.slideCountrt % 4 === 2 && (
            <AnimatePresence>
                <motion.div 
                        className="flex gap-3 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                        ease: "linear",
                        duration: 0.25,
                    }}
                    >                
                    <Avatar
                        color={"secondary"} // This will now be correctly recognized as 'secondary'
                        isBordered
                        radius="md"
                        icon={<AboutMeSolid className="size-7"/>}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">About Me: </p>
                        <p className="text-small text-default-500">{props.profile.aboutMe}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
               
        )}
        {props.slideCountrt % 4 === 3 && (
            <AnimatePresence>
                <motion.div 
                    className="flex gap-3 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                    ease: "linear",
                    duration: 0.25,
                    }}
                >
                    <Avatar
                        color={"success"} // This will now be correctly recognized as 'secondary'
                        isBordered
                        radius="md"
                        icon={<SearchIcon className="size-7"/>}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">Looking for:</p>
                        <p className="text-small text-default-500">{props.profile.lookingFor}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

        )}

        {props.slideCountrt % 4 === 0 && (
            <AnimatePresence>
                <motion.div 
                    className="flex gap-3 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        ease: "linear",
                        duration: 0.25,
                    }}
                >
                    <Avatar
                        color={"warning"} // This will now be correctly recognized as 'secondary'
                        isBordered
                        radius="md"
                        icon={<WhyYouAreHereIcon className="size-7"/>}

                    />
                    <div className="flex flex-col">
                        <p className="text-md">Why i Am here: </p>
                        <p className="text-small text-default-500">{props.profile.whyHere}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

        )}
    </>
}

/** 
whyHere: "Just chat",
aboutMe: "Aspiring programmer and coffee.",
lookingFor: "Friendship",
relationStatus: "Single",
*/

export default ExploreCartData;
