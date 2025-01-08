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
        radius="lg"
        className="border-none relative"
        as={Link}
        to={`/user?userId=${data.id}`}
      >
        <Image
          alt="Woman listing to music"
          className="object-cover aspect-square"
          src={`${BASEURL}${data.photo}`}
          style={{ height: "100%", width: "100%" }}
        />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-white/80 text-handller">
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
