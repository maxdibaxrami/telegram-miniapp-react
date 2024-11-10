import { Card, Image } from "@nextui-org/react";

import {
  HeartEyesImoji,
  NotLikeImoji,
} from "@/Icons/index";

const LikeCard = ({ data, onPressData }) => {
  return (
    <div className={"relative w-full mb-8"}>
      <Card
        isFooterBlurred
        isPressable
        className="border-none w-full relative"
        radius="lg"
        style={{backgroundColor: "transparent" }}
        onPress={()=> onPressData(data)}
      >
        <Image
          alt="Woman listing to music"
          className="object-cover w-full h-full"
          classNames={{
            wrapper:"w-full h-full maxcontentimportant",
            img : "w-full h-full "
          }}
          loading="lazy"
          src={data.mainImage}
          style={{ width: "100%", height: "100%",maxWidth:"unset" }}
        />
      </Card>

      <div
        className="flex items-center background-drop--bluebase--likecard border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large shadow-small z-10"
        style={{
          bottom: "-25px",
          borderRadius: "54px",
          justifyContent: "space-between",
          width: "calc(100% - 14%)",
          marginLeft:"7%",
          marginRight:"7%"
        }}
      >
        <HeartEyesImoji />
        <NotLikeImoji />
      </div>
    </div>
  );
};

export default LikeCard;
