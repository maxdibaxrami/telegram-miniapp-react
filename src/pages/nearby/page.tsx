import { useState, useRef, useEffect } from "react";
import NearByCard from "@/components/naerby/nearByCard";
import NearByUserModal from "@/components/naerby/NearByModal";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { NotFoundLike } from "@/Icons/notFoundLike";
import { useTranslation } from "react-i18next";
import MatchModal from "@/components/explore/matchModal";
import NearByCardSkelete from "@/components/naerby/NearByCardSkelete";
import { fetchNearBySliceUsers } from "@/features/nearBySlice";
import axios from '@/api/base';

export default function NearByPage() {
  const [SelectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const childRef = useRef();
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { data: users, loading, page, total, filters, loadingMore } = useSelector((state: RootState) => state.nearBy);
  const { data: user } = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.callChildFunction();
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onCardClick = async (data) => {
    setSelectedCard(null); // Reset selected card state
    setLoadingUser(true); // Set loading state to true

    // Fetch the user data for the clicked card using axios
    try {
      const response = await axios.get(`/users/${data.id}`);
      setSelectedCard(response.data); // Set the fetched user data to the state
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingUser(false); // Set loading state to false once the fetch is done
    }

    handleClick(); // Call the child function after setting the selected card
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottom && !loading && users.length < total) {
        dispatch(fetchNearBySliceUsers({
          userId: user.id.toString(),
          page: page,
          limit: 20,
          ...filters
        }));
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [users, loading, page, total, user.id, dispatch]);

  if (!loading && users.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <NotFoundLike />
        <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("exploreUserFilterNoUser")}</p>
        </div>


        <MatchModal
          isOpen={isModalOpen}
          modalData={SelectedCard}
          onClose={closeModal}
          thisUserId={user.id}

        />

        <NearByUserModal
          openModal={openModal}
          closeModal={closeModal}
          userId={user.id}
          ref={childRef}
          profile={SelectedCard}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="gap-2 grid grid-cols-2 sm:grid-cols-2 py-2"
      style={{
        paddingTop: "4.5rem",
        paddingBottom: "6rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        overflowY: "auto",
      }}
    >
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <NearByCardSkelete key={index} />
        ))
      ) : (
        users.map((value, index) => (
          <NearByCard
            data={value}
            num={index}
            onCardClick={onCardClick}
            key={value.id}
          />
        ))
      )}
      {loadingMore && <><NearByCardSkelete/><NearByCardSkelete /></>}



      <NearByUserModal
        openModal={openModal}
        closeModal={closeModal}
        userId={user.id}
        ref={childRef}
        profile={SelectedCard}
        loading={loadingUser} // Pass loading state to modal
      />

      <MatchModal
        isOpen={isModalOpen}
        modalData={SelectedCard}
        onClose={closeModal}
        thisUserId={user.id}
      />
    </motion.div>
  );
}
