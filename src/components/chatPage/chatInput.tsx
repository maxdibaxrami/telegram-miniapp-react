import { Textarea, Button } from "@nextui-org/react";
import {motion} from 'framer-motion'
import { SendIcon, PhotoIcon } from "@/Icons/index";

const ChatInput = () => {

  return (
    <motion.div
      className="flex items-center justify-between"
      style={{ width: "100%", position:"fixed", bottom:"1rem", padding:"0px 12px 0px 12px", transition:"transform 0.3s ease-in-out"}}
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
    </motion.div>
  );
};

export default ChatInput;
