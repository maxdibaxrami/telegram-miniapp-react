import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { ThemeSwitch } from "./SwitchTheme";

import { useSearchParams } from "react-router-dom";
import {RotateWords} from '@/components/animate/rotate-words'
import { useEffect, useRef } from "react";
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
  const childRef = useRef<ExploreFilterRef>(null);
  const childRefExplore = useRef<ExploreFilterRef>(null);

  const handleOpenModal = () => {
    if (childRef.current) {
        childRef.current?.openModal();
    }
  };
  
  const handleOpenModalExplore = () => {
    if (childRefExplore.current) {
      childRefExplore.current.openModal();
    }
  };

  const lp = useLaunchParams()

  
  
  return (
  <>
    <Navbar
      className="top-0 fixed text-default-600"
      
      style={{ height: ` calc(4rem + ${['macos', 'ios'].includes(lp.platform) ? '44px' : '0px'} )` }}
    >
      <NavbarBrand>
          <RotateWords words={searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1)} />  
      </NavbarBrand>

      <NavbarContent justify="end">
        {searchParams.get("page")==="nearby" && (
          <NavbarItem className="flex items-center">
            <Button variant="solid" className="color-white" onPress={handleOpenModal} isIconOnly color="primary" style={{borderRadius:"20%"}} size="sm" aria-label="Like">
              <FitlerIcon className="size-5"/>
            </Button>  
          </NavbarItem>
        )}
        
        {searchParams.get("page")==="explore" && (
          <NavbarItem className="flex items-center">
            <Button variant="solid" className="color-white" onPress={handleOpenModalExplore} isIconOnly color="primary" style={{borderRadius:"20%"}} size="sm" aria-label="Like">
              <FitlerIcon className="size-5"/>
            </Button>  
          </NavbarItem>
        )}
        
        <NavbarItem className="flex items-center">
          <ThemeSwitch />
        </NavbarItem>

      </NavbarContent>
    </Navbar>

    <NearByFilter ref={childRef} />
    <ExploreFilter ref={childRefExplore}/>

    </>
  );
};

export default TopBar;
