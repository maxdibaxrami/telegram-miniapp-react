import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useEffect, useRef, useState } from 'react';
import NearByUserModal from "../naerby/NearByModal";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import axios from '@/api/base';
import { BASEURL } from "@/constant";

const ChatProfileSection = () => {
  const childRef = useRef();
  const { t } = useTranslation();
  const [profileDataState, setProfileDataState] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user1 = searchParams.get('user1');
  const user2 = searchParams.get('user2');

  const { data: user } = useSelector((state: RootState) => state.user);

  const fetchProfileData = async () => {
    try {
      const userId = user.id.toString() === user1 ? user1 : user2;
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return null;
    }
  };

  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);
      const data = await fetchProfileData();
      setProfileDataState(data);
      setLoading(false);
    };

    getProfileData(); // Call the async function
  }, []); // Only run once, when the component mounts

  const handleClick = () => {
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.callChildFunction(); // Call the function in the child
    }
  };

  if (loading) {
    return <div>loading....</div>;
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
                color="default"
                radius="full"
                size="md"
                src={`${BASEURL}${profileDataState.photos[0].url}`}
              />
              <div className="flex flex-col ml-2 text-start">
                <span className="text-l text-foreground font-bold">{profileDataState.firstName}</span>
                <span className="text-small bold" style={{ color: "#22c55e" }}>
                  {t("Online")}
                </span>
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
