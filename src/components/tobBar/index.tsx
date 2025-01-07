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
  EditProfileIcon,
  VerifyIconFill,
  PerimumIcon
} from '@/Icons/index'
import { useTranslation } from 'react-i18next';
import BlurFade from "../animate/BlurFade";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ExploreFilterRef {
  openModal: () => void;
  closeModal: () => void;
}

const TopBar = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const lp = useLaunchParams();

  const { userPageData : user , userPageLoading : LoadingUser } = useSelector((state: RootState) => state.user);

  
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
              <BlurFade className="flex items-center">
                <ProfileIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Profile')}
                </p>
              </BlurFade>
            }

            {searchParams.get("page") === "explore" && 
              <BlurFade className="flex items-center">
                <FireIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Explore')}
                </p>
              </BlurFade>
            }

            {searchParams.get("page") === "nearby" && 
              <BlurFade className="flex items-center">
                <LocationIcon className="size-6 text-primary"/>
                  <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                    {t('Nearby')}
                  </p>
              </BlurFade>
            }

            {searchParams.get("page") === "likes" && 
              <BlurFade className="flex items-center">
                <LikeIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Likes')}
                </p>
              </BlurFade>
            }

            {searchParams.get("page") === "chat" && 
              <BlurFade className="flex items-center">
                <ChatIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Chat')}
                </p>
              </BlurFade>
            }

            {location.pathname === "/setting" && 
              <BlurFade className="flex items-center">
                <SettingIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('Setting')}
                </p>
              </BlurFade>
            }

            {location.pathname === "/profile-edit" && 
              <BlurFade className="flex items-center">
                <EditProfileIcon className="size-6 text-primary"/>
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {t('EditProfile')}
                </p>
              </BlurFade>
            }

          {location.pathname === "/user" && LoadingUser === false &&
              <BlurFade className="flex items-center">
                <p className="font-bold px-1 mx-1 text-inherit text-center font-bold tracking-tighter md:leading-[4rem] w-fit flex items-center jusitfy-center mx-auto gap-1.5">
                  {user.firstName},
                  {user.age}
                  {user.verifiedAccount &&  <VerifyIconFill fill={"#016fee"} className="size-5"/>  }        
                  {user.premium && <PerimumIcon className="size-5"/>}
                </p>
              </BlurFade>
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
