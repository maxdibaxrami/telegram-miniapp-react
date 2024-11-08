import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Chip,
} from "@nextui-org/react";

import { ChatIconSm } from "@/Icons/index";

import {
  FireIcon,
  ChatIcon,
  ProfileIcon,
  RandomChatIcon,
  LikeIcon,
} from "@/Icons/index";

import { useSearchParams } from "react-router-dom";

const TopBar = () => {
  const [searchParams] = useSearchParams();

  
  return (
    <Navbar
      className="top-0 fixed top-0 backdrop-blur	"
      style={{ height: "4rem" }}
    >
      <NavbarBrand>
        {searchParams.get("page") === "explore" && <FireIcon fill="#a594f9" />}
        {searchParams.get("page") === "randomchat" && (
          <RandomChatIcon
            fill="#a594f9"
            stroke={"#000"}
          />
        )}
        {searchParams.get("page") === "chat" && <ChatIcon fill="#a594f9" />}
        {searchParams.get("page") === "likes" && <LikeIcon fill="#a594f9" />}
        {searchParams.get("page") === "profile" && <ProfileIcon fill="#a594f9" />}

        <p className="font-bold ml-1 text-inherit">
          {searchParams.get("page") !== "randomchat"?searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1) : "Random Chat"}
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          {searchParams.get("page") === "nearby" && (
            <Chip
              className="mx-2 text-center background-drop--bluebase---darker backdrop-blur-sm	"
              color="default"
              startContent={<ChatIconSm />}
              variant="flat"
            >
              5
            </Chip>
          )}

        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopBar;
