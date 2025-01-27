import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { PerimumIcon, VerifyIconFill } from "@/Icons/index";
import { BASEURL } from "@/constant";
import { Link } from "react-router-dom";

const NearByCard = ({ data }) => {
  return (
      <Card
        isPressable
        disableRipple
        className="border-none relative m-1"
        as={Link}
        to={`/user?userId=${data.id}`}
      >
      <CardBody className="p-1.5 aspect-square pb-0">
        <Image
            alt="Woman listing to music"
            className="object-cover aspect-square"
            loading="lazy"
            src={`${BASEURL}${data.photo}`}
            style={{ height: "100%", width: "100%" }}
          />
      </CardBody>
        <CardFooter style={{height:"32px"}} className="text-small py-1 justify-between">
            <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-foreground/80 text-handller">
                    {`${data.firstName} ${data.age}`}

                   {data.verifiedAccount && <VerifyIconFill fill="#21b6a8" className="ml-2 size-5"/> }
                   {data.premium && <PerimumIcon className="size-5" />}
                  </p>

                </div>
              </div>
          </CardFooter>
       

      </Card>
 
  );
};

export default NearByCard;
