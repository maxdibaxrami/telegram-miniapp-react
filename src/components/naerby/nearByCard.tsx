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
        radius="none"
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
        <CardFooter style={{height:"40px"}} className="justify-between px-2 border-default/20 bg-background/60 border-1 overflow-hidden py-1 absolute bottom-0 shadow-small z-10">
          <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-foreground/80 text-handller">
                    {`${data.firstName} ${data.age}`}
                    {num % 2 ===0 && <CircleSvg/>} 
                    {data.verifiedAccount && <VerifyIconFill fill="#016fee" className="size-6"/> }
                    {data.premium && <PerimumIcon />}
                  </p>



                </div>
              </div>
          </CardFooter>
       

      </Card>
 
  );
};

export default NearByCard;
