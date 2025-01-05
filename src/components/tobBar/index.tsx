import {
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { useLocation, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import NearByFilter from "../naerby/NearByFilter";
import ExploreFilter from "../explore/exploreFilter";
import { useLaunchParams } from '@telegram-apps/sdk-react';

import {
  FireIcon,
  ChatIcon,
  ProfileIcon,
  LikeIcon,
  LocationIcon,
  SettingIcon,
  EditProfileIcon
} from '@/Icons/index'
import { useTranslation } from 'react-i18next';
import BoxReveal from "../animate/box-text";

interface ExploreFilterRef {
  openModal: () => void;
  closeModal: () => void;
}

const TopBar = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const lp = useLaunchParams();

  const childRef = useRef<ExploreFilterRef>(null);
  const childRefExplore = useRef<ExploreFilterRef>(null);

  console.log(location)

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      return '50px';
    } else {
      return '25px';
    }
  };

  return (
    <>
      <Navbar
        className="top-0 fixed text-default-600 z-50"
        style={{ paddingTop: `${getPaddingForPlatform()}` }}
      >
        <NavbarContent justify="start">
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarItem className="flex items-center">
            {searchParams.get("page") === "profile" && 
              <BoxReveal boxColor={"#5046e6"} duration={0.2}>
                <ProfileIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Profile')}
                </p>
              </BoxReveal>
            }

            {searchParams.get("page") === "explore" && 
              <BoxReveal boxColor={"#5046e6"} duration={0.2}>
                <FireIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Explore')}
                </p>
              </BoxReveal>
            }

            {searchParams.get("page") === "nearby" && 
              <BoxReveal boxColor={"#5046e6"} duration={0.2}>
                <LocationIcon className="size-6 text-primary"/>
                  <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                    {t('Nearby')}
                  </p>
              </BoxReveal>
            }

            {searchParams.get("page") === "likes" && 
              <BoxReveal boxColor={"#5046e6"} duration={0.2}>
                <LikeIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Likes')}
                </p>
              </BoxReveal>
            }

            {searchParams.get("page") === "chat" && 
              <BoxReveal boxColor={"#5046e6"} duration={0.2}>
                <ChatIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Chat')}
                </p>
              </BoxReveal>
            }

            {location.pathname === "/setting" && 
              <BoxReveal boxColor={"#5046e6"} duration={0.2}>
                <SettingIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Setting')}
                </p>
              </BoxReveal>
            }

            {location.pathname === "/profile-edit" && 
              <BoxReveal boxColor={"#5046e6"} duration={0.2}>
                <EditProfileIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('EditProfile')}
                </p>
              </BoxReveal>
            }
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
        </NavbarContent>
      </Navbar>

      <NearByFilter ref={childRef} />
      <ExploreFilter ref={childRefExplore} />
    </>
  );
};

export default TopBar;
