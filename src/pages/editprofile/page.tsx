
import { Image } from "@nextui-org/react";
import { Listbox, ListboxItem, ListboxSection, Chip } from "@nextui-org/react";

import {
  HashtagIcon,
  AboutMeIcon,
  UserIcon,
  WorkAndStudyIcon,
  WhyYouAreHereIcon,
} from "@/Icons/index";

import TopBarPages from "@/components/tobBar/index";
import EditProfile from "@/components/profile/editProfile";
import EditMoreAboutMe from "@/components/profile/editMoreAboutMe";
import EditIntersting from "@/components/profile/editIntersting";
import { Page } from '@/components/Page.tsx';
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

export default function EditProfilePage() {
  const { t, i18n } = useTranslation();  // Initialize translation hook
  const lp = useLaunchParams();
  
  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '50px'  // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return '25px' // Default padding
    }
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

          <div className="px-6 w-full mb-4">
            <div className="text-default-600 w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
              <Listbox aria-label="Listbox menu with sections" variant="solid">
                <ListboxSection showDivider className="relative" title={t("profile")}>
                  <ListboxItem
                    key="1"
                    description="Moscow, Russia"
                    startContent={<UserIcon />}
                  >
                    mahdi bahrami . 24
                  </ListboxItem>

                  <ListboxItem
                    key="2"
                    description="sechinov university , programmer"
                    startContent={<WorkAndStudyIcon />}
                  >
                    {t("Workandeducation")}
                  </ListboxItem>

                  <ListboxItem
                    key="3"
                    description="just chat"
                    startContent={<WhyYouAreHereIcon />}
                  >
                    {t("WhyIamhere")}
                  </ListboxItem>

                  <ListboxItem
                    key="4"
                    description="jfkksd ojjfnsdjf j fjiwe in fwj jfwe jfiwef wef "
                    startContent={<AboutMeIcon />}
                  >
                     {t("Bio")}
                    
                  </ListboxItem>


                  <ListboxItem
                    key="6"
                    className={`absolute ${i18n.language==="ar" || i18n.language === 'fa'?"left-2":"right-2"}`}
                    style={{
                      top: "-8px",
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <EditProfile />
                  </ListboxItem>
                </ListboxSection>
                <ListboxSection className="relative" title={t("more_about_me")}>
                  <ListboxItem key="7" description="Single ">
                    {t("RealationStatus")}

                  </ListboxItem>

                  <ListboxItem key="8" description="183cm ">
                    
                    {t("Height")}
                  </ListboxItem>

                  <ListboxItem key="10" description="183cm ">
                    
                    {t("Language")}
                  </ListboxItem>
                  <ListboxItem key="11" description="183cm ">
                    
                    {t("SexualityStatus")}

                  </ListboxItem>

                  <ListboxItem
                    key="12"
                    className={`absolute ${i18n.language==="ar" || i18n.language === 'fa'?"left-2":"right-2"}`}
                    style={{
                      top: "-8px",
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <EditMoreAboutMe />
                  </ListboxItem>
                </ListboxSection>
                <ListboxSection className="relative" title={t("interested")}>
                  <ListboxItem key={111}>
                    <div className="flex flex-wrap">
                      {humanInterests.map((value, index) => {
                        return (
                          <Chip
                            key={index}
                            className="m-1"
                            color="success"
                            startContent={<HashtagIcon />}
                            variant="solid"
                          >
                            {value}
                          </Chip>
                        );
                      })}
                    </div>
                  </ListboxItem>
                  <ListboxItem
                    key="13"
                    className={`absolute ${i18n.language==="ar" || i18n.language === 'fa'?"left-2":"right-2"}`}
                    
                    style={{
                      top: "-8px",
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <EditIntersting />
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

const humanInterests = [
  "Space Exploration",
  "Artificial Intelligence",
  "Quantum Computing",
  "Ancient Civilizations",
  "Psychology of Dreams",
  "Human Evolution",
  "Environmental Sustainability",
  "Cognitive Science",
  "Neuroscience of Emotions",
  "Cultural Anthropology",
  "Philosophy of Mind",
  "Genetic Engineering",
  "Virtual Reality",
  "Ethical Dilemmas",
  "Music and Sound Perception",
];
