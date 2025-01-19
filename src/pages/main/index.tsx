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
import { Button } from '@nextui-org/button';
import { FitlerIcon } from '@/Icons';
import NearByFilter from '@/components/naerby/NearByFilter';
import { useRef } from 'react';

const MainPage = () => {
  const [searchParams] = useSearchParams();
  const lp = useLaunchParams();
  const FilterRef = useRef();

    const getPaddingForPlatform = () => {
      if (['ios'].includes(lp.platform)) {
        // iOS/macOS specific padding (e.g., accounting for notches)
        return '50px'  // Adjust as needed for iOS notch
      } else {
        // Android/base padding
        return'25px'  // Default padding
      }
    };

    const handleFilterClick = () => {
      if (FilterRef.current) {
        /* @ts-ignore */
        FilterRef.current.openModal();
      }
    };

    return <Page back={searchParams.get('page') === "explore"? true : false}>

            
          <AnimatePresence mode="wait">
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                initial={{ y: 0, opacity: 1 }}
                transition={{
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
                      opacity: { duration: 0.6 },
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
                    style={{width:"100%"}}
                    transition={{
                      opacity: { duration: 0.6 },
                    }}
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
                    style={{width:"100%"}}
                    transition={{
                      opacity: { duration: 0.6 },
                    }}
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
                      opacity: { duration: 0.6 },
                    }}
                    
                  >

                    <ProfilePage/>
                  </motion.div>
                </AnimatePresence>
              )}


              {searchParams.get('page') === "nearby" && (
                        <motion.div
                            style={{
                              position: "fixed",
                              zIndex: 50,
                              left: "50%",
                              transform: "translateX(-50%)",
                              bottom:"130px"
                            }}
                            initial={{ opacity:0 }}
                            animate={{ opacity:1 }}
                            exit={{ opacity:0 }}
                          >
                            <Button
                              variant="shadow"
                              size="lg"
                              onClick={handleFilterClick}
                              radius="full"
                              isIconOnly
                              aria-label="Like"
                              color="primary"
                              className='bg-primary/80 backdrop-blur'

                            >
                              <FitlerIcon />
                            </Button>
                          </motion.div>
                      )}

          <NearByFilter ref={FilterRef} />

            </section>
      
    </Page>
    
}

export default MainPage