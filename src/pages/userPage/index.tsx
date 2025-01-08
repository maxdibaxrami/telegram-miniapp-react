
import "swiper/css";
import "swiper/css/effect-creative";

import { Button, cn, Image, Link, Spinner } from "@nextui-org/react";
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
  CheckIcon,
  FavoriteColor
} from "@/Icons/index";

import TopBarPages from "@/components/tobBar/index";
import { Page } from '@/components/Page.tsx';
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { BASEURL, getDrinkStatus, gethobbies, getKidStatus, getlanguages, getlookingfor, getPetStatus, getRealationStatus, getSexualityStatus, getSmokingStatus } from "@/constant";
import { useEffect, useMemo, useState } from "react";
import { fetchUserDataId, updateUserData } from "@/features/userSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';
import { useSearchParams } from "react-router-dom";
import { fetchMatches } from "@/features/matchSlice";
import { fetchLikesAnotherUser, likeUser } from "@/features/likeSlice";
import MatchModal from "@/components/explore/matchModal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const maxLikes = 5;
  const { t } = useTranslation();  // Initialize translation hook
  const lp = useLaunchParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { data: user, updateUserData:updateUserDataLoading , userPageData : UserData , userPageLoading : LoadingUser } = useSelector((state: RootState) => state.user);
  const { fetchLikeAntoherUser, requestLoading } = useSelector((state: RootState) => state.like);

  const userId = searchParams.get("userId")

  const [slideCountrt, setSlideCounter] = useState<number>(1);
  const [likesCount, setLikesCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedUser, setLikedUser ] = useState(false);
  const lookingfor = getlookingfor(t)
  const RealationStatus = getRealationStatus(t)
  const languages = getlanguages(t)
  const SexualityStatus = getSexualityStatus(t)
  const hobbies = gethobbies(t)
  const PetStatus = getPetStatus(t)
  const DrinkStatus = getDrinkStatus(t)
  const SmokingStatus = getSmokingStatus(t)
  const KidStatus = getKidStatus(t)

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const liked = useMemo(() => {
    if (fetchLikeAntoherUser) {
      return !!fetchLikeAntoherUser.some((like) => like.id === user.id);
    }
    return false;
  }, [fetchLikeAntoherUser, user.id]);

  useEffect(()=> {
    if(userId){
      dispatch(fetchUserDataId(userId))
      dispatch(fetchLikesAnotherUser(userId))
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

  const ToastErrorLikeLimit = (text1,text2,text3,text4) => {
    toast.custom((t) => (
      <div
        style={{zIndex:"999"}}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md backdrop-blur bg-default/70 backdrop-saturate-150 w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center">
            <div className="flex items-center px-0.5">
            <motion.div
                animate={{
                  scale: [1, 1.2, 1.2, 1.2, 1],
                  rotate: [0, 0, 5, -5, 0],
                  borderRadius: ["50%", "50%", "50%", "50%", "50%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >         
                <Button size="lg" radius="full" isIconOnly aria-label="Like" color="default">
                  <PerimumIcon className="size-7"/>
                </Button>
              </motion.div>
            </div>
            <div className="ml-3 px-1 flex-1">
              <p className="text-sm font-bold text-foreground-900">
                {text1}
              </p>
              <p className="mt-1 text-sm text-foreground-500">
                {text2}
              </p>
              <p className="mt-1 text-sm text-foreground-500">
                <Link size="sm" color="warning" href="#" underline="always">
                  {text3}
                </Link>
  
              </p>
              <p>
                <Link size="sm" color="success" href="#" underline="always">
                  {text4}
                </Link>
              </p>
              <div>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    ),{duration: 4000})
  }

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


  const handleLikeUser = async () => {
    if (likesCount >= maxLikes && searchParams.get('page') != "likes")  {
      ToastErrorLikeLimit(<p>{t("Reachedlimit")}</p>,<p>{t("Youhavereachedyourdailylikelimitof5")}</p>,<p>{t("Tounlockallfeatures,youneedapremiumaccount.")}</p>,<p>{t("Inviteyourfriendsandgetapremiumaccount")}</p>)
      return;
    }  

    try {
      // Dispatch the action and unwrap the result
      const resultAction = await dispatch(likeUser({ userId: user.id , likedUserId: parseInt(userId) }));
      
      const newCount = likesCount + 1;
      setLikesCount(newCount);
      setLikedUser(true)

      // @ts-ignore
      localStorage.setItem('likesCountNearBy', newCount);
      // @ts-ignore
      if (resultAction.payload.isMatch === true) {
        openModal()
        dispatch(fetchMatches(user.id.toString()));
        
      }
      
    } catch (error) {
      console.error('Failed to like user:', error);
    }
  };

    useEffect(() => {
      // Check if there's a stored like count and reset date
      const storedLikes = localStorage.getItem('likesCountNearBy');
      const lastReset = localStorage.getItem('lastResetNearBy');
  
      const today = new Date().setHours(0, 0, 0, 0); // Current day midnight
  // @ts-ignore
      if (lastReset < today) {
        // It's a new day, reset the counter

        // @ts-ignore
        localStorage.setItem('likesCountNearBy', 0);
        // @ts-ignore
        localStorage.setItem('lastResetNearBy', today);
        setLikesCount(0);
      } else if (storedLikes) {
        // Set the current like count from storage
        setLikesCount(parseInt(storedLikes, 10));
      }
    }, []);


    const moreAboutMeData = useMemo(()=>{
      if(UserData){
        return [
          {
            key: "relationStatus",
            label: t("RelationStatus"),
            icon: <LikeIcon className="size-5" />,
            value: RealationStatus.find(RealationStatus => RealationStatus.key === UserData.moreAboutMe.relationStatus).label ,
            color:"primary"
          },
          {
            key: "height",
            label: t("Height"),
            icon: <HeightIcon className="size-5" />,
            value: UserData.moreAboutMe.height,
            color:"secondary"
          },
          {
            key: "sexuality",
            label: t("SexualityStatus"),
            icon: <SexualityIcon className="size-5" />,
            value: SexualityStatus.find(SexualityStatus => SexualityStatus.key === UserData.moreAboutMe.sexuality).label,
            color:"success"
          },
          {
            key: "Language",
            label: t("Language"),
            icon: <LanguageIcon className="size-5" />,
            value:`${user.moreAboutMe.languages.map((value)=> languages.find(languages => languages.key === value).label).join(", ")}`,
            color:"primary"
          },
          {
            key: "kids",
            label: t("KidsStatus"),
            icon: <KidStatusIcon className="size-5" />,
            value: KidStatus.find(KidStatus => KidStatus.key === UserData.moreAboutMe.kids).label,
            color:"warning"
          },
          
          {
            key: "smoking",
            label: t("SmokingStatus"),
            icon: <SmokingStatusIcon className="size-5" />,
            value: SmokingStatus.find(SmokingStatus => SmokingStatus.key === UserData.moreAboutMe.smoking).label,
            color:"secondary"
          },
          {
            key: "drink",
            label: t("DrinkStatus"),
            icon: <DrinkStatusIcon className="size-5" />,
            value: DrinkStatus.find(DrinkStatus => DrinkStatus.key === UserData.moreAboutMe.drink).label,
            color:"danger"
          },
          {
            key: "pets",
            label: t("PetStatus"),
            icon: <PetStatusIcon className="size-5" />,
            value: PetStatus.find(PetStatus => PetStatus.key === UserData.moreAboutMe.pets).label,
            color:"warning"
          },
        ];
      }

  

  },[UserData, LoadingUser])


  return (
    <Page>
        <div
          className="container mx-auto max-w-7xl flex-grow"
          style={{
            maxHeight: "100%",
            height:"100%",
            marginBottom:"5rem",
            
          }}
      >
        <TopBarPages />
        {!LoadingUser ? 
                <section
                className="flex flex-col items-center justify-center"
                style={{paddingTop:`calc(4rem + ${getPaddingForPlatform()})`, paddingLeft:"0.75rem",paddingRight:"0.75rem"}}  
              >
              
                  <div className="flex w-full justify-between items-center">
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
                            className="mySwiper rounded-large"
                            onSlideChange={() => setSlideCounter(slideCountrt + 1)}
                            >
                            {[...UserData.photos].slice().sort((ph1, ph2) => ph1.order - ph2.order).map((_photo, index) => (
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
                                            height:"60vh",
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div
                          style={{position:"absolute", bottom:0, zIndex:10, width:"100%", overflow:"hidden",borderBottomRightRadius:"12px",borderBottomLeftRadius:"12px"}}
                          className="items-start flex-col py-3 backdrop-blur bg-background/60 backdrop-saturate-150"
                          >
                            <div className="flex flex-grow w-full">
                              <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between w-full ">
                                  <div className="flex flex-col px-2">
                                    <div className="flex items-center"> 
                                      <p className="text-foreground capitalize font-bold  text-xl">
                                        {UserData.firstName}, {UserData.age}
                                      </p>
                                      {UserData.verifiedAccount && <VerifyIconFill fill="#016fee" className="ml-2 size-6"/>}
                                      {UserData.premium && <PerimumIcon />}
                                    </div>
                                    <div>
                                      <p className="text-tiny">{`${UserData.country}, ${UserData.city}`}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 px-2 items-center">
      
                                    <Button isDisabled={likedUser || liked} isLoading={requestLoading} onPress={handleLikeUser} radius="full" isIconOnly size="lg" color="primary" variant="shadow">
                                      {likedUser || liked ? <CheckIcon strokeWidth={2}/> : <LikeIcon/> }
                                    </Button>
      
                                    {user.favoriteUsers.includes(UserData.id.toString()) ? 
                                      <Button isLoading={updateUserDataLoading} size="lg" onPress={()=> HandleRemoveFromFavorite(UserData.id)} radius="full" isIconOnly color="warning" variant="shadow">
                                        <FavoriteColor stroke={"#FFF"} fill={"#FFF"}/>
                                      </Button>
                                    : 
                                      <Button isLoading={updateUserDataLoading} size="lg" onPress={() => HandleAddToFavorite(UserData.id)} radius="full" isIconOnly color="warning" variant="shadow">
                                        <FavoriteColor stroke={"#c98927"} fill={"#c98927"}/> 
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
                    <div className="mt-2 w-full text-default-700 border-small px-1 rounded-large border-default-200 dark:border-default-100">
                      <Listbox 
                        aria-label="Listbox menu with sections" 
                        variant="solid"
                      >
                        <ListboxSection                   
                          classNames={{"heading":"font-bold"}} 
                          className="relative" 
                          title={t("profile")}>
                          <ListboxItem
                            key="2"
                            className="px-0"
                            description={UserData.profileData.education}
                            startContent={<IconWrapper className="bg-danger text-white p-2"><WorkAndStudyIconSolid className="size-5"/></IconWrapper>}
                          >
                            {t('Workandeducation')}
                          </ListboxItem>
      
                          <ListboxItem
                            key="3"
                            className="px-0"
                            description={lookingfor.find(lookingfor => lookingfor.id == user.profileData.lookingFor).title}
                            startContent={<IconWrapper className="bg-success text-white p-2"><SearchIcon className="size-5"/></IconWrapper>}
                          >
                            {t("WhyIamhere")}
                          </ListboxItem>
      
                        {UserData.profileData.bio === " " &&
                          <ListboxItem
                          key="4"
                          className="px-0"
                          description={UserData.profileData.bio}
                          startContent={<IconWrapper className="bg-primary text-white p-2"><AboutMeSolid className="size-5"/></IconWrapper>}
                          >
                            {t("Bio")}
                          
                        </ListboxItem>
                        }
                        
      
                        </ListboxSection>

                      </Listbox>
                    </div>

                    <div className="mt-2 w-full text-default-700 border-small px-1 rounded-large border-default-200 dark:border-default-100">

                      <Listbox 
                        aria-label="Listbox menu with sections" 
                        variant="solid"
                      >

                        <ListboxSection 
                          classNames={{"heading":"font-bold"}} 
                          className="relative" 
                          title={t("more_about_me")}   
                        >
      
                            {moreAboutMeData.map((item, index)=>{
                              if(item.value === " " || item.value === "" || item.value ===null)
                              {
                                return null
                              }
      
                              return <ListboxItem
                                  key={index+5}
                                  description={item.value}
                                  className="px-0"
                                  startContent={<IconWrapper className={`bg-default/40 p-1.5 text-${item.color}/80`}>{item.icon}</IconWrapper>}
                                  >
                                    {item.label}
                                  
                                </ListboxItem>
                            })}
                            
                        </ListboxSection>
                      </Listbox>
                    </div>

                    <div className="mt-2 w-full text-default-700 border-small px-1 rounded-large border-default-200 dark:border-default-100">

                      <Listbox 
                        aria-label="Listbox menu with sections" 
                        variant="solid"
                      >
                        <ListboxSection 
                            classNames={{"heading":"font-bold"}} 
                            className="relative" 
                            title={t("interested")}
                          >
                          <ListboxItem
                            key={111}
                            className="px-0"
      
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

              :

              <div 
                className="flex flex-col items-center justify-center"
                style={{paddingTop:`calc(4rem + ${getPaddingForPlatform()})`, height:`calc(100vh)`}}  
              >
                <Spinner size="lg" />
              </div>
        }

      </div>

      <MatchModal
        isOpen={isModalOpen}
        modalData={UserData}
        onClose={closeModal}
        thisUserId={user.id}
      />
 </Page>
  );
}


export const IconWrapper = ({children, className}) => (
  <div style={{borderRadius:"50%"}} className={cn(className, "flex items-center rounded-small justify-center")}>
    {children}
  </div>
);



