import { Card, CardFooter, Image } from "@nextui-org/react";
import { PerimumIcon, VerifyIconFill } from "@/Icons/index";
import { BASEURL } from "@/constant";
import { Link } from "react-router-dom";

const NearByCard = ({ data }) => {
  return (
      <Card
        isFooterBlurred
        isPressable
        radius="none"
        className="border-none relative"
        as={Link}
        to={`/user?userId=${data.id}`}
      >
        <Image
          alt="Woman listing to music"
          className="object-cover aspect-square"
          radius="none"
          src={`${BASEURL}${data.photo}`}
          style={{ height: "100%", width: "100%" }}
        />
      <CardFooter style={{height:"40px"}} className="justify-between bg-background/70 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 mr-1 z-10">
            <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-foreground/80 text-handller">
                    {`${data.firstName} ${data.age}`}

                   {data.verifiedAccount && <VerifyIconFill fill="#21b6a8" className="ml-2 size-6"/> }
                   {data.premium && <PerimumIcon />}
                  </p>

                </div>
              </div>
          </CardFooter>
       

      </Card>
 
  );
};

export default NearByCard;
