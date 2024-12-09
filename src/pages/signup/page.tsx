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
import HeightAuth from '@/components/auth/HeightAuth';
import RealationStatusAuth from '@/components/auth/RealationStatusAuth';
import LanguageAuth from "@/components/auth/languagesAuth";
import SexualityStatusAuth from "@/components/auth/SexualityStatusAuth";
import LookingforList from "@/components/core/WhyIamHereAuthList";
import InterestingAuth from "@/components/auth/interstingAuth";
import "./style.css"
import { useLaunchParams } from "@telegram-apps/sdk-react";
export default function SignupPage() {

  const contentRef = useRef(null); // Ref to track content height
  const lp = useLaunchParams();


  const [selectedTab, setSelectedTab] = useState(0);
  const [languageSelected, setLanguageSelected] = useState(false);
  const [nextSlideAvalable, setNextSlideAvalable] = useState(false)

  const [user, setUser] = useState({
    "telegramId": 123456789,
    "username": "",
    "firstName": "",
    "photoUrl": "",
    "city": "",
    "country": "",
    "languages": [],
    "interests": [],
    "height": "",
    "activityScore": 0,
    "gender": "",
    "lookingFor": "",
    "relationStatus": "",
    "sexuality": "",
    "education": "",
    "work": "",
    "bio": "",
    "photos": ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
    "verifiedAccount": true,
    "language":"en",
    "age":"2000-01-14"
  })

  const setSlideAvailable = (key, value) => {
    setNextSlideAvalable(true)
    setUser((prevUser) => ({
      ...prevUser,  // Spread the previous state to keep other fields unchanged
      [key]: value, // Dynamically update the specific key with the new value
    }));
  }

  const setSlideUnAvailable = (key, value) => {
    setNextSlideAvalable(false)
    setUser((prevUser) => ({
      ...prevUser,  // Spread the previous state to keep other fields unchanged
      [key]: value, // Dynamically update the specific key with the new value
    }));
  }

  const NextPage = () => setSelectedTab(selectedTab + 1);
  const prevPage = () => {
    if(selectedTab === 0 ) 
      return 
    setSelectedTab(selectedTab - 1)
  };
  const setLanguage = () => setLanguageSelected(true);

  useEffect(() => {
    console.log(user);
    console.log(languageSelected);

  }, [user]);


  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '5rem'  // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return'35px'  // Default padding
    }
  };
  

  return (
    <Page back={false}>
        <motion.div className="flex h-screen flex-col items-center justify-between">
          <div ref={contentRef} style={{paddingTop:`${getPaddingForPlatform()}`, zIndex:999 }} className="fixed top-0 w-full  backdrop-blur backdrop-saturate-150">
            <div className="text-center">
              <SparklesText text="Moll Moll" />
            </div>
          </div>

          <div style={{ paddingTop: `${['ios'].includes(lp.platform)? "6rem" : "6rem"}`, overflow:"scroll" , paddingBottom:"90px" }} className="w-full">
          <AnimatePresence>
              {selectedTab === 0 && (
                <motion.div
                  animate={{  opacity: 1 }}
                  exit={{  opacity: 0 }}
                  initial={{   opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IntroPage user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable} setLanguage={setLanguage} />
                </motion.div>
              )}
              {selectedTab === 1 && (
                <motion.div
                  animate={{  opacity: 1 }}
                  exit={{  opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProfileDataAuth user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
                </motion.div>
              )}
              {selectedTab === 2 && (
                <motion.div
                  animate={{   opacity: 1 }}
                  exit={{  opacity: 0 }}
                  initial={{  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProfileDataAuth2 user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
                </motion.div>
              )}
              {selectedTab === 3 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GenderStuffAuth user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
                </motion.div>
              )}
              {selectedTab === 4 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HeightAuth user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
                </motion.div>
              )}
              {selectedTab === 5 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <RealationStatusAuth user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable} />
                </motion.div>
              )}
              {selectedTab === 6 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LanguageAuth user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable} />
                </motion.div>
              )}
              {selectedTab === 7 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SexualityStatusAuth user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
                </motion.div>
              )}

              {selectedTab === 8 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LookingforList user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
                </motion.div>
              )}

              {selectedTab === 9 && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{  opacity: 0 }}
                  initial={{  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <InterestingAuth user={user} setSlideAvailable={setSlideAvailable} setSlideUnAvailable={setSlideUnAvailable}/>
                </motion.div>
              )}


              {selectedTab === 10 && (
                <motion.div
                  animate={{  opacity: 1 }}
                  exit={{  opacity: 0 }}
                  initial={{  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ImageDataAuth setSlideAvailable={setSlideAvailable}/>
                </motion.div>
              )}
              {selectedTab === 11 && (
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
            className="fixed pb-6 bottom-0 backdrop-blur backdrop-saturate-150 "
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
