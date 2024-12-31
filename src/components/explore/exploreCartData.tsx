import { Avatar } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import PropTypes from 'prop-types';
import {
  WorkAndStudyIconSolid,
  AboutMeSolid,
  SearchIcon,
  WhyYouAreHereIcon,
  HashtagIcon,
  ChatIcon,
  FireIcon,
  HeartIcon
} from "@/Icons";
import { Listbox, ListboxSection, ListboxItem, Chip } from "@nextui-org/react"; // Imported components
import { useTranslation } from "react-i18next";

const ExploreCartData = ({ slideCount, profile, openFooter }) => {
  // Memoize the current slide type based on the slide count
  const currentSlide = useMemo(() => slideCount % 3, [slideCount]);
  const { t } = useTranslation();

  // Reusable ProfileCard component for profile details
  const ProfileCard = ({ color, gradient, icon, label, text }) => (
    <motion.div
      className="flex gap-3 mt-1 mb-3"
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
  );

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
      text: profile.education,
    },
    {
      key: 2,
      color: "primary",
      gradient: "bg-gradient-to-br from-[#338EF7] to-[#004493]",
      icon: <AboutMeSolid className="size-6" />,
      label: `${t("Bio")}:`,
      text: profile.bio,
    },
    {
      key: 3,
      color: "success",
      gradient: "bg-gradient-to-br from-[#0E793C] to-[#17C964]",
      icon: <SearchIcon className="size-6" />,
      label: t("lookingFor"),
      text: Items.find(item => item.id == profile.lookingFor).title,
    }
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
                gradient={item.gradient}
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
                    description={RealationStatus.find(RealationStatus => RealationStatus.key === profile.relationStatus).label}
                  >
                    {t("relationStatus")}
                  </ListboxItem>
                  <ListboxItem
                    key="8"
                    isReadOnly
                    description={`${profile.height} cm`}
                  >
                    {t("height")}
                  </ListboxItem>
                  <ListboxItem
                    key="10"
                    isReadOnly
                    description={profile.languages.map((value)=> languages.find(languages => languages.key === value).label).join(", ")}
                  >                    

                    {t("language")}
                  </ListboxItem>
                  <ListboxItem
                    key="11"
                    isReadOnly
                    description={SexualityStatus.find(SexualityStatus => SexualityStatus.key === profile.sexuality).label}
                  >
                    {t("sexuality")}
                  </ListboxItem>
                </ListboxSection>

                <ListboxSection className="relative" title={t("interests")}>
                  <ListboxItem key={"1"} isReadOnly>
                    <div className="flex flex-wrap">
                      {Array.isArray(profile.interests) && profile.interests.length > 0
                        ? profile.interests.map((value, index) => (
                            <Chip
                              key={index}
                              className="m-1"
                              color="success"
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
            gradient={profileItems[currentSlide].gradient}
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
