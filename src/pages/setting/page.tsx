"use client";

import {
  Listbox,
  ListboxItem,
  Switch,
  cn,
  ListboxSection,
} from "@nextui-org/react";

import {
  LogOutIcon,
  DeleteAcoontIcon,
} from "@/Icons/index";

import TopBarPages from "@/components/tobBar/topBarPages";
import { Page } from "@/components/Page";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";  // Importing useTranslation hook
import LanguageSection from "@/components/setting/LanguageSection";

export default function Setting() {
  const { t } = useTranslation();  // Initialize translation hook
  const { theme, setTheme } = useTheme();
  const lp = useLaunchParams();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      return '50px'; // iOS/macOS specific padding
    } else {
      return '25px'; // Android/base padding
    }
  };

  return (
    <Page>
      <div className="container mx-auto max-w-7xl flex-grow light-background--color">
        <section className="flex flex-col items-center justify-center gap-4 text-default-600">
          <TopBarPages />
          <div style={{paddingTop:`calc(5rem + ${getPaddingForPlatform()})`}} className="w-full h-full px-6 pb-4">            
           <LanguageSection/>
            <Switch
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md items-center",
                  "justify-between cursor-pointer rounded-lg px-2 gap-2 py-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary",
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  "group-data-[selected=true]:ml-6",
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4",
                ),
              }}
              defaultChecked={true}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">{t('profile_visibility')}</p>
                <p className="text-tiny text-default-400">{t('profile_visibility_desc')}</p>
              </div>
            </Switch>

            <Switch
              onChange={onChange}
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md items-center",
                  "justify-between cursor-pointer rounded-lg gap-2 py-4 px-2 border-2 border-transparent",
                  "data-[selected=true]:border-primary",
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  "group-data-[selected=true]:ml-6",
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4",
                ),
              }}
              isSelected={theme === "light" ? true : false}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium capitalize">{t('mode')}</p>
                <p className="text-tiny text-default-400">{t('mode_desc')}</p>
              </div>
            </Switch>

            <div className="w-full mt-2 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
              <Listbox aria-label={t('setting_menu')} variant="solid">
                <ListboxSection title={t('setting')}>
                  <ListboxItem
                    key="delete"
                    className="text-danger"
                    description={t('delete_account_desc')}
                    startContent={<DeleteAcoontIcon />}
                  >
                    {t('delete_account')}
                  </ListboxItem>

                  <ListboxItem
                    key="logout"
                    description={t('logout_desc')}
                    startContent={<LogOutIcon />}
                    href="/#/sign-up"
                  >
                    {t('logout')}
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
