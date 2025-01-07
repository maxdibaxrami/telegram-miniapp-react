
import "swiper/css";
import "swiper/css/effect-creative";

import { Button, cn, Image } from "@nextui-org/react";
import { Listbox, ListboxItem, ListboxSection, Chip } from "@nextui-org/react";
import {
  HashtagIcon,
  WorkAndStudyIconSolid,
  AboutMeSolid,
  SearchIcon,
  LikeIcon,
  HeightIcon,
  LanguageIcon,
  SexualityIcon,
  DrinkStatusIcon,
  KidStatusIcon,
  PetStatusIcon,
  SmokingStatusIcon,
  PerimumIcon,
  VerifyIconFill,
  Favorite
} from "@/Icons/index";

import TopBarPages from "@/components/tobBar/index";
import { Page } from '@/components/Page.tsx';
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { BASEURL, getDrinkStatus, gethobbies, getKidStatus, getlanguages, getlookingfor, getPetStatus, getRealationStatus, getSexualityStatus, getSmokingStatus } from "@/constant";
import { useEffect, useState } from "react";
import { fetchUserDataId, updateUserData } from "@/features/userSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';
import { useSearchParams } from "react-router-dom";

export default function EditProfilePage() {
  
  const { t } = useTranslation();  // Initialize translation hook
  const lp = useLaunchParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { data: user , userPageData : UserData , userPageLoading : LoadingUser } = useSelector((state: RootState) => state.user);

  const userId = searchParams.get("userId")

  const [slideCountrt, setSlideCounter] = useState<number>(1);


  const lookingfor = getlookingfor(t)
  const RealationStatus = getRealationStatus(t)
  const languages = getlanguages(t)
  const SexualityStatus = getSexualityStatus(t)
  const hobbies = gethobbies(t)
  const PetStatus = getPetStatus(t)
  const DrinkStatus = getDrinkStatus(t)
  const SmokingStatus = getSmokingStatus(t)
  const KidStatus = getKidStatus(t)


  useEffect(()=> {
    if(userId){
      dispatch(fetchUserDataId(userId))
    }
  } ,[userId])

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '50px'  // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return '25px' // Default padding
    }
  };

   const HandleAddToFavorite = async (value) => {
      await dispatch(updateUserData({
        userId: user.id.toString(),
        updatedData: {
          favoriteUsers: Array.isArray(user.favoriteUsers) ? [...user.favoriteUsers, value.toString()] : [value]  // Ensure favoriteUsers is an array
        }
      }));
    };
  
    const HandleRemoveFromFavorite = async (value) => {
      await dispatch(updateUserData({
        userId: user.id.toString(),
        updatedData: {
          favoriteUsers: Array.isArray(user.favoriteUsers)
            ? user.favoriteUsers.filter(favorite => favorite != value)  // Remove the user with the matching id
            : []  // If favoriteUsers is not an array, set it to an empty array
        }
      }));
    };



    useEffect(()=>{console.log(user)},[user])


  if(LoadingUser){
    return <div>loading</div>
  }
  if(userId === "")
  {
    return <div>not found</div>
  }
  return (
    <Page>
        <div
        className="container mx-auto max-w-7xl flex-grow"
      >
        <TopBarPages />
        <section
          className="flex flex-col items-center justify-center"
          style={{paddingTop:`calc(5rem + ${getPaddingForPlatform()})`}}  
        >
        
            <div className="flex w-full  justify-between items-center">
                <div className="flex w-full relative flex-col">
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
                      {[...UserData.photos].slice().sort((ph1, ph2) => ph1.order - ph2.order).map((_photo, index) => (
                          <SwiperSlide key={index}>
                              <Image 
                                  alt="Profile hero Image"
                                  radius="none"
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
                  
                  <div
                    style={{position:"absolute", bottom:0, zIndex:10, width:"100%", overflow:"hidden"}}
                    className="items-start flex-col py-3 backdrop-blur bg-background/70 backdrop-saturate-150"
                >
                  <div className="flex flex-grow w-full">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between w-full ">
                        <div className="flex items-center p-2">
                          <p className="text-foreground capitalize font-bold  text-xl">
                            {UserData.firstName}, {UserData.age}
                          </p>
                          {UserData.verifiedAccount && <VerifyIconFill fill="#016fee" className="ml-2 size-6"/>}
                          {UserData.premium && <PerimumIcon />}
                        </div>
                        <div className="flex gap-2 px-2 items-center">
                          <Button radius="full" isIconOnly aria-label="Like" color="primary" variant="shadow">
                            <LikeIcon />
                          </Button>
                          {user.favoriteUsers.includes(UserData.id.toString()) ? 
                            <Button onPress={()=> HandleRemoveFromFavorite(UserData.id)} radius="full" isIconOnly color="warning" variant="shadow">
                              <Favorite status={true}/>
                            </Button>
                          : 
                            <Button onPress={() => HandleAddToFavorite(UserData.id)} radius="full" isIconOnly color="warning" variant="shadow">
                               <Favorite status={false}/> 
                            </Button>
                          }

                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                </div>
            </div>
      

          <div className=" w-full mb-4">
            <div className="text-default-600 w-full border-small border-default-200 dark:border-default-100">
              <Listbox 
                aria-label="Listbox menu with sections" 
              >
                <ListboxSection                   
                  classNames={{"heading":"font-bold"}} 
                  showDivider 
                  className="relative" 
                  title={t("profile")}>
                  <ListboxItem
                    key="2"
                    description={UserData.profileData.education}
                    startContent={<IconWrapper className="bg-default/30 text-foreground/80"><WorkAndStudyIconSolid className="size-5"/></IconWrapper>}
                  >
                    {t('Workandeducation')}
                  </ListboxItem>

                  <ListboxItem
                    key="3"
                    description={lookingfor.find(lookingfor => lookingfor.id == user.profileData.lookingFor).title}
                    startContent={<IconWrapper className="bg-default/30 text-foreground/80"><SearchIcon className="size-5"/></IconWrapper>}
                  >
                    {t("WhyIamhere")}
                  </ListboxItem>

                {UserData.profileData.bio === " " &&
                  <ListboxItem
                   key="4"
                   description={UserData.profileData.bio}
                   startContent={<IconWrapper className="bg-default/30 text-foreground/80"><AboutMeSolid className="size-5"/></IconWrapper>}
                  >
                    {t("Bio")}
                   
                 </ListboxItem>
                }
                 

                </ListboxSection>
                <ListboxSection 
                  classNames={{"heading":"font-bold"}} 
                  className="relative" 
                  title={t("more_about_me")}   
                >


                  <ListboxItem
                    key="7"
                    description={RealationStatus.find(RealationStatus => RealationStatus.key === UserData.moreAboutMe.relationStatus).label}
                    startContent={
                      <IconWrapper className="bg-primary/10 text-primary">
                        <LikeIcon className="size-5" />
                      </IconWrapper>
                    }
                  >
                    {t("RealationStatus")}

                  </ListboxItem>

                  <ListboxItem
                   key="8"
                    description={`${UserData.moreAboutMe.height} cm`}
                    startContent={
                      <IconWrapper className="bg-secondary/10 text-secondary">
                        <HeightIcon className="size-5" />
                      </IconWrapper>
                    }
                    >
                    
                    {t("Height")}
                  </ListboxItem>

                  <ListboxItem
                     key="10"
                     description={`${UserData.moreAboutMe.languages.map((value)=> languages.find(languages => languages.key === value).label)}`}
                     startContent={
                       <IconWrapper className="bg-success/10 text-success">
                         <LanguageIcon className="size-5" />
                       </IconWrapper>
                     }

                     >
                    
                    {t("Language")}
                  </ListboxItem>

                  <ListboxItem 
                    key="11" 
                    description={SexualityStatus.find(SexualityStatus => SexualityStatus.key === UserData.moreAboutMe.sexuality).label}
                    startContent={
                      <IconWrapper className="bg-warning/10 text-warning">
                        <SexualityIcon className="size-5" />
                      </IconWrapper>
                    }
                    >
                    
                    {t("SexualityStatus")}

                  </ListboxItem>


                  <ListboxItem 
                    key="12" 
                    description={KidStatus.find(KidStatus => KidStatus.key === UserData.moreAboutMe.kids).label}
                    startContent={
                      <IconWrapper className="bg-primary/10 text-primary">
                        <KidStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    >
                    
                    {t("kids")}

                  </ListboxItem>


                  <ListboxItem 
                    key="13" 
                    description={SmokingStatus.find(SmokingStatus => SmokingStatus.key === UserData.moreAboutMe.smoking).label}
                    startContent={
                      <IconWrapper className="bg-secondary/10 text-secondary">
                        <SmokingStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    >
                    
                    {t("SmokingStatus")}

                  </ListboxItem>


                  <ListboxItem 
                    key="14" 
                    description={DrinkStatus.find(DrinkStatus => DrinkStatus.key === UserData.moreAboutMe.drink).label}
                    startContent={
                      <IconWrapper className="bg-danger/10 text-danger">
                        <DrinkStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    >
                    
                    {t("DrinkStatus")}

                  </ListboxItem>

                  <ListboxItem 
                    key="15" 
                    description={PetStatus.find(PetStatus => PetStatus.key === UserData.moreAboutMe.pets).label}
                    startContent={
                      <IconWrapper className="bg-warning/10 text-warning">
                        <PetStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    >
                    
                    {t("PetStatus")}

                  </ListboxItem>

                  
                </ListboxSection>
                <ListboxSection 
                  classNames={{"heading":"font-bold"}} 
                  className="relative" 
                  title={t("interested")}
                  >
                  <ListboxItem
                   key={111}
                   >
                    
                  <div className="flex flex-wrap">
                    {UserData.interests.map((value, index) => {
                        return (
                          <Chip
                            key={index}
                            className="m-1"
                            color="success"
                            avatar={<HashtagIcon className="size-4"/>}
                            variant="solid"
                          >
                            {hobbies.find(hobbie => hobbie.id == parseInt(value)).name}
                          </Chip>
                        );
                      })}
                        
                  </div>

                    
                  </ListboxItem>
                </ListboxSection>
              </Listbox>
            </div>
          </div>
        </section>
      </div>
 </Page>
  );
}


export const IconWrapper = ({children, className}) => (
  <div style={{borderRadius:"50%"}} className={cn(className, "flex items-center rounded-small justify-center p-2")}>
    {children}
  </div>
);