import { useEffect, useRef, useCallback } from "react";
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

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Callback to handle fetching users
  const fetchMoreUsers = useCallback(() => {
    if (!loading && users.length < total && !loadingMore) {
      dispatch(fetchNearBySliceUsers({
        userId: user.id.toString(),
        page: page,
        limit: 20,
        ...filters
      }));
    }
  }, [dispatch, filters, loading, loadingMore, page, total]);

  useEffect(() => {
    if (loadingMore || loading || !loadMoreRef.current) return;

    const currentObserver = observer.current;

    // Set up the Intersection Observer
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        fetchMoreUsers();
      }
    });

    const sentinel = loadMoreRef.current;
    if (sentinel) {
      observer.current.observe(sentinel);
    }

    // Cleanup the observer
    return () => {
      if (currentObserver && sentinel) {
        currentObserver.unobserve(sentinel);
      }
    };
  }, [fetchMoreUsers, loading, loadingMore]);

  if (loading) {
    return (
      <div className="h-screen py-24 flex item-center justify-center w-screen flex flex-col p-6 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
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
          paddingTop: "4.2rem",
          paddingBottom: "6rem",
          paddingRight: "18px",
          paddingLeft: "18px",
        }}
      >
        {users.map((user) => (
          <NearByCard key={user.id} data={user} />
        ))}

        {/* Sentinel div for Intersection Observer */}
        <div ref={loadMoreRef} className="col-span-2 w-full flex items-center justify-center">
          {!loadingMore && users.length < total && (
            <div className="col-span-2 w-full mt-6 mb-6 flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          )}
        </div>
      </div>
    </LayoutGroup>
  );
}
