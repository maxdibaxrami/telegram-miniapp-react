import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { ThemeSwitch } from "./SwitchTheme";

import { useSearchParams } from "react-router-dom";
import {RotateWords} from '@/components/animate/rotate-words'
import { useRef } from "react";
import NearByFilter from "../naerby/NearByFilter";
import { FitlerIcon } from "@/Icons";
import ExploreFilter from "../explore/exploreFilter";

import { useLaunchParams } from '@telegram-apps/sdk-react';

interface ExploreFilterRef {
  openModal: () => void;
  closeModal: () => void;
}


const TopBar = () => {
  const [searchParams] = useSearchParams();
  const lp = useLaunchParams()

  return (
  <>
    <Navbar
      className="top-0 fixed text-default-600 z-50"
      style={{paddingTop:`${['macos', 'ios'].includes(lp.platform) ? '44px' : '0px'}` }}
    >

      <NavbarContent style={{gap:0}} justify="end">
        <NavbarItem className="flex items-center">
          <RotateWords words={"Moll Moll"} />  
        </NavbarItem>
      </NavbarContent>
      <NavbarContent style={{gap:0}} justify="start">
        <NavbarItem className="flex items-center">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </>
  );
};

export default TopBar;
