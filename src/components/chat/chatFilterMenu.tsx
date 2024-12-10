import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { FilterButton, NewIcon, Favorite } from "@/Icons/index";
import { useTranslation } from "react-i18next";

const ChatFiltermenu = () => {
  const { t } = useTranslation();

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button isIconOnly aria-label="Filter" color="default" size="sm">
          <FilterButton className="size-5" stroke="#fff" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="solid">
        <DropdownItem key="new" startContent={<NewIcon />}>
          {t("new")}
        </DropdownItem>
        <DropdownItem key="Favorite" startContent={<Favorite status={false} />}>
          {t("favorite")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatFiltermenu;
