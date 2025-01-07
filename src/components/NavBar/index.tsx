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
import { useLaunchParams } from "@telegram-apps/sdk-react";


const BottomMenu = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const lp = useLaunchParams();

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      return '100px';
    } else {
      return '80px';
    }
  };

  return (
      <AnimatePresence >
        {searchParams.get('page')!=="explore" && (
          <motion.div
            transition={{
            ease: "anticipate",
            duration: 0.5,
          }}
          initial={{ bottom:"-120px" }}
          animate={{ bottom: "0px" }}
          exit={{ bottom:"-120px"}}
  
          className={"flex w-full px-2 fixed items-center backdrop-blur	bg-background/60 backdrop-saturate-150 border-foreground/20 shadow-small"}
          style={{
            zIndex: "50",
            width: "100%",
            overflow: "hidden",
            bottom:"-120px",
            justifyContent:"center",
          }}
        >
            <Tabs
              aria-label="Options"
              fullWidth
              classNames={{
                tab: " h-auto p-0.5 m-1 color-white aspect-square",
                tabList: "bg-transparent",
              }}
              color="primary"
              size="lg"
              radius="sm"
              selectedKey={searchParams.get("page")}
              style={{
                zIndex: "10",
                overflow: "hidden",
                height:`${getPaddingForPlatform()}`,
                width:"100%"

              }}
              variant="solid" 
            >
              <Tab
                key="explore"
                href="/#/main?page=explore"
                title={
                  <div className="flex flex-col justify-center items-center">
                    <FireIcon/>
                    <p style={{fontSize:"11px"}}>{t('Explore')}</p>

                  </div>
                }
              />
    
              <Tab
                key="nearby"
                href="/#/main?page=nearby"
                title={
                  <div className="flex flex-col justify-center items-center">
                    <LocationIcon/>
                    <p style={{fontSize:"11px"}}>{t('Nearby')}</p>

                  </div>
                }
              />
    
              <Tab
                key="chat"
                href="/#/main?page=chat"
                title={
                  <div className="flex flex-col justify-center items-center">
                    <ChatIcon/>
                    <p style={{fontSize:"11px"}}>{t('Chat')}</p>
                  </div>
                }
              />
    
              <Tab
                key="likes"
                href="/#/main?page=likes"

                title={
                  <div className="flex flex-col justify-center items-center">
                    <LikeIcon/>
                    <p style={{fontSize:"11px"}}>{t('Likes')}</p>

                  </div>
                }
              />
    
              <Tab
                key="profile"
                href="/#/main?page=profile"
                title={
                  <div className="flex flex-col justify-center items-center">
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


