import {  FlashIcon, PerimumIcon, TonCoinIcon } from "@/Icons";
import { Avatar, Button, Card,  CardHeader } from "@nextui-org/react";

export const EnergyCard = ({color,title,description,price,type}) => {

  return (
    <Card className="max-w-[340px] py-2 mb-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            color={color}
            icon={<FlashIcon className="size-5"/>}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{title}</h4>
            <h5 className="text-small tracking-tight text-default-400">{description}</h5>
          </div>
        </div>
        <Button
          color={type === "star" ? "secondary" : "primary"}
          radius="full"
          size="sm"
          variant={"solid"}
        >
            {type === "star"? 
                <PerimumIcon stroke="#FFF" fill="#FFF" className="size-5"/>
                :
                <TonCoinIcon className="size-5"/>
            }
            {price}
        </Button>
      </CardHeader>
    </Card>
  );
}

