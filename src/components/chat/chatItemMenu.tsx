import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { DeleteChatIcon, Favorite, MoreIcon, BlockAndReport } from "@/Icons/index";
import { useTranslation } from "react-i18next";

const ChatItemMenu = () => {
  const { t } = useTranslation();

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
      <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
        <DropdownItem key="favorite" startContent={<Favorite status={false} />}>
          {t("addToFavorite")}
        </DropdownItem>
        <DropdownItem
          key="deletechat"
          className="text-danger"
          color="danger"
          startContent={<DeleteChatIcon />}
        >
          {t("deleteChat")}
        </DropdownItem>
        <DropdownItem
          key="blockandreport"
          className="text-danger"
          color="danger"
          startContent={<BlockAndReport />}
        >
          {t("blockAndReport")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatItemMenu;
