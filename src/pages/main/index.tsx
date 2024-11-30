import ChatPage from '@/components/chat'
import NavBar from '@/components/NavBar/index'
import TopBar from '@/components/tobBar'
import { Page } from '@/components/Page.tsx';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/button";
import { ArrowRight, FitlerIcon } from "@/Icons/index";
import { useSearchParams } from "react-router-dom";
import ProfilePage from '@/components/profile';
import LikesPage from '@/pages/like/index';
import ExplorePage from '@/components/explore';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react'
import ExploreFilter from '@/components/explore/exploreFilter';
import NearByPage from '@/pages/nearby/page';
import NearByFilter from '@/components/naerby/NearByFilter';

interface ExploreFilterRef {
  openModal: () => void;
  closeModal: () => void;
}

const MainPage = () => {
    const childRef = useRef<ExploreFilterRef>(null);
    const childRefExplore = useRef<ExploreFilterRef>(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    const handleOpenModalExplore = () => {
      if (childRefExplore.current) {
        childRefExplore.current.openModal();
      }
    };
    const handleOpenModal = () => {
      if (childRef.current) {
          childRef.current?.openModal();
      }
    };



    return <Page back={false}>

            
            <AnimatePresence mode="wait">
            {true && (

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
                     )}

          </AnimatePresence>

                
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
              style={{maxHeight:"100vh", overflow:"scroll"}}
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
                <Button onPress={handleOpenModalExplore} className="color-white" isIconOnly color="primary" style={{borderRadius:"20%"}} size="md" aria-label="Like">
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
                <Button className="color-white" onPress={()=> navigate(-1)} isIconOnly color="primary" style={{borderRadius:"20%"}} size="md" aria-label="Like">
                  <ArrowRight stroke="#FFF"/>
                </Button>  
              </motion.div>
          )}
        </AnimatePresence>


      </section>
      
    </Page>
    
}

export default MainPage