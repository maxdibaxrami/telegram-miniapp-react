import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IntroPage from "@/components/auth/introPage";
import BottomController from "@/components/auth/BottonController";
import ProfileDataAuth from "@/components/auth/ProfileDataAuth";
import ProfileDataAuth2 from "@/components/auth/ProfileDataAuth2";
import GenderStuffAuth from "@/components/auth/genderStuffAuth";
import ImageDataAuth from "@/components/auth/ProfileIMagesAuth";
import FinalStepAuth from "@/components/auth/finalStep";
import { SparklesText } from "@/components/animate/sparkles";
import { Page } from "@/components/Page";
import KidsAuth from "@/components/auth/kidsAuth";
import HeightAuth from '@/components/auth/HeightAuth';
import RealationStatusAuth from '@/components/auth/RealationStatusAuth';
import LanguageAuth from "@/components/auth/languagesAuth";
import SexualityStatusAuth from "@/components/auth/SexualityStatusAuth";
import LookingforList from "@/components/core/WhyIamHereAuthList";
import InterestingAuth from "@/components/auth/interstingAuth";

export default function SignupPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [languageSelected, setLanguageSelected] = useState(false);
  const contentRef = useRef(null); // Ref to track content height

  const [nextSlideAvalable, setNextSlideAvalable] = useState(false)

  const setSlideAvailable = () => setNextSlideAvalable(true)
  const setSlideUnAvailable = () => setNextSlideAvalable(false)

  const NextPage = () => setSelectedTab(selectedTab + 1);
  const prevPage = () => {
    if(selectedTab === 0 ) 
      return 
    setSelectedTab(selectedTab - 1)
  };
  const setLanguage = () => setLanguageSelected(true);

  useEffect(() => {
    console.log("Language Selected:", languageSelected);
  }, [languageSelected]);

  return (
    <Page back={false}>
      <motion.div className="flex flex-col items-center justify-between">
        <div ref={contentRef} style={{ paddingTop: "4rem",paddingBottom:"1rem", zIndex:999 }} className="fixed top-0 w-full backdrop-blur	bg-background/80 backdrop-saturate-150 ">
          <div className="text-center mt-8">
            <SparklesText text="Moll Moll" />
          </div>
        </div>

        <div style={{ paddingTop: "9rem", paddingBottom:"90px" }} className="w-full h-screen">
        <AnimatePresence>
            {selectedTab === 0 && (
              <motion.div
                animate={{  opacity: 1 }}
                exit={{  opacity: 0 }}
                initial={{   opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IntroPage setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable} setLanguage={setLanguage} />
              </motion.div>
            )}
            {selectedTab === 1 && (
              <motion.div
                animate={{  opacity: 1 }}
                exit={{  opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileDataAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
            {selectedTab === 2 && (
              <motion.div
                animate={{   opacity: 1 }}
                exit={{  opacity: 0 }}
                initial={{  opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileDataAuth2 setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
            {selectedTab === 3 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <GenderStuffAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
            {selectedTab === 4 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HeightAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
            {selectedTab === 5 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RealationStatusAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable} />
              </motion.div>
            )}
            {selectedTab === 6 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LanguageAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable} />
              </motion.div>
            )}
            {selectedTab === 7 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SexualityStatusAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
            {selectedTab === 8 && (
              <motion.div
                animate={{opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <KidsAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
            {selectedTab === 9 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LookingforList setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}

            {selectedTab === 10 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{  opacity: 0 }}
                initial={{  opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <InterestingAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}


            {selectedTab === 11 && (
              <motion.div
                animate={{  opacity: 1 }}
                exit={{  opacity: 0 }}
                initial={{  opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ImageDataAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
            {selectedTab === 12 && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FinalStepAuth setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wrapping BottomController in motion.div for smooth position changes */}
        <div
          className="backdrop-blur fixed pb-6 bottom-0 bg-background/80 backdrop-saturate-150 "
          style={{width:"100%",zIndex:999}}
        >
          <BottomController
            nextPage={NextPage}
            prevPage={prevPage}
            selectedTab={selectedTab}
            nextSlideAvalable={nextSlideAvalable}
          />
        </div>
      </motion.div>
    </Page>
  );
}
