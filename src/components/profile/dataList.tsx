import { Listbox, ListboxItem, CircularProgress, Chip } from "@nextui-org/react";
import { ProfileIcon, FlashIcon, LikeIcon, ViewIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

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

  useEffect(CompiliteProfilePersent ,[])

  return (
    <div className="w-full text-default-700 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
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
          startContent={<ProfileIcon className="size-7" />}
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
              color="success"
              showValueLabel={true}
              size="lg"
              value={user.activityScore}
            />
          }
          startContent={<FlashIcon className="size-7" />}
        >
          {t('activity')}
        </ListboxItem>
        <ListboxItem
          key="edit"
          showDivider
          description={t('see_likes')}
          endContent={<Chip>22</Chip>}
          startContent={<LikeIcon className="size-7" />}
        >
          {t('who_like_you')}
        </ListboxItem>
        <ListboxItem
          key="delete"
          description={t('see_views')}
          endContent={<Chip>33</Chip>}
          startContent={<ViewIcon />}
        >
          {t('who_viewed_profile')}
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default DataList;
