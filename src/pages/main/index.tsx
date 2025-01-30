import ChatPage from '@/components/chat'
import NavBar from '@/components/NavBar/index'
import TopBar from '@/components/tobBar'
import { Page } from '@/components/Page.tsx';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import ProfilePage from '@/components/profile';
import LikesPage from '@/pages/like/index';
import ExplorePage from '@/components/explore';
import NearByPage from '@/pages/nearby/page';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Button } from '@nextui-org/button';
import { FitlerIcon, FlashIcon } from '@/Icons';
import NearByFilter from '@/components/naerby/NearByFilter';
import { useRef } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SparklesFlashIconText } from '@/components/animate/flash-sparkles';
import { useTranslation } from 'react-i18next';
import LocationModal from '@/components/location/modal';

const MainPage = () => {
  const { i18n } = useTranslation();
  
  const [searchParams] = useSearchParams();
  const lp = useLaunchParams();
  const FilterRef = useRef();
  const { data: user } = useSelector((state: RootState) => state.user);

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
                animate={{opacity: 1 }}
                exit={{opacity: 0 }}
                initial={{ opacity: 1 }}
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
                    animate={{opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
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
                    animate={{opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
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
                    animate={{opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
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
                    animate={{opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
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
                    animate={{opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
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


              {searchParams.get('page') !== "profile" && (
                        <motion.div
                            style={
                              i18n.language==="ar" || i18n.language === 'fa'?
                              
                              {
                                position: "fixed",
                                zIndex: 11,
                                left: -50,
                                top:"130px",
                                display:"flex",
                                width:"100px",
                                alignItems:"flex-start",
                                justifyContent:"start",
                                borderRadius:"99px",
                                padding:"4px"
                              }
                              
                              :
                              {
                              position: "fixed",
                              zIndex: 11,
                              right: -50,
                              top:"130px",
                              display:"flex",
                              width:"100px",
                              alignItems:"flex-start",
                              justifyContent:"start",
                              borderRadius:"99px",
                              padding:"4px"
                            }
                        
                        
                        }
                            className={'bg-background/70 backdrop-blur-lg backdrop-saturate-150'}
                            initial={{ opacity:0 }}
                            animate={{ opacity:1 }}
                            exit={{ opacity:0 }}
                          >
                             <SparklesFlashIconText
                                text={
                                  <Button
                                    variant="light"
                                    size="sm"
                                    radius="full"
                                    isIconOnly
                                    aria-label="Like"
                                    color="primary"
                                    as={Link}
                                    to={'/add-firends'}
                                    className='bg-primary/80 backdrop-blur'
      
                                  >
                                    <div className='flex items-center flex-col relative'>
                                      <FlashIcon fill="#FFF" className="size-4 mt-1"/>
                                      <small className='p-0 m-0 font-bold' style={{fontSize:"8px",color:"#FFF",marginTop:"-4px"}}>{user.rewardPoints}</small>
                                    </div>
                                  </Button>
                                }
                                colors={{ first: "#f59e0c", second: "#f59e0c" }}
                                sparklesCount={5} 
                              />
 
                          </motion.div>
              )}

              <NearByFilter ref={FilterRef} />

              {user.lat === null &&
                <LocationModal/>
              }

            </section>
      
    </Page>
    
}

export default MainPage