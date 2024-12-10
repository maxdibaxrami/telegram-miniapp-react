import { Chip, Avatar, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { cloudStorage } from '@telegram-apps/sdk';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const IntroPage = ({ setLanguage, setSlideUnAvailable, setSlideAvailable, user }) => {
  const [isSelected, setIsSelected] = useState(''); // Initialize empty, we'll set this in useEffect
  const { t, i18n } = useTranslation();

  // Function to change language in i18n
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Function to retrieve language from cloud storage
  const GetStoredLanguage = async () => {
    if (cloudStorage.isSupported()) {
      const storedLang = await cloudStorage.getItem('lang');
      return storedLang || ''; // Return empty string if no language is stored
    }
    return '';
  };

  // Function to store selected language in cloud storage
  const StoreLanguage = async (lang) => {
    if (cloudStorage.isSupported()) {
      await cloudStorage.setItem('lang', lang);
    }
  };

  // Effect to load stored language on component mount
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await GetStoredLanguage();
      if (storedLang) {
        setIsSelected(storedLang); // Set the stored language as default
        changeLanguage(storedLang); // Apply the language in i18n
      } else if (user.language) {
        setIsSelected(user.language); // Fallback to user's language if no stored language
        changeLanguage(user.language);
      }
    };

    loadLanguage();
  }, [user.language]); // Run once when the component mounts

  // Effect to handle changes in the selected language
  useEffect(() => {
    if (isSelected) {
      setLanguage();
      changeLanguage(isSelected); // Change the language in i18n
      setSlideAvailable("language", isSelected); // Notify that language is selected
      StoreLanguage(isSelected); // Store selected language in cloud storage
    } else {
      setSlideUnAvailable("language", isSelected); // Handle case when no language is selected
    }
  }, [isSelected]);

  return (
    <div className="flex items-center justify-between h-full px-6 flex-col pt-8 pb-4">
      <div className="pt-16 flex flex-col">
        <p className="text-base font-medium mb-2 text-center">
          {t('Selectlanguageforcontinue')}
        </p>

        <motion.ul
          animate="visible"
          className="container flex gap-2 items-center justify-center flex-wrap"
          initial="hidden"
          variants={container}
        >
          <motion.li className="item" variants={item}>
            <Chip
              avatar={
                <Avatar name="en" size="md" src="https://flagcdn.com/gb.svg" />
              }
              endContent={
                <Checkbox
                  classNames={{ wrapper: "m-0" }}
                  isSelected={isSelected === "en"}
                  radius="full"
                  size="md"
                  onClick={() => setIsSelected("en")}
                />
              }
              size="lg"
              variant="flat"
              onClick={() => setIsSelected("en")}
            >
              English
            </Chip>
          </motion.li>

          <motion.li className="item" variants={item}>
            <Chip
              avatar={
                <Avatar name="ru" size="md" src="https://flagcdn.com/ru.svg" />
              }
              endContent={
                <Checkbox
                  classNames={{ wrapper: "m-0" }}
                  isSelected={isSelected === "ru"}
                  radius="full"
                  size="md"
                  onClick={() => setIsSelected("ru")}
                />
              }
              size="lg"
              variant="flat"
              onClick={() => setIsSelected("ru")}
            >
              Russian
            </Chip>
          </motion.li>

          <motion.li className="item" variants={item}>
            <Chip
              avatar={
                <Avatar name="fa" size="md" src="https://flagcdn.com/ir.svg" />
              }
              endContent={
                <Checkbox
                  classNames={{ wrapper: "m-0" }}
                  isSelected={isSelected === "fa"}
                  radius="full"
                  size="md"
                  onClick={() => setIsSelected("fa")}
                />
              }
              size="lg"
              variant="flat"
              onClick={() => setIsSelected("fa")}
            >
              Farsi
            </Chip>
          </motion.li>

          <motion.li className="item" variants={item}>
            <Chip
              avatar={
                <Avatar name="ar" size="md" src="https://flagcdn.com/sa.svg" />
              }
              endContent={
                <Checkbox
                  classNames={{ wrapper: "m-0" }}
                  isSelected={isSelected === "ar"}
                  radius="full"
                  size="md"
                  onClick={() => setIsSelected("ar")}
                />
              }
              size="lg"
              variant="flat"
              onClick={() => setIsSelected("ar")}
            >
              Arabic
            </Chip>
          </motion.li>
        </motion.ul>
      </div>
    </div>
  );
};

export default IntroPage;
