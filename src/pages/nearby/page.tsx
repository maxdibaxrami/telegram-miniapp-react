import { useEffect, useState } from "react";
import NearByCard from "@/components/naerby/nearByCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { NotFoundLike } from "@/Icons/notFoundLike";
import { useTranslation } from "react-i18next";
import { fetchNearBySliceUsers } from "@/features/nearBySlice";
import { Spinner } from "@nextui-org/react";
import { LayoutGroup } from "framer-motion";

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
      className="grid gap-2 grid-cols-2 sm:grid-cols-2"
      style={{
        paddingTop: "4.5rem",
        paddingBottom: "6rem",
        paddingLeft: "12px",
        paddingRight: "12px",
      }}
    >
        {users.map((user) => (
            <NearByCard
              data={user}
            />
        ))}

      {loadingMore && <div className="col-span-2 w-full flex items-center justify-center"> <Spinner size="lg" /></div>}
    </div>
    </LayoutGroup>

  );
}
