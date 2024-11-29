
import LikeCard from "./likeCard";
import { useRef, useState } from "react";
import NearByUserModal from "@/components/naerby/NearByModal";
export default function LikesPage() {
  
  const childRef = useRef();
  const [SelectedCard, setSelectedCard] = useState({});

  const handleClick = () => {
    if (childRef.current) {
      /* @ts-ignore */
      childRef.current.callChildFunction(); // Call the function in the child
    }
  };

  const onCardClick = (data) => {
    setSelectedCard(data);
    handleClick();
  };

  return (
    <div
    className="gap-2 grid grid-cols-2 sm:grid-cols-2 py-2"
    style={{
      overflow: "scroll",
      maxHeight: "100vh",
      paddingTop: "4.5rem",
      paddingBottom: "6rem",
      paddingLeft:"30px",
      paddingRight:"30px",
    }}
    >
      {mockProfiles.map((value, index) => {
        return <LikeCard onPressData={onCardClick} key={index} data={value} />;
      })}

      <NearByUserModal ref={childRef} profile={SelectedCard} />

    </div>
  );
}

const mockProfiles = [
  {
    id: 1,
    name: "Mahdi Bahrami",
    age: 24,
    location: "Moscow, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258114e29026702d",
    workAndEducation: "Sechinov University, Programmer",
    whyHere: "Just chat",
    aboutMe: "Aspiring programmer and coffee enthusiast.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "183 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Coding", "Photography", "Hiking", "Gaming"],
    mainImage: "https://i.pravatar.cc/?u=1",
    secondImage: "https://i.pravatar.cc/?u=2",
    thirdImage: "https://i.pravatar.cc/?u=3",
  },
  {
    id: 2,
    name: "Olga Ivanova",
    age: 22,
    location: "St. Petersburg, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258115e29026702d",
    workAndEducation: "SPbU, Graphic Designer",
    whyHere: "To meet new friends",
    aboutMe: "Passionate about design and travel.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "170 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Bi",
    interests: ["Design", "Travel", "Art"],
    mainImage: "https://i.pravatar.cc/?u=4",
    secondImage: "https://i.pravatar.cc/?u=5",
    thirdImage: "https://i.pravatar.cc/?u=6",
  },
  {
    id: 3,
    name: "Alexey Petrov",
    age: 27,
    location: "Novosibirsk, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258116e29026702d",
    workAndEducation: "Novosibirsk State University, Software Engineer",
    whyHere: "Looking for cool people",
    aboutMe: "Tech enthusiast and music lover.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "178 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Music", "Technology", "Sports"],
    mainImage: "https://i.pravatar.cc/?u=7",
    secondImage: "https://i.pravatar.cc/?u=8",
    thirdImage: "https://i.pravatar.cc/?u=9",
  },
  {
    id: 4,
    name: "Diana Smirnova",
    age: 23,
    location: "Moscow, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258117e29026702d",
    workAndEducation: "MSU, Marketing Student",
    whyHere: "Just looking to chat",
    aboutMe: "Love marketing and fun conversations.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "165 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Marketing", "Cooking", "Yoga"],
    mainImage: "https://i.pravatar.cc/?u=10",
    secondImage: "https://i.pravatar.cc/?u=11",
    thirdImage: "https://i.pravatar.cc/?u=12",
  },
  {
    id: 5,
    name: "Igor Ivanov",
    age: 25,
    location: "Kazan, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258118e29026702d",
    workAndEducation: "Kazan Federal University, Data Analyst",
    whyHere: "For fun chats",
    aboutMe: "Data lover and soccer fan.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "180 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Data Science", "Soccer", "Traveling"],
    mainImage: "https://i.pravatar.cc/?u=13",
    secondImage: "https://i.pravatar.cc/?u=14",
    thirdImage: "https://i.pravatar.cc/?u=15",
  },
  {
    id: 6,
    name: "Yulia Petrova",
    age: 21,
    location: "Yekaterinburg, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258119e29026702d",
    workAndEducation: "UrFU, Biologist",
    whyHere: "Looking for new friends",
    aboutMe: "Nature enthusiast and curious mind.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "160 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Biology", "Hiking", "Gardening"],
    mainImage: "https://i.pravatar.cc/?u=16",
    secondImage: "https://i.pravatar.cc/?u=17",
    thirdImage: "https://i.pravatar.cc/?u=18",
  },
  {
    id: 7,
    name: "Sergey Sokolov",
    age: 26,
    location: "Nizhny Novgorod, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258120e29026702d",
    workAndEducation: "NNGU, Network Engineer",
    whyHere: "To connect with others",
    aboutMe: "Techie and gaming aficionado.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "175 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Networking", "Gaming", "Traveling"],
    mainImage: "https://i.pravatar.cc/?u=19",
    secondImage: "https://i.pravatar.cc/?u=20",
    thirdImage: "https://i.pravatar.cc/?u=21",
  },
  {
    id: 8,
    name: "Elena Fedorova",
    age: 24,
    location: "Chelyabinsk, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258121e29026702d",
    workAndEducation: "ChSPU, Teacher",
    whyHere: "Just for conversations",
    aboutMe: "Love books and teaching.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "172 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Education", "Reading", "Cooking"],
    mainImage: "https://i.pravatar.cc/?u=22",
    secondImage: "https://i.pravatar.cc/?u=23",
    thirdImage: "https://i.pravatar.cc/?u=24",
  },
  {
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
  },
  {
    id: 10,
    name: "Anna Vasilyeva",
    age: 25,
    location: "Voronezh, Russia",
    avatar: "https://i.pravatar.cc/?u=a04258123e29026702d",
    workAndEducation: "Voronezh State University, Journalist",
    whyHere: "To meet new people",
    aboutMe: "Love writing and exploring.",
    lookingFor: "Friendship",
    relationStatus: "Single",
    height: "168 cm",
    kids: "None",
    language: "Russian, English",
    sexuality: "Straight",
    interests: ["Journalism", "Travel", "Writing"],
    mainImage: "https://i.pravatar.cc/?u=28",
    secondImage: "https://i.pravatar.cc/?u=29",
    thirdImage: "https://i.pravatar.cc/?u=30",
  },
];
