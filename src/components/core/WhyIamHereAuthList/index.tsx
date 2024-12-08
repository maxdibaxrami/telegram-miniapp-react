import { ChatIcon, FireIcon, HeartIcon } from "@/Icons";
import { Avatar, cn, Radio, RadioGroup } from "@nextui-org/react";

// Define the allowed color types
type AvatarColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

// Define the structure for each item
interface Item {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: AvatarColor;
}

// List of items with proper type for 'color'
export const Items: Item[] = [
  {
    id: 1,
    title: "Here to date",
    description: "I want to go on dates and have a good time. No labels.",
    icon: <FireIcon />,
    color: "success" // Valid color
  },
  {
    id: 2,
    title: "Open to chat",
    description: "I’m here to chat and see where it goes. No pressure.",
    icon: <ChatIcon />,
    color: "warning" // Valid color
  },
  {
    id: 3,
    title: "Ready for a relationship",
    description: "I’m looking for something that lasts. No games.",
    icon: <HeartIcon fill="#FFF" />,
    color: "danger" // Valid color
  },
];

// Custom Radio component
export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

// Main component rendering the RadioGroup
const WhyIamHereAuth = () => {
  return (
    <div className="flex justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <RadioGroup description="Selected plan can be changed at any time." label="Why I am here:">
          {Items.map((item) => (
            <CustomRadio key={item.id} value={item.id.toString()}>
              <div className="flex items-center">
                <Avatar icon={item.icon} color={item.color} /> 
                <p className="mx-2">{item.title}</p>
              </div>
            </CustomRadio>
          ))}
        </RadioGroup>
      </form>
    </div>
  );
};

export default WhyIamHereAuth;
