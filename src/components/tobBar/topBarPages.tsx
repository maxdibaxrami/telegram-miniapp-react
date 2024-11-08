import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";

const TopBarPages = () => {

  return (
    <Navbar disableAnimation isBordered className="">
      <NavbarContent justify="start">
        <NavbarItem>
            <Button onPress={()=> {}} isIconOnly aria-label="Like" color="default">

            </Button>
        </NavbarItem>

        <NavbarItem className="flex items-center justify-center">
          <p className="font-bold text-inherit">Glow meet</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopBarPages;
