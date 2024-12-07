import ChatPage from '@/components/chat'
import NavBar from '@/components/NavBar/index'
import TopBar from '@/components/tobBar'
import { Page } from '@/components/Page.tsx';
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import ProfilePage from '@/components/profile';
import LikesPage from '@/pages/like/index';
import ExplorePage from '@/components/explore';
import NearByPage from '@/pages/nearby/page';
import { useLaunchParams } from '@telegram-apps/sdk-react';

const MainPage = () => {
    const [searchParams] = useSearchParams();
    const lp = useLaunchParams();

    const getPaddingForPlatform = () => {
      if (['ios'].includes(lp.platform)) {
        // iOS/macOS specific padding (e.g., accounting for notches)
        return '50px'  // Adjust as needed for iOS notch
      } else {
        // Android/base padding
        return'25px'  // Default padding
      }
    };

    return <Page back={searchParams.get('page') === "explore"? true : false}>

            
          <AnimatePresence mode="wait">
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                initial={{ y: 0, opacity: 1 }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30, duration: 3999 },
                  opacity: { duration: 0.6 },
                }}
              >
                  <TopBar/>

              </motion.div>
                

          </AnimatePresence>

                
            <NavBar/>
            <section style={{paddingTop:`${getPaddingForPlatform()}`}} className="flex flex-col items-center justify-center gap-4 ">

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
                    <ExplorePage/>
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
                    <LikesPage/>
                  </motion.div>
                </AnimatePresence>
              )}

              {searchParams.get('page') === "nearby" && (
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
                    <NearByPage/>
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

            </section>
      
    </Page>
    
}

export default MainPage