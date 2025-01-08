import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { FilterButton, NewIcon, Favorite } from "@/Icons/index";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";





const ChatFiltermenu = ({chatOrder, setChatOrder}) => {

  const { t } = useTranslation();

  const selectedValue = useMemo(
    () => Array.from(chatOrder).join(", ").replace(/_/g, ""),
    [chatOrder],
  );

  return (
    <Dropdown
    backdrop="blur">
      <DropdownTrigger>
        <Button aria-label="Filter" variant="flat" color="default" size="sm">
          <FilterButton className="size-5" stroke="#fff" />
          <p className="capitalize font-bold">{selectedValue}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Static Actions" 
        disallowEmptySelection
        selectedKeys={chatOrder}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setChatOrder}
      >
        <DropdownItem key="new" startContent={<NewIcon />}>
          <p className="font-bold">{t("new")}</p>
        </DropdownItem>
        <DropdownItem key="Favorite" startContent={<Favorite status={true} />}>
          <p className="text-warning/70 font-bold">{t("favorite")}</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ChatFiltermenu;
