import { Card, CardFooter, Image } from "@nextui-org/react";
import { VerifyIcon, VerifyIconFill } from "@/Icons/index";
import { CircleSvg } from "@/Icons/index";

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
          className="object-cover"
          loading="lazy"
          src={data.avatar}
          style={{ height: "100%", width: "100%" }}
        />
          <CardFooter className=" backdrop-blur	bg-background/70 backdrop-saturate-150 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <div className=" w-full">
                <div className="flex justify-between items-center">
                  <p style={{textAlign:"start"}} className="flex items-center text-tiny text-foreground text-handller">
                    {`${data.name.split(" ")[0]} ${data.age}`}
                   {num % 2 ===0 && <CircleSvg/>} 

                  </p>
                  <VerifyIconFill fill="#016fee" className="ml-2 size-6"/>

                </div>
              </div>
          </CardFooter>
       

      </Card>
 
  );
};

export default NearByCard;
