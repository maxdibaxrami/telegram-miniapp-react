import { Card, CardFooter, Image } from "@nextui-org/react";
import { VerifyIconFill } from "@/Icons/index";
import { CircleSvg } from "@/Icons/index";
import { BASEURL } from "@/constant";

const NearByCard = ({ data, onCardClick, num }) => {
  return (
      <Card
        isFooterBlurred
        isPressable
        className="border-none relative"
        radius="lg"
        classNames={{
          base:"w-fit"
        }}
        onPress={() => onCardClick(data)}
      >
        <Image
          alt="Woman listing to music"
          className="object-cover aspect-square"
          loading="lazy"
          src={`${BASEURL}${data.photos[0].url}`}
          style={{ height: "100%", width: "100%" }}
        />
          <CardFooter className=" backdrop-blur	bg-default/70 backdrop-saturate-150 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-foreground text-handller">
                    {`${data.firstName} ${data.age}`}
                   {num % 2 ===0 && <CircleSvg/>} 

                  </p>
                  {data.verifiedAccount && <VerifyIconFill fill="#016fee" className="ml-2 size-6"/> }
                  

                </div>
              </div>
          </CardFooter>
       

      </Card>
 
  );
};

export default NearByCard;
