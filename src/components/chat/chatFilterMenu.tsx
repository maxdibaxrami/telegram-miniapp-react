import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { FilterButton, NewIcon, Favorite } from "@/Icons/index";

const ChatFiltermenu = () => {
  return (
    <Dropdown showArrow backdrop="blur">
      <DropdownTrigger>
        <Button  isIconOnly aria-label="Like" color="primary" size="lg">
          <FilterButton stroke='#fff' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="solid">
        <DropdownItem key="new" startContent={<NewIcon />}>
          New
        </DropdownItem>
        <DropdownItem key="Favorite" startContent={<Favorite status={false} />}>
          Favorite
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatFiltermenu;
