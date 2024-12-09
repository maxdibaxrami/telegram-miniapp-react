import type {Selection} from "@react-types/shared";

import React, { useEffect } from "react";
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import { HashtagIcon } from "@/Icons";
import { useTranslation } from "react-i18next";



export const ListboxWrapper = ({children}: {children: React.ReactNode}) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function InterestingList({onChangeValue, user}) {
  const { t } = useTranslation();

  const hobbies = [
    { id: 1, name: t("Hiking") },
    { id: 2, name: t("Cooking") },
    { id: 3, name: t("Traveling") },
    { id: 4, name: t("Guitar") },
    { id: 5, name: t("Photography") },
    { id: 6, name: t("Yoga") },
    { id: 7, name: t("Painting") },
    { id: 8, name: t("Reading") },
    { id: 9, name: t("Running") },
    { id: 10, name: t("Meditation") },
    { id: 11, name: t("Cycling") },
    { id: 12, name: t("Surfing") },
    { id: 13, name: t("Gardening") },
    { id: 14, name: t("Fishing") },
    { id: 15, name: t("Rock Climbing") },
    { id: 16, name: t("Dancing") },
    { id: 17, name: t("Gaming") },
    { id: 18, name: t("Blogging") },
    { id: 19, name: t("Swimming") },
    { id: 20, name: t("Martial Arts") },
    { id: 21, name: t("Bird Watching") },
    { id: 22, name: t("Karaoke") },
    { id: 23, name: t("Skateboarding") },
    { id: 24, name: t("Board Games") },
    { id: 25, name: t("Archery") },
    { id: 26, name: t("Skydiving") },
    { id: 27, name: t("Scuba Diving") },
    { id: 28, name: t("Tennis") },
    { id: 29, name: t("Soccer") },
    { id: 30, name: t("Basketball") },
    { id: 31, name: t("Golf") },
    { id: 32, name: t("Skiing") },
    { id: 33, name: t("Snowboarding") },
    { id: 34, name: t("Bowling") },
    { id: 35, name: t("Wine Tasting") },
    { id: 36, name: t("Baking") },
    { id: 37, name: t("Knitting") },
    { id: 38, name: t("Sewing") },
    { id: 39, name: t("Pottery") },
    { id: 40, name: t("Astronomy") },
    { id: 41, name: t("Camping") },
    { id: 42, name: t("Woodworking") },
    { id: 43, name: t("Volunteering") },
    { id: 44, name: t("Writing") },
    { id: 45, name: t("Poetry") },
    { id: 46, name: t("Journaling") },
    { id: 47, name: t("Calligraphy") },
    { id: 48, name: t("Magic Tricks") },
    { id: 49, name: t("Stand-up Comedy") },
    { id: 50, name: t("Cosplay") },
    { id: 51, name: t("Tattoo Design") },
    { id: 52, name: t("Origami") },
    { id: 53, name: t("Chess") },
    { id: 54, name: t("Vegan Cooking") },
    { id: 55, name: t("Collecting Antiques") },
    { id: 56, name: t("Fencing") },
    { id: 57, name: t("Parkour") },
    { id: 58, name: t("Beekeeping") },
    { id: 59, name: t("Leather Crafting") },
    { id: 60, name: t("Mixology") },
    { id: 61, name: t("Ice Skating") },
    { id: 62, name: t("Puzzles") },
    { id: 63, name: t("Robotics") },
    { id: 64, name: t("Virtual Reality") },
    { id: 65, name: t("Home Brewing") },
    { id: 66, name: t("Carpentry") },
    { id: 67, name: t("Flower Arranging") },
    { id: 68, name: t("Metalworking") },
    { id: 69, name: t("Jewelry Making") },
    { id: 70, name: t("Animal Rescue") },
    { id: 71, name: t("Pilates") },
    { id: 72, name: t("Kayaking") },
    { id: 73, name: t("Bungee Jumping") },
    { id: 74, name: t("Running Marathons") },
    { id: 75, name: t("Dog Training") },
    { id: 76, name: t("Horseback Riding") },
    { id: 77, name: t("Sailing") },
    { id: 78, name: t("Stand-up Paddleboarding") },
    { id: 79, name: t("Weightlifting") },
    { id: 80, name: t("Bodybuilding") },
    { id: 81, name: t("Competitive Gaming") },
    { id: 82, name: t("Podcasting") },
    { id: 83, name: t("Vlogging") },
    { id: 84, name: t("Street Art") },
    { id: 85, name: t("Historical Reenactments") },
    { id: 86, name: t("Geocaching") },
    { id: 87, name: t("Hiking with Dogs") },
    { id: 88, name: t("DIY Projects") },
    { id: 89, name: t("Car Restoration") },
    { id: 90, name: t("Motorcycling") },
    { id: 91, name: t("4x4 Off-roading") },
    { id: 92, name: t("Mountain Biking") },
    { id: 93, name: t("Frisbee Golf") },
    { id: 94, name: t("LARPing") },
    { id: 95, name: t("Drone Racing") },
    { id: 96, name: t("Rollerblading") },
    { id: 97, name: t("Escape Rooms") },
    { id: 98, name: t("Trivia Nights") },
    { id: 99, name: t("Kite Surfing") },
    { id: 100, name: t("Astronaut Training") }
  ];
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
        label={t('Selectinterested')}
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



