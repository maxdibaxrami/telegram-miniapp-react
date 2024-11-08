import { Tabs, Tab } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FireIcon,
    ChatIcon,
    ProfileIcon,
    LikeIcon,
    RandomChatIcon
} from '@/Icons/index'

import { useSearchParams } from "react-router-dom";


const BottomMenu = () => {
  const [searchParams] = useSearchParams();

  return (
    <AnimatePresence >
        <motion.div
          transition={{
          ease: "anticipate",
          duration: 0.5,
        }}
         initial={{ right:"-40px", opacity:0  }}
         animate={{ right: "10px", opacity:1 }}
         exit={{ right:"-40px", opacity:0}}
 
         className={"flex w-full flex-col fixed items-center backdrop-blur background-drop---navbar"}
         style={{
           zIndex: "500",
           width: "57px",
           borderRadius: "14px",
           overflow: "hidden",
           right:"-40px",
           justifyContent:"center",
           height:"284px",
           opacity:0,
           top:"150px"
           
         }}
       >
         <Tabs
           aria-label="Options"
           classNames={{
             tab: "p-3 h-auto color-white",
             tabList: "bg-transparent p-1 ",
             tabContent:
               "text-[#FFF] group-data-[selected=false]:text-[#ffffffbf]",
             base: "flex items-center",
           }}
           isVertical={true}
           color="primary"
           size="lg"
           selectedKey={searchParams.get("page")}
           style={{
             zIndex: "10",
             width: "57px",
             borderRadius: "14px",
             top: "194px",
             overflow: "hidden",
             backgroundColor: "transparent",
             height:"300px",
             right:"10px",
             color:"#FFF"
           }}
           variant="light"
           
           
         >
           <Tab
             key="explore"
             href="/#/main?page=explore"

             title={
               <div className="flex items-center space-x-2">
                 <FireIcon/>
               </div>
             }
           />
 
           <Tab
             key="randomchat"
             href="/#/main?page=randomchat"

             title={
               <div className="flex items-center space-x-2">
                 <RandomChatIcon/>
               </div>
             }
           />
 
           <Tab
             key="chat"
             href="/#/main?page=chat"


             title={
               <div className="flex items-center space-x-2">
                 <ChatIcon/>
               </div>
             }
           />
 
           <Tab
             key="likes"
             href="/#/main?page=likes"

             title={
               <div className="flex items-center space-x-2">
                 <LikeIcon/>
               </div>
             }
           />
 
           <Tab
             key="profile"
             href="/#/main?page=profile"
             title={
               <div className="flex items-center space-x-2">
                 <ProfileIcon/>
               </div>
             }
           />
         </Tabs>
       </motion.div>
     
    </AnimatePresence>
  );
};

export default BottomMenu;


