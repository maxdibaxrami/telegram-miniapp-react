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
        className="border-none aspect-square w-full relative"
        style={{backgroundColor: "transparent" }}
        as={Link}
        to={`/user?userId=${data.id}`}

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


        <CardFooter style={{height:"40px"}} className="p-1 justify-between bg-background/70 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 mr-1 z-10">
            
            <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-white/80 text-handller">
                    {`${data.firstName} ${data.age}`}

                   {data.verifiedAccount && <VerifyIconFill fill="#016fee" className="ml-2 size-6"/> }
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
