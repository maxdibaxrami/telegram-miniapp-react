import { useEffect, useState } from "react";
import NearByCard from "@/components/naerby/nearByCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { NotFoundLike } from "@/Icons/notFoundLike";
import { useTranslation } from "react-i18next";
import { fetchNearBySliceUsers } from "@/features/nearBySlice";
import { Spinner } from "@nextui-org/react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function NearByPage() {

  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { data: users, loading, page, total, filters, loadingMore } = useSelector((state: RootState) => state.nearBy);
  const { data: user } = useSelector((state: RootState) => state.user);

  const [selected, setSelected] = useState<any>(null);


  useEffect(() => {

    const parentContainer = document.getElementById("wrap");

    if (!parentContainer) return; // Ensure that the element exists

    const handleWindowScroll = () => {
      const bottom = parentContainer.scrollHeight === parentContainer.scrollTop + parentContainer.clientHeight;
      if (bottom && !loading && users.length < total) {
        dispatch(fetchNearBySliceUsers({
          userId: user.id.toString(),
          page: page,
          limit: 20,
          ...filters
        }));
      }
    };

    parentContainer.addEventListener("scroll", handleWindowScroll);

    return () => {
      parentContainer.removeEventListener("scroll", handleWindowScroll);
    };
  }, [users, loading, page, total, user.id, dispatch, filters]);



  const handleCardClick = (user) => {
    if(user === null ){
      setSelected(null); // Toggle selection

    }
    if(selected === null) {
      setSelected(user); // Toggle selection
      return
    }
    setSelected(selected.id === user.id ? null : user); // Toggle selection
  };
  

  useEffect(()=>{
      console.log("nearby",selected)
  
  },[selected])

  if(loading){
    return <div className="h-screen w-screen flex flex-col p-6 items-center justify-center"> 
      <Spinner size="lg" />
    </div>
  }
  
  if (!loading && users.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <NotFoundLike />
        <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("exploreUserFilterNoUser")}</p>
        </div>
      </div>
    );
  }


  return (
    <LayoutGroup>
    <div
      className="grid grid-cols-2 sm:grid-cols-2"
      style={{
        paddingTop: "4.5rem",
        paddingBottom: "6rem",
      }}
    >
        {users.map((user) => (
            <NearByCard
              data={user}
              onClick={() => handleCardClick(user)}
              isSelected={selected != null && selected.id === user.id}
            />
        ))}

        <AnimatePresence>
          {selected && (
             <motion.div
             layoutId={`l${selected.id}`}
             className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setSelected(null)}
             transition={{
              type: "spring", // Simple, natural spring animation
            }}
           >
             <motion.div className="relative w-4/5 rounded-lg shadow-lg">
               <NearByCard
                 data={users.find((user) => user.id === selected.id)}
                 isSelected={true}
                 onClick={() => setSelected(null)}
               />
             </motion.div>
           </motion.div>
          )}
        </AnimatePresence>


      {loadingMore && <div className="col-span-2 w-full flex items-center justify-center"> <Spinner size="lg" /></div>}
    </div>
    </LayoutGroup>

  );
}
