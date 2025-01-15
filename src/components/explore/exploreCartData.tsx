import { Avatar, cn } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import PropTypes from 'prop-types';
import {
  WorkAndStudyIconSolid,
  AboutMeSolid,
  HashtagIcon,
  ChatIcon,
  FireIcon,
  HeartIcon,
  DrinkStatusIcon,
  HeightIcon,
  KidStatusIcon,
  LanguageIcon,
  LikeIcon,
  PetStatusIcon,
  SexualityIcon,
  SmokingStatusIcon
} from "@/Icons";
import { Listbox, ListboxSection, ListboxItem, Chip } from "@nextui-org/react"; // Imported components
import { useTranslation } from "react-i18next";
import { getDrinkStatus, gethobbies, getKidStatus, getlanguages, getPetStatus, getRealationStatus, getSexualityStatus, getSmokingStatus } from "@/constant";

const ExploreCartData = ({ slideCount, profile, openFooter }) => {
  // Memoize the current slide type based on the slide count
  

  const { t } = useTranslation();
  
  // Reusable ProfileCard component for profile details
  const ProfileCard = ({ color, icon, label, text }) => {
    return <motion.div
      className="flex gap-3 mt-1"
      initial={openFooter ? { opacity: 1 } : { opacity: 0 }}
      style={{ marginLeft: "4px" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 0.25,
      }}
    >
      <div className="flex items-center justify-center">
        <Avatar
          color={color}
          radius="full"
          icon={icon}
          size="md"
          classNames={{
            icon: "text-white/90 size-6",
          }}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-small font-bold">{label}</p>
        <p className="text-xs text-default-500">{text}</p>
      </div>
    </motion.div>
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

  // Profile details to display
  const profileItems = [
    {
      key: 1,
      color: "danger",
      gradient: "bg-gradient-to-br from-[#C20E4D] to-[#F54180]",
      icon: <WorkAndStudyIconSolid className="size-6" />,
      label: t("workAndEducation"),
      text: profile.profileData.education,
    },
    {
      key: 2,
      color: "primary",
      gradient: "bg-gradient-to-br from-[#338EF7] to-[#004493]",
      icon: <AboutMeSolid className="size-6" />,
      label: `${t("Bio")}:`,
      text: profile.profileData.bio,
    },
    {
      key: 3,
      color: "success",
      gradient: "bg-gradient-to-br from-[#0E793C] to-[#17C964]",
      icon: Items.find(item => item.id == profile.profileData.lookingFor)?.icon,
      label: t("lookingFor"),
      text: Items.find(item => item.id == profile.profileData.lookingFor)?.title,
    }
  ].filter((value) => value.text);
  

  const currentSlide = useMemo(() => slideCount % profileItems.length , [slideCount, profileItems]);


  const RealationStatus = getRealationStatus(t)

  const languages = getlanguages(t)

  const SexualityStatus = getSexualityStatus(t)

  const hobbies = gethobbies(t)


  const PetStatus = getPetStatus(t)

  const DrinkStatus = getDrinkStatus(t)

  const SmokingStatus = getSmokingStatus(t)

  const KidStatus = getKidStatus(t)

  // Render profile information and Listbox when footer is open
  return (
    <div>
      <AnimatePresence>
        {openFooter ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            {profileItems.map(item => (
              <ProfileCard
                key={item.key}
                color={item.color}
                icon={item.icon}
                label={item.label}
                text={item.text}
              />
            ))}

            {/* Listbox component with profile details */}
            
            <motion.div
              className="w-full mb-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "linear",
                duration: 0.25,
              }}
            >
              <Listbox
                className="py-2"
                classNames={{
                  base: "p-0",
                  list: "px-0"
                }}
                style={{ borderRadius: "8px" }}
                aria-label={t("moreAboutMe")}
                variant="solid"
              >

                <ListboxSection classNames={{ base: "px-0" }} className="relative" title={t("moreAboutMe")}>
                  <ListboxItem
                    key="7"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-primary/10 text-primary">
                        <LikeIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={RealationStatus.find(RealationStatus => RealationStatus.key === profile.moreAboutMe.relationStatus).label}
                  >
                    {t("relationStatus")}:
                  </ListboxItem>
                  <ListboxItem
                    key="8"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-secondary/10 text-secondary">
                        <HeightIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={`${profile.moreAboutMe.height} cm`}
                  >
                    {t("height")}:
                  </ListboxItem>
                  <ListboxItem
                    key="10"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-success/10 text-success">
                        <LanguageIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={profile.moreAboutMe.languages.map((value)=> languages.find(languages => languages.key === value).label).join(", ")}
                  >                    

                    {t("language")}:
                  </ListboxItem>
                  <ListboxItem
                    key="11"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-warning/10 text-warning">
                        <SexualityIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={SexualityStatus.find(SexualityStatus => SexualityStatus.key === profile.moreAboutMe.sexuality).label}
                  >
                    {t("sexuality")}:
                  </ListboxItem>

                  <ListboxItem
                    key="12"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-primary/10 text-primary">
                        <KidStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={KidStatus.find(KidStatus => KidStatus.key === profile.moreAboutMe.kids).label}
                  >
                    {t("kids")}:
                  </ListboxItem>

                  <ListboxItem
                    key="13"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-secondary/10 text-secondary">
                        <SmokingStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={SmokingStatus.find(SmokingStatus => SmokingStatus.key === profile.moreAboutMe.smoking).label}
                  >
                    {t("SmokingStatus")}:
                  </ListboxItem>

                  <ListboxItem
                    key="14"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-danger/10 text-danger">
                        <DrinkStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={DrinkStatus.find(DrinkStatus => DrinkStatus.key === profile.moreAboutMe.drink).label}
                  >
                    {t("DrinkStatus")}:
                  </ListboxItem>

                  <ListboxItem
                    key="15"
                    isReadOnly
                    classNames={{"title":"font-medium", "base":"px-0"}}
                    startContent={
                      <IconWrapper className="bg-warning/10 text-warning">
                        <PetStatusIcon className="size-5" />
                      </IconWrapper>
                    }
                    description={PetStatus.find(PetStatus => PetStatus.key === profile.moreAboutMe.pets).label}
                  >
                    {t("PetStatus")}:
                  </ListboxItem>
                </ListboxSection>

                <ListboxSection className="relative" title={t("interests")}>
                  <ListboxItem key={"1"} isReadOnly>
                    <div className="flex flex-wrap">
                      {Array.isArray(profile.interests) && profile.interests.length > 0
                        ? profile.interests.map((value, index) => (
                            <Chip
                              key={index}
                              className="m-1 bg-neutral/40"
                              startContent={<HashtagIcon className="size-4" />}
                              variant="solid"
                            >
                              {hobbies.find(hobbie => hobbie.id == parseInt(value)).name}
                            </Chip>
                          ))
                        : null}
                    </div>
                  </ListboxItem>
                </ListboxSection>
              </Listbox>
            </motion.div>
          </motion.div>
        ) : (
          <ProfileCard
            color={profileItems[currentSlide].color}
            icon={profileItems[currentSlide].icon}
            label={profileItems[currentSlide].label}
            text={profileItems[currentSlide].text}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Define propTypes for validation
ExploreCartData.propTypes = {
  slideCountrt: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    workAndEducation: PropTypes.string,
    bio: PropTypes.string,
    lookingFor: PropTypes.string,
    whyHere: PropTypes.string,
    relationStatus: PropTypes.string,
    height: PropTypes.string,
    kids: PropTypes.string,
    language: PropTypes.string,
    sexuality: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  openFooter: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default ExploreCartData;


export const IconWrapper = ({children, className}) => (
  <div style={{borderRadius:"50%"}} className={cn(className, "flex items-center rounded-small justify-center p-2")}>
    {children}
  </div>
);