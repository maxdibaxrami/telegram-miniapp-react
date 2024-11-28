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
        {searchParams.get('page')!=="explore" && (

          <motion.div
            transition={{
            ease: "anticipate",
            duration: 0.5,
          }}
          initial={{ bottom:"-40px", opacity:0  }}
          animate={{ bottom: "10px", opacity:1 }}
          exit={{ bottom:"-40px", opacity:0}}
  
          className={"flex w-full fixed items-center backdrop-blur background-drop---navbar"}
          style={{
            zIndex: "50",
            width: "315px",
            borderRadius: "14px",
            overflow: "hidden",
            bottom:"-40px",
            justifyContent:"center",
            height:"64px",
            opacity:0,
            left:"50%",
            transform:"translateX(-50%)"
            
          }}
        >
          <Tabs
            aria-label="Options"
            classNames={{
              tab: " h-auto p-0 color-white",
              tabContent:
                "text-[#FFF] group-data-[selected=false]:text-[#ffffffbf]",
            }}
            color="primary"
            size="lg"
            selectedKey={searchParams.get("page")}
            style={{
              zIndex: "10",
              borderRadius: "14px",
              overflow: "hidden",
              backgroundColor: "transparent",
              height:"64px",
              bottom:"10px",

            }}
            variant="light" 
          >
            <Tab
              key="explore"
              href="/#/main?page=explore"
              title={
                <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                  <FireIcon/>
                  <p style={{fontSize:"11px"}}>Explore</p>

                </div>
              }
            />
  
            <Tab
              key="nearby"
              href="/#/main?page=nearby"
              title={
                <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                  <RandomChatIcon/>
                  <p style={{fontSize:"11px"}}>Nearby</p>

                </div>
              }
            />
  
            <Tab
              key="chat"
              href="/#/main?page=chat"
              title={
                <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                  <ChatIcon/>
                  <p style={{fontSize:"11px"}}>Chat</p>

                </div>
              }
            />
  
            <Tab
              key="likes"
              href="/#/main?page=likes"

              title={
                <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                  <LikeIcon/>
                  <p style={{fontSize:"11px"}}>Likes</p>

                </div>
              }
            />
  
            <Tab
              key="profile"
              href="/#/main?page=profile"
              title={
                <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                  <ProfileIcon/>
                  <p style={{fontSize:"11px"}}>Profile</p>
                </div>
              }
            />
          </Tabs>
        </motion.div>
        )}
      </AnimatePresence>
  );
};

export default BottomMenu;


