import { Tabs, Tab } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FireIcon,
    ChatIcon,
    ProfileIcon,
    LikeIcon,
    LocationIcon
} from '@/Icons/index'

import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";


const BottomMenu = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  return (
      <AnimatePresence >
        {searchParams.get('page')!=="explore" && (
          <motion.div
            transition={{
            ease: "anticipate",
            duration: 0.5,
          }}
          initial={{ bottom:"-120px" }}
          animate={{ bottom: "20px" }}
          exit={{ bottom:"-120px"}}
  
          className={"flex w-full fixed items-center"}
          style={{
            zIndex: "50",
            width: "360px",
            borderRadius: "14px",
            overflow: "hidden",
            bottom:"-120px",
            justifyContent:"center",
            height:"69px",
            left:"50%",
            transform:"translateX(-50%)"
            
          }}
        >
            <Tabs
              aria-label="Options"
              classNames={{
                tab: " h-auto p-0.5 color-white",
                tabList: "backdrop-blur	bg-background/80 backdrop-saturate-150 border-foreground/20 border-1 shadow-small"
              }}
              color="primary"
              size="lg"
              radius="full"
              selectedKey={searchParams.get("page")}
              style={{
                zIndex: "10",
                borderRadius: "14px",
                overflow: "hidden",
                height:"69px",
                bottom:"10px",

              }}
              variant="solid" 
            >
              <Tab
                key="explore"
                href="/#/main?page=explore"
                title={
                  <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                    <FireIcon/>
                    <p style={{fontSize:"11px"}}>{t('Explore')}</p>

                  </div>
                }
              />
    
              <Tab
                key="nearby"
                href="/#/main?page=nearby"
                title={
                  <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                    <LocationIcon/>
                    <p style={{fontSize:"11px"}}>{t('Nearby')}</p>

                  </div>
                }
              />
    
              <Tab
                key="chat"
                href="/#/main?page=chat"
                title={
                  <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                    <ChatIcon/>
                    <p style={{fontSize:"11px"}}>{t('Chat')}</p>
                  </div>
                }
              />
    
              <Tab
                key="likes"
                href="/#/main?page=likes"

                title={
                  <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                    <LikeIcon/>
                    <p style={{fontSize:"11px"}}>{t('Likes')}</p>

                  </div>
                }
              />
    
              <Tab
                key="profile"
                href="/#/main?page=profile"
                title={
                  <div style={{width:"55px", height:"55px"}} className="flex flex-col justify-center items-center">
                    <ProfileIcon/>
                    <p style={{fontSize:"11px"}}>{t('Profile')}</p>
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


