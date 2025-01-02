import { Navbar, NavbarContent, NavbarItem, Skeleton } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useRef } from 'react';
import NearByUserModal from "../naerby/NearByModal";
import { useTranslation } from "react-i18next";

import { BASEURL } from "@/constant";

const ChatProfileSection = ({loading, profileDataState,isUserOnline}) => {
  const childRef = useRef();
  const { t } = useTranslation();
 
  const handleClick = () => {
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.callChildFunction(); // Call the function in the child
    }
  };

  if (loading) {
    return <Navbar>
      <NavbarContent justify="start">
            <NavbarItem className="lg:flex">
              {/* Additional content if needed */}
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="center">
            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2 w-24">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          </NavbarContent>
          <NavbarContent justify="end">
            {/* Additional content if needed */}
          </NavbarContent>
    </Navbar>;
  }

  return (
    <>
      <div>
        <Navbar
          disableAnimation
          className="absolute top-0"
          classNames={{ wrapper: "px-4" }}
          style={{ paddingTop: '47px' }}
        >
          <NavbarContent justify="start">
            <NavbarItem className="lg:flex">
              {/* Additional content if needed */}
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="center">
            <button className="lg:flex flex items-center" onClick={handleClick}>
              <Avatar
                isBordered
                className="mx-2"
                color={isUserOnline? "success" :"primary"}
                radius="full"
                size="md"
                src={`${BASEURL}${profileDataState.photos[0].url}`}
              />
              <div className="flex flex-col ml-2 text-start">
                <span className="text-l text-foreground font-bold">{profileDataState.firstName}</span>
                {isUserOnline ? (
                  <span className="text-small bold" style={{ color: "#22c55e" }}>
                    {t("Online")}
                  </span>
                ) : (
                  <span className="text-small bold text-foreground">
                    {t("offline")}
                  </span>
                )}
                
              </div>
            </button>
          </NavbarContent>
          <NavbarContent justify="end">
            {/* Additional content if needed */}
          </NavbarContent>
        </Navbar>
      </div>
      {profileDataState && <NearByUserModal profile={profileDataState} ref={childRef} />}
    </>
  );
};

export default ChatProfileSection;
