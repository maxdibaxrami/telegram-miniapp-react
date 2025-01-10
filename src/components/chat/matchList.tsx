import { BASEURL } from "@/constant";
import { LikeIcon } from "@/Icons";
import { RootState } from "@/store";
import { Avatar, AvatarGroup, Skeleton } from "@nextui-org/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MatchList = () => {
  const { t } = useTranslation();
  const { data: user, loading: selfuserLoading } = useSelector((state: RootState) => state.user);
  const { data: match, loading } = useSelector((state: RootState) => state.match);
  const { data: conversation, loading: loadingConversation } = useSelector((state: RootState) => state.conversation);

  // Function to check if the match has an existing conversation
  const hasConversation = (userId: number) => {
    return conversation?.some(
      (conv) => conv.senderId === userId || conv.recipientId === userId
    );
  };

  // Preprocess the matches to filter out users who have a conversation
  const filteredMatches = !loading && !loadingConversation && match
    ? match.filter((value) => !hasConversation(value.likedUser.id))
    : [];

  return (
    <>
      <div style={{ paddingBottom: "0.5rem" }} className="flex justify-between items-center">
        <span style={{ fontWeight: "500" }} className="text-large text-default-600">
          {t("matches")}
        </span>
      </div>

      <AvatarGroup
        isBordered
        className="px-3"
        style={{ height: "70px" }}
        renderCount={(count) => (
          <p className="text-small text-foreground font-medium ms-2">
            +{count} {t("others")}
          </p>
        )}
      >



        {/* Loading skeletons */}
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <Skeleton style={{ width: "72px", height: "72px" }} className="flex rounded-full" />
            </div>
          ))
        ) : (
          /* Render filtered matches */
          filteredMatches.map((value, index) => (
            <div key={index} className="flex items-center">
              <Avatar
                as={Link}
                to={`/chat-detail?user1=${value.likedUser.id}&user2=${value.user.id}`}
                color="primary"
                radius="full"
                size="lg"
                src={`${BASEURL}${user.id !== value.likedUser.id? value.likedUser.photos[0].url : value.user.photos[0].url}`}
              />
            </div>
          ))
        )}
      </AvatarGroup>
    </>
  );
};

export default MatchList;
