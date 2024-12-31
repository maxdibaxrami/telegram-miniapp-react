import { Listbox, ListboxItem, CircularProgress, Chip, cn } from "@nextui-org/react";
import { ProfileIcon, FlashIcon, LikeIcon, ViewIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const DataList = ({user}) => {
  const { t } = useTranslation();
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
    <div className="w-full mt-3 text-default-700 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox aria-label={t('listbox_aria_label')} variant="solid">
        <ListboxItem
          key="new"
          showDivider
          description={t('edit_profile')}
          endContent={
            <CircularProgress
              aria-label={t('loading')}
              color="primary"
              showValueLabel={true}
              size="lg"
              value={persent}
            />
          }
          startContent={
            <IconWrapper className="bg-default/40 text-primary/70">
              <ProfileIcon className="size-5" />
            </IconWrapper>
          }
        >
          {t('profile')}
        </ListboxItem>
        <ListboxItem
          key="copy"
          showDivider
          description={t('boost_profile')}
          endContent={
            <CircularProgress
              aria-label={t('loading')}
              color="warning"
              showValueLabel={true}
              size="lg"
              value={user.activityScore}
            />
          }
          startContent={
            <IconWrapper className="bg-default/40 text-warning/80">
              <FlashIcon className="size-5" />
            </IconWrapper>
          }
        >
          {t('activity')}
        </ListboxItem>
        <ListboxItem
          key="edit"
          showDivider
          description={t('see_likes')}
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
          key="delete"
          description={t('see_views')}
          endContent={<Chip color="secondary">33</Chip>}
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