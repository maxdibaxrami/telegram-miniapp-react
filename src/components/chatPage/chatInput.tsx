import React from "react";
import { Textarea, Button } from "@nextui-org/react";

import { SendIcon, PhotoIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";

const ChatInput = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { t, i18n } = useTranslation();

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className="flex right-0 items-center justify-between"
      style={{ width: "100%", left: "50%"}}
    >
      <Textarea
        className="w-full"
        endContent={
          <Button
            isIconOnly
            aria-label="toggle password visibility"
            className="focus:outline-none"
            color="primary"
            size="sm"
            type="button"
            style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}
            onClick={toggleVisibility}
          >
            <SendIcon />
          </Button>
        }
        minRows={1}
        placeholder={t("enterMessage")}
        size="lg"
        startContent={
          <Button
            isIconOnly
            aria-label="Take a photo"
            className="mr-1"
            color="default"
            size="sm"
          >
            <PhotoIcon />
          </Button>
        }
        variant="flat"
      />
    </div>
  );
};

export default ChatInput;