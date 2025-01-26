import { useEffect, useRef, useCallback } from "react";
import { FixedSizeGrid as Grid } from "react-window"; // Import the virtualization grid component
import NearByCard from "@/components/naerby/nearByCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { NotFoundLike } from "@/Icons/notFoundLike";
import { useTranslation } from "react-i18next";
import { fetchNearBySliceUsers } from "@/features/nearBySlice";
import { Spinner } from "@nextui-org/react";

export default function NearByPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: users, loading, page, total, filters, loadingMore } = useSelector(
    (state: RootState) => state.nearBy
  );
  const { data: user } = useSelector((state: RootState) => state.user);

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Callback to handle fetching users
  const fetchMoreUsers = useCallback(() => {
    if (!loading && users.length < total && !loadingMore) {
      dispatch(
        fetchNearBySliceUsers({
          userId: user.id.toString(),
          page: page,
          limit: 40,
          ...filters,
        })
      );
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
      <div
        className="h-screen w-screen flex flex-col items-center justify-center"
        style={{
          paddingTop: "4.2rem",
          paddingBottom: "6rem",
          paddingRight: "18px",
          paddingLeft: "18px",
        }}
      >
        <NotFoundLike />
        <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("exploreUserFilterNoUser")}</p>
        </div>
      </div>
    );
  }

  // Virtualization using react-window Grid
  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const user = users[rowIndex * 3 + columnIndex]; // Get the user for that cell (3 users per row)
    return (
      <div style={style} className="w-1/3 aspect-square flex-shrink-0">
        {user && <NearByCard data={user} />}
      </div>
    );
  };

  return (
    <div
      style={{
        paddingTop: "4.2rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Virtualized Grid */}
      <Grid
        columnCount={3} // 3 items per row
        columnWidth={window.innerWidth / 3} // Set column width (responsive)
        height={window.innerHeight} // Full screen height
        rowCount={Math.ceil(users.length / 3)} // Rows of 3 items
        rowHeight={window.innerWidth / 3} // Height matches width for aspect-square
        width={window.innerWidth} // Full screen width
      >
        {Cell}
      </Grid>

      {/* Sentinel div for Intersection Observer */}
      <div ref={loadMoreRef} className="w-full flex items-center justify-center">
        {!loadingMore && users.length < total && (
          <div className="w-full mt-6 mb-6 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </div>
  );
}
