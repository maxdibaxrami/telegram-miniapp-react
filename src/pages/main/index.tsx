import ChatPage from '@/components/chat'
import NavBar from '@/components/NavBar/index'
import TopBar from '@/components/tobBar'
import { Page } from '@/components/Page.tsx';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/button";
import { ArrowRight, EditProfileIcon, SettingIcon, FitlerIcon } from "@/Icons/index";
import { useSearchParams } from "react-router-dom";
import ChatFiltermenu from '@/components/chat/chatFilterMenu';
import ProfilePage from '@/components/profile';
import { Link } from 'react-router-dom';

const MainPage = () => {
    const [searchParams] = useSearchParams();

    return <Page>
            <TopBar/>
            <NavBar/>
            <section className="flex flex-col items-center light-background--color justify-center gap-4 ">
        {searchParams.get('page') === "explore" && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
              }}
            >



            </motion.div>
          </AnimatePresence>
        )}


        {searchParams.get('page') === "chat" && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0,}}
              exit={{ y: -80 }}
              initial={{ y: 10 }}
              style={{ width: "100%" }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.6},
              }}
            >
              <ChatPage />
            </motion.div>
          </AnimatePresence>
        )}

        {searchParams.get('page') === "likes" && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
              }}
              style={{width:"100%"}}

            >


            </motion.div>
          </AnimatePresence>
        )}

        {searchParams.get('page') === "profile" && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
              }}
              
            >

            <ProfilePage/>
            </motion.div>
          </AnimatePresence>
        )}

        <AnimatePresence>
          {searchParams.get('page') === "nearby"  && (
              <motion.div
                style={{zIndex:30}}
                className="fixed background-drop--bluebase p-2 backdrop-blur-sm	"
                initial={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                animate={{ opacity: 1 , bottom:"43px", scale: 1.1 }}
                exit={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                transition={{
                  ease: "linear",
                  duration: 0.5,
                }}
              >
                <Button className="color-white" isIconOnly color="primary" style={{borderRadius:"20%"}} size="lg" aria-label="Like">
                  <FitlerIcon stroke="#FFF"/>
                </Button>  
              </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {searchParams.get('page') === "profile"  && (<>
                <motion.div
                  style={{zIndex:30,marginRight:"80px"}}
                  className="fixed background-drop--bluebase p-2 backdrop-blur-sm	"
                  initial={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                  animate={{ opacity: 1 , bottom:"43px", scale: 1.1 }}
                  exit={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                  transition={{
                    ease: "linear",
                    duration: 0.25,
                  }}
                >
                  <Button as={Link} href="/editprofile" className="color-white" isIconOnly color="primary" style={{borderRadius:"20%"}} size="lg">
                    <EditProfileIcon stroke="#FFF"/>
                  </Button> 
                </motion.div>
          
              <motion.div
                  style={{zIndex:30,marginLeft:"80px"}}
                  className="fixed background-drop--bluebase p-2 backdrop-blur-sm	"
                  initial={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                  animate={{ opacity: 1 , bottom:"43px", scale: 1.1 }}
                  exit={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                  transition={{
                    ease: "linear",
                    duration: 0.25,
                  }}
                >
                  <Button as={Link} href="/setting" className="color-white" isIconOnly color="primary" style={{borderRadius:"20%"}} size="lg">
                    <SettingIcon stroke="#FFF"/>
                  </Button> 
                </motion.div>
          
          </>)}
        </AnimatePresence>

        <AnimatePresence>
          {searchParams.get('page') === "chat"  && (<>
                <motion.div
                  style={{zIndex:30, marginLeft:"17px"}}
                  className="fixed background-drop--bluebase p-2 backdrop-blur-sm	"
                  initial={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                  animate={{ opacity: 1 , bottom:"43px", scale: 1.1 }}
                  exit={{ opacity: 0 , bottom:"-80px", scale: 0.5 }}
                  transition={{
                    ease: "linear",
                    duration: 0.25,
                  }}
                  
                >
                  <ChatFiltermenu />
                </motion.div>
        
          
          </>)}
        </AnimatePresence>

        <AnimatePresence>
          {searchParams.get('page') === "explore"  && (
              <motion.div
                style={{zIndex:30}}
                className="fixed background-drop--whitebase backdrop-blur-sm	 p-2"
                initial={{ opacity: 0 , left:"-80px", bottom:"-80px", scale: 0.5 }}
                animate={{ opacity: 1 , left:"20px" , bottom:"20px", scale: 1.1 }}
                exit={{ opacity: 0 , left:"-80px", bottom:"-80px", scale: 0.5 }}
                transition={{
                  ease: "linear",
                  duration: 0.25,
                }}
              >
                <Button  className="color-white" isIconOnly color="primary" style={{borderRadius:"20%"}} size="lg" aria-label="Like">
                  <FitlerIcon stroke="#FFF"/>
                </Button>  
              </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {searchParams.get('page') === "explore"  && (
              <motion.div
                style={{zIndex:30}}
                className="fixed background-drop--whitebase backdrop-blur-sm	 p-2"
                initial={{ opacity: 0 , right:"-80px", bottom:"-80px", scale: 0.5 }}
                animate={{ opacity: 1 , right:"20px" , bottom:"20px", scale: 1.1 }}
                exit={{ opacity: 0 , right:"-80px", bottom:"-80px", scale: 0.5 }}
                transition={{
                  ease: "linear",
                  duration: 0.25,
                }}
              >
                <Button className="color-white" isIconOnly color="primary" style={{borderRadius:"20%"}} size="lg" aria-label="Like">
                  <ArrowRight stroke="#FFF"/>
                </Button>  
              </motion.div>
          )}
        </AnimatePresence>


      </section>
    </Page>
    
}

export default MainPage