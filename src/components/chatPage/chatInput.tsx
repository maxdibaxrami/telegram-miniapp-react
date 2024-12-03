import { Textarea, Button } from "@nextui-org/react";

import { SendIcon, PhotoIcon } from "@/Icons/index";

const ChatInput = () => {

  
  return (
    <div
      className="flex items-center justify-between"
      style={{ width: "100%"}}
    >
      <Textarea
        className="w-full outline-0"
        endContent={
          <Button
            isIconOnly
            aria-label="toggle password visibility"
            className="focus:outline-none"
            color="primary"
            size="sm"
            type="button"
          >
            <SendIcon />
          </Button>
        }
        minRows={1}
        placeholder="Enter your message"
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
