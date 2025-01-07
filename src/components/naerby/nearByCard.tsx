import { Card, CardFooter, Image } from "@nextui-org/react";
import { PerimumIcon, VerifyIconFill } from "@/Icons/index";
import { CircleSvg } from "@/Icons/index";
import { BASEURL } from "@/constant";
import { Link } from "react-router-dom";

const NearByCard = ({ data, num }) => {
  return (
      <Card
        isFooterBlurred
        isPressable
        className="border-none relative"
        radius="lg"
        as={Link}
        to={`/user?userId=${data.id}`}
      >
        <Image
          alt="Woman listing to music"
          className="object-cover aspect-square"
          src={`${BASEURL}${data.photo}`}
          style={{ height: "100%", width: "100%" }}
        />
          <CardFooter style={{height:"34px"}} className=" backdrop-blur	bg-background/60 backdrop-saturate-150 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 mr-1 z-10">
              <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-foreground text-handller">
                    {`${data.firstName} ${data.age}`}
                   {num % 2 ===0 && <CircleSvg/>} 

                  </p>
                  {data.verifiedAccount && <VerifyIconFill fill="#016fee" className="ml-2 size-6"/> }
                  {data.premium && <PerimumIcon />}


                </div>
              </div>
          </CardFooter>
       

      </Card>
 
  );
};

export default NearByCard;
