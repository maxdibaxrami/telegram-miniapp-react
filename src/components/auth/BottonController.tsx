import { Navbar, NavbarContent, Button } from "@nextui-org/react";
import { ArrowRight, ArrowLeft } from "@/Icons/index";

const BottomController = ({ nextPage, prevPage }) => {

  return (
      <Navbar className="w-full">
        <NavbarContent className="gap-4" justify="start">
          <Button
            isIconOnly
            aria-label="Like"
            color="primary"
            size="lg"
            onClick={prevPage}
          >
            <ArrowLeft />
          </Button>
        </NavbarContent>
        <NavbarContent className="flex gap-4" justify="center" />
        <NavbarContent className="flex gap-4" justify="end">
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
