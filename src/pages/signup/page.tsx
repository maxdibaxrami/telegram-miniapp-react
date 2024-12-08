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

export default function SignupPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [languageSelected, setLanguageSelected] = useState(false);
  const contentRef = useRef(null); // Ref to track content height

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
        <div ref={contentRef} style={{ paddingTop: "6rem" }} className="w-full">
          <div className="text-center mt-8">
            <SparklesText text="Moll Moll" />
          </div>

          <AnimatePresence mode="wait">
            {selectedTab === 0 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IntroPage setLanguage={setLanguage} />
              </motion.div>
            )}
            {selectedTab === 1 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileDataAuth />
              </motion.div>
            )}
            {selectedTab === 2 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileDataAuth2 />
              </motion.div>
            )}
            {selectedTab === 3 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <GenderStuffAuth />
              </motion.div>
            )}
            {selectedTab === 4 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HeightAuth />
              </motion.div>
            )}
            {selectedTab === 5 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RealationStatusAuth />
              </motion.div>
            )}
            {selectedTab === 6 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LanguageAuth />
              </motion.div>
            )}
            {selectedTab === 7 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SexualityStatusAuth />
              </motion.div>
            )}
            {selectedTab === 8 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <KidsAuth />
              </motion.div>
            )}
            {selectedTab === 9 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LookingforList />
              </motion.div>
            )}
            {selectedTab === 10 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ImageDataAuth />
              </motion.div>
            )}
            {selectedTab === 11 && (
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FinalStepAuth />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wrapping BottomController in motion.div for smooth position changes */}
        <motion.div
          layout
          style={{width:"100%",backgroundColor:"transparent"}}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <BottomController
            nextPage={NextPage}
            prevPage={prevPage}
          />
        </motion.div>
      </motion.div>
    </Page>
  );
}
