import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { ThemeSwitch } from "./SwitchTheme";

import { useSearchParams } from "react-router-dom";
import {RotateWords} from '@/components/animate/rotate-words'

const TopBar = () => {
  const [searchParams] = useSearchParams();
  
  return (
    <Navbar
      className="top-0 fixed text-default-600"
      
      style={{ height: "4rem" }}
    >
      <NavbarBrand>
          <RotateWords words={searchParams.get("page") !== "randomchat"?searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1) : "Random Chat"} />  
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopBar;
