import { Avatar } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import PropTypes from 'prop-types';
import {
  WorkAndStudyIconSolid,
  AboutMeSolid,
  SearchIcon,
  WhyYouAreHereIcon,
  HashtagIcon
} from "@/Icons";
import { Listbox, ListboxSection, ListboxItem, Chip } from "@nextui-org/react"; // Imported components

const ExploreCartData = ({ slideCount, profile, openFooter }) => {
  // Memoize the current slide type based on the slide count
  const currentSlide = useMemo(() => slideCount % 4, [slideCount]);

  // Reusable ProfileCard component for profile details
  const ProfileCard = ({ color, gradient, icon, label, text }) => (
    <motion.div
      className="flex gap-3 mt-1 mb-3"
      initial={{ opacity: 0 }}
      style={{marginLeft:"4px"}}
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
          radius="md"
          icon={icon}
          isBordered
          size="sm"
          classNames={{
            base: gradient,
            icon: "text-white/90",
          }}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-small">{label}</p>
        <p className="text-xs text-default-500">{text}</p>
      </div>
    </motion.div>
  );

  // Profile details to display
  const profileItems = [
    {
      key: 1,
      color: "danger",
      gradient: "bg-gradient-to-br from-[#C20E4D] to-[#F54180]",
      icon: <WorkAndStudyIconSolid className="size-5" />,
      label: "Work and education:",
      text: profile.workAndEducation,
    },
    {
      key: 2,
      color: "primary",
      gradient: "bg-gradient-to-br from-[#338EF7] to-[#004493]",
      icon: <AboutMeSolid className="size-5" />,
      label: "About Me:",
      text: profile.aboutMe,
    },
    {
      key: 3,
      color: "success",
      gradient: "bg-gradient-to-br from-[#0E793C] to-[#17C964]",
      icon: <SearchIcon className="size-5" />,
      label: "Looking for:",
      text: profile.lookingFor,
    },
    {
      key: 0,
      color: "warning",
      gradient: "bg-gradient-to-br from-[#C4841D] to-[#F7B750]",
      icon: <WhyYouAreHereIcon className="size-5" />,
      label: "Why I am here:",
      text: profile.whyHere,
    }
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
                    base:"p-0",
                    list:"px-0"
                  }}
                  style={{ borderRadius: "8px" }}
                  aria-label="Listbox menu with sections"
                  variant="solid"
                >

                  <ListboxSection classNames={{base:"px-0"}} className="relative" title="More about me!">
                    <ListboxItem
                      key="7"
                      isReadOnly
                      description={profile.relationStatus}
                    >
                      Relation status:
                    </ListboxItem>
                    <ListboxItem
                      key="8"
                      isReadOnly
                      description={profile.height}
                    >
                      Height:
                    </ListboxItem>
                    <ListboxItem
                      key="9"
                      isReadOnly
                      description={profile.kids}
                    >
                      Kids:
                    </ListboxItem>
                    <ListboxItem
                      key="10"
                      isReadOnly
                      description={profile.language}
                    >
                      Language:
                    </ListboxItem>
                    <ListboxItem
                      key="11"
                      isReadOnly
                      description={profile.sexuality}
                    >
                      Sexuality:
                    </ListboxItem>
                  </ListboxSection>

                  <ListboxSection className="relative" title="Interesting">
                    <ListboxItem key={"1"} isReadOnly>
                      <div className="flex flex-wrap">
                        {Array.isArray(profile.interests) && profile.interests.length > 0
                          ? profile.interests.map((value, index) => (
                            <Chip
                              key={index}
                              className="m-1"
                              color="success"
                              startContent={<HashtagIcon/>}
                              variant="solid"
                            >
                              {value}
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
    aboutMe: PropTypes.string,
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
};

export default ExploreCartData;
