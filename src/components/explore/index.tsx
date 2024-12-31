import "swiper/css";
import "swiper/css/effect-creative";
import "./style.css";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ExploreCard from "./exploreCart";
import MatchModal from "./matchModal";
import { Button } from "@nextui-org/button";
import { LikeIcon, CloseCircleIcon, FitlerIcon, HeartEyesImoji } from "@/Icons";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import ExploreFilter from '@/components/explore/exploreFilter';
import { useDispatch, useSelector } from "react-redux";
import { likeUser } from "@/features/likeSlice";
import { AppDispatch, RootState } from "@/store";
import { NotFoundUserExplore } from "@/Icons/notFoundUserExplore";
import { removeUserFromState } from "@/features/exploreSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";



const ExplorePage = () => {
  
  const dispatch: AppDispatch = useDispatch();  // Use the correct AppDispatch type from your store

  const [index, setIndex] = useState<number | null>(null);  // Start with null to handle async loading
  const { data: user } = useSelector((state: RootState) => state.user);
  const { data: users , loading } = useSelector((state: RootState) => state.explore);
  const { requestLoading } = useSelector((state: RootState) => state.like);  // Assuming the like slice is in state.like

  const { t } = useTranslation();  // Initialize translation hook
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const FilterRef = useRef();

  const handleFilterClick = () => {
    if (FilterRef.current) {
      /* @ts-ignore */
      FilterRef.current.openModal(); // Call the function in the child
    }
  };

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
    try {
      // Dispatch the action and unwrap the result
      if (index === null) return;
      const resultAction = await dispatch(likeUser({ userId: user.id, likedUserId: users[index].id }));

      if (resultAction.payload.isMatch === true) {
        openModal();
      }

      NextSlide();  // Move to the previous user
      dispatch(removeUserFromState(users[index].id));

    } catch (error) {
      console.error('Failed to like user:', error);
    }
  };
    
  const handleNotLike = () => {
    if (index === null) return;
    dispatch(removeUserFromState(users[index].id));
    NextSlide();
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

  if (loading) {
    return <div className="h-screen w-screen">loading...</div>;
  }

  if (users.length <= 2) {
    return <div className="relative h-screen w-screen flex flex-col items-center justify-center">
      <NotFoundUserExplore/>
      <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("nolikemessage")}</p>

          <div className="flex">
            <Button className="mx-1" onClick={handleFilterClick} color="primary" endContent={<FitlerIcon />}>
              {t('Setfilters')}
            </Button>
          </div>

        </div>
        
      <ExploreFilter ref={FilterRef} />
      </div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <motion.div style={{ width: "100vw", height: `calc(100vh - ${getPaddingForPlatform()})`, position: "relative" }}>

        <AnimatePresence initial={false}>
          {users[index - 1] && (
            <ExploreCard profile={users[index - 1]} key={index - 1} frontCard={false} />
          )}
          {users[index] && (
            <ExploreCard
              key={index}
              NextSlide={NextSlide}
              openModal={openModal}
              frontCard={true}
              index={index}
              profile={users[index]}
              setIndex={setIndex}
              drag="x"
            />
          )}
        </AnimatePresence>

        <motion.div
          className="card backdrop-blur bg-primary/10 backdrop-saturate-150 p-2 footerswipcard fixed"
          style={{ right: "51%", borderRadius:"50%", bottom: "15px", zIndex: 50 }}
          transition={{ type: "tween" }}
        >
          <Button className="bg-primary/90 backdrop-saturate-150 backdrop-blur" onClick={handleNotLike} radius="full" style={{ width: "72px", height: "72px" }} size="lg" isIconOnly color="primary" variant="shadow">
            <CloseCircleIcon style={{width:"2.5rem",height:"2.5rem"}} className="size-9" />
          </Button>
        </motion.div>

        <motion.div
          className="card backdrop-blur bg-primary/10 backdrop-saturate-150 p-2 footerswipcard fixed"
          transition={{ type: "tween" }}
          style={{ left: "51%", borderRadius:"50%", bottom: "15px", zIndex: 50 }}
        >
          <Button isLoading={requestLoading} radius="full" style={{ width: "72px", height: "72px" }} size="lg" isIconOnly onPress={handleLikeUser} color="success" variant="shadow" className="flex items-center justify-center">
            <HeartEyesImoji className="w-full h-full"/>
          </Button>
        </motion.div>

        <Button
          variant="shadow"
          size="lg"
          onClick={handleFilterClick}
          isIconOnly
          className="left-4 fixed bottom-4"
          aria-label="Like"
          color="primary"
        >
          <FitlerIcon />
        </Button>
      </motion.div>

      <ExploreFilter ref={FilterRef} />

      {users[index] && (
        <MatchModal
          isOpen={isModalOpen}
          modalData={users[index]}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ExplorePage;
