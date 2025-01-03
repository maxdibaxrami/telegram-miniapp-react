import { Image, User, Button } from "@nextui-org/react";
import { Pagination, Autoplay } from 'swiper/modules';

import {
  VerifyIconFill,
  PerimumIcon,
  EditProfileIcon,
  SettingIcon,
} from "@/Icons/index";

import DataList from "./dataList";
import { Link } from "react-router-dom";
import { Swiper ,SwiperSlide } from "swiper/react";
import { useState } from "react";
import { BASEURL } from "@/constant";

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProfilePage = () => {

  const [slideCountrt, setSlideCounter] = useState<number>(1);

  const { data: user } = useSelector((state: RootState) => state.user);



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
              {[...user.photos].slice().sort((ph1, ph2) => ph1.order - ph2.order).map((_photo, index) => (
                <SwiperSlide key={index}>
                    <Image 
                        alt="Profile hero Image"
                        className="w-full h-full"
                        classNames={{
                            wrapper: "w-full maxcontentimportant",
                        }}
                        
                        loading="lazy"
                        src={`${BASEURL}${_photo.url}`} // dynamic image URL
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
              description={`${user.country} , ${user.city}`}
              name={
              <div className="flex items-center">
                {user.firstName}
                {user.verifiedAccount &&< VerifyIconFill fill="#016fee" className="ml-2 size-6" />}
                {user.premium && <PerimumIcon />}
              </div>
              }
            />
          </div>

          <div className="flex items-center">

            <Button radius="full" variant="shadow" as={Link} to={`/profile-edit`} className="mx-2" isIconOnly color="primary" size="md">
                <EditProfileIcon className="size-5"/>
            </Button> 

            <Button radius="full" variant="shadow" as={Link} to="/setting" isIconOnly color="primary" size="md">
                <SettingIcon className="size-5"/>
            </Button> 

          </div>
        </div>
      </div>

      <DataList user={user}/>
    </div>
  );
};

export default ProfilePage;
