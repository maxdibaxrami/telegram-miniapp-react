import "swiper/css";
import "swiper/css/effect-creative";
import "./style.css";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ExploreCard from "./exploreCart";
import MatchModal from "./matchModal";
import { Button } from "@nextui-org/button";
import { CloseCircleIcon, LikeIcon, LockIcon } from "@/Icons";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { likeUser } from "@/features/likeSlice";
import { AppDispatch, RootState } from "@/store";
import { NotFoundUserExplore } from "@/Icons/notFoundUserExplore";
import { fetchFilteredExplore, removeUserFromState } from "@/features/exploreSlice";
import { useTranslation } from "react-i18next";
import { Spinner } from "@nextui-org/react";
import { fetchMatches } from "@/features/matchSlice";
import { SparklesHeartText } from "../animate/hearSparkles";
import { incrementLikes, resetLikes, setLastReset } from "@/features/likeLimitationSlice";

import { PopOverPerimum } from "../perimum/popOver";



const ExplorePage = () => {
  
  const dispatch: AppDispatch = useDispatch();  // Use the correct AppDispatch type from your store
  const maxLikes = 50;
  const [index, setIndex] = useState<number | null>(null);  // Start with null to handle async loading
  const { data: user } = useSelector((state: RootState) => state.user);
  const { data: users, loading, page, limit, total, secondLoading } = useSelector((state: RootState) => state.explore);
  //const { requestLoading } = useSelector((state: RootState) => state.like);  // Assuming the like slice is in state.like
  const { t } = useTranslation();  // Initialize translation hook
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { likesCount, lastReset } = useSelector((state: RootState) => state.likeLimit);

  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
    if (lastReset < today) {
      // It's a new day, reset the like count
      dispatch(resetLikes());
      dispatch(setLastReset(today));
    }
  }, [dispatch, lastReset]);

  useEffect(()=>{ console.log(likesCount) },[likesCount])


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
      dispatch(incrementLikes())
    } catch (error) {
      console.error('Failed to like user:', error);
    }
  };
    
  const handleNotLike = () => {
    if (likesCount >= maxLikes) {
      return;
    }

    if (index === null) return;
    NextSlide();
    dispatch(removeUserFromState(users[index].id));
    dispatch(incrementLikes())
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

          {users[index - 3] && (
            <ExploreCard profile={users[index - 3]} key={index - 3} frontCard={"variantsBackCardThird"} />
          )}
          
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
          <Button isDisabled={likesCount >= maxLikes} onClick={handleNotLike} radius="full" style={{ width: "72px", height: "72px" }} size="lg" isIconOnly color="primary" variant="shadow">
            <CloseCircleIcon style={{width:"2.5rem",height:"2.5rem"}} className="size-8" />
          </Button>
        </motion.div>

        <motion.div
          className="card m-2 footerswipcard fixed"
          transition={{ type: "tween" }}
          style={{ left: "50%", borderRadius:"50%", bottom: "30px", zIndex: 50 }}
        >

          {likesCount >= maxLikes ? 
          <PopOverPerimum isOpen={true}>
               <Button isDisabled={true} radius="full" style={{ width: "72px", height: "72px" }} size="lg" isIconOnly color="secondary" variant="shadow" className="flex items-center justify-center">
                  <LockIcon style={{width:"2.5rem",height:"2.5rem"}} className="size-8"/> 
              </Button>
          </PopOverPerimum>
        
        
        :
          <SparklesHeartText
            text={
              <Button radius="full" style={{ width: "72px", height: "72px" }} size="lg" isIconOnly onPress={handleLikeUser} color="secondary" variant="shadow" className="flex items-center justify-center">
                  <LikeIcon style={{width:"2.5rem",height:"2.5rem"}} className="size-8"/> 
              </Button>
            }
            colors={{ first: "#ff4b61", second: "#A8B2BD" }}
            sparklesCount={20} // Initial number of hearts
          />
        }

 

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
