import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { BASEURL } from "@/constant";
import { PerimumIcon, VerifyIconFill } from "@/Icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LikeCard = ({ data }) => {
    const { t } = useTranslation();
  
  return (
      <Card
        isFooterBlurred
        isPressable
        radius="lg"
        className="border-none aspect-square w-full relative"
        as={Link}
        to={`/user?userId=${data.id}`}

      >
        <Image
          alt="Woman listing to music"
          className="object-cover w-full h-full shadow-small"
          classNames={{
            wrapper:"w-full aspect-square h-full maxcontentimportant",
            img : "w-full aspect-square h-full "
          }}
          loading="lazy"
          src={`${BASEURL}${data.photos[0].url}`}
          style={{ width: "100%", height: "100%",maxWidth:"unset" }}
        />


          <CardFooter style={{height:"42px"}} className="justify-between z-10 bg-background/70 overflow-hidden py-1 absolute before:rounded-xl bottom-0 z-10">
            
            <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-foreground/80 text-handller">
                    {`${data.firstName} ${data.age}`}

                   {data.verifiedAccount && <VerifyIconFill fill="#21b6a8" className="ml-2 size-6"/> }
                   {data.premium && <PerimumIcon />}
                  </p>
                  
                  <Button
                    className="text-tiny text-white bg-primary/80"
                    color="primary"
                    radius="lg"
                    size="sm"
                    variant="flat"
                  >
                    {t("profile")}
                  </Button>
                </div>
              </div>

        </CardFooter>
      </Card>
  );
};

export default LikeCard;
