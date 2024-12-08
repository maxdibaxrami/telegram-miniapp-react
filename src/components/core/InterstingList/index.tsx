import type {Selection} from "@react-types/shared";

import React, { useEffect } from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import { HashtagIcon } from "@/Icons";



export const ListboxWrapper = ({children}: {children: React.ReactNode}) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function InterestingList({onChangeValue, user}) {
  const [values, setValues] = React.useState<Selection>(new Set(user.interests));
  useEffect(()=> onChangeValue(values) ,[values])
  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>{hobbies.find((hobbies) => `${hobbies.id}` === `${value}`)?.name}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <ListboxWrapper>
      <Listbox
        classNames={{
          base: "w-full",
          list: "max-h-[350px] overflow-scroll",
        }}
        defaultSelectedKeys={user.interests}
        items={hobbies}
        label="Assigned to"
        selectionMode="multiple"
        topContent={topContent}
        variant="flat"
        onSelectionChange={setValues}
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.name}>
            <div className="flex gap-2 items-center">
              <Avatar color="success" icon={<HashtagIcon className="size-5" />} className="flex-shrink-0" size="sm" />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}



const hobbies = [
    { id: 1, name: "Hiking" },
    { id: 2, name: "Cooking" },
    { id: 3, name: "Traveling" },
    { id: 4, name: "Guitar" },
    { id: 5, name: "Photography" },
    { id: 6, name: "Yoga" },
    { id: 7, name: "Painting" },
    { id: 8, name: "Reading" },
    { id: 9, name: "Running" },
    { id: 10, name: "Meditation" },
    { id: 11, name: "Cycling" },
    { id: 12, name: "Surfing" },
    { id: 13, name: "Gardening" },
    { id: 14, name: "Fishing" },
    { id: 15, name: "Rock Climbing" },
    { id: 16, name: "Dancing" },
    { id: 17, name: "Gaming" },
    { id: 18, name: "Blogging" },
    { id: 19, name: "Swimming" },
    { id: 20, name: "Martial Arts" },
    { id: 21, name: "Bird Watching" },
    { id: 22, name: "Karaoke" },
    { id: 23, name: "Skateboarding" },
    { id: 24, name: "Board Games" },
    { id: 25, name: "Archery" },
    { id: 26, name: "Skydiving" },
    { id: 27, name: "Scuba Diving" },
    { id: 28, name: "Tennis" },
    { id: 29, name: "Soccer" },
    { id: 30, name: "Basketball" },
    { id: 31, name: "Golf" },
    { id: 32, name: "Skiing" },
    { id: 33, name: "Snowboarding" },
    { id: 34, name: "Bowling" },
    { id: 35, name: "Wine Tasting" },
    { id: 36, name: "Baking" },
    { id: 37, name: "Knitting" },
    { id: 38, name: "Sewing" },
    { id: 39, name: "Pottery" },
    { id: 40, name: "Astronomy" },
    { id: 41, name: "Camping" },
    { id: 42, name: "Woodworking" },
    { id: 43, name: "Volunteering" },
    { id: 44, name: "Writing" },
    { id: 45, name: "Poetry" },
    { id: 46, name: "Journaling" },
    { id: 47, name: "Calligraphy" },
    { id: 48, name: "Magic Tricks" },
    { id: 49, name: "Stand-up Comedy" },
    { id: 50, name: "Cosplay" },
    { id: 51, name: "Tattoo Design" },
    { id: 52, name: "Origami" },
    { id: 53, name: "Chess" },
    { id: 54, name: "Vegan Cooking" },
    { id: 55, name: "Collecting Antiques" },
    { id: 56, name: "Fencing" },
    { id: 57, name: "Parkour" },
    { id: 58, name: "Beekeeping" },
    { id: 59, name: "Leather Crafting" },
    { id: 60, name: "Mixology" },
    { id: 61, name: "Ice Skating" },
    { id: 62, name: "Puzzles" },
    { id: 63, name: "Robotics" },
    { id: 64, name: "Virtual Reality" },
    { id: 65, name: "Home Brewing" },
    { id: 66, name: "Carpentry" },
    { id: 67, name: "Flower Arranging" },
    { id: 68, name: "Metalworking" },
    { id: 69, name: "Jewelry Making" },
    { id: 70, name: "Animal Rescue" },
    { id: 71, name: "Pilates" },
    { id: 72, name: "Kayaking" },
    { id: 73, name: "Bungee Jumping" },
    { id: 74, name: "Running Marathons" },
    { id: 75, name: "Dog Training" },
    { id: 76, name: "Horseback Riding" },
    { id: 77, name: "Sailing" },
    { id: 78, name: "Stand-up Paddleboarding" },
    { id: 79, name: "Weightlifting" },
    { id: 80, name: "Bodybuilding" },
    { id: 81, name: "Competitive Gaming" },
    { id: 82, name: "Podcasting" },
    { id: 83, name: "Vlogging" },
    { id: 84, name: "Street Art" },
    { id: 85, name: "Historical Reenactments" },
    { id: 86, name: "Geocaching" },
    { id: 87, name: "Hiking with Dogs" },
    { id: 88, name: "DIY Projects" },
    { id: 89, name: "Car Restoration" },
    { id: 90, name: "Motorcycling" },
    { id: 91, name: "4x4 Off-roading" },
    { id: 92, name: "Mountain Biking" },
    { id: 93, name: "Frisbee Golf" },
    { id: 94, name: "LARPing" },
    { id: 95, name: "Drone Racing" },
    { id: 96, name: "Rollerblading" },
    { id: 97, name: "Escape Rooms" },
    { id: 98, name: "Trivia Nights" },
    { id: 99, name: "Kite Surfing" },
    { id: 100, name: "Astronaut Training" }
  ];