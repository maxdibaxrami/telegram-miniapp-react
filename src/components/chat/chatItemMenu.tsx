import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { DeleteChatIcon, Favorite, MoreIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";

const ChatItemMenu = ({data, HandleBlockUser , HandleAddToFavorite, favoriteUsers, targetUser, HandleRemoveFromFavorite,handleDelete }) => {
  const { t } = useTranslation();

  const onActive = (key) => {
    switch (key) {
      case "favorite":
        HandleAddToFavorite(targetUser);
        break;
      case "removeFavorite":
        HandleRemoveFromFavorite(targetUser);
        break;
      case "deletechat":
        handleDelete(data.recipientId,data.senderId)
        break;
      case "blockandreport":
          HandleBlockUser(targetUser);  // Block user
          handleDelete(data.recipientId,data.senderId)

          break;
      default:
        break;
    }
  }

  // If targetUser is an object, use targetUser.id, otherwise directly compare the ids
  const targetUserId = targetUser.id ? targetUser.id : targetUser;
  
  // Check if the target user is in the favoriteUsers list by comparing ids
  const isFavorite = favoriteUsers.some(user => user == targetUserId);  // Compare by id
  
  console.log(isFavorite); // Log to verify the result

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button
          isIconOnly
          aria-label="More options"
          color="default"
          size="sm"
          variant="light"
        >
          <MoreIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={(key) => onActive(key)} aria-label="Dropdown menu with icons" variant="faded">

        {isFavorite ? (
          <DropdownItem key="removeFavorite" startContent={<Favorite status={true} />}>
            {t("Remove_from_favorite")}
          </DropdownItem>
        ) : (
          <DropdownItem key="favorite" startContent={<Favorite status={false} />}>
            {t("addToFavorite")}
          </DropdownItem>
        )}

        <DropdownItem
          key="deletechat"
          className="text-danger"
          color="danger"
          startContent={<DeleteChatIcon />}
        >
          {t("deleteChat")}
        </DropdownItem>
       {/*  <DropdownItem
          key="blockandreport"
          className="text-danger"
          color="danger"
          startContent={<BlockAndReport />}
        >
          {t("blockAndReport")}
        </DropdownItem>*/}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatItemMenu;
