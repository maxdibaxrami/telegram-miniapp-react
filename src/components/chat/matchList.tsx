import { BASEURL } from "@/constant";
import { RootState } from "@/store";
import { Avatar, AvatarGroup, Skeleton } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MatchList = () => {
  const { t } = useTranslation();
  const { data: match, loading } = useSelector((state: RootState) => state.match);
  const { data: conversation, loading: loadingConversation } = useSelector((state: RootState) => state.conversation);

  // Function to check if the match has an existing conversation
  const hasConversation = (userId: number) => {
    return conversation.some(
      (conv) => conv.senderId === userId || conv.recipientId === userId
    );
  };


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
      style={{height:"70px"}}
      renderCount={(count) => (
        <p className="text-small text-foreground font-medium ms-2">
          +{count} {t("others")}
        </p>
      )}
    >
      {loadingConversation && loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <Skeleton style={{ width: "56px", height: "56px" }} className="flex rounded-full" />
          </div>
        ))}
      
      {!loading && !loadingConversation &&
        match.map((value, index) => {
          // Check if this match has an existing conversation
          if (hasConversation(value.likedUser.id)) {
            return null; // Don't render if conversation exists
          }

          return (
            <div className="flex items-center">
              <Avatar
                key={index}
                as={Link}
                to={`/chat-detail?user1=${value.likedUser.id}&user2=${value.user.id}`}
                color="primary"
                radius="full"
                size="lg"
                src={`${BASEURL}${value.likedUser.photos[0].url}`}
              />
            </div>
          );
        })}
    </AvatarGroup>
    </>
  );
};

export default MatchList;
