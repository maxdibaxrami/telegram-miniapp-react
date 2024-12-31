"use client";
import { useState, useRef } from "react";
import NearByCard from "@/components/naerby/nearByCard";
import NearByUserModal from "@/components/naerby/NearByModal";
import { motion } from "framer-motion";
import BlurFade from "@/components/animate/BlurFade";
import NearByFilter from "@/components/naerby/NearByFilter";
import { FitlerIcon } from "@/Icons";
import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NotFoundLike } from "@/Icons/notFoundLike";
import { useTranslation } from "react-i18next";
import NearByMatchModal from "@/components/naerby/NearByMatchModal";
import NearByCardSkelete from "@/components/naerby/NearByCardSkelete"; // Add a skeleton loader similar to LikeCardSkelete

export default function NearByPage() {
  const [SelectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const childRef = useRef();
  const FilterRef = useRef();
  const { t } = useTranslation(); // Initialize translation hook

  const { data: users, loading } = useSelector((state: RootState) => state.explore);
  const { data: user } = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.callChildFunction(); // Call the function in the child
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterClick = () => {
    if (FilterRef.current) {
      /* @ts-ignore */
      FilterRef.current.openModal(); // Call the function in the child
    }
  };

  const onCardClick = (data) => {
    setSelectedCard(data);
    handleClick();
  };

  if (!loading && users.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <NotFoundLike />
        <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("nolikemessage")}</p>
          <Button
            className="mx-1"
            onClick={handleFilterClick}
            color="primary"
            endContent={<FitlerIcon />}
          >
            {t("Setfilters")}
          </Button>
        </div>

        <NearByMatchModal
          isOpen={isModalOpen}
          modalData={SelectedCard}
          onClose={closeModal}
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
      }}
    >
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <NearByCardSkelete key={index} /> // Display skeleton loaders when loading
        ))
      ) : (
        users.map((value, index) => (
            <NearByCard data={value} num={index} onCardClick={onCardClick} />
        ))
      )}

      <Button
        variant="shadow"
        size="lg"
        onClick={handleFilterClick}
        style={{
          position: "fixed",
          bottom: "100px",
          zIndex:50,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        isIconOnly
        aria-label="Like"
        color="primary"
      >
        <FitlerIcon />
      </Button>

      <NearByUserModal openModal={openModal} closeModal={closeModal} userId={user.id} ref={childRef} profile={SelectedCard} /> 

      <NearByMatchModal
        isOpen={isModalOpen}
        modalData={SelectedCard}
        onClose={closeModal}
      />
      <NearByFilter ref={FilterRef} />
    </motion.div>
  );
}
