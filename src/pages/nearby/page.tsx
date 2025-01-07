import { useEffect } from "react";
import NearByCard from "@/components/naerby/nearByCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { NotFoundLike } from "@/Icons/notFoundLike";
import { useTranslation } from "react-i18next";
import NearByCardSkelete from "@/components/naerby/NearByCardSkelete";
import { fetchNearBySliceUsers } from "@/features/nearBySlice";

export default function NearByPage() {

  //const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { data: users, loading, page, total, filters, loadingMore } = useSelector((state: RootState) => state.nearBy);
  const { data: user } = useSelector((state: RootState) => state.user);

  //const closeModal = () => setIsModalOpen(false);

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
      </div>
    );
  }

  return (
    <div
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
            key={value.id}
          />
        ))
      )}
      {loadingMore && <><NearByCardSkelete/><NearByCardSkelete /></>}
    </div>
  );
}
