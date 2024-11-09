import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Button, Avatar } from "@nextui-org/react";
import {useRef} from 'react'
import { BackMenu } from "@/Icons/index";
import NearByUserModal from "../naerby/NearByModal";
import { useNavigate } from "react-router-dom";
import ChatDetailMenu from "./chatDetailMenu";

const ChatProfileSection = () => {
  const navigate = useNavigate()
  const childRef = useRef();

  const handleClick = () => {
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.callChildFunction(); // Call the function in the child
    }
  };
  
  return (
    <>
    <div>
      <Navbar
        disableAnimation
        className="absolute top-0"
        classNames={{ wrapper: "px-4" }}
      >
        <NavbarContent justify="start">
          <NavbarItem className="lg:flex">
              <Button
                isIconOnly
                aria-label="Like"
                className="mr-2 text-white"
                color="primary"
                onPress={()=> { navigate("/main?page=chat")}}
              >
                <BackMenu />
              </Button>
          </NavbarItem>

          <NavbarItem className="">
            <button className="lg:flex flex items-center" onClick={handleClick}>
              <Avatar
                isBordered
                className="mr-2"
                color="default"
                radius="sm"
                size="md"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              <div className="flex flex-col ml-2 text-left">
                <span className="text-large bold">{"Mahdi Bahrmai"}</span>
                <span className="text-small bold" style={{ color: "#22c55e" }}>
                  {"Online"}
                </span>
              </div>
            </button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <ChatDetailMenu  />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
    <NearByUserModal profile={a} ref={childRef}/>
</>
  );
};

export default ChatProfileSection;


const a =   {
  id: 9,
  name: "Viktor Volkov",
  age: 28,
  location: "Samara, Russia",
  avatar: "https://i.pravatar.cc/?u=a04258122e29026702d",
  workAndEducation: "SSU, Civil Engineer",
  whyHere: "Looking for interesting people",
  aboutMe: "Engineering geek and sports lover.",
  lookingFor: "Friendship",
  relationStatus: "Single",
  height: "185 cm",
  kids: "None",
  language: "Russian, English",
  sexuality: "Straight",
  interests: ["Engineering", "Sports", "Photography"],
  mainImage: "https://i.pravatar.cc/?u=25",
  secondImage: "https://i.pravatar.cc/?u=26",
  thirdImage: "https://i.pravatar.cc/?u=27",
}