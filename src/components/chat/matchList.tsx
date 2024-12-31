import { BASEURL } from "@/constant";
import { RootState } from "@/store";
import { Avatar, AvatarGroup, Skeleton } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MatchList = () => {
  const { t } = useTranslation();
  const { data : match, loading } = useSelector((state: RootState) => state.match);  // Assuming the like slice is in state.like

  return (
    <AvatarGroup
      isBordered
      renderCount={(count) => (
        <p className="text-small text-foreground font-medium ms-2">
          +{count} {t("others")}
        </p>
      )}
    >
      {loading && Array.from({ length: 10 }).map(()=>{
        return <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
      })}
      {!loading && 
            match.map((value,index)=>{
        return <Avatar
          isBordered
          color="primary"
          radius="md"
          size="lg"
          src={`${BASEURL}${value.likedUser.photos[0].url}`}
        />
      })}

      
    </AvatarGroup>
  );
};

export default MatchList;
