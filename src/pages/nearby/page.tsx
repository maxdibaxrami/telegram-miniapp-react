import { FixedSizeGrid as Grid } from 'react-window';
import NearByCard from "@/components/naerby/nearByCard";
import { Spinner } from "@nextui-org/react";
import { NotFoundLike } from '@/Icons/notFoundLike';
import { RootState, AppDispatch } from '@/store';
import { fetchNearBySliceUsers } from "@/features/nearBySlice"; 
import { t } from 'i18next';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Constants for grid layout
const columnCount = 3;
const itemHeight = window.innerWidth / columnCount;
const itemWidth = window.innerWidth / columnCount;

const NearByGrid = ({ users, onItemsRendered }) => {
  return (
    <Grid
      columnCount={columnCount}
      columnWidth={itemWidth}
      height={window.innerHeight}
      rowCount={Math.ceil(users.length / columnCount)}
      rowHeight={itemHeight + 32}
      width={window.innerWidth}
      itemData={users}
      onItemsRendered={onItemsRendered}
    >
      {({ columnIndex, rowIndex, style, data }) => {
        const userIndex = rowIndex * columnCount + columnIndex;
        const user = data[userIndex];
        if (!user) return null;

        return (
          <div style={style}>
            <NearByCard key={user.id} data={user} />
          </div>
        );
      }}
    </Grid>
  );
};

export default function NearByPage() {
  
  const dispatch = useDispatch<AppDispatch>();

  const { data: users, loading, page, total, filters, loadingMore } = useSelector((state: RootState) => state.nearBy);
  const { data: user } = useSelector((state: RootState) => state.user);

  // Function to fetch more users when needed
  const fetchMoreUsers = useCallback(() => {
    if (!loading && users.length < total && !loadingMore) {
      dispatch(fetchNearBySliceUsers({
        userId: user.id.toString(),
        page: page + 1,  // Increment page
        limit: 30,
        ...filters
      }));
    }
  }, [dispatch, filters, loading, loadingMore, page, total, user]);

  // Function to handle when items are rendered
  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }) => {
      const totalItems = users.length;
      // Trigger fetching more users when we are near the end of the list
      if (visibleStopIndex >= totalItems - 10) {
        fetchMoreUsers();
      }
    },
    [users, fetchMoreUsers]
  );

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
        style={{ paddingTop: "4.2rem", paddingBottom: "6rem", paddingRight: "18px", paddingLeft: "18px" }}
      >
        <NotFoundLike />
        <div className="flex gap-4 flex-col px-6 text-center items-center">
          <p className="text-tiny">{t("exploreUserFilterNoUser")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <NearByGrid users={users} onItemsRendered={handleItemsRendered} />
      {/* Infinite scroll sentinel */}
      <div className="col-span-2 w-full flex items-center justify-center">
        {loadingMore && (
          <div className="col-span-2 w-full mt-6 mb-6 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </>
  );
}
