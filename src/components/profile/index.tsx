import { Image, User, Divider, Button } from "@nextui-org/react";
import { Pagination, Autoplay } from 'swiper/modules';

import {
  VerifyIcon,
  PerimumIcon,
  EditProfileIcon,
  SettingIcon,
} from "@/Icons/index";

import DataList from "./dataList";
import { Link } from "react-router-dom";
import { Swiper ,SwiperSlide } from "swiper/react";
import SwiperImages from "../explore/swiperImage";
import { useState } from "react";

const ProfilePage = () => {

  const NextSlide = () => setSlideCounter(slideCountrt+1)

  const [slideCountrt, setSlideCounter] = useState<number>(1);

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
      <div className="flex mb-1 w-full  justify-between items-center">
        <div className="flex w-full flex-col">
          <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{ clickable: false }}
              navigation={false}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 4000, // 4 seconds delay
                disableOnInteraction: false, // Continue autoplay after user interaction
              }}
              className="mySwiper"
              onSlideChange={() => setSlideCounter(slideCountrt + 1)}
            >
              {[...Array(5)].map((_, index) => (
                <SwiperSlide key={index}>
                    <Image 
                        alt="Profile hero Image"
                        className="w-full h-full"
                        classNames={{
                            wrapper: "w-full maxcontentimportant",
                        }}
                        
                        loading="lazy"
                        src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
                        style={{
                            objectFit: "cover",
                            height:"55vh"
                        }}
                    />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex justify-between w-full">
          <div className="flex">
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/?u=a04258114e29026702d",
                className: "hidden",
                
              }}
              className="mt-2"
              classNames={{
                name:"text-foreground font-bold text-xl",
                description:"text-foreground text-xs"
              }}
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

            <Button as={Link} to="/profile-edit" className="mx-2" isIconOnly color="primary" style={{borderRadius:"20%"}} size="sm">
                <EditProfileIcon className="size-5"/>
            </Button> 

            <Button as={Link} to="/setting" isIconOnly color="primary" style={{borderRadius:"20%"}} size="sm">
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
