import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { BASEURL } from "@/constant";
import { VerifyIconFill } from "@/Icons";
import { useTranslation } from "react-i18next";

const LikeCard = ({ data, onPressData }) => {
    const { t } = useTranslation();
  
  return (
      <Card
        isFooterBlurred
        isPressable
        className="border-none mb-8 aspect-square w-full relative"
        radius="lg"
        style={{backgroundColor: "transparent" }}
        onPress={()=> onPressData(data)}

      >
        <Image
          alt="Woman listing to music"
          className="object-cover w-full h-full"
          classNames={{
            wrapper:"w-full aspect-square h-full maxcontentimportant",
            img : "w-full aspect-square h-full "
          }}
          loading="lazy"
          src={`${BASEURL}${data.photos[0].url}`}
          style={{ width: "100%", height: "100%",maxWidth:"unset" }}
        />


      <CardFooter className="justify-between px-2 border-default/20 bg-background/60 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 mr-1 z-10">
        <p className="text-tiny capitalize text-foreground/80 flex items-center">
        {data.firstName} 
        {data.verifiedAccount &&< VerifyIconFill className="mx-1 size-5 text-primary/80" />}
        </p>
        <Button
          className="text-tiny text-white bg-primary/80"
          color="default"
          radius="lg"
          size="sm"
          onPress={()=> onPressData(data)}
          variant="flat"
        >
          {t("profile")}
        </Button>
      </CardFooter>
      </Card>
  );
};

export default LikeCard;
