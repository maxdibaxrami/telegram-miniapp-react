import { Listbox, ListboxItem, CircularProgress, Chip, cn } from "@nextui-org/react";
import { ProfileIcon, LikeIcon, ViewIcon, PerimumIcon, FirendsIcon, ArrowRight } from "@/Icons/index";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SparklesStarText } from "../animate/star-sparkles";
import { SparklesCustomIconText } from "../animate/user-sparkles";

const DataList = ({user}) => {
  const { t, i18n } = useTranslation();  // Initialize translation hook
  const [persent, setPersent] = useState(0)
  const CompiliteProfilePersent = () => {
    let validDataCount = 0;
    for (let key in user) {
        if (user[key] !== null && user[key] !== false && user[key] !== "") {
            validDataCount++;
        }
    }
    setPersent(validDataCount)
  }
  const { data } = useSelector((state: RootState) => state.like);  // Assuming the like slice is in state.like

  useEffect(CompiliteProfilePersent ,[])

  return (
    <div className="w-full mt-3 text-default-700 bg-neutral/10 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox aria-label={t('listbox_aria_label')} variant="solid">

        <ListboxItem
          key="invite_your_friend"
          href={"/#/add-firends"}
          showDivider
          description={t("Inviteyourfriendsandgetapremiumaccount")}
          className="px-0"
          startContent={
            <IconWrapper className="bg-default/40 text-primary/70">
                  <SparklesCustomIconText
                    colors={{ first: "#21b6a8", second: "#ff4b61" }}
                    sparklesCount={5} // Initial number of hearts
                    text={  
                        <FirendsIcon className="size-5"/>
                    }
                  />  
            </IconWrapper>
          }
          endContent={
            <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
          }
        >
          {t('invite_your_friend')}
        </ListboxItem>

      <ListboxItem
          key="premium_account"
          showDivider
          description={t("Tounlockallfeatures,youneedapremiumaccount.")}
          className="px-0"
          startContent={
            <IconWrapper className="bg-default/40 text-primary/70">
              <SparklesStarText
                    colors={{ first: "#fffe00", second: "#f5a525" }}
                    sparklesCount={5} // Initial number of hearts
                    text={  
                        <PerimumIcon className="size-5"/>
                    }
                  />  
            </IconWrapper>
          }

          endContent={
            <ArrowRight style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}/>
          }
        >
          {t('premium_account')}
        </ListboxItem>




        <ListboxItem
          key="edit_profile"
          showDivider
          href={"/#/profile-edit"}
          description={t('edit_profile')}
          className="px-0"
          endContent={
            <CircularProgress
              aria-label={t('loading')}
              color="success"
              showValueLabel={true}
              size="md"
              value={persent}
            />
          }
          
          startContent={
            <IconWrapper className="bg-default/40 text-success/70">
              <ProfileIcon className="size-5" />
            </IconWrapper>
          }
        >
          {t('profile')}
        </ListboxItem>

        <ListboxItem
          key="see_likes"
          href={"/#/main?page=likes"}
          showDivider
          description={t('see_likes')}
          className="px-0"
          endContent={<Chip color="danger">{data && data.length}</Chip>}
          startContent={
            <IconWrapper className="bg-default/40 text-danger/80">
              <LikeIcon className="size-5" />
            </IconWrapper>
          }
        >
          {t('who_like_you')}
        </ListboxItem>
        <ListboxItem
          key="see_views"
          description={t('see_views')}
          href={"/#/profile-view"}
          className="px-0"
          endContent={<Chip color="secondary">{user && user.profileViews.length}</Chip>}
          startContent={
            <IconWrapper className="bg-default/40 text-secondary/80">
              <ViewIcon className="size-5" />
            </IconWrapper>
          }
        >
          {t('who_viewed_profile')}
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default DataList;


export const IconWrapper = ({children, className}) => (
  <div style={{borderRadius:"50%"}} className={cn(className, "flex items-center rounded-small justify-center p-2")}>
    {children}
  </div>
);