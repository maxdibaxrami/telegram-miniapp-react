import { Card, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { BASEURL } from "@/constant";

const NearByCard = ({ data, onClick }) => {

  return (
    <motion.div
      layoutId={data.id.toString()}  // Use Framer Motion's layoutId to animate between states
      className={`relative`}
      style={{
        cursor: "pointer",
      }}
  
    >
      <Card
        isFooterBlurred
        isPressable
        className="border-none"
        radius="none"
        onPress={() => onClick()}

      >
        <Image
          alt={data.firstName}
          className="object-cover aspect-square"
          radius="none"
          src={`${BASEURL}${data.photo}`}
          style={{ height: "100%", width: "100%" }}
        />
          <CardFooter
            style={{ height: "40px" }}
            className="justify-between px-2 border-default/20 bg-background/60 border-1 overflow-hidden py-1 absolute bottom-0 shadow-small z-10"
          >
            <div className="w-full">
              <div className="flex justify-between items-center">
                <p
                  style={{ textAlign: "start" }}
                  className="flex items-center text-tiny text-foreground/80"
                >
                  {`${data.firstName} ${data.age}`}
                </p>
              </div>
            </div>
          </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NearByCard;
