import { Chip, Avatar, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

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
  const [isSelected, setIsSelected] = useState(user.language);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (isSelected != "") {
      setLanguage();
      changeLanguage(isSelected)
      setSlideAvailable("language",isSelected)
    }else{
      changeLanguage(isSelected)
      setSlideUnAvailable("language",isSelected)
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
                <Avatar name="en" size="md" src="https://flagcdn.com/ru.svg" />
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
                <Avatar name="en" size="md" src="https://flagcdn.com/ir.svg" />
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
