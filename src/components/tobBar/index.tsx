import {
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { useSearchParams } from "react-router-dom";
import {RotateWords} from '@/components/animate/rotate-words'
import { useRef } from "react";
import NearByFilter from "../naerby/NearByFilter";
import ExploreFilter from "../explore/exploreFilter";
import { useLaunchParams} from '@telegram-apps/sdk-react';

import {
  FireIcon,
  ChatIcon,
  ProfileIcon,
  LikeIcon,
  LocationIcon
} from '@/Icons/index'
import BlurFade from "../animate/BlurFade";

interface ExploreFilterRef {
  openModal: () => void;
  closeModal: () => void;
}


const TopBar = () => {
  const [searchParams] = useSearchParams();
  const lp = useLaunchParams();
  const childRef = useRef<ExploreFilterRef>(null);
  const childRefExplore = useRef<ExploreFilterRef>(null);


  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '50px' // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return '25px'// Default padding
    }
  };

  return (
  <>
    <Navbar
      className="top-0 fixed text-default-600 z-50"
      style={{paddingTop: `${getPaddingForPlatform()}` }}
    >
     <NavbarContent justify="start">
    </NavbarContent>


      <NavbarContent justify="center">
        <NavbarItem className="flex items-center">
        {searchParams.get("page")==="profile" && 
          <BlurFade className="flex items-center">
            <ProfileIcon className="size-6 text-primary"/>
            <p className="font-bold ml-1 text-inherit text-center font-bold tracking-tighter  md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
              {searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1)}
            </p>
          </BlurFade>
          }

        {searchParams.get("page")==="explore" && 
          <BlurFade className="flex items-center">
            <FireIcon className="size-6 text-primary"/>
            <p className="font-bold ml-1 text-inherit text-center font-bold tracking-tighter  md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
              {searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1)}
            </p>
          </BlurFade>
          }

          {searchParams.get("page")==="nearby" && 
          <BlurFade className="flex items-center">
              <LocationIcon className="size-6 text-primary"/>
              <p className="font-bold ml-1 text-inherit text-center font-bold tracking-tighter  md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                {searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1)}
              </p>
            </BlurFade>
          }

        {searchParams.get("page")==="likes" && 
          <BlurFade className="flex items-center">
            <LikeIcon className="size-6 text-primary"/>
            <p className="font-bold ml-1 text-inherit text-center font-bold tracking-tighter  md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
              {searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1)}
            </p>
          </BlurFade>
          }

        {searchParams.get("page")==="chat" && 
          <BlurFade className="flex items-center">
            <ChatIcon className="size-6 text-primary"/>
            <p className="font-bold ml-1 text-inherit text-center font-bold tracking-tighter  md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
              {searchParams.get("page").charAt(0).toUpperCase() + searchParams.get("page").slice(1)}
            </p>
          </BlurFade>
          }

        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
      </NavbarContent>

    </Navbar>

    <NearByFilter ref={childRef} />
    <ExploreFilter ref={childRefExplore}/>

    </>
  );
};

export default TopBar;
