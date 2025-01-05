
import { Button, cn, Image } from "@nextui-org/react";
import { Listbox, ListboxItem, ListboxSection, Chip } from "@nextui-org/react";

import {
  HashtagIcon,
  FireIcon,
  ChatIcon,
  HeartIcon,
  ArrowRight,
  WorkAndStudyIconSolid,
  AboutMeSolid,
  SearchIcon,
  ProfileIcon,
  LikeIcon,
  HeightIcon,
  LanguageIcon,
  SexualityIcon,
  PlusIconRound,
  DrinkStatusIcon,
  KidStatusIcon,
  PetStatusIcon,
  SmokingStatusIcon
} from "@/Icons/index";

import TopBarPages from "@/components/tobBar/index";
import EditProfile from "@/components/profile/editProfile";
import EditIntersting from "@/components/profile/editIntersting";
import { Page } from '@/components/Page.tsx';
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { BASEURL } from "@/constant";
import { useRef, useState } from "react";
import EditMoreAboutMeModal from "@/components/profile/editMoreAboutMe";
import { updateUserPhoto, uploadProfileImage } from "@/features/userSlice";

export default function EditProfilePage() {
  const { t, i18n } = useTranslation();  // Initialize translation hook
  const lp = useLaunchParams();
  const [selectedItem, setSelectedItem] = useState("")
  const [selectedProfileData, setSelectedProfileData] = useState("")
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input
  const childRef = useRef();
  const profileDataModal = useRef()

  const handleClick = (item) => {
    setSelectedItem(item)
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.openModal(); // Call the function in the child
    }
  };

  const handleClickProfileData = (item) => {
    setSelectedProfileData(item)
    if (profileDataModal.current) {
      /* @ts-ignore */
      profileDataModal.current.openModal(); // Call the function in the child
    }
  };
  
    
  const Items = [
    {
      id: "1",
      title: t("Heretodate"),
      description: t("IwanttogoondatesandhaveagoodtimeNolabels"),
      icon: <FireIcon />,
      color: "success" // Valid color
    },
    {
      id: "2",
      title: t("Opentochat"),
      description: t("ImheretochatandseewhereitgoesNopressure"),
      icon: <ChatIcon />,
      color: "warning" // Valid color
    },
    {
      id: "3",
      title: t("Readyforarelationship"),
      description: t("ImlookingforsomethingthatlastsNogames"),
      icon: <HeartIcon fill="#FFF" />,
      color: "danger" // Valid color
    },
  ];

  const RealationStatus = [
    { key: "Single", label: t("Single") },
    { key: "Taken", label: t("Taken") },
    { key: "open", label: t("open") },
    { key: "ratthernotsay", label: t("Irathernotsay") },
  ];

  const languages = [
    { key: "en", label: t("en") },
    { key: "zh", label: t("zh") },
    { key: "es", label: t("es") },
    { key: "hi", label: t("hi") },
    { key: "ar", label: t("ar") },
    { key: "bn", label: t("bn") },
    { key: "fr", label: t("fr") },
    { key: "ru", label: t("ru") },
    { key: "pt", label: t("pt") },
    { key: "id", label: t("id") },
    { key: "ja", label: t("ja") },
    { key: "de", label: t("de") },
    { key: "pa", label: t("pa") },
    { key: "ur", label: t("ur") },
    { key: "ko", label: t("ko") },
    { key: "vi", label: t("vi") },
    { key: "fa", label: t("fa") },
    { key: "tr", label: t("tr") },
    { key: "ta", label: t("ta") },
    { key: "it", label: t("it") },
  ];

  const SexualityStatus = [
    { key: "straight", label: t("straight") },
    { key: "gay", label: t("gay") },
    { key: "lesbian", label: t("lesbian") },
    { key: "bisexual", label: t("bisexual") },
    { key: "asexual", label: t("asexual") },
    { key: "pansexual", label: t("pansexual") },
    { key: "queer", label: t("queer") },
    { key: "questioning", label: t("questioning") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];

  const hobbies = [
    { id: 1, name: t("Hiking") },
    { id: 2, name: t("Cooking") },
    { id: 3, name: t("Traveling") },
    { id: 4, name: t("Guitar") },
    { id: 5, name: t("Photography") },
    { id: 6, name: t("Yoga") },
    { id: 7, name: t("Painting") },
    { id: 8, name: t("Reading") },
    { id: 9, name: t("Running") },
    { id: 10, name: t("Meditation") },
    { id: 11, name: t("Cycling") },
    { id: 12, name: t("Surfing") },
    { id: 13, name: t("Gardening") },
    { id: 14, name: t("Fishing") },
    { id: 15, name: t("Rock Climbing") },
    { id: 16, name: t("Dancing") },
    { id: 17, name: t("Gaming") },
    { id: 18, name: t("Blogging") },
    { id: 19, name: t("Swimming") },
    { id: 20, name: t("Martial Arts") },
    { id: 21, name: t("Bird Watching") },
    { id: 22, name: t("Karaoke") },
    { id: 23, name: t("Skateboarding") },
    { id: 24, name: t("Board Games") },
    { id: 25, name: t("Archery") },
    { id: 26, name: t("Skydiving") },
    { id: 27, name: t("Scuba Diving") },
    { id: 28, name: t("Tennis") },
    { id: 29, name: t("Soccer") },
    { id: 30, name: t("Basketball") },
    { id: 31, name: t("Golf") },
    { id: 32, name: t("Skiing") },
    { id: 33, name: t("Snowboarding") },
    { id: 34, name: t("Bowling") },
    { id: 35, name: t("Wine Tasting") },
    { id: 36, name: t("Baking") },
    { id: 37, name: t("Knitting") },
    { id: 38, name: t("Sewing") },
    { id: 39, name: t("Pottery") },
    { id: 40, name: t("Astronomy") },
    { id: 41, name: t("Camping") },
    { id: 42, name: t("Woodworking") },
    { id: 43, name: t("Volunteering") },
    { id: 44, name: t("Writing") },
    { id: 45, name: t("Poetry") },
    { id: 46, name: t("Journaling") },
    { id: 47, name: t("Calligraphy") },
    { id: 48, name: t("Magic Tricks") },
    { id: 49, name: t("Stand-up Comedy") },
    { id: 50, name: t("Cosplay") },
    { id: 51, name: t("Tattoo Design") },
    { id: 52, name: t("Origami") },
    { id: 53, name: t("Chess") },
    { id: 54, name: t("Vegan Cooking") },
    { id: 55, name: t("Collecting Antiques") },
    { id: 56, name: t("Fencing") },
    { id: 57, name: t("Parkour") },
    { id: 58, name: t("Beekeeping") },
    { id: 59, name: t("Leather Crafting") },
    { id: 60, name: t("Mixology") },
    { id: 61, name: t("Ice Skating") },
    { id: 62, name: t("Puzzles") },
    { id: 63, name: t("Robotics") },
    { id: 64, name: t("Virtual Reality") },
    { id: 65, name: t("Home Brewing") },
    { id: 66, name: t("Carpentry") },
    { id: 67, name: t("Flower Arranging") },
    { id: 68, name: t("Metalworking") },
    { id: 69, name: t("Jewelry Making") },
    { id: 70, name: t("Animal Rescue") },
    { id: 71, name: t("Pilates") },
    { id: 72, name: t("Kayaking") },
    { id: 73, name: t("Bungee Jumping") },
    { id: 74, name: t("Running Marathons") },
    { id: 75, name: t("Dog Training") },
    { id: 76, name: t("Horseback Riding") },
    { id: 77, name: t("Sailing") },
    { id: 78, name: t("Stand-up Paddleboarding") },
    { id: 79, name: t("Weightlifting") },
    { id: 80, name: t("Bodybuilding") },
    { id: 81, name: t("Competitive Gaming") },
    { id: 82, name: t("Podcasting") },
    { id: 83, name: t("Vlogging") },
    { id: 84, name: t("Street Art") },
    { id: 85, name: t("Historical Reenactments") },
    { id: 86, name: t("Geocaching") },
    { id: 87, name: t("Hiking with Dogs") },
    { id: 88, name: t("DIY Projects") },
    { id: 89, name: t("Car Restoration") },
    { id: 90, name: t("Motorcycling") },
    { id: 91, name: t("4x4 Off-roading") },
    { id: 92, name: t("Mountain Biking") },
    { id: 93, name: t("Frisbee Golf") },
    { id: 94, name: t("LARPing") },
    { id: 95, name: t("Drone Racing") },
    { id: 96, name: t("Rollerblading") },
    { id: 97, name: t("Escape Rooms") },
    { id: 98, name: t("Trivia Nights") },
    { id: 99, name: t("Kite Surfing") },
    { id: 100, name: t("Astronaut Training") }
  ];

  const PetStatus = [
    { key: "has_pets", label: t("has_pets") },
    { key: "no_pets", label: t("no_pets") },
    { key: "likes_pets", label: t("likes_pets") },
    { key: "does_not_like_pets", label: t("does_not_like_pets") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];

  const DrinkStatus = [
    { key: "drinks_regularly", label: t("drinks_regularly") },
    { key: "occasionally_drinks", label: t("occasionally_drinks") },
    { key: "does_not_drink", label: t("does_not_drink") },
    { key: "trying_to_quit_drinking", label: t("trying_to_quit_drinking") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];

  const SmokingStatus = [
    { key: "smokes_regularly", label: t("smokes_regularly") },
    { key: "occasionally_smokes", label: t("occasionally_smokes") },
    { key: "does_not_smoke", label: t("does_not_smoke") },
    { key: "trying_to_quit_smoking", label: t("trying_to_quit_smoking") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];

  const KidStatus = [
    { key: "has_kids", label: t("has_kids") },
    { key: "no_kids", label: t("no_kids") },
    { key: "wants_kids", label: t("wants_kids") },
    { key: "does_not_want_kids", label: t("does_not_want_kids") },
    { key: "open_to_kids", label: t("open_to_kids") },
    { key: "ratthernotsay", label: t("Irathernotsay") },

  ];


  const { data: user, updateUserData } = useSelector((state: RootState) => state.user);

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '50px'  // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return '25px' // Default padding
    }
  };


  const handleFileSelect = (callback: (file: File) => void) => {
    // This will trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          callback(file); // Call the provided callback with the selected file
        }
      };
      fileInputRef.current.click();
    }
  };


  const handleUpdatePhoto = (photo: any) => {
    handleFileSelect((photoFile) => {
      dispatch(updateUserPhoto({ userId: photo, photoFile }));
    });
  };

  const handleUploadPhoto = (order: number) => {
    handleFileSelect((photoFile) => {
      dispatch(uploadProfileImage({ userId: user.id.toString(), imageFile: photoFile, order }));
    });
  };

  return (
    <Page>
        <div
        className="container mx-auto max-w-7xl flex-grow"
      >
        <TopBarPages />
        <section
          className="flex flex-col items-center justify-center gap-4"
          style={{paddingTop:`calc(5rem + ${getPaddingForPlatform()})`}}  
        >
        <div style={{paddingLeft:"1.5rem", paddingRight:"1.5rem" }} className="flex mb-4 w-full justify-between items-center">
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />

          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {user.photos
              .slice()
              .sort((ph1, ph2) => ph1.order - ph2.order)
              .map((photo, index) => {
                return (
                  <div
                    key={photo.id}
                    className={imageClasses[index]}
                    onClick={() => handleUpdatePhoto(photo.id)} // Update photo when clicked
                  >
                    <Image
                      src={`${BASEURL}${photo.url}`}
                      alt={`Image ${index}`}
                      classNames={{
                        img: 'aspect-square',
                        wrapper: 'aspect-square',
                      }}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                );
              })}
            {[...Array(6 - user.photos.length)].map((_, index) => {
              return (
                <div
                  key={user.photos.length + index}
                  className={imageClasses[user.photos.length + index]}
                >
                  <Button onPress={() => handleUploadPhoto(user.photos.length + index)} className="aspect-square rounded-lg object-cover w-full h-full" isIconOnly aria-label="Like" color="default">
                    <PlusIconRound className="size-8"/>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

          <div className="px-6 w-full mb-4">
            <div className="text-default-600 w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
              <Listbox aria-label="Listbox menu with sections" variant="solid">
                <ListboxSection                   
                  classNames={{"heading":"font-bold"}} 
                  showDivider 
                  className="relative" 
                  title={t("profile")}>
                    <ListboxItem
                      key="1"
                      onPress={()=> handleClickProfileData("name")}
                      description={`${user.firstName}`}
                      startContent={<IconWrapper className="bg-default/30 text-foreground/80"><ProfileIcon className="size-5" /></IconWrapper>}
                      endContent={
                        <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                      }
                    >
                      {t('name')}
                    </ListboxItem>
                    
                  <ListboxItem
                    key="2"
                    onPress={()=> handleClickProfileData("Workandeducation")}
                    description={user.profileData.education}
                    startContent={<IconWrapper className="bg-default/30 text-foreground/80"><WorkAndStudyIconSolid className="size-5"/></IconWrapper>}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
                  >
                    {t('Workandeducation')}
                  </ListboxItem>

                  <ListboxItem
                    key="3"
                    onPress={()=> handleClickProfileData("WhyIamhere")}
                    description={Items.find(item => item.id == user.profileData.lookingFor).title}
                    startContent={<IconWrapper className="bg-default/30 text-foreground/80"><SearchIcon className="size-5"/></IconWrapper>}

                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
                  >
                    {t("WhyIamhere")}
                  </ListboxItem>

                  <ListboxItem
                    key="4"
                    onPress={()=> handleClickProfileData("Bio")}
                    description={user.profileData.bio}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
                    startContent={<IconWrapper className="bg-default/30 text-foreground/80"><AboutMeSolid className="size-5"/></IconWrapper>}
                  >
                     {t("Bio")}
                    
                  </ListboxItem>

                </ListboxSection>
                <ListboxSection 
                  classNames={{"heading":"font-bold"}} 
                  className="relative" 
                  title={t("more_about_me")}   
                >


                  <ListboxItem
                    key="7"
                    onPress={()=> handleClick("RealationStatus")}
                    description={RealationStatus.find(RealationStatus => RealationStatus.key === user.moreAboutMe.relationStatus).label}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                    description={`${user.moreAboutMe.height} cm`}
                    onPress={()=> handleClick("height")}

                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                     onPress={()=> handleClick("languages")}
                     description={`${user.moreAboutMe.languages.map((value)=> languages.find(languages => languages.key === value).label)}`}
                     endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                    onPress={()=> handleClick("SexualityStatus")}
                    description={SexualityStatus.find(SexualityStatus => SexualityStatus.key === user.moreAboutMe.sexuality).label}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                    onPress={()=> handleClick("kids")}
                    description={KidStatus.find(KidStatus => KidStatus.key === user.moreAboutMe.kids).label}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                    onPress={()=> handleClick("smoking")}
                    description={SmokingStatus.find(SmokingStatus => SmokingStatus.key === user.moreAboutMe.smoking).label}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                    onPress={()=> handleClick("drink")}
                    description={DrinkStatus.find(DrinkStatus => DrinkStatus.key === user.moreAboutMe.drink).label}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                    onPress={()=> handleClick("pets")}
                    description={PetStatus.find(PetStatus => PetStatus.key === user.moreAboutMe.pets).label}
                    endContent={
                      <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
                    }
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
                   endContent={<ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>}
                   >
                    
                  <EditIntersting user={user}>
                      {user.interests.map((value, index) => {
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
                        
                  </EditIntersting>

                    
                  </ListboxItem>
                </ListboxSection>
              </Listbox>
            </div>
          </div>
        </section>
      </div>
      <EditProfile loading={updateUserData} selectedItem={selectedProfileData} user={user} ref={profileDataModal}/>
      <EditMoreAboutMeModal loading={updateUserData} selectedItem={selectedItem} user={user} ref={childRef}/>
    </Page>
  );
}


const imageClasses = [
  "col-span-2 aspect-square row-span-2", // Index 0
  "col-start-3 aspect-square",           // Index 1
  "col-start-3 row-start-2 aspect-square", // Index 2
  "row-start-3 aspect-square",           // Index 3
  "row-start-3 aspect-square",           // Index 4
  "row-start-3 aspect-square"            // Index 5
];

export const IconWrapper = ({children, className}) => (
  <div style={{borderRadius:"50%"}} className={cn(className, "flex items-center rounded-small justify-center p-2")}>
    {children}
  </div>
);