import LikeCard from "./likeCard";
import LikeCardSkelete from "./likeSkelete";

import { useEffect, useRef, useState } from "react";
import NearByUserModal from "@/components/naerby/NearByModal";
import { motion } from "framer-motion";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

import { NotFoundLike } from "@/Icons/notFoundLike";
import { Button } from "@nextui-org/button";
import { FireIcon } from "@/Icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NearByMatchModal from "@/components/naerby/NearByMatchModal";



export default function LikesPage() {
  const childRef = useRef();
  const [SelectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();  // Initialize translation hook

  const { data: user } = useSelector((state: RootState) => state.user);
  const { data, loading } = useSelector((state: RootState) => state.like);  // Assuming the like slice is in state.like


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = () => {
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.callChildFunction(); // Call the function in the child
    }
  };

  const onCardClick = (data) => {
    setSelectedCard(data);
    handleClick();
  };

  useEffect(()=>{console.log(isModalOpen)},[SelectedCard])

  if(!loading && data.length===0){
    return <div className="h-screen w-screen flex flex-col p-6 items-center justify-center"> 
        <NotFoundLike/>
        <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("nolikemessage")}</p>
          <Button as={Link} to={"/main?page=explore"} color="primary" endContent={<FireIcon />}>
            {t('Explore')}
          </Button>
        </div>

        <NearByMatchModal
            isOpen={isModalOpen}
            modalData={SelectedCard}
            onClose={closeModal}
          />

      <NearByUserModal openModal={openModal} closeModal={closeModal} userId={user.id} ref={childRef} profile={SelectedCard} /> 

          
    </div>
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

      {loading?(
        Array.from({ length: 10 }).map((_,index)=>{
          return <LikeCardSkelete key={index}/>
        })      
      ):(
        data.map((value) => (
          <LikeCard onPressData={onCardClick} data={value} />
        ))
      )}

        <NearByMatchModal
            isOpen={isModalOpen}
            modalData={SelectedCard}
            onClose={closeModal}
          />

      <NearByUserModal openModal={openModal} closeModal={closeModal} userId={user.id} ref={childRef} profile={SelectedCard} /> 

          

    </motion.div >
  );
}
