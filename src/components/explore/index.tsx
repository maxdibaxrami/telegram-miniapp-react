import "swiper/css";
import "swiper/css/effect-creative";
import "./style.css";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ExploreCard from "./exploreCart";
import MatchModal from "./matchModal";
import { Button } from "@nextui-org/button";
import { CloseCircleIcon, LikeIcon, PerimumIcon } from "@/Icons";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { likeUser } from "@/features/likeSlice";
import { AppDispatch, RootState } from "@/store";
import { NotFoundUserExplore } from "@/Icons/notFoundUserExplore";
import { fetchFilteredExplore, removeUserFromState } from "@/features/exploreSlice";
import { useTranslation } from "react-i18next";
import {  Link, Spinner } from "@nextui-org/react";
import toast from 'react-hot-toast';
import { fetchMatches } from "@/features/matchSlice";
import { SparklesHeartText } from "../animate/hearSparkles";



const ExplorePage = () => {
  
  const dispatch: AppDispatch = useDispatch();  // Use the correct AppDispatch type from your store

  const [index, setIndex] = useState<number | null>(null);  // Start with null to handle async loading
  const { data: user } = useSelector((state: RootState) => state.user);
  const { data: users, loading, page, limit, total, secondLoading } = useSelector((state: RootState) => state.explore);
  const { requestLoading } = useSelector((state: RootState) => state.like);  // Assuming the like slice is in state.like

  const maxLikes = 50;
  const [likesCount, setLikesCount] = useState(0);

  const { t } = useTranslation();  // Initialize translation hook
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Initialize the index to start from the last item when users array is loaded
  useEffect(() => {
    if (users && users.length > 0) {
      setIndex(users.length - 1);  // Start from the last user
    }
  }, [users]);

  const NextSlide = () => {
    if (index !== null && index > 0) {
      setIndex(index - 1);  // Decrement the index to move backwards
    }
  };

  const handleLikeUser = async () => {

    if (likesCount >= maxLikes) {
      ToastErrorLikeLimit(<p>{t("Reachedlimit")}</p>,<p>{t("Youhavereachedyourdailylikelimitof50")}</p>,<p>{t("Tounlockallfeatures,youneedapremiumaccount.")}</p>,<p>{t("Inviteyourfriendsandgetapremiumaccount")}</p>)
      return;
    }

    try {
      // Dispatch the action and unwrap the result
      if (index === null) return;
      const resultAction = await dispatch(likeUser({ userId: user.id, likedUserId: users[index].id }));
      // @ts-ignore
      if (resultAction.payload.isMatch === true) {
        dispatch(fetchMatches(user.id.toString()));

        openModal();
      }

      NextSlide();  // Move to the previous user
      dispatch(removeUserFromState(users[index].id));
      const newCount = likesCount + 1;
      setLikesCount(newCount);
      // @ts-ignore
      localStorage.setItem('likesCount', newCount);

    } catch (error) {
      console.error('Failed to like user:', error);
    }
  };
    
  const handleNotLike = () => {
    if (likesCount >= maxLikes) {
      ToastErrorLikeLimit(<p>{t("Reachedlimit")}</p>,<p>{t("Youhavereachedyourdailylikelimitof50")}</p>,<p>{t("Tounlockallfeatures,youneedapremiumaccount.")}</p>,<p>{t("Inviteyourfriendsandgetapremiumaccount")}</p>)
      return;
    }

    if (index === null) return;
    dispatch(removeUserFromState(users[index].id));
    NextSlide();

    const newCount = likesCount + 1;
    setLikesCount(newCount);
    // @ts-ignore
    localStorage.setItem('likesCount', newCount);
  };

  const lp = useLaunchParams();

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '50px';  // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return '25px';  // Default padding
    }
  };


  useEffect(() => {
    if (users && users.length <= 3 && (page * limit) < total ) {
      // Dispatch action to fetch more data
      console.log("Dispatch action to fetch more data")
      dispatch(fetchFilteredExplore({
        userId:user.id.toString(),
        ageRange:null,
        city:null,
        country:null,
        languages:null,
        page: page,
        limit
      }));

    }
  }, [users, page, limit]);
  
  useEffect(() => {
    // Check if there's a stored like count and reset date
    const storedLikes = localStorage.getItem('likesCount');
    const lastReset = localStorage.getItem('lastReset');

    const today = new Date().setHours(0, 0, 0, 0); // Current day midnight
// @ts-ignore

    if (lastReset < today) {
      // It's a new day, reset the counter
      // @ts-ignore
      localStorage.setItem('likesCount', 0);
      // @ts-ignore
      localStorage.setItem('lastReset', today);
      setLikesCount(0);
    } else if (storedLikes) {
      // Set the current like count from storage
      setLikesCount(parseInt(storedLikes, 10));
    }
  }, []);

  const ToastErrorLikeLimit = (text1,text2,text3,text4) => {
    toast.custom((t) => (
      <div
        style={{zIndex:"999"}}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md backdrop-blur bg-default/70 backdrop-saturate-150 w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center">
            <div className="flex items-center px-0.5">
            <motion.div
                animate={{
                  scale: [1, 1.2, 1.2, 1.2, 1],
                  rotate: [0, 0, 5, -5, 0],
                  borderRadius: ["50%", "50%", "50%", "50%", "50%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >         
                <Button size="lg" radius="full" isIconOnly aria-label="Like" color="default">
                  <PerimumIcon className="size-7"/>
                </Button>
              </motion.div>
            </div>
            <div className="ml-3 px-1 flex-1">
              <p className="text-sm font-bold text-foreground-900">
                {text1}
              </p>
              <p className="mt-1 text-sm text-foreground-500">
                {text2}
              </p>
              <p className="mt-1 text-sm text-foreground-500">
                <Link size="sm" color="warning" href="#" underline="always">
                  {text3}
                </Link>

              </p>
              <p>
                <Link size="sm" color="success" href="#" underline="always">
                  {text4}
                </Link>
              </p>
              <div>
              </div>
            </div>
          </div>
        </div>

      </div>
    ),{duration: 4000})
  }


  if (loading) {
    return <motion.div style={{ position: "relative" }}>
        <motion.div className="flex justify-center items-center" style={{ width: "100vw", height: `calc(100vh - ${getPaddingForPlatform()})`, position: "relative" }}>
          <Spinner size="lg" />
        </motion.div>
    </motion.div>;
  }

  if (users.length <= 0) {
    return <div className="relative h-screen w-screen flex flex-col items-center justify-center">
      <NotFoundUserExplore/>
      <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("nolikemessage")}</p>
        </div>
      </div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <motion.div style={{ width: "100vw", height: `calc(100vh - ${getPaddingForPlatform()})`, position: "relative" }}>

        <AnimatePresence initial={false}>

          {secondLoading && 
            <div className="relative h-screen w-screen flex flex-col items-center justify-center">
              <NotFoundUserExplore/>
              <div className="flex gap-4 flex-col px-6 text-center items-center">
                  <p className="text-tiny">{t("nolikemessage")}</p>
                </div>
            </div>
          }

          {users[index - 2] && (
            <ExploreCard profile={users[index - 2]} key={index - 2} frontCard={"variantsBackCardThird"} />
          )}
      
          {users[index - 1] && (
            <ExploreCard profile={users[index - 1]} key={index - 1} frontCard={"variantsBackCard"} />
          )}
          {users[index] && (
            <ExploreCard
              key={index}
              NextSlide={NextSlide}
              openModal={openModal}
              frontCard={"variantsFrontCard"}
              index={index}
              profile={users[index]}
              setIndex={setIndex}
              handleNotLike={handleNotLike}
              drag="x"
            />
          )}
        </AnimatePresence>

        <motion.div
          className="m-2 footerswipcard fixed"
          style={{ right: "50%", borderRadius:"50%", bottom: "30px", zIndex: 50 }}
          transition={{ type: "tween" }}
        >
          <Button  onClick={handleNotLike} radius="full" style={{ width: "72px", height: "72px" }} size="lg" isIconOnly color="primary" variant="shadow">
            <CloseCircleIcon style={{width:"2.5rem",height:"2.5rem"}} className="size-9" />
          </Button>
        </motion.div>

        <motion.div
          className="card m-2 footerswipcard fixed"
          transition={{ type: "tween" }}
          style={{ left: "50%", borderRadius:"50%", bottom: "30px", zIndex: 50 }}
        >
          <SparklesHeartText
            text={
              <Button isLoading={requestLoading} radius="full" style={{ width: "72px", height: "72px" }} size="lg" isIconOnly onPress={handleLikeUser} color="secondary" variant="shadow" className="flex items-center justify-center">
                <LikeIcon style={{width:"2.5rem",height:"2.5rem"}} className="size-9"/>
              </Button>
            }
            colors={{ first: "#ff4b61", second: "#A8B2BD" }}
            sparklesCount={20} // Adjust number of hearts
          />
          
        </motion.div>
         
      </motion.div>

      {users[index] && (
        <MatchModal
          isOpen={isModalOpen}
          modalData={users[index]}
          onClose={closeModal}
          thisUserId={user.id}
        />
      )}
    </div>
  );
};

export default ExplorePage;
