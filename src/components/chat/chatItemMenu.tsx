import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { DeleteChatIcon, Favorite, MoreIcon, BlockAndReport } from "@/Icons/index";

const ChatItemMenu = () => {

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button
          isIconOnly
          aria-label="Like"
          color="default"
          size="sm"
          variant="light"
        >
          <MoreIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
        <DropdownItem key="favorite" startContent={<Favorite status={false} />}>
          Add to favorite
        </DropdownItem>
        <DropdownItem
          key="deletechat"
          className="text-danger"
          color="danger"
          startContent={<DeleteChatIcon />}
        >
          Delete chat
        </DropdownItem>
        <DropdownItem
          key="blockandreport"
          className="text-danger"
          color="danger"
          startContent={<BlockAndReport />}
        >
          Block and report
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatItemMenu;
