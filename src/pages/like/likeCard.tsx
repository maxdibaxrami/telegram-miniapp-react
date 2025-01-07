import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { BASEURL } from "@/constant";
import { VerifyIconFill } from "@/Icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LikeCard = ({ data }) => {
    const { t } = useTranslation();
  
  return (
      <Card
        isFooterBlurred
        isPressable
        className="border-none aspect-square w-full relative"
        radius="none"
        style={{backgroundColor: "transparent" }}
        as={Link}
        to={`/user?userId=${data.id}`}

      >
        <Image
          alt="Woman listing to music"
          className="object-cover w-full h-full"
          radius="none"
          classNames={{
            wrapper:"w-full aspect-square h-full maxcontentimportant",
            img : "w-full aspect-square h-full "
          }}
          loading="lazy"
          src={`${BASEURL}${data.photos[0].url}`}
          style={{ width: "100%", height: "100%",maxWidth:"unset" }}
        />


      <CardFooter className="justify-between px-2 border-default/20 bg-background/60 border-1 overflow-hidden py-1 absolute bottom-0 shadow-small z-10">
        <p className="text-tiny capitalize text-foreground/80 flex items-center">
        {data.firstName} 
        {data.verifiedAccount &&< VerifyIconFill className="mx-1 size-5 text-primary/80" />}
        </p>
        <Button
          className="text-tiny text-white bg-primary/80"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          {t("profile")}
        </Button>
      </CardFooter>
      </Card>
  );
};

export default LikeCard;
