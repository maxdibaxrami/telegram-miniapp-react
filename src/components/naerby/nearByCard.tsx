import { Card, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { BASEURL } from "@/constant";
import { PerimumIcon, VerifyIconFill } from "@/Icons";

const NearByCard = ({ data, onClick,isSelected }) => {

  return (
    <motion.div
      layoutId={isSelected.id == data.id.toString()? undefined : data.id.toString()}  // Use Framer Motion's layoutId to animate between states
      className={`relative ${isSelected ? "z-50" : ""}`}
      style={{
        cursor: "pointer",
        width: isSelected ? "100%" : "auto", // When selected, take full width
        height: isSelected ? "100%" : "auto", // When selected, take full height
      }}

      transition={{
        type: "keyframes",
      }}
    
    >
      <Card
        isFooterBlurred
        isPressable
        className="border-none"
        radius={isSelected? "lg" :"none"}
        onPress={() => onClick()}

      >
        <Image
          alt={data.firstName}
          className="object-cover aspect-square"
          radius={isSelected? "lg" :"none"}
          src={`${BASEURL}${data.photo}`}
          style={{ height: "100%", width: "100%" }}
        />
          <CardFooter
            className="p-0 border-default/20 bg-background/60 border-1 overflow-hidden absolute bottom-0 shadow-small z-10"
          >
            <motion.div transition={{type: "tween"}} animate={isSelected ? {height: "60px"} : {height: "34px"}} className="w-full py-1 flex items-center overflow-hidden px-1">
              <div className="flex items-center">
                <p
                  style={{ textAlign: "start" }}
                  className="flex items-center text-tiny text-foreground/80"
                >
                  {`${data.firstName} , ${data.age}`}
                  
                </p>
                    {data.verifiedAccount && <VerifyIconFill fill="#016fee" className="size-6"/> }
                    {data.premium && <PerimumIcon />}
              </div>
            </motion.div>
          </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NearByCard;
