import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IntroPage from "@/components/auth/introPage";
import BottomController from "@/components/auth/BottonController";
import ProfileDataAuth from "@/components/auth/ProfileDataAuth";
import ProfileDataAuth2 from "@/components/auth/ProfileDataAuth2";
import AboutMeAuth from "@/components/auth/aboutMeAuth";
import InterestingAuth from "@/components/auth/interstingAuth";
import ImageDataAuth from "@/components/auth/ProfileIMagesAuth";
import FinalStepAuth from "@/components/auth/finalStep";
import { SparklesText } from "@/components/animate/sparkles";

export default function SignupPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [languageSelected, setLanguageSelected] = useState(false);

  const NextPage = () => setSelectedTab(selectedTab + 1);
  const prevPage = () => setSelectedTab(selectedTab - 1);

  const setLanguage = () => setLanguageSelected(true);
  useEffect(()=>{console.log("aaa")},[languageSelected])


  return (
    <div className="flex flex-col items-center h-screen justify-between">
      <div className="w-full h-screen">
        <div className="text-center mt-8">
          <SparklesText text="Moll Moll" />
        </div>

        {selectedTab === 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IntroPage setLanguage={setLanguage} />
            </motion.div>
          </AnimatePresence>
        )}

        {selectedTab === 1 && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileDataAuth />
            </motion.div>
          </AnimatePresence>
        )}

        {selectedTab === 2 && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileDataAuth2/>
            </motion.div>
          </AnimatePresence>
        )}

        {selectedTab === 3 && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AboutMeAuth />
            </motion.div>
          </AnimatePresence>
        )}

        {selectedTab === 4 && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <InterestingAuth />
            </motion.div>
          </AnimatePresence>
        )}

        {selectedTab === 5 && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ImageDataAuth />
            </motion.div>
          </AnimatePresence>
        )}

        {selectedTab === 6 && (
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              initial={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FinalStepAuth />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      {selectedTab !== 6 && (
          <BottomController
            nextPage={NextPage}
            prevPage={prevPage}
            selectedTab={selectedTab}
          />
      )}
    </div>
  );
}
