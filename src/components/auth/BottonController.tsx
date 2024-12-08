import { Navbar, NavbarContent, Button, Progress } from "@nextui-org/react";
import { ArrowRight, ArrowLeft } from "@/Icons/index";

const BottomController = ({ nextPage, prevPage, selectedTab }) => {

  return (
      <Navbar className="w-full bg-transparent">
        <NavbarContent justify="start">
          <Button
            isIconOnly
            aria-label="Like"
            color="primary"
            size="lg"
            isDisabled={selectedTab === 0 }
            onClick={prevPage}
          >
            <ArrowLeft />
          </Button>
          
        </NavbarContent>
        <NavbarContent className="flex w-full gap-4" justify="center">
         <Progress isDisabled={selectedTab === 0 } className="w-full" color="primary" value={selectedTab * 7.70} />
        </NavbarContent>
        <NavbarContent justify="end">
          <Button
            isIconOnly
            aria-label="Like"
            color="primary"
            size="lg"
            onClick={nextPage}
          >
            <ArrowRight />
          </Button>
        </NavbarContent>
      </Navbar>
  );
};

export default BottomController;
