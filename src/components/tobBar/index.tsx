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
import { useLaunchParams} from '@telegram-apps/sdk-react';

interface ExploreFilterRef {
  openModal: () => void;
  closeModal: () => void;
}


const TopBar = () => {
  const [searchParams] = useSearchParams();
  const lp = useLaunchParams();
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

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '25px' // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return '50px'// Default padding
    }
  };

  return (
  <>
    <Navbar
      className="top-0 fixed text-default-600 z-50"
      style={{paddingTop: `${getPaddingForPlatform()}` }}
    >

      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          <RotateWords words={searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1)} />  
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="start">
        <NavbarItem className="flex items-center">
          <ThemeSwitch />
        </NavbarItem>

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
        
    

      </NavbarContent>
    </Navbar>

    <NearByFilter ref={childRef} />
    <ExploreFilter ref={childRefExplore}/>

    </>
  );
};

export default TopBar;
