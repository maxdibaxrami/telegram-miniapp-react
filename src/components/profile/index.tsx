import { Image, User, Divider, Button } from "@nextui-org/react";

import {
  VerifyIcon,
  PerimumIcon,
  EditProfileIcon,
  SettingIcon,
} from "@/Icons/index";

import DataList from "./dataList";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div
      className="w-full h-full pb-16 text-default-700"
      style={{
        maxHeight: "100%",
        height:"100%",
        paddingTop: "4rem",
        padding:"12px",
        marginTop:"4rem",
        marginBottom:"5rem",
        width:"calc( 100vw - 1.5rem )"
      }}
    >
      <div className="flex mb-4 w-full  justify-between items-center">
        <div className="flex w-full flex-col">
          <div className="w-full" >
            <Image
              alt="Profile hero Image"
              className="w-full h-full"
              classNames={{
                wrapper: "w-full maxcontentimportant",
              }}
              
              loading="lazy"
              src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
              style={{
                borderRadius: "20px",
                objectFit: "cover",
                padding: "0px 0px 5px 0px",
                height: "calc(50vh - 4rem)",

              }}
            />
          </div>

          <div className="flex">
            <div className="w-full">
              <Image
                alt="Profile hero Image"
                className="w-full h-full"
                classNames={{
                  wrapper: "w-full maxcontentimportant",
                }}
                src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                style={{
                  objectFit: "cover",
                  borderRadius: "20px",
                  padding: "5px 5px 0px 0px",
                  height: "calc(34vh - 4rem)",
                }}
              />
            </div>
            <div className="w-full">
              <Image
                alt="Profile hero Image"
                className="w-full h-full"
                loading="lazy"
                classNames={{
                  wrapper: "w-full maxcontentimportant",
                }}
                src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                style={{
                  objectFit: "cover",
                  borderRadius: "20px",
                  padding: "5px 0px 0px 5px",
                  height: "calc(34vh - 4rem)",
                  width:"100%"
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex justify-between w-full">
          <div className="flex">
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/?u=a04258114e29026702d",
                className: "hidden",
              }}
              className="mt-2"
              description="moscow, russia"
              name={"Mahdi bahrami , 24"}
            />

            <div className="flex" style={{ marginTop: "7px", marginLeft: "7px" }}>
              <div>
                <VerifyIcon />
              </div>
              <div style={{ marginLeft: "4px" }}>
                <PerimumIcon />
              </div>
            </div>
          </div>

          <div className="flex items-center">

            <Button as={Link} to="/profile-edit" className="text-default-700 mx-2" isIconOnly color="default" style={{borderRadius:"20%"}} size="sm">
                <EditProfileIcon className="size-5"/>
            </Button> 

            <Button as={Link} to="/setting" className="text-default-700" isIconOnly color="default" style={{borderRadius:"20%"}} size="sm">
                <SettingIcon className="size-5"/>
            </Button> 

          </div>
        </div>
      </div>

      <Divider className="my-2" />
      <DataList />
    </div>
  );
};

export default ProfilePage;
