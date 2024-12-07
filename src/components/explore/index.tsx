import "swiper/css";
import "swiper/css/effect-creative";
import "./style.css";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ExploreCard from "./exploreCart";
import { heartConfetti } from "../explore/buttonEffect";
import MatchModal from "./matchModal";
import { Button } from "@nextui-org/button";
import { LikeIcon, CloseCircleIcon } from "@/Icons";
import { useLaunchParams } from "@telegram-apps/sdk-react";


const getAnimationProps = () => {
  return {
    whileTap: {
      scale: 0.9,
    },
  };
};



const ExplorePage = () => {

  const [index, setIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const NextSlide = () => setIndex(index+1)

  const OnLikeButtonClick = (dataId) => {

    if (dataId.id === 4 || dataId.id === 8) {
      openModal();
      NextSlide()

    } else {
      NextSlide()
      heartConfetti();
    }

  }
  

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
  
  return (
    <div style={{position:"relative"}} >
        <motion.div style={{ width: "100vw", height: `calc(100vh - ${getPaddingForPlatform()})`, position: "relative"}}>
            <AnimatePresence initial={false}>
                <ExploreCard profile={mockProfiles[index+1]} key={index + 1} frontCard={false} />
                <ExploreCard
                    key={index}
                    NextSlide={NextSlide}
                    openModal={openModal}
                    frontCard={true}
                    index={index}
                    profile={mockProfiles[index]}
                    setIndex={setIndex}
                    drag="x"
                />
            </AnimatePresence>

            <motion.div
                  className="card backdrop-blur bg-background/80 backdrop-saturate-150 p-2 footerswipcard fixed"
                  animate={{ bottom: "20px", zIndex:50, right:"51%" }}
                  style={{right:"51%"}}
                  transition={{ type: "tween" }}
                  {...getAnimationProps()}
                >
                  <Button onClick={NextSlide} style={{width:"72px", height:"72px"}} size="lg" isIconOnly color="primary" variant="shadow">
                    <CloseCircleIcon className="size-9"/>
                  </Button>
            </motion.div>

              <motion.div
                  className="card backdrop-blur bg-background/80 backdrop-saturate-150 p-2 footerswipcard fixed"
                  transition={{ type: "tween" }}
                  style={{left:"51%"}}
                  animate={{ bottom: "20px", zIndex:50 ,left:"51%" }}

                  {...getAnimationProps()}
                >
                  <Button radius="lg" style={{width:"72px", height:"72px"}} size="lg" isIconOnly onPress={()=> OnLikeButtonClick(mockProfiles[index])} color="primary" variant="shadow">
                    <LikeIcon className="size-9"/>
                  </Button>
              </motion.div>

        </motion.div>

          <MatchModal
            isOpen={isModalOpen}
            modalData={mockProfiles[index]}
            onClose={closeModal}
          />
    </div>
  );
};

export default ExplorePage;

const mockProfiles = [
  {
    id: 1,
    name: "Mahdi Bahrami",
    age: 24,
    location: "Moscow, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258114e29026702d",
    workAndEducation: "Sechinov University, Programmer",
    whyHere: "Just chat",
    aboutMe: "Aspiring programmer and coffee.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "183 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Coding", "Photography", "Hiking", "Gaming"],
    mainImage: "https://i.pravatar.cc/?u=1",
    secondImage: "https://i.pravatar.cc/?u=2",
    thirdImage: "https://i.pravatar.cc/?u=3",
  },
  {
    id: 2,
    name: "Olga Ivanova",
    age: 22,
    location: "St. Petersburg, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258115e29026702d",
    workAndEducation: "SPbU, Graphic Designer",
    whyHere: "To meet new friends",
    aboutMe: "Passionate about design and travel.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "170 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Bi",
    interests: ["Design", "Travel", "Art"],
    mainImage: "https://i.pravatar.cc/?u=4",
    secondImage: "https://i.pravatar.cc/?u=5",
    thirdImage: "https://i.pravatar.cc/?u=6",
  },
  {
    id: 3,
    name: "Alexey Petrov",
    age: 27,
    location: "Novosibirsk, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258116e29026702d",
    workAndEducation: "Novosibirsk State University, Software Engineer",
    whyHere: "Looking for cool people",
    aboutMe: "Tech enthusiast and music lover.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "178 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Music", "Technology", "Sports"],
    mainImage: "https://i.pravatar.cc/?u=7",
    secondImage: "https://i.pravatar.cc/?u=8",
    thirdImage: "https://i.pravatar.cc/?u=9",
  },
  {
    id: 4,
    name: "Diana Smirnova",
    age: 23,
    location: "Moscow, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258117e29026702d",
    workAndEducation: "MSU, Marketing Student",
    whyHere: "Just looking to chat",
    aboutMe: "Love marketing and fun conversations.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "165 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Marketing", "Cooking", "Yoga"],
    mainImage: "https://i.pravatar.cc/?u=10",
    secondImage: "https://i.pravatar.cc/?u=11",
    thirdImage: "https://i.pravatar.cc/?u=12",
  },
  {
    id: 5,
    name: "Igor Ivanov",
    age: 25,
    location: "Kazan, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258118e29026702d",
    workAndEducation: "Kazan Federal University, Data Analyst",
    whyHere: "For fun chats",
    aboutMe: "Data lover and soccer fan.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "180 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Data Science", "Soccer", "Traveling"],
    mainImage: "https://i.pravatar.cc/?u=13",
    secondImage: "https://i.pravatar.cc/?u=14",
    thirdImage: "https://i.pravatar.cc/?u=15",
  },
  {
    id: 6,
    name: "Yulia Petrova",
    age: 21,
    location: "Yekaterinburg, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258119e29026702d",
    workAndEducation: "UrFU, Biologist",
    whyHere: "Looking for new friends",
    aboutMe: "Nature enthusiast and curious mind.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "160 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Biology", "Hiking", "Gardening"],
    mainImage: "https://i.pravatar.cc/?u=16",
    secondImage: "https://i.pravatar.cc/?u=17",
    thirdImage: "https://i.pravatar.cc/?u=18",
  },
  {
    id: 7,
    name: "Sergey Sokolov",
    age: 26,
    location: "Nizhny Novgorod, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258120e29026702d",
    workAndEducation: "NNGU, Network Engineer",
    whyHere: "To connect with others",
    aboutMe: "Techie and gaming aficionado.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "175 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Networking", "Gaming", "Traveling"],
    mainImage: "https://i.pravatar.cc/?u=19",
    secondImage: "https://i.pravatar.cc/?u=20",
    thirdImage: "https://i.pravatar.cc/?u=21",
  },
  {
    id: 8,
    name: "Elena Fedorova",
    age: 24,
    location: "Chelyabinsk, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258121e29026702d",
    workAndEducation: "ChSPU, Teacher",
    whyHere: "Just for conversations",
    aboutMe: "Love books and teaching.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "172 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Education", "Reading", "Cooking"],
    mainImage: "https://i.pravatar.cc/?u=22",
    secondImage: "https://i.pravatar.cc/?u=23",
    thirdImage: "https://i.pravatar.cc/?u=24",
  },
  {
    id: 9,
    name: "Viktor Volkov",
    age: 28,
    location: "Samara, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258122e29026702d",
    workAndEducation: "SSU, Civil Engineer",
    whyHere: "Looking for interesting people",
    aboutMe: "Engineering geek and sports lover.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "185 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Engineering", "Sports", "Photography"],
    mainImage: "https://i.pravatar.cc/?u=25",
    secondImage: "https://i.pravatar.cc/?u=26",
    thirdImage: "https://i.pravatar.cc/?u=27",
  },
  {
    id: 10,
    name: "Anna Vasilyeva",
    age: 25,
    location: "Voronezh, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258123e29026702d",
    workAndEducation: "Voronezh State University, Journalist",
    whyHere: "To meet new people",
    aboutMe: "Love writing and exploring.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "168 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Journalism", "Travel", "Writing"],
    mainImage: "https://i.pravatar.cc/?u=28",
    secondImage: "https://i.pravatar.cc/?u=29",
    thirdImage: "https://i.pravatar.cc/?u=30",
  },
];
